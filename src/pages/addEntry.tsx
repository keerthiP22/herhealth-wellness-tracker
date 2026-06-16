import Navbar from "../components/layout/navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { saveWellnessLog } from "../services/api";

const SYMPTOM_OPTIONS = [
  "Cramps",
  "Fatigue",
  "Bloating",
  "Acne",
  "Headache",
  "Mood Swings",
];

export default function AddEntry() {
  const navigate = useNavigate();

  const [mood, setMood] =
    useState("Happy");

  const [sleepHours,
    setSleepHours] =
    useState(8);

  const [stressLevel,
    setStressLevel] =
    useState(3);

  const [painLevel,
    setPainLevel] =
    useState(2);

  const [cyclePhase,
    setCyclePhase] =
    useState("Before Period");

  const [symptoms,
    setSymptoms] =
    useState<string[]>([]);

  const handleSymptomToggle =
    (symptom: string) => {
      setSymptoms((prev) =>
        prev.includes(symptom)
          ? prev.filter(
              (s) =>
                s !== symptom
            )
          : [
              ...prev,
              symptom,
            ]
      );
    };

  const handleSave =
    async () => {
      await saveWellnessLog({
        userId:
          "keerthi123",

        date:
          new Date()
            .toISOString()
            .split("T")[0],

        mood,
        sleepHours,
        stressLevel,
        painLevel,
        cyclePhase,
        symptoms,
      });

      navigate("/history", {
        state: {
          refresh: true,
        },
      });
    };

  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar />

      <div className="max-w-3xl mx-auto p-8">

        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Daily Wellness Log
        </h1>

        <p className="text-gray-500 mb-8">
          Track your health
          and wellness
        </p>

        <div className="bg-white rounded-[2rem] shadow-sm p-8 space-y-6">

          {/* Mood */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Mood
            </label>

            <select
              value={mood}
              onChange={(e) =>
                setMood(
                  e.target.value
                )
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
              value={sleepHours}
              onChange={(e) =>
                setSleepHours(
                  Number(
                    e.target.value
                  )
                )
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
              value={stressLevel}
              onChange={(e) =>
                setStressLevel(
                  Number(
                    e.target.value
                  )
                )
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
              value={painLevel}
              onChange={(e) =>
                setPainLevel(
                  Number(
                    e.target.value
                  )
                )
              }
              className="w-full border border-gray-200 rounded-2xl p-4"
            />
          </div>

          {/* Cycle Phase */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Cycle Phase
            </label>

            <select
              value={cyclePhase}
              onChange={(e) =>
                setCyclePhase(
                  e.target.value
                )
              }
              className="w-full border border-gray-200 rounded-2xl p-4"
            >
              <option>
                Before Period
              </option>
              <option>
                During Period
              </option>
              <option>
                After Period
              </option>
            </select>
          </div>

          {/* Symptoms */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-3">
              Symptoms
            </label>

            <div className="grid grid-cols-2 gap-3">
              {SYMPTOM_OPTIONS.map(
                (
                  symptom
                ) => (
                  <label
                    key={symptom}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={symptoms.includes(
                        symptom
                      )}
                      onChange={() =>
                        handleSymptomToggle(
                          symptom
                        )
                      }
                    />
                    {symptom}
                  </label>
                )
              )}
            </div>
          </div>

          <button
            onClick={
              handleSave
            }
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-2xl font-semibold transition"
          >
            Save Entry
          </button>
        </div>
      </div>
    </div>
  );
}