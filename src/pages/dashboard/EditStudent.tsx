import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../src/api/axios";
import StudentForm, { type StudentFormData } from "./StudentForm";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState<StudentFormData | null>(null);

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchStudent = async () => {
    const res = await API.get(`/students/${id}`, authHeader);

    const nameParts = res.data.user?.name?.split(" ") || [];

    setInitialData({
      firstName: nameParts[0] || "",
      lastName: nameParts.slice(1).join(" ") || "",
      email: res.data.user?.email || "",
      password: "",
      phone: res.data.phone || "",
      parentName: res.data.parentName || "",
      parentPhone: res.data.parentPhone || "",
      address: res.data.address || "",
      course: res.data.course?._id || ""
    });
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const handleUpdate = async (data: StudentFormData) => {
    const payload: any = {
      name: `${data.firstName.trim()} ${data.lastName.trim()}`,
      email: data.email.trim(),
      phone: data.phone,
      parentName: data.parentName.trim(),
      parentPhone: data.parentPhone,
      address: data.address.trim(),
      course: data.course
    };

    if (data.password?.trim()) {
      payload.password = data.password;
    }

    await API.put(`/students/${id}`, payload, authHeader);

    alert("Student updated successfully");
    navigate("/dashboard/students");
  };

  if (!initialData) {
    return <div className="app-card p-6">Loading student...</div>;
  }

  return (
    <StudentForm
      initialData={initialData}
      isEdit
      onSubmit={handleUpdate}
    />
  );
}

export default EditStudent;