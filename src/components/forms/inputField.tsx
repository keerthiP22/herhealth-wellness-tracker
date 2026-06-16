type Props = {
  label: string;
  type?: string;
  placeholder?: string;
};

export default function InputField({
  label,
  type = "text",
  placeholder,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="border border-gray-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-pink-300"
      />
    </div>
  );
}