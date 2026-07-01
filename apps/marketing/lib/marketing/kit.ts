const KIT_API_BASE = "https://api.kit.com/v4";

type KitErrorResponse = { errors?: string[] };

function getKitConfig() {
  return {
    apiKey: process.env.KIT_API_KEY?.trim() ?? "",
    formId: process.env.KIT_FREE_CLASS_FORM_ID?.trim() ?? "",
  };
}

export function isKitConfigured(): boolean {
  const { apiKey, formId } = getKitConfig();
  return Boolean(apiKey && formId);
}

async function kitPost(path: string, body: Record<string, unknown>) {
  const { apiKey } = getKitConfig();
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

export async function subscribeToFreeClassForm({
  email,
  firstName,
  referrer,
}: {
  email: string;
  firstName: string;
  referrer?: string;
}) {
  const { formId } = getKitConfig();
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
