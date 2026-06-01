import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";

interface Category {
  _id: string;
  name: string;
}

interface Course {
  _id: string;
  title: string;
  classLevel: string;
  category?: Category;
}

interface Student {
  _id: string;
  phone: string;
  parentName: string;
  parentPhone: string;
  address: string;
  status: "active" | "inactive";
  user: {
    _id: string;
    name: string;
    email: string;
  };
  course: Course;
}

function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [course, setCourse] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchStudents = async () => {
    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("limit", String(limit));

    if (search.trim()) params.append("search", search.trim());
    if (category) params.append("category", category);
    if (course) params.append("course", course);
    if (status) params.append("status", status);

    const res = await API.get(`/students?${params.toString()}`, authHeader);

    setStudents(res.data.students || []);
    setTotalPages(res.data.pagination?.totalPages || 1);
    setTotalStudents(res.data.pagination?.totalStudents || 0);
  };

  const fetchCategories = async () => {
    const res = await API.get("/categories");
    setCategories(res.data);
  };

  const fetchCourses = async () => {
    const res = await API.get("/courses");
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCategories();
    fetchCourses();
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [page, search, category, course, status]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setCourse("");
    setPage(1);
  };

  const handleCourseChange = (value: string) => {
    setCourse(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const toggleStatus = async (id: string) => {
    await API.patch(`/students/${id}/status`, {}, authHeader);
    fetchStudents();
  };

  const filteredCourses = category
    ? courses.filter((item) => item.category?._id === category)
    : courses;

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <span className="text-sm font-extrabold uppercase tracking-wider text-[var(--color-primary)]">
            Admin
          </span>

          <h1 className="app-heading mt-2 text-3xl md:text-4xl">
            Students
          </h1>

          <p className="app-muted mt-3">
            View, search, filter and manage all students.
          </p>
        </div>

        <Link
          to="/dashboard/students/create"
          className="app-button-primary px-6 py-3 text-center"
        >
          + Add New Student
        </Link>
      </div>

      <div className="app-card overflow-hidden">
        <div className="grid grid-cols-1 gap-4 border-b border-[var(--color-border)] p-6 md:grid-cols-4">
          <input
            className="app-input"
            placeholder="Search name, email, mobile or course"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />

          <select
            className="app-input"
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
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
            value={course}
            onChange={(e) => handleCourseChange(e.target.value)}
          >
            <option value="">All Courses</option>

            {filteredCourses.map((item) => (
              <option key={item._id} value={item._id}>
                {item.title} - Class {item.classLevel}
              </option>
            ))}
          </select>

          <select
            className="app-input"
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="max-h-[520px] overflow-auto">
  <table className="w-full min-w-[1250px] text-left">
            <thead className="sticky top-0 z-10 bg-slate-50">
              <tr>
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Mobile</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Course</th>
                <th className="px-5 py-4">Parent</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr
                  key={student._id}
                  className="border-t border-[var(--color-border)]"
                >
                  <td className="px-5 py-4 font-semibold">
                    {student.user?.name}
                  </td>

                  <td className="px-5 py-4 text-[var(--color-muted)]">
                    {student.user?.email}
                  </td>

                  <td className="px-5 py-4">
                    {student.phone}
                  </td>

                  <td className="px-5 py-4">
                    {student.course?.category?.name || "-"}
                  </td>

                  <td className="px-5 py-4">
                    {student.course?.title || "-"}
                  </td>

                  <td className="px-5 py-4">
                    <div>{student.parentName}</div>
                    <div className="text-sm text-[var(--color-muted)]">
                      {student.parentPhone}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-4 py-2 text-sm font-bold capitalize ${student.status === "active"
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                        }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
  <div className="flex items-center gap-3">
    <Link
      to={`/dashboard/students/edit/${student._id}`}
      className="rounded-lg bg-blue-50 px-3 py-2 font-bold text-[var(--color-primary)]"
      title="Edit Student"
    >
      ✏️
    </Link>

    <button
      type="button"
      onClick={() => {
        const action =
          student.status === "active" ? "disable" : "enable";

        const confirmStatus = window.confirm(
          `Are you sure you want to ${action} this student?`
        );

        if (!confirmStatus) return;

        toggleStatus(student._id);
      }}
      className={`relative h-8 w-16 rounded-full transition-all duration-300 ${
        student.status === "active"
          ? "bg-green-500"
          : "bg-red-400"
      }`}
      title={student.status === "active" ? "Disable Student" : "Enable Student"}
    >
      <span
        className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all duration-300 ${
          student.status === "active" ? "left-9" : "left-1"
        }`}
      />
    </button>
  </div>
</td>
                </tr>
              ))}

              {students.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-8 text-center text-[var(--color-muted)]"
                  >
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-[var(--color-border)] p-5 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-semibold text-[var(--color-muted)]">
            Total Students: {totalStudents}
          </p>

          <div className="flex items-center justify-between gap-3">
            <button
              className="rounded-lg border border-[var(--color-border)] px-4 py-2 font-bold disabled:opacity-50"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>

            <p className="font-semibold text-[var(--color-muted)]">
              Page {page} of {totalPages}
            </p>

            <button
              className="rounded-lg border border-[var(--color-border)] px-4 py-2 font-bold disabled:opacity-50"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Students;