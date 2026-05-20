export function formatNumber(
  value?: number | null
) {
  if (value == null) {
    return "-";
  }

  return Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(
  value?: number | null
) {
  if (value == null) {
    return "-";
  }

  return `${(value * 100).toFixed(1)}%`;
}