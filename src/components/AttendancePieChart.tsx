import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface PieData {
  name: string;
  value: number;
  color: string;
}

interface Props {
  title: string;
  data: PieData[];
  activeSlice?: string | null;
  onSliceClick?: (name: string) => void;
}

const RADIAN = Math.PI / 180;

const renderCustomLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, value,
}: any) => {
  if (value === 0) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={600}>
      {value}
    </text>
  );
};

export default function AttendancePieChart({ title, data, activeSlice, onSliceClick }: Props) {
  const filtered = data.filter((d) => d.value > 0);

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-card-foreground mb-4 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={filtered}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={120}
            dataKey="value"
            stroke="none"
            onClick={(_, index) => onSliceClick?.(filtered[index].name)}
            cursor="pointer"
          >
            {filtered.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.color}
                opacity={activeSlice && activeSlice !== entry.name ? 0.3 : 1}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`${value} עובדים`, name]}
            contentStyle={{ direction: "rtl", fontFamily: "Heebo" }}
          />
          <Legend
            wrapperStyle={{ direction: "rtl", fontFamily: "Heebo", fontSize: 13 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
