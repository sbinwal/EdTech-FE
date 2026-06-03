interface Props {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function FormTextarea({
  label,
  name,
  value,
  placeholder,
  required = false,
  error,
  onChange
}: Props) {
  return (
    <div>
      <label className="mb-1 block font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <textarea
        className={`app-input min-h-[120px] resize-none ${
          error ? "border-red-500" : ""
        }`}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      {error && (
        <p className="mt-1 text-sm font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormTextarea;