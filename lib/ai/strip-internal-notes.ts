/** Remove [PATTERNS USED: ...] and similar internal AI notes before display. */
export function stripInternalNotes(text: string): string {
  return text.replace(/\[[^\]]*\]/g, "").replace(/\s+/g, " ").trim();
}
