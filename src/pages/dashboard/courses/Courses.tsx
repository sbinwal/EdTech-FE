import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

import API from "../../../api/axios";
import AppPagination from "../../../components/common/AppPagination";

interface Category {
  _id: string;
  name: string;
}

interface Course {
  _id: string;
  title: string;
  classLevel: string;
  description: string;
  fees: number;
  status: "active" | "inactive";
  category?: Category;
}

function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchCourses = async () => {
    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("limit", String(limit));

    if (search.trim()) params.append("search", search.trim());
    if (category) params.append("category", category);
    if (status) params.append("status", status);

    const res = await API.get(
      `/courses?${params.toString()}`,
      authHeader
    );

    setCourses(res.data.courses || []);
    setTotalPages(res.data.pagination?.totalPages || 1);
    setTotalCourses(res.data.pagination?.totalCourses || 0);
  };

  const fetchCategories = async () => {
    const res = await API.get("/categories");
    const data = res.data.categories || res.data;
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [page, search, category, status]);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const action = currentStatus === "active" ? "disable" : "enable";

    const confirmStatus = window.confirm(
      `Are you sure you want to ${action} this course?`
    );

    if (!confirmStatus) return;

    await API.patch(`/courses/${id}/status`, {}, authHeader);

    fetchCourses();
  };

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <span className="text-sm font-extrabold uppercase tracking-wider text-[var(--color-primary)]">
            Admin
          </span>

          <h1 className="app-heading mt-2 text-3xl md:text-4xl">
            Courses
          </h1>

          <p className="app-muted mt-3">
            Create, edit and manage courses.
          </p>
        </div>

        <Link
          to="/dashboard/courses/create"
          className="app-button-primary inline-flex items-center gap-2 px-5 py-2 text-sm"
        >
          + Add Course
        </Link>
      </div>

      <div className="app-card max-w-full overflow-hidden">
        <div className="grid grid-cols-1 gap-4 border-b border-[var(--color-border)] p-6 md:grid-cols-3">
          <input
            className="app-input"
            placeholder="Search title, class or description"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            className="app-input"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Categories</option>

            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>

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
          <table className="min-w-[1200px] table-fixed text-left">
            <thead className="sticky top-0 z-10 bg-slate-50">
              <tr>
                <th className="w-[260px] px-5 py-4">Title</th>
                <th className="w-[200px] px-5 py-4">Category</th>
                <th className="w-[140px] px-5 py-4">Class</th>
                <th className="w-[160px] px-5 py-4">Fee / Month</th>
                <th className="w-[300px] px-5 py-4">Description</th>
                <th className="w-[150px] px-5 py-4 text-center">Status</th>
                <th className="w-[180px] px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course) => (
                <tr
                  key={course._id}
                  className="border-t border-[var(--color-border)]"
                >
                  <td className="px-5 py-4 font-semibold">
                    {course.title}
                  </td>

                  <td className="px-5 py-4">
                    {course.category?.name || "-"}
                  </td>

                  <td className="px-5 py-4">
                    Class {course.classLevel}
                  </td>

                  <td className="px-5 py-4 font-semibold text-[var(--color-primary)]">
                    ₹{course.fees}
                  </td>

                  <td className="px-5 py-4 text-[var(--color-muted)]">
                    {course.description}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`inline-flex rounded-full px-4 py-2 text-sm font-bold capitalize ${
                        course.status === "active"
                          ? "text-[var(--color-primary)]"
                          : "text-[var(--color-danger)]"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        to={`/dashboard/courses/edit/${course._id}`}
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--color-primary)] transition-all "
                        title="Edit Course"
                      >
                        <FaEdit size={16} />
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          toggleStatus(course._id, course.status)
                        }
                        className={`relative h-6 w-11 rounded-full transition-all duration-300 ${
                          course.status === "active"
                            ? "bg-[var(--color-primary)]"
                            : "bg-[var(--color-danger)]"
                        }`}
                      >
                        <span
                          className={`absolute top-[2px] h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ${
                            course.status === "active"
                              ? "left-[22px]"
                              : "left-[2px]"
                          }`}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {courses.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-8 text-center text-[var(--color-muted)]"
                  >
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-[var(--color-border)] p-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm font-semibold text-[var(--color-muted)]">
            Total Courses: {totalCourses}
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

export default Courses;