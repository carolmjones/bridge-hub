function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value?.trim()) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value.trim();
}

export function getAppUrl(): string {
  return requireEnv("NEXT_PUBLIC_APP_URL").replace(/\/$/, "");
}

export function getSupabaseUrl(): string {
  return requireEnv("NEXT_PUBLIC_SUPABASE_URL").replace(/\/$/, "");
}

export function getSupabaseAnonKey(): string {
  return requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export function getSupabaseServiceRoleKey(): string {
  return requireEnv("SUPABASE_SERVICE_ROLE_KEY");
}

export function getResendApiKey(): string {
  return requireEnv("RESEND_API_KEY");
}

export function getResendFromEmail(): string {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "The Bridge Hub <onboarding@resend.dev>"
  );
}

export function getOpenRouterApiKey(): string | null {
  return process.env.OPENROUTER_API_KEY?.trim() || null;
}

/** Default launch model — override via OPENROUTER_MODEL in env. */
export function getOpenRouterModel(): string {
  return process.env.OPENROUTER_MODEL?.trim() || "openrouter/owl-alpha";
}

export function getCalEmbedUrl(): string | null {
  return process.env.NEXT_PUBLIC_CAL_EMBED_URL?.trim() || null;
}

export function getCalWebhookSecret(): string | null {
  return process.env.CAL_WEBHOOK_SECRET?.trim() || null;
}
