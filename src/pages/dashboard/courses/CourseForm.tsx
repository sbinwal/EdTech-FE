import { useEffect, useState } from "react";

import API from "../../../api/axios";
import FormInput from "../../../components/form/FormInput";
import FormSelect from "../../../components/form/FormSelect";
import FormTextarea from "../../../components/form/FormTextarea";

interface Category {
  _id: string;
  name: string;
}

export interface CourseFormData {
  title: string;
  category: string;
  classLevel: string;
  fees: string;
  description: string;
}

interface FormErrors {
  title?: string;
  category?: string;
  classLevel?: string;
  fees?: string;
  description?: string;
}

interface Props {
  initialData?: CourseFormData;
  isEdit?: boolean;
  onSubmit: (data: CourseFormData) => Promise<void>;
}

const emptyForm: CourseFormData = {
  title: "",
  category: "",
  classLevel: "",
  fees: "",
  description: ""
};

function CourseForm({ initialData, isEdit = false, onSubmit }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<CourseFormData>(
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

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await API.get("/categories");
    const data = res.data.categories || res.data;

    setCategories(
      data.filter((item: any) => item.status !== "inactive")
    );
  };

  const validateField = (
    name: keyof CourseFormData,
    value: string
  ) => {
    switch (name) {
      case "title":
        if (!value.trim()) return "Course title is required";
        if (value.trim().length < 3)
          return "Course title should be at least 3 characters";
        return "";

      case "category":
        if (!value) return "Category is required";
        return "";

      case "classLevel":
        if (!value.trim()) return "Class level is required";
        return "";

      case "fees":
        if (!value.trim()) return "Monthly fee is required";
        if (Number(value) <= 0) return "Monthly fee should be greater than 0";
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

  const getError = (field: keyof CourseFormData) => {
    return submitted || touched[field] ? errors[field] : "";
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      const field = key as keyof CourseFormData;
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
    const field = e.target.name as keyof CourseFormData;
    const value = e.target.value;

    if (field === "fees") {
      const onlyNumbers = value.replace(/\D/g, "");

      setFormData((prev) => ({
        ...prev,
        fees: onlyNumbers
      }));

      setTouched((prev) => ({
        ...prev,
        fees: true
      }));

      setErrors((prev) => ({
        ...prev,
        fees: validateField("fees", onlyNumbers)
      }));

      return;
    }

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

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const field = e.target.name as keyof CourseFormData;
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
    const field = e.target.name as keyof CourseFormData;
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
          {isEdit ? "Edit Course" : "Add Course"}
        </h1>

        <p className="app-muted mt-3">
          {isEdit
            ? "Update course information."
            : "Create a new course under selected category."}
        </p>
      </div>

      <div className="app-card max-w-4xl p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormInput
            label="Course Title"
            name="title"
            placeholder="Class 6 Sainik School Foundation"
            value={formData.title}
            onChange={handleInputChange}
            required
            error={getError("title")}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormSelect
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleSelectChange}
              required
              error={getError("category")}
              options={categories.map((category) => ({
                label: category.name,
                value: category._id
              }))}
            />

            <FormInput
              label="Class Level"
              name="classLevel"
              placeholder="6"
              value={formData.classLevel}
              onChange={handleInputChange}
              required
              error={getError("classLevel")}
            />
          </div>

          <FormInput
            label="Monthly Fee"
            name="fees"
            placeholder="1500"
            value={formData.fees}
            onChange={handleInputChange}
            required
            error={getError("fees")}
          />

          <FormTextarea
            label="Description"
            name="description"
            placeholder="Complete Sainik School entrance preparation with recorded lectures and tests."
            value={formData.description}
            onChange={handleTextareaChange}
            required
            error={getError("description")}
          />

          <button
            type="submit"
            className="app-button-primary w-full py-3"
          >
            {isEdit ? "Update Course" : "Add Course"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CourseForm;