type MetricCardProps = {
  label: string;
  value: string | number;
};

const MetricCard = ({ label, value }: MetricCardProps) => {
  return (
    <article className="rounded-[10px] bg-dockit-secondary p-4">
      <p className="text-[13px] leading-5 text-dockit-muted">{label}</p>
      <p className="mt-2 text-[28px] font-medium leading-none text-dockit-heading">
        {value}
      </p>
    </article>
  );
};

export default MetricCard;
