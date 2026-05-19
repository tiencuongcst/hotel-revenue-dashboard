type Props = {
  label: string;
  value: string | number;
  subValue?: string;
};

export function KpiCard({ label, value, subValue }: Props) {
  return (
    <div className='kpi-card'>
      <p className='kpi-label'>{label}</p>
      <p className='kpi-value'>{value}</p>

      {subValue ? (
        <p className='mt-1 text-xs text-[#6c757d]'>
          {subValue}
        </p>
      ) : null}
    </div>
  );
}
