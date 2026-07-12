import { buildLlmsTxt } from "@/lib/marketing/llms";

export function GET() {
  const body = buildLlmsTxt();

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
