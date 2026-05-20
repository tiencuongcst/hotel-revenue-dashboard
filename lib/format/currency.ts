export function formatCurrency(
  value?: number | null
) {
  if (value == null) {
    return "-";
  }

  return Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}