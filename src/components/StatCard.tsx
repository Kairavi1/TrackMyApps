type StatCardProps = {
  title: string;
  value: number;
  valueColor?: string;
};

export default function StatCard({
  title,
  value,
  valueColor = "text-[#3d3d3a]",
}: Readonly<StatCardProps>) {
  return (
    <div className="bg-[#f5f4ed] rounded-xl p-5">
      <h3 className="text-md text-[#3d3d3a]/70">{title}</h3>

      <p className={`text-4xl font-bold mt-1 ${valueColor}`}>{value}</p>
    </div>
  );
}
