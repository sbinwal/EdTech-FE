import { type ReactNode } from "react";

interface Props {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  rightIcon?: ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormInput({
  label,
  name,
  value,
  placeholder,
  type = "text",
  required = false,
  error,
  rightIcon,
  onChange
}: Props) {
  return (
    <div>
      <label className="mb-1 block font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          className={`app-input ${rightIcon ? "pr-12" : ""} ${
            error ? "border-red-500" : ""
          }`}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormInput;