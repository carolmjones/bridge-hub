import type { User as AuthUser } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export async function getOrCreateAuthUser(
  email: string,
  firstName: string,
  optedIn: boolean
): Promise<AuthUser> {
  const admin = createAdminClient();
  const normalizedEmail = email.trim().toLowerCase();

  const { data: created, error: createError } =
    await admin.auth.admin.createUser({
      email: normalizedEmail,
      email_confirm: true,
      user_metadata: {
        first_name: firstName.trim(),
        opted_in: optedIn,
      },
    });

  if (!createError && created.user) {
    return created.user;
  }

  const alreadyExists =
    createError?.message?.includes("already been registered") ||
    createError?.status === 422;

  if (!alreadyExists) {
    throw new Error(createError?.message ?? "Failed to create user");
  }

  const existing = await findAuthUserByEmail(normalizedEmail);
  if (!existing) {
    throw new Error("User exists but could not be loaded");
  }

  await admin.auth.admin.updateUserById(existing.id, {
    user_metadata: {
      first_name: firstName.trim(),
      opted_in: optedIn,
    },
  });

  await admin
    .from("users")
    .update({
      first_name: firstName.trim(),
      opted_in: optedIn,
    })
    .eq("id", existing.id);

  return existing;
}

async function findAuthUserByEmail(email: string): Promise<AuthUser | null> {
  const admin = createAdminClient();
  let page = 1;

  while (page <= 10) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) {
      throw new Error(error.message);
    }

    const match = data.users.find(
      (user) => user.email?.toLowerCase() === email
    );
    if (match) {
      return match;
    }

    if (data.users.length < 200) {
      break;
    }
    page += 1;
  }

  return null;
}

export async function getAuthUserByEmail(email: string): Promise<AuthUser | null> {
  return findAuthUserByEmail(email.trim().toLowerCase());
}

export async function createMagicLinkToken(userId: string): Promise<string> {
  const admin = createAdminClient();
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + THIRTY_DAYS_MS).toISOString();

  await admin
    .from("magic_links")
    .update({ used: true })
    .eq("user_id", userId)
    .eq("used", false);

  const { error } = await admin.from("magic_links").insert({
    user_id: userId,
    token,
    expires_at: expiresAt,
  });

  if (error) {
    throw new Error(error.message);
  }

  return token;
}

export type ValidatedMagicLink = {
  userId: string;
  token: string;
};

export async function validateMagicLinkToken(
  token: string
): Promise<ValidatedMagicLink | null> {
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("magic_links")
    .select("user_id, token, expires_at, used")
    .eq("token", token)
    .maybeSingle();

  if (error || !data || data.used) {
    return null;
  }

  if (new Date(data.expires_at) < new Date()) {
    return null;
  }

  const { error: markError } = await admin
    .from("magic_links")
    .update({ used: true })
    .eq("token", token);

  if (markError) {
    throw new Error(markError.message);
  }

  return { userId: data.user_id, token: data.token };
}

export async function establishAuthSession(email: string) {
  const admin = createAdminClient();

  const { data: linkData, error: linkError } =
    await admin.auth.admin.generateLink({
      type: "magiclink",
      email: email.trim().toLowerCase(),
    });

  const hashedToken = linkData?.properties?.hashed_token;
  if (linkError || !hashedToken) {
    throw new Error(linkError?.message ?? "Failed to generate auth session");
  }

  const { data, error } = await admin.auth.verifyOtp({
    token_hash: hashedToken,
    type: "email",
  });

  if (error || !data.session) {
    throw new Error(error?.message ?? "Failed to verify auth session");
  }

  return data.session;
}
