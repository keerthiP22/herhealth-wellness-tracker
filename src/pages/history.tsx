import Navbar from "../components/layout/navbar";
import HistoryCard from "../components/dashboard/historyCard";
import { useEffect, useState } from "react";
import {
  getWellnessLogs,
  updateWellnessLog,
  deleteWellnessLog
} from "../services/api";

type WellnessLog = {
  id: number;
  date: string;
  cyclePhase: string;
  mood: string;
  sleepHours: number;
  stressLevel: number;
  painLevel: number;
  symptoms: string[];
};

const SYMPTOM_OPTIONS = [
  "Cramps",
  "Fatigue",
  "Bloating",
  "Acne",
  "Headache",
  "Mood Swings",
];

export default function History() {
  const [editingLog, setEditingLog] =
    useState<WellnessLog | null>(null);

  const [awsLogs, setAwsLogs] =
    useState<WellnessLog[]>([]);

  const [editedData, setEditedData] =
    useState({
      mood: "",
      sleepHours: 0,
      stressLevel: 0,
      painLevel: 0,
      symptoms: [] as string[],
      cyclePhase: "",
    });

  // Fetch logs from AWS
  const fetchLogs =
  async () => {
    const data =
      await getWellnessLogs();

    if (data) {
      setAwsLogs(data);
    }
  };

useEffect(() => {
  fetchLogs();
}, []);
  // Delete locally for now
 const handleDelete =
  async (
    log: WellnessLog
  ) => {
    await deleteWellnessLog(
      "keerthi123",
      log.date
    );

    setAwsLogs((prev) =>
      prev.filter(
        (item) =>
          item.date !==
          log.date
      )
    );
  };

  // Open edit modal
  const handleEdit = (
    log: WellnessLog
  ) => {
    setEditingLog(log);

    setEditedData({
      mood: log.mood,
      sleepHours:
        log.sleepHours,
      stressLevel:
        log.stressLevel,
      painLevel:
        log.painLevel,
      symptoms: [
        ...log.symptoms,
      ],
      cyclePhase:
        log.cyclePhase,
    });
  };

  // Toggle symptoms
  const handleSymptomToggle =
    (symptom: string) => {
      setEditedData(
        (prev) => ({
          ...prev,
          symptoms:
            prev.symptoms.includes(
              symptom
            )
              ? prev.symptoms.filter(
                  (s) =>
                    s !== symptom
                )
              : [
                  ...prev.symptoms,
                  symptom,
                ],
        })
      );
    };

  // Save edit
  const handleSave =
  async () => {
    if (!editingLog)
      return;

    const updatedLog = {
      ...editingLog,
      ...editedData,
    };

    // update AWS
    await updateWellnessLog({
      userId:
        "keerthi123",
      date:
        editingLog.date,
      mood:
        editedData.mood,
      sleepHours:
        editedData.sleepHours,
      stressLevel:
        editedData.stressLevel,
      painLevel:
        editedData.painLevel,
      cyclePhase:
        editedData.cyclePhase,
      symptoms:
        editedData.symptoms,
    });

    // update UI instantly
    setAwsLogs((prev) =>
      prev.map((log) =>
        log.date ===
        editingLog.date
          ? updatedLog
          : log
      )
    );

    setEditingLog(null);
  };
  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar />

      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Wellness History
        </h1>

        <p className="text-gray-500 mb-8">
          Track and review
          past wellness logs
        </p>

        {/* Edit Modal */}
        {editingLog && (
          <div className="bg-white rounded-[2rem] shadow-lg p-8 mb-8 border border-pink-100">

            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Edit Wellness
                  Entry
                </h2>

                <p className="text-gray-500 mt-1">
                  {
                    editingLog.date
                  }
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingLog(
                    null
                  )
                }
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-5">

              {/* Mood */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Mood
                </label>

                <select
                  value={
                    editedData.mood
                  }
                  onChange={(
                    e
                  ) =>
                    setEditedData({
                      ...editedData,
                      mood:
                        e.target
                          .value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-2xl p-4"
                >
                  <option>
                    Happy
                  </option>
                  <option>
                    Neutral
                  </option>
                  <option>
                    Sad
                  </option>
                  <option>
                    Anxious
                  </option>
                  <option>
                    Irritated
                  </option>
                </select>
              </div>

              {/* Sleep */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Sleep Hours
                </label>

                <input
                  type="number"
                  value={
                    editedData.sleepHours
                  }
                  onChange={(
                    e
                  ) =>
                    setEditedData({
                      ...editedData,
                      sleepHours:
                        Number(
                          e
                            .target
                            .value
                        ),
                    })
                  }
                  className="w-full border border-gray-200 rounded-2xl p-4"
                />
              </div>

              {/* Stress */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Stress Level
                </label>

                <input
                  type="number"
                  value={
                    editedData.stressLevel
                  }
                  onChange={(
                    e
                  ) =>
                    setEditedData({
                      ...editedData,
                      stressLevel:
                        Number(
                          e
                            .target
                            .value
                        ),
                    })
                  }
                  className="w-full border border-gray-200 rounded-2xl p-4"
                />
              </div>

              {/* Pain */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Pain Level
                </label>

                <input
                  type="number"
                  value={
                    editedData.painLevel
                  }
                  onChange={(
                    e
                  ) =>
                    setEditedData({
                      ...editedData,
                      painLevel:
                        Number(
                          e
                            .target
                            .value
                        ),
                    })
                  }
                  className="w-full border border-gray-200 rounded-2xl p-4"
                />
              </div>

              {/* Symptoms */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-600 mb-3">
                  Symptoms
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {SYMPTOM_OPTIONS.map(
                    (
                      symptom
                    ) => (
                      <label
                        key={
                          symptom
                        }
                        className="flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={editedData.symptoms.includes(
                            symptom
                          )}
                          onChange={() =>
                            handleSymptomToggle(
                              symptom
                            )
                          }
                        />

                        {
                          symptom
                        }
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() =>
                  setEditingLog(
                    null
                  )
                }
                className="px-6 py-3 rounded-2xl border border-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={
                  handleSave
                }
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-2xl font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* History Cards */}
        <div className="space-y-6">
          {awsLogs.map(
            (log) => (
              <HistoryCard
                key={
                  log.date
                }
                log={log}
                onDelete={() =>
                  handleDelete(
                    log
                  )
                }
                onEdit={() =>
                  handleEdit(
                    log
                  )
                }
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}