import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

import API from "../../../api/axios";
import AppPagination from "../../../components/common/AppPagination";

interface Category {
  _id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
}

function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCategories, setTotalCategories] = useState(0);

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchCategories = async () => {
    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("limit", String(limit));

    if (search.trim()) params.append("search", search.trim());
    if (status) params.append("status", status);

    const res = await API.get(
      `/categories?${params.toString()}`,
      authHeader
    );

    setCategories(res.data.categories || []);
    setTotalPages(res.data.pagination?.totalPages || 1);
    setTotalCategories(res.data.pagination?.totalCategories || 0);
  };

  useEffect(() => {
    fetchCategories();
  }, [page, search, status]);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const action = currentStatus === "active" ? "disable" : "enable";

    const confirmStatus = window.confirm(
      `Are you sure you want to ${action} this category?`
    );

    if (!confirmStatus) return;

    await API.patch(`/categories/${id}/status`, {}, authHeader);

    fetchCategories();
  };

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <span className="text-sm font-extrabold uppercase tracking-wider text-[var(--color-primary)]">
            Admin
          </span>

          <h1 className="app-heading mt-2 text-3xl md:text-4xl">
            Categories
          </h1>

          <p className="app-muted mt-3">
            Create and manage course categories.
          </p>
        </div>

        <Link
          to="/dashboard/categories/create"
          className="app-button-primary inline-flex items-center gap-2 px-5 py-2 text-sm"
        >
          + Add Category
        </Link>
      </div>

      <div className="app-card max-w-full overflow-hidden">
        <div className="grid grid-cols-1 gap-4 border-b border-[var(--color-border)] p-6 md:grid-cols-2">
          <input
            className="app-input"
            placeholder="Search category name or description"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            className="app-input"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="max-h-[520px] max-w-full overflow-auto">
          <table className="min-w-[1000px] table-fixed text-left">
            <thead className="sticky top-0 z-10 bg-slate-50">
              <tr>
                <th className="w-[220px] px-5 py-4">Name</th>
                <th className="w-[420px] px-5 py-4">Description</th>
                <th className="w-[160px] px-5 py-4 text-center">
                  Status
                </th>
                <th className="w-[180px] px-5 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr
                  key={category._id}
                  className="border-t border-[var(--color-border)]"
                >
                  <td className="px-5 py-4 font-semibold">
                    {category.name}
                  </td>

                  <td className="px-5 py-4 text-[var(--color-muted)]">
                    {category.description}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`inline-flex rounded-full px-4 py-2 text-sm font-bold capitalize ${
                        category.status === "active"
                          ? "text-[var(--color-primary)]"
                          : " text-[var(--color-danger)]"
                      }`}
                    >
                      {category.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        to={`/dashboard/categories/edit/${category._id}`}
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--color-primary)] transition-all "
                        title="Edit Category"
                      >
                        <FaEdit size={16} />
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          toggleStatus(category._id, category.status)
                        }
                        className={`relative h-6 w-11 rounded-full transition-all duration-300 ${
                          category.status === "active"
                            ? "bg-[var(--color-primary)]"
                            : "bg-[var(--color-danger)]"
                        }`}
                      >
                        <span
                          className={`absolute top-[2px] h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ${
                            category.status === "active"
                              ? "left-[22px]"
                              : "left-[2px]"
                          }`}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {categories.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-8 text-center text-[var(--color-muted)]"
                  >
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-[var(--color-border)] p-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm font-semibold text-[var(--color-muted)]">
            Total Categories: {totalCategories}
          </p>

          <AppPagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Categories;