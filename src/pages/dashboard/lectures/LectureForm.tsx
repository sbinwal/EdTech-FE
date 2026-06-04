import { useEffect, useState } from "react";

import API from "../../../api/axios";
import FormInput from "../../../components/form/FormInput";
import FormSelect from "../../../components/form/FormSelect";
import FormTextarea from "../../../components/form/FormTextarea";

interface Category {
  _id: string;
  name: string;
  status?: "active" | "inactive";
}

interface Course {
  _id: string;
  title: string;
  classLevel: string;
  status?: "active" | "inactive";
  category?: {
    _id: string;
    name: string;
  };
}

export interface LectureFormData {
  title: string;
  category: string;
  course: string;
  chapterName: string;
  duration: string;
  lectureDate: string;
  description: string;
  videoFile?: File | null;
}

interface FormErrors {
  title?: string;
  category?: string;
  course?: string;
  chapterName?: string;
  duration?: string;
  lectureDate?: string;
  description?: string;
  videoFile?: string;
}

interface Props {
  initialData?: LectureFormData;
  isEdit?: boolean;
  onSubmit: (data: LectureFormData) => Promise<void>;
}

const emptyForm: LectureFormData = {
  title: "",
  category: "",
  course: "",
  chapterName: "",
  duration: "",
  lectureDate: "",
  description: "",
  videoFile: null
};

function LectureForm({ initialData, isEdit = false, onSubmit }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  const [formData, setFormData] = useState<LectureFormData>(
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
    fetchCourses();
  }, []);

  const fetchCategories = async () => {
    const res = await API.get("/categories");
    const data = res.data.categories || res.data;

    setCategories(
      data.filter((item: Category) => item.status !== "inactive")
    );
  };

  const fetchCourses = async () => {
    const res = await API.get("/courses");
    const data = res.data.courses || res.data;

    setCourses(
      data.filter((course: Course) => course.status !== "inactive")
    );
  };

  const validateField = (
    name: keyof LectureFormData,
    value: string
  ) => {
    switch (name) {
      case "title":
        if (!value.trim()) return "Lecture title is required";
        if (value.trim().length < 3)
          return "Lecture title should be at least 3 characters";
        return "";

      case "category":
        if (!value) return "Category is required";
        return "";

      case "course":
        if (!value) return "Course is required";
        return "";

      case "chapterName":
        if (!value.trim()) return "Chapter name is required";
        return "";

      case "duration":
        if (!value.trim()) return "Duration is required";
        if (Number(value) <= 0)
          return "Duration should be greater than 0";
        return "";

      case "lectureDate":
        if (!value) return "Lecture date is required";
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

  const validateVideoFile = (file?: File | null) => {
    if (!isEdit && !file) {
      return "Lecture video is required";
    }

    if (!file) return "";

    const allowedTypes = [
      "video/mp4",
      "video/webm",
      "video/quicktime"
    ];

    if (!allowedTypes.includes(file.type)) {
      return "Only MP4, WEBM or MOV video files are allowed";
    }

    const maxSize = 500 * 1024 * 1024;

    if (file.size > maxSize) {
      return "Video size should be less than 500MB";
    }

    return "";
  };

  const getError = (field: keyof FormErrors) => {
    return submitted || touched[field] ? errors[field] : "";
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      if (key === "videoFile") return;

      const field = key as keyof LectureFormData;
      const error = validateField(field, String(formData[field] || ""));

      if (error) {
        newErrors[field as keyof FormErrors] = error;
      }
    });

    const videoError = validateVideoFile(formData.videoFile);

    if (videoError) {
      newErrors.videoFile = videoError;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const field = e.target.name as keyof LectureFormData;
    let value = e.target.value;

    if (field === "duration") {
      value = value.replace(/\D/g, "");
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
    const field = e.target.name as keyof LectureFormData;
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

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      category: value,
      course: ""
    }));

    setTouched((prev) => ({
      ...prev,
      category: true,
      course: false
    }));

    setErrors((prev) => ({
      ...prev,
      category: validateField("category", value),
      course: ""
    }));
  };

  const handleTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const field = e.target.name as keyof LectureFormData;
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

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setFormData((prev) => ({
      ...prev,
      videoFile: file
    }));

    setTouched((prev) => ({
      ...prev,
      videoFile: true
    }));

    setErrors((prev) => ({
      ...prev,
      videoFile: validateVideoFile(file)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitted(true);

    if (!validateForm()) return;

    await onSubmit(formData);
  };

  const filteredCourses = formData.category
    ? courses.filter(
        (course) => course.category?._id === formData.category
      )
    : [];

  return (
    <div>
      <div className="mb-8">
        <span className="text-sm font-extrabold uppercase tracking-wider text-[var(--color-primary)]">
          Admin
        </span>

        <h1 className="app-heading mt-2 text-3xl md:text-4xl">
          {isEdit ? "Edit Lecture" : "Add Lecture"}
        </h1>

        <p className="app-muted mt-3">
          {isEdit
            ? "Update lecture information."
            : "Create recorded lecture for a course."}
        </p>
      </div>

      <div className="app-card max-w-4xl p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormInput
            label="Lecture Title"
            name="title"
            placeholder="Algebra Basics"
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
              onChange={handleCategoryChange}
              required
              error={getError("category")}
              options={categories.map((category) => ({
                label: category.name,
                value: category._id
              }))}
            />

            <FormSelect
              label="Course"
              name="course"
              value={formData.course}
              onChange={handleSelectChange}
              required
              error={getError("course")}
              options={filteredCourses.map((course) => ({
                label: `${course.title} - Class ${course.classLevel}`,
                value: course._id
              }))}
            />
          </div>

          <FormInput
            label="Chapter Name"
            name="chapterName"
            placeholder="Algebra"
            value={formData.chapterName}
            onChange={handleInputChange}
            required
            error={getError("chapterName")}
          />

          <div>
            <label className="mb-1 block font-semibold">
              Lecture Video {!isEdit && <span className="text-red-500">*</span>}
            </label>

            <input
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={handleVideoChange}
              className={`app-input ${
                getError("videoFile") ? "border-red-500" : ""
              }`}
            />

            {isEdit && (
              <p className="mt-1 text-sm text-[var(--color-muted)]">
                Leave empty if you do not want to change the existing video.
              </p>
            )}

            {getError("videoFile") && (
              <p className="mt-1 text-sm font-medium text-red-500">
                {getError("videoFile")}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput
              label="Duration (minutes)"
              name="duration"
              placeholder="45"
              value={formData.duration}
              onChange={handleInputChange}
              required
              error={getError("duration")}
            />

            <FormInput
              label="Lecture Date"
              name="lectureDate"
              type="date"
              value={formData.lectureDate}
              onChange={handleInputChange}
              required
              error={getError("lectureDate")}
            />
          </div>

          <FormTextarea
            label="Description"
            name="description"
            placeholder="Introduction to algebraic expressions."
            value={formData.description}
            onChange={handleTextareaChange}
            required
            error={getError("description")}
          />

          <button type="submit" className="app-button-primary w-full py-3">
            {isEdit ? "Update Lecture" : "Add Lecture"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LectureForm;