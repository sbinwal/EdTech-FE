import { useNavigate } from "react-router-dom";
import API from "../../../api/axios";

import CategoryForm, {
  type CategoryFormData
} from "./CategoryForm";

function AddCategory() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const handleCreate = async (data: CategoryFormData) => {
    await API.post(
      "/categories",
      {
        name: data.name.trim(),
        description: data.description.trim()
      },
      authHeader
    );

    alert("Category created successfully");
    navigate("/dashboard/categories");
  };

  return <CategoryForm onSubmit={handleCreate} />;
}

export default AddCategory;