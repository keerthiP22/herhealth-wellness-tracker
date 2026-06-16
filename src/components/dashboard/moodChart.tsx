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
  mood: string;
};

type Props = {
  logs: Log[];
};

// maps mood string → number for the Y axis
const MOOD_SCORE: Record<string, number> = {
  Happy: 5,
  Neutral: 3,
  Sad: 1,
  Anxious: 2,
  Irritated: 2,
};

// maps number back → label for the Y axis ticks
const SCORE_LABEL: Record<number, string> = {
  5: "Happy",
  3: "Neutral",
  2: "Low",
  1: "Sad",
};

// custom tooltip so it shows "Happy" not "5"
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  const score = payload[0].value;
  const mood = Object.entries(MOOD_SCORE).find(
    ([, v]) => v === score
  )?.[0] ?? score;

  return (
    <div
      style={{
        background: "white",
        borderRadius: "1rem",
        padding: "8px 14px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        fontSize: 13,
      }}
    >
      <p style={{ color: "#6b7280" }}>{label}</p>
      <p style={{ color: "#ec4899", fontWeight: 600 }}>{String(mood)}</p>
    </div>
  );
};

export default function MoodChart({ logs }: Props) {
  const data = logs
    .slice(-14)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((log) => ({
      date: log.date.slice(5),
      mood: MOOD_SCORE[log.mood] ?? 3,
    }));

  return (
    <div className="bg-white rounded-[2rem] shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-1">
        Mood Trend
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        How your mood has shifted over your last 14 logs
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
              domain={[1, 5]}
              ticks={[1, 2, 3, 5]}
              tickFormatter={(v: number) => SCORE_LABEL[v] ?? ""}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              width={52}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#ec4899"
              strokeWidth={3}
              dot={{ fill: "#ec4899", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}