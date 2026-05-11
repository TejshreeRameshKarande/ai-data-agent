import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Charts({ analysis }) {
  if (!analysis?.mean) return null;

  const data = Object.entries(analysis.mean).map(([key, value]) => ({
    name: key,
    value: Number(value.toFixed(2)),
  }));

  const COLORS = ["#3B82F6", "#8B5CF6", "#22C55E", "#F59E0B"];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

      {/* BAR CHART */}
      <div className="bg-[var(--card-bg)] p-8 rounded-3xl border border-slate-800">
        <h2 className="text-2xl font-bold mb-6">
          📊 Average Values
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PIE CHART */}
      <div className="bg-[var(--card-bg)] p-8 rounded-3xl border border-slate-800">
        <h2 className="text-2xl font-bold mb-6">
          🥧 Distribution
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={120}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Charts;