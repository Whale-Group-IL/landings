/**
 * Validate that a string is a safe CSS color value.
 * Allows: hex (#rgb, #rrggbb, #rrggbbaa), named colors, rgb(), hsl().
 * Rejects anything that could be used for CSS injection (semicolons, braces, etc.)
 */
const SAFE_COLOR_RE =
  /^(#[0-9a-fA-F]{3,8}|rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)|rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*[\d.]+\s*\)|hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)|[a-zA-Z]{2,30})$/;

export function sanitizeColor(color: string | undefined, fallback: string): string {
  if (!color) return fallback;
  return SAFE_COLOR_RE.test(color.trim()) ? color.trim() : fallback;
}
