type Props = {
  log: {
    id: number;
    date: string;
    mood: string;
    sleepHours: number;
    stressLevel: number;
    painLevel: number;
    symptoms: string[];
  };
  onDelete: (id: number) => void;
  onEdit: (log: any) => void;
};

export default function HistoryCard({
  log,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div className="bg-white rounded-[2rem] shadow-sm p-6 hover:shadow-md transition">
      <div className="flex justify-between items-start">

        {/* Left Content */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800">
            {log.date}
          </h2>

          <div className="grid md:grid-cols-2 gap-y-2 mt-4 text-gray-600">
            <p>
              <span className="font-medium">
                Mood:
              </span>{" "}
              {log.mood}
            </p>

            <p>
              <span className="font-medium">
                Sleep:
              </span>{" "}
              {log.sleepHours} hrs
            </p>

            <p>
              <span className="font-medium">
                Stress:
              </span>{" "}
              {log.stressLevel}/10
            </p>

            <p>
              <span className="font-medium">
                Pain:
              </span>{" "}
              {log.painLevel}/10
            </p>
          </div>

          {/* Symptoms */}
          <div className="mt-5">
            <p className="text-sm font-semibold text-gray-500 mb-3">
              Symptoms
            </p>

            <div className="flex flex-wrap gap-2">
              {log.symptoms.length > 0 ? (
                log.symptoms.map(
                  (symptom) => (
                    <span
                      key={symptom}
                      className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {symptom}
                    </span>
                  )
                )
              ) : (
                <span className="text-gray-400 text-sm">
                  No symptoms logged
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 ml-6">
          <button
            onClick={() => onEdit(log)}
            className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-xl transition"
          >
            Edit
          </button>

          <button
            onClick={() =>
              onDelete(log.id)
            }
            className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-xl transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}