interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  name: string;
  value: string;
  options: Option[];
  required?: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function FormSelect({
  label,
  name,
  value,
  options,
  required = false,
  error,
  onChange
}: Props) {
  return (
    <div>
      <label className="mb-1 block font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <select
        className={`app-input ${error ? "border-red-500" : ""}`}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1 text-sm font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormSelect;