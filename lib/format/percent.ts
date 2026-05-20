export function formatPercent(
  value?: number | null
) {
  if (value == null) {
    return "-";
  }

  return `${(value * 100).toFixed(1)}%`;
}