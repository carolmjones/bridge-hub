import { buildAiTxt } from "@/lib/marketing/llms";

export function GET() {
  const body = buildAiTxt();

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
