// src/components/widgets/shared/utils.ts

/**
 * Convert a human-readable amount string to base units (integer string).
 * e.g. toBaseUnits("1.5", 6) => "1500000"
 */
export function toBaseUnits(humanAmount: string, decimals: number): string {
  const [whole, frac = ""] = humanAmount.split(".");
  const fracPadded = frac.padEnd(decimals, "0").slice(0, decimals);
  // Use BigInt(10) ** BigInt(decimals) to avoid float precision loss for 18-decimal tokens
  const combined = BigInt(whole || "0") * (BigInt(10) ** BigInt(decimals)) + BigInt(fracPadded || "0");
  return combined.toString();
}

/**
 * Convert base units back to human-readable string.
 * e.g. fromBaseUnits("1500000", 6) => "1.5"
 */
export function fromBaseUnits(baseAmount: string, decimals: number): string {
  if (!baseAmount || baseAmount === "0") return "0";
  const padded = baseAmount.padStart(decimals + 1, "0");
  const whole = padded.slice(0, padded.length - decimals) || "0";
  const frac = padded.slice(padded.length - decimals).replace(/0+$/, "");
  return frac ? `${whole}.${frac}` : whole;
}

/**
 * Format a price change percentage with sign and fixed decimals.
 */
export function formatChange(val: number | string | undefined): string {
  if (val == null || val === "") return "—";
  const n = Number(val);
  if (isNaN(n)) return "—";
  return (n >= 0 ? "+" : "") + n.toFixed(2) + "%";
}

/**
 * Truncate a wallet address for display: 0x1234...abcd
 */
export function shortAddress(addr: string): string {
  if (!addr || addr.length < 12) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}
