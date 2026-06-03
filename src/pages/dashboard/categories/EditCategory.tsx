import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../api/axios";

import CategoryForm, {
  type CategoryFormData
} from "./CategoryForm";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] =
    useState<CategoryFormData | null>(null);

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchCategory = async () => {
    const res = await API.get(`/categories/${id}`, authHeader);

    setInitialData({
      name: res.data.name || "",
      description: res.data.description || ""
    });
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const handleUpdate = async (data: CategoryFormData) => {
    await API.put(
      `/categories/${id}`,
      {
        name: data.name.trim(),
        description: data.description.trim()
      },
      authHeader
    );

    alert("Category updated successfully");
    navigate("/dashboard/categories");
  };

  if (!initialData) {
    return <div className="app-card p-6">Loading category...</div>;
  }

  return (
    <CategoryForm
      initialData={initialData}
      isEdit
      onSubmit={handleUpdate}
    />
  );
}

export default EditCategory;