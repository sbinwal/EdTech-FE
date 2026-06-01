import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface Props {
  label: string;
  value: string;
  required?: boolean;
  error?: string;
  onChange: (phone: string) => void;
}

function FormPhoneInput({
  label,
  value,
  required = false,
  error,
  onChange
}: Props) {
  return (
    <div>
      <label className="mb-1 block font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <PhoneInput
        defaultCountry="in"
        value={value}
        onChange={onChange}
        className="phone-wrapper"
        inputClassName={`phone-input ${error ? "phone-input-error" : ""}`}
      />

      {error && (
        <p className="mt-1 text-sm font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormPhoneInput;