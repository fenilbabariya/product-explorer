"use client";

const SortDropdown = ({ label, value, options, onChange }) => {
  return (
    <label className="flex flex-col gap-1 text-sm text-gray-700">
      <span>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SortDropdown;
