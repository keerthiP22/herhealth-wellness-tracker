type Props = {
  title: string;
  value: string;
};

export default function WellnessCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-3 text-gray-800">
        {value}
      </p>
    </div>
  );
}