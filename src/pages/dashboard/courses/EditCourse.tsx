import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../api/axios";

import CourseForm, {
  type CourseFormData
} from "./CourseForm";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] =
    useState<CourseFormData | null>(null);

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchCourse = async () => {
    const res = await API.get(`/courses/${id}`);

    setInitialData({
      title: res.data.title || "",
      category: res.data.category?._id || "",
      classLevel: res.data.classLevel || "",
      fees: String(res.data.fees || ""),
      description: res.data.description || ""
    });
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const handleUpdate = async (data: CourseFormData) => {
    await API.put(
      `/courses/${id}`,
      {
        title: data.title.trim(),
        category: data.category,
        classLevel: data.classLevel.trim(),
        fees: Number(data.fees),
        description: data.description.trim()
      },
      authHeader
    );

    alert("Course updated successfully");
    navigate("/dashboard/courses");
  };

  if (!initialData) {
    return <div className="app-card p-6">Loading course...</div>;
  }

  return (
    <CourseForm
      initialData={initialData}
      isEdit
      onSubmit={handleUpdate}
    />
  );
}

export default EditCourse;