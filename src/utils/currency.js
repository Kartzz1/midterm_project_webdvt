/**
 * Centralized currency formatting utility for Philippine Peso.
 * Keeping this in one place means every page/component formats
 * money the exact same way, and we only fix it in one spot if
 * requirements change.
 */
const formatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  currencyDisplay: "symbol",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Formats a number into a Philippine Peso string, e.g. ₱1,500.00
 * Falls back gracefully for invalid/undefined input.
 */
export function formatCurrency(amount) {
  const value = Number(amount);
  if (Number.isNaN(value)) return "₱0.00";

  // Intl gives us "PHP1,500.00" in some environments instead of "₱1,500.00"
  // so we normalize it to guarantee the peso glyph is used.
  const formatted = formatter.format(value);
  return formatted.replace(/^PHP/, "₱").replace(/^\s*PHP\s*/, "₱");
}

export default formatCurrency;
