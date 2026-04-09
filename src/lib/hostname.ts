/**
 * Edge-safe hostname utilities.
 * This file is imported by middleware (Edge Runtime) — keep it Node.js-free.
 */
export function normalizeHostname(host: string): string {
  return host.replace(/:\d+$/, '').replace(/^www\./, '');
}
