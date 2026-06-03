import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import API from "../../../src/api/axios";
import FormInput from "../../../src/components/form/FormInput";
import FormSelect from "../../../src/components/form/FormSelect";
import FormPhoneInput from "../../../src/components/form/FormPhoneInput";

interface Course {
  _id: string;
  title: string;
  classLevel: string;
}

export interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone: string;
  parentName: string;
  parentPhone: string;
  address: string;
  course: string;
}

interface Props {
  initialData?: StudentFormData;
  isEdit?: boolean;
  onSubmit: (data: StudentFormData) => Promise<void>;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  parentName?: string;
  parentPhone?: string;
  address?: string;
  course?: string;
}

const emptyForm: StudentFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  parentName: "",
  parentPhone: "",
  address: "",
  course: ""
};

function StudentForm({ initialData, isEdit = false, onSubmit }: Props) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [formData, setFormData] = useState<StudentFormData>(
    initialData || emptyForm
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await API.get("/courses");
    setCourses(res.data);
  };

  const validateField = (name: keyof StudentFormData, value: string = "") => {
    const nameRegex = /^[A-Za-z]{2,}$/;
    const parentNameRegex = /^[A-Za-z ]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const indianMobileRegex = /^\+91[6-9]\d{9}$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        if (!nameRegex.test(value.trim()))
          return "First name should contain only letters and minimum 2 characters";
        return "";

      case "lastName":
        if (!value.trim()) return "Last name is required";
        if (!nameRegex.test(value.trim()))
          return "Last name should contain only letters and minimum 2 characters";
        return "";

      case "email":
        if (!value.trim()) return "Email is required";
        if (!emailRegex.test(value)) return "Enter a valid email address";
        return "";

      case "password":
        if (isEdit && !value.trim()) return "";
        if (!value.trim()) return "Password is required";
        if (!passwordRegex.test(value))
          return "Password must have uppercase, lowercase, number, special character and minimum 8 characters";
        return "";

      case "phone":
        if (!value || value === "+91") return "Student mobile number is required";
        if (!indianMobileRegex.test(value))
          return "Enter valid Indian student mobile number";
        return "";

      case "parentName":
        if (!value.trim()) return "Parent name is required";
        if (!parentNameRegex.test(value.trim()))
          return "Parent name should contain only letters";
        return "";

      case "parentPhone":
        if (!value || value === "+91") return "Parent mobile number is required";
        if (!indianMobileRegex.test(value))
          return "Enter valid Indian parent mobile number";
        return "";

      case "address":
        if (!value.trim()) return "Address is required";
        if (value.trim().length < 5)
          return "Address should be at least 5 characters";
        return "";

      case "course":
        if (!value) return "Course is required";
        return "";

      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      const field = key as keyof StudentFormData;
      const error = validateField(field, formData[field] || "");

      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const getError = (field: keyof StudentFormData) => {
    return submitted || touched[field] ? errors[field] : "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const field = e.target.name as keyof StudentFormData;
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));

    setTouched((prev) => ({
      ...prev,
      [field]: true
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, value)
    }));
  };

  const handlePhoneChange = (
    field: "phone" | "parentPhone",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));

    if (value && value !== "+91") {
      setTouched((prev) => ({
        ...prev,
        [field]: true
      }));

      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, value)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validateForm()) return;

    await onSubmit(formData);
  };

  return (
    <div>
      <div className="mb-8">
        <span className="text-sm font-extrabold uppercase tracking-wider text-[var(--color-primary)]">
          Admin
        </span>

        <h1 className="app-heading mt-2 text-3xl md:text-4xl">
          {isEdit ? "Edit Student" : "Add Student"}
        </h1>

        <p className="app-muted mt-3">
          {isEdit
            ? "Update student details and assigned course."
            : "Create student login account and assign course."}
        </p>
      </div>

      <div className="app-card max-w-4xl p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormInput
              label="First Name"
              name="firstName"
              placeholder="Rahul"
              value={formData.firstName}
              onChange={handleChange}
              required
              error={getError("firstName")}
            />

            <FormInput
              label="Last Name"
              name="lastName"
              placeholder="Sharma"
              value={formData.lastName}
              onChange={handleChange}
              required
              error={getError("lastName")}
            />
          </div>

          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="rahul@example.com"
            value={formData.email}
            disabled={isEdit}
            onChange={handleChange}
            required
            error={getError("email")}
          />

          {!isEdit && (
  <FormInput
    label="Password"
    name="password"
    type={showPassword ? "text" : "password"}
    placeholder="Example@123"
    value={formData.password || ""}
    onChange={handleChange}
    required
    error={getError("password")}
    rightIcon={
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    }
  />
)}

          <FormPhoneInput
            label="Student Mobile Number"
            value={formData.phone}
            onChange={(phone) => handlePhoneChange("phone", phone)}
            required
            error={getError("phone")}
          />

          <FormInput
            label="Parent Name"
            name="parentName"
            placeholder="Ramesh Sharma"
            value={formData.parentName}
            onChange={handleChange}
            required
            error={getError("parentName")}
          />

          <FormPhoneInput
            label="Parent Mobile Number"
            value={formData.parentPhone}
            onChange={(phone) => handlePhoneChange("parentPhone", phone)}
            required
            error={getError("parentPhone")}
          />

          <FormInput
            label="Address"
            name="address"
            placeholder="Haldwani, Uttarakhand"
            value={formData.address}
            onChange={handleChange}
            required
            error={getError("address")}
          />

          <FormSelect
            label="Course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
            error={getError("course")}
            options={courses.map((course) => ({
              label: `${course.title} - Class ${course.classLevel}`,
              value: course._id
            }))}
          />

          <button type="submit" className="app-button-primary w-full py-3">
            {isEdit ? "Update Student" : "Add Student"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;