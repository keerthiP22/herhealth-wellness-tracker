import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Log = {
  date: string;
  sleepHours: number;
};

type Props = {
  logs: Log[];
};

export default function SleepChart({ logs }: Props) {
  const data = logs
    .slice(-14)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((log) => ({
      date: log.date.slice(5),   // "05-22"
      sleep: log.sleepHours,
    }));

  return (
    <div className="bg-white rounded-[2rem] shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-1">
        Sleep Trend
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Hours of sleep over your last 14 logs
      </p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
            />
            <YAxis
              domain={[0, 12]}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "1rem",
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            />
            <Line
              type="monotone"
              dataKey="sleep"
              stroke="#a78bfa"
              strokeWidth={3}
              dot={{ fill: "#a78bfa", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}