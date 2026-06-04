import { useNavigate } from "react-router-dom";
import API from "../../../api/axios";

import LectureForm, {
  type LectureFormData
} from "./LectureForm";

function AddLecture() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  };

  const handleCreate = async (data: LectureFormData) => {
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

    await API.post("/lectures", formDataObj, authHeader);

    alert("Lecture created successfully");
    navigate("/dashboard/lectures");
  };

  return <LectureForm onSubmit={handleCreate} />;
}

export default AddLecture;