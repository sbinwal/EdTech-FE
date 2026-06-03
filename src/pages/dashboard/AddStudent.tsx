import { useNavigate } from "react-router-dom";
import API from "../../../src/api/axios";
import StudentForm, { type StudentFormData } from "./StudentForm";

function AddStudent() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const handleCreate = async (data: StudentFormData) => {
    const payload = {
      name: `${data.firstName.trim()} ${data.lastName.trim()}`,
      email: data.email.trim(),
      password: data.password,
      phone: data.phone,
      parentName: data.parentName.trim(),
      parentPhone: data.parentPhone,
      address: data.address.trim(),
      course: data.course
    };

    await API.post("/students", payload, authHeader);

    alert("Student created successfully");
    navigate("/dashboard/students");
  };

  return <StudentForm onSubmit={handleCreate} />;
}

export default AddStudent;