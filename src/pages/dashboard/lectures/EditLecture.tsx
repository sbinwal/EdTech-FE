import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../api/axios";

import LectureForm, {
  type LectureFormData
} from "./LectureForm";

function EditLecture() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] =
    useState<LectureFormData | null>(null);

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchLecture = async () => {
    const res = await API.get(`/lectures/${id}`, authHeader);

    setInitialData({
      title: res.data.title || "",
      category: res.data.course?.category?._id || "",
      course: res.data.course?._id || "",
      chapterName: res.data.chapterName || "",
      duration: String(res.data.duration || ""),
      lectureDate: res.data.lectureDate
        ? res.data.lectureDate.split("T")[0]
        : "",
      description: res.data.description || "",
      videoFile: null
    });
  };

  useEffect(() => {
    fetchLecture();
  }, [id]);

  const handleUpdate = async (data: LectureFormData) => {
    const formDataObj = new FormData();

    formDataObj.append("title", data.title.trim());
    formDataObj.append("course", data.course);
    formDataObj.append("chapterName", data.chapterName.trim());
    formDataObj.append("duration", data.duration);
    formDataObj.append("lectureDate", data.lectureDate);
    formDataObj.append("description", data.description.trim());

    if (data.videoFile) {
      formDataObj.append("video", data.videoFile);
    }

    await API.put(`/lectures/${id}`, formDataObj, authHeader);

    alert("Lecture updated successfully");
    navigate("/dashboard/lectures");
  };

  if (!initialData) {
    return <div className="app-card p-6">Loading lecture...</div>;
  }

  return (
    <LectureForm
      initialData={initialData}
      isEdit
      onSubmit={handleUpdate}
    />
  );
}

export default EditLecture;