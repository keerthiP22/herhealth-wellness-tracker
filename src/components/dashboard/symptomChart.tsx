import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

type Log = {
  symptoms: string[];
};

type Props = {
  logs: Log[];
};

const SYMPTOM_OPTIONS = [
  "Cramps",
  "Fatigue",
  "Bloating",
  "Acne",
  "Headache",
  "Mood Swings",
];

// gives each bar a slightly different pink shade
const BAR_COLORS = [
  "#f9a8d4",
  "#f472b6",
  "#ec4899",
  "#db2777",
  "#be185d",
  "#fbcfe8",
];

export default function SymptomChart({ logs }: Props) {
  const data = SYMPTOM_OPTIONS.map((symptom) => ({
    symptom,
    count: logs.filter((l) => l.symptoms.includes(symptom)).length,
  })).filter((s) => s.count > 0);

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-[2rem] shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-1">
          Symptom Frequency
        </h2>
        <p className="text-sm text-gray-400 mt-2">
          No symptoms logged yet. Add entries to see patterns.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-1">
        Symptom Frequency
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Which symptoms appear most across your logs
      </p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
            <XAxis
              dataKey="symptom"
              tick={{ fontSize: 11, fill: "#9ca3af" }}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "1rem",
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={BAR_COLORS[index % BAR_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}