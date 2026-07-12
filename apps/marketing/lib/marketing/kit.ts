const KIT_API_BASE = "https://api.kit.com/v4";

type KitErrorResponse = { errors?: string[] };

function getKitApiKey(): string {
  return process.env.KIT_API_KEY?.trim() ?? "";
}

export function isKitConfigured(): boolean {
  return Boolean(getKitApiKey() && process.env.KIT_FREE_CLASS_FORM_ID?.trim());
}

export function isKitSpeakingFormConfigured(): boolean {
  return Boolean(
    getKitApiKey() && process.env.KIT_SPEAKING_ENQUIRY_FORM_ID?.trim(),
  );
}

export function isStillNotSureKitConfigured(): boolean {
  return Boolean(
    getKitApiKey() &&
      process.env.KIT_FREE_CLASS_FORM_ID?.trim() &&
      process.env.KIT_STILL_NOT_SURE_TAG_ID?.trim(),
  );
}

async function kitPost(path: string, body: Record<string, unknown>) {
  const apiKey = getKitApiKey();
  if (!apiKey) {
    throw new Error("Kit API key is not configured");
  }

  const response = await fetch(`${KIT_API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as KitErrorResponse;
    const message =
      data.errors?.join(", ") || `Kit request failed (${response.status})`;
    throw new Error(message);
  }

  return response.json().catch(() => ({}));
}

async function tagSubscriberByEmail(tagId: string, email: string) {
  await kitPost(`/tags/${tagId}/subscribers`, {
    email_address: email,
  });
}

export async function subscribeToFreeClassForm({
  email,
  firstName,
  referrer,
}: {
  email: string;
  firstName: string;
  referrer?: string;
}) {
  const formId = process.env.KIT_FREE_CLASS_FORM_ID?.trim();
  if (!formId) {
    throw new Error("Kit free class form ID is not configured");
  }

  await kitPost("/subscribers", {
    email_address: email,
    first_name: firstName,
    state: "active",
  });

  await kitPost(`/forms/${formId}/subscribers`, {
    email_address: email,
    ...(referrer ? { referrer } : {}),
  });
}

/** Same Kit list as free class; tagged `still-not-sure` for entry-point tracking. */
export async function subscribeToStillNotSureNewsletter({
  email,
  firstName,
  referrer,
}: {
  email: string;
  firstName: string;
  referrer?: string;
}) {
  const tagId = process.env.KIT_STILL_NOT_SURE_TAG_ID?.trim();
  if (!tagId) {
    throw new Error("Kit still-not-sure tag ID is not configured");
  }

  await subscribeToFreeClassForm({ email, firstName, referrer });
  await tagSubscriberByEmail(tagId, email);
}

export type SpeakingEnquiryInput = {
  name: string;
  email: string;
  phone?: string;
  organisation: string;
  eventType: string;
  eventDate?: string;
  message: string;
  referrer?: string;
};

/**
 * Adds an organiser enquiry to Kit as a subscriber (for future nurture/tagging).
 * Custom field keys below must already exist in the Kit account, or Kit will
 * silently drop them — see docs/roadmap_marketing.md for the setup checklist.
 */
export async function submitSpeakingEnquiryToKit({
  name,
  email,
  phone,
  organisation,
  eventType,
  eventDate,
  message,
  referrer,
}: SpeakingEnquiryInput) {
  const formId = process.env.KIT_SPEAKING_ENQUIRY_FORM_ID?.trim();
  if (!formId) {
    throw new Error("Kit speaking enquiry form ID is not configured");
  }

  await kitPost("/subscribers", {
    email_address: email,
    first_name: name,
    state: "active",
    fields: {
      phone_number: phone || undefined,
      company: organisation,
      event_type: eventType,
      event_date: eventDate || undefined,
      message,
    },
  });

  await kitPost(`/forms/${formId}/subscribers`, {
    email_address: email,
    ...(referrer ? { referrer } : {}),
  });
}
