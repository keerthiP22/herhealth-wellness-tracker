type Props = {
  insights: string[];
};

export default function InsightCard({
  insights,
}: Props) {
  return (
    <div className="bg-gradient-to-r from-pink-100 to-rose-50 rounded-[2rem] p-8 shadow-sm border border-pink-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">
          ✨
        </div>

        <h2 className="text-2xl font-bold text-pink-700">
          Personalized Insights
        </h2>
      </div>

      <div className="space-y-4">
        {insights.map(
          (insight, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 shadow-sm"
            >
              <p className="text-gray-700 leading-relaxed">
                {insight}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}