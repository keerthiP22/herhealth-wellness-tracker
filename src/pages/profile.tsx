import { useEffect, useState } from "react";

import Navbar from "../components/layout/navbar";

import { getWellnessLogs } from "../services/api";

import { generateInsights } from "../utils/insightEngine";

export default function Profile() {
  const [logs, setLogs] =
    useState<any[]>([]);

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
      : "0";

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
      : "0";

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
      : "0";

  const symptomCounts:
    Record<string, number> =
    {};

  logs.forEach((log) => {
    log.symptoms?.forEach(
      (symptom: string) => {
        symptomCounts[
          symptom
        ] =
          (symptomCounts[
            symptom
          ] || 0) + 1;
      }
    );
  });

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
      : "None";

  const latestLog =
    logs.length > 0
      ? logs[
          logs.length - 1
        ]
      : null;

  const insights =
    generateInsights(logs);

  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        {/* Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center text-4xl">
              🌸
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                HerHealth User
              </h1>

              <p className="text-gray-500">
                Wellness Profile
              </p>
            </div>

          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <h3 className="text-gray-500">
              Total Logs
            </h3>

            <p className="text-3xl font-bold text-pink-500 mt-2">
              {totalLogs}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <h3 className="text-gray-500">
              Avg Sleep
            </h3>

            <p className="text-3xl font-bold text-pink-500 mt-2">
              {averageSleep} hrs
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <h3 className="text-gray-500">
              Avg Stress
            </h3>

            <p className="text-3xl font-bold text-pink-500 mt-2">
              {averageStress}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <h3 className="text-gray-500">
              Avg Pain
            </h3>

            <p className="text-3xl font-bold text-pink-500 mt-2">
              {averagePain}
            </p>
          </div>

        </div>

        {/* Symptom */}
        <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">

          <h2 className="text-xl font-bold text-gray-800 mb-3">
            Most Common Symptom
          </h2>

          <p className="text-2xl text-pink-500 font-semibold">
            {mostCommonSymptom}
          </p>

        </div>

        {/* Latest Entry */}
        {latestLog && (
          <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">

            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Latest Wellness Entry
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

              <div>
                <p className="text-gray-400">
                  Mood
                </p>

                <p className="font-semibold">
                  {latestLog.mood}
                </p>
              </div>

              <div>
                <p className="text-gray-400">
                  Sleep
                </p>

                <p className="font-semibold">
                  {
                    latestLog.sleepHours
                  }{" "}
                  hrs
                </p>
              </div>

              <div>
                <p className="text-gray-400">
                  Stress
                </p>

                <p className="font-semibold">
                  {
                    latestLog.stressLevel
                  }
                </p>
              </div>

              <div>
                <p className="text-gray-400">
                  Pain
                </p>

                <p className="font-semibold">
                  {
                    latestLog.painLevel
                  }
                </p>
              </div>

              <div>
                <p className="text-gray-400">
                  Cycle
                </p>

                <p className="font-semibold">
                  {
                    latestLog.cyclePhase
                  }
                </p>
              </div>

              <div>
                <p className="text-gray-400">
                  Date
                </p>

                <p className="font-semibold">
                  {latestLog.date}
                </p>
              </div>

            </div>

          </div>
        )}

        {/* Insights */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">

          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Personalized Insights
          </h2>

          <div className="space-y-4">

            {insights.map(
              (
                insight,
                index
              ) => (
                <div
                  key={index}
                  className="bg-pink-50 rounded-2xl p-4 text-gray-700"
                >
                  {insight}
                </div>
              )
            )}

          </div>

        </div>

      </div>
    </div>
  );
}