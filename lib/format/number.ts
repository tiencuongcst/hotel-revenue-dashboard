export function formatNumber(
  value: number | string | null | undefined,
  maximumFractionDigits = 0
) {
  return Number(value ?? 0).toLocaleString(undefined, {
    maximumFractionDigits,
  });
}

export function formatPercent(
  value: number | string | null | undefined,
  maximumFractionDigits = 1
) {
  return `${Number(value ?? 0).toFixed(maximumFractionDigits)}%`;
}

export function formatCurrency(
  value: number | string | null | undefined,
  maximumFractionDigits = 0
) {
  return Number(value ?? 0).toLocaleString(undefined, {
    maximumFractionDigits,
  });
}
