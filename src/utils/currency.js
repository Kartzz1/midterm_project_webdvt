const CURRENCY_FORMATTER = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  currencyDisplay: "symbol",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const PESO_SYMBOL = "₱";

export function formatCurrency(amount) {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return `${PESO_SYMBOL}0.00`;
  }

  const formatted = CURRENCY_FORMATTER.format(value);

  // Some environments may return "PHP" instead of the peso symbol.
  return formatted.replace(/^PHP\s?/, PESO_SYMBOL);
}

export default formatCurrency;
