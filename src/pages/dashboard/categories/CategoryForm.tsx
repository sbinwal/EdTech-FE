import { useEffect, useState } from "react";

import FormInput from "../../../components/form/FormInput";
import FormTextarea from "../../../components/form/FormTextarea";

export interface CategoryFormData {
  name: string;
  description: string;
}

interface FormErrors {
  name?: string;
  description?: string;
}

interface Props {
  initialData?: CategoryFormData;
  isEdit?: boolean;
  onSubmit: (data: CategoryFormData) => Promise<void>;
}

const emptyForm: CategoryFormData = {
  name: "",
  description: ""
};

function CategoryForm({ initialData, isEdit = false, onSubmit }: Props) {
  const [formData, setFormData] = useState<CategoryFormData>(
    initialData || emptyForm
  );

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validateField = (
    name: keyof CategoryFormData,
    value: string
  ) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Category name is required";
        if (value.trim().length < 3)
          return "Category name should be at least 3 characters";
        return "";

      case "description":
        if (!value.trim()) return "Description is required";
        if (value.trim().length < 10)
          return "Description should be at least 10 characters";
        return "";

      default:
        return "";
    }
  };

  const getError = (field: keyof CategoryFormData) => {
    return submitted || touched[field] ? errors[field] : "";
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      const field = key as keyof CategoryFormData;
      const error = validateField(field, formData[field]);

      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const field = e.target.name as keyof CategoryFormData;
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

  const handleTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const field = e.target.name as keyof CategoryFormData;
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
          {isEdit ? "Edit Category" : "Add Category"}
        </h1>

        <p className="app-muted mt-3">
          {isEdit
            ? "Update category details."
            : "Create a new course category."}
        </p>
      </div>

      <div className="app-card max-w-3xl p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormInput
            label="Category Name"
            name="name"
            value={formData.name}
            placeholder="Sainik School"
            onChange={handleInputChange}
            required
            error={getError("name")}
          />

          <FormTextarea
            label="Description"
            name="description"
            value={formData.description}
            placeholder="Preparation courses for Sainik School entrance examination."
            onChange={handleTextareaChange}
            required
            error={getError("description")}
          />

          <button
            type="submit"
            className="app-button-primary w-full py-3"
          >
            {isEdit ? "Update Category" : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CategoryForm;