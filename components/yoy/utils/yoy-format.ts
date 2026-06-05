export function formatYoyPercent(
  value: number | null
): string {
  if (value === null || value === undefined) {
    return "-";
  }

  return `${(value * 100).toFixed(1)}%`;
}

export function formatYoyMoney(
  value: number | null
): string {
  if (value === null || value === undefined) {
    return "-";
  }

  if (Math.abs(value) >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  }

  if (Math.abs(value) >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }

  return value.toLocaleString("en-US");
}
