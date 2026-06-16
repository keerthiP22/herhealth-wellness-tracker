import Navbar from "../components/layout/navbar";
import WellnessCard from "../components/dashboard/wellnessCard";
import InsightCard from "../components/dashboard/insightCard";
import SleepChart from "../components/dashboard/sleepChart";
import MoodChart from "../components/dashboard/moodChart";
import SymptomChart from "../components/dashboard/symptomChart";
import { useEffect, useState } from "react";

import {
  getWellnessLogs,
} from "../services/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { generateInsights } from "../utils/insightEngine";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

type WellnessLog = {
  date: string;
  mood: string;
  sleepHours: number;
  stressLevel: number;
  painLevel: number;
  symptoms: string[];
  cyclePhase: string;
};

const [logs, setLogs] =
  useState<WellnessLog[]>([]);

useEffect(() => {
  const fetchLogs =
    async () => {
      const data =
        await getWellnessLogs();

      if (data) {
        setLogs(data);
      }
    };

  fetchLogs();
}, []);

const totalLogs =
  logs.length;
const latestLog =
  logs[logs.length - 1];
const averageSleep =
  logs.length > 0
    ? (
        logs.reduce(
          (acc, log) =>
            acc +
            log.sleepHours,
          0
        ) / logs.length
      ).toFixed(1)
    : null;

const averageStress =
  logs.length > 0
    ? (
        logs.reduce(
          (acc, log) =>
            acc +
            log.stressLevel,
          0
        ) / logs.length
      ).toFixed(1)
    : null;

const averagePain =
  logs.length > 0
    ? (
        logs.reduce(
          (acc, log) =>
            acc +
            log.painLevel,
          0
        ) / logs.length
      ).toFixed(1)
    : null;

const insights =
  generateInsights(logs);

const symptomCounts:
  Record<
    string,
    number
  > = {};

logs.forEach((log) => {
  log.symptoms.forEach(
    (symptom) => {
      symptomCounts[
        symptom
      ] =
        (
          symptomCounts[
            symptom
          ] || 0
        ) + 1;
    }
  );
});
const wellnessScore =
  latestLog
    ? Math.max(
        0,
        Math.min(
          100,

          100 -

          latestLog.stressLevel * 4 -

          latestLog.painLevel * 4 +

          latestLog.sleepHours * 3
        )
      )
    : 0;

const mostCommonSymptom =
  Object.keys(
    symptomCounts
  ).length > 0
    ? Object.entries(
        symptomCounts
      ).sort(
        (a, b) =>
          b[1] - a[1]
      )[0][0]
    : "No Symptoms";

const stressChartData =
  logs
    .slice(-14)
    .sort((a, b) =>
      a.date.localeCompare(
        b.date
      )
    )
    .map((log) => ({
      date:
        log.date.slice(
          5
        ),
      stress:
        log.stressLevel,
    }));
  // ── empty state ──────────────────────────────────────
  if (logs.length === 0) {
    return (
      <div className="min-h-screen bg-pink-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-8">
          <div className="text-6xl mb-6">🌸</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Welcome to HerHealth
          </h1>
          <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
            Start tracking your wellness to see personalised insights, trends,
            and patterns appear here.
          </p>
          <button
            onClick={() => navigate("/add-entry")}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-2xl font-semibold transition"
          >
            Log Your First Entry
          </button>
        </div>
      </div>
    );
  }

  // ── dashboard ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar />

      <div className="p-8 max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome Back 👋
          </h1>
          <p className="text-gray-500 mt-2">
            Here's your wellness overview
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <WellnessCard
            title="Average Sleep"
            value={averageSleep ? `${averageSleep} hrs` : "—"}
          />
          <WellnessCard
            title="Stress Level"
            value={averageStress ? `${averageStress}/10` : "—"}
          />
          <WellnessCard
            title="Pain Level"
            value={averagePain ? `${averagePain}/10` : "—"}
          />
          <WellnessCard
  title="Wellness Score"
  value={`${wellnessScore}/100`}
/>

          <WellnessCard
  title="Total Logs"
  value={totalLogs.toString()}
/>
<WellnessCard
  title="Top Symptom"
  value={mostCommonSymptom}
/>
        </div>

        {/* Insight */}
        <div className="mb-8">
          <InsightCard insights={insights} />
        </div>

        {/* Charts — 2 column grid on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          {/* Stress trend — your original chart, kept intact */}
          <div className="bg-white rounded-[2rem] shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-1">
              Stress Trend
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Stress levels over your last 14 logs
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stressChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#9ca3af" }} />
                  <YAxis domain={[1, 10]} tick={{ fontSize: 12, fill: "#9ca3af" }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "1rem",
                      border: "none",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="stress"
                    stroke="#ec4899"
                    strokeWidth={3}
                    dot={{ fill: "#ec4899", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <SleepChart logs={logs} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MoodChart logs={logs} />
          <SymptomChart logs={logs} />
        </div>

      </div>
    </div>
  );
}