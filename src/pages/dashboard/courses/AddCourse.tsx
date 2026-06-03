import { useNavigate } from "react-router-dom";
import API from "../../../api/axios";

import CourseForm, {
  type CourseFormData
} from "./CourseForm";

function AddCourse() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const handleCreate = async (data: CourseFormData) => {
    await API.post(
      "/courses",
      {
        title: data.title.trim(),
        category: data.category,
        classLevel: data.classLevel.trim(),
        fees: Number(data.fees),
        description: data.description.trim()
      },
      authHeader
    );

    alert("Course created successfully");
    navigate("/dashboard/courses");
  };

  return <CourseForm onSubmit={handleCreate} />;
}

export default AddCourse;