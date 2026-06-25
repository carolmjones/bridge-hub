/** Round to 2 decimal places (calculation policy). */
export function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export function reverseScore(value: number, max: number): number {
  return max - value;
}

/** Error function approximation (Abramowitz & Stegun). */
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const y =
    1 -
    (((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t -
      0.284496736) *
      t +
      0.254829592) *
      t *
      Math.exp(-ax * ax));
  return sign * y;
}

/** Normal CDF → percentile 0–100. */
export function normPercentile(
  score: number,
  mean: number,
  sd: number
): number {
  const z = (score - mean) / sd;
  const cdf = 0.5 * (1 + erf(z / Math.sqrt(2)));
  return round2(Math.min(99.99, Math.max(0.01, cdf * 100)));
}

export function sum(values: number[]): number {
  return values.reduce((acc, v) => acc + v, 0);
}

export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return round2(sum(values) / values.length);
}

export type ResponseMap = Record<number, number>;

export function getItem(map: ResponseMap, item: number): number {
  const value = map[item];
  if (value === undefined) {
    throw new Error(`Missing response for item ${item}`);
  }
  return value;
}

export function sectionDurationSeconds(
  sectionStart: string | null | undefined,
  sectionEnd: string | null | undefined
): number | null {
  if (!sectionStart || !sectionEnd) return null;
  const ms = new Date(sectionEnd).getTime() - new Date(sectionStart).getTime();
  if (Number.isNaN(ms) || ms < 0) return null;
  return Math.round(ms / 1000);
}
