import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import API from "../../../src/api/axios";
import AppPagination from "../../components/common/AppPagination";

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
    setCategories(res?.data?.categories || res?.data || []);
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

  const toggleStatus = async (id: string, currentStatus: string) => {
    const action = currentStatus === "active" ? "disable" : "enable";

    const confirmStatus = window.confirm(
      `Are you sure you want to ${action} this student?`
    );

    if (!confirmStatus) return;

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
          className="app-button-primary inline-flex items-center gap-2 px-5 py-2 text-sm"
        >
          + Add Student
        </Link>
      </div>

      <div className="app-card max-w-full overflow-hidden">
        <div className="grid grid-cols-1 gap-4 border-b border-[var(--color-border)] p-6 md:grid-cols-4">
          <input
            className="app-input"
            placeholder="Search name, email, mobile or course"
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
              setCourse("");
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
            value={course}
            onChange={(e) => {
              setCourse(e.target.value);
              setPage(1);
            }}
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
          <table className="min-w-[1400px] table-fixed text-left">
            <thead className="sticky top-0 z-10 bg-slate-50">
              <tr>
                <th className="w-[220px] px-5 py-4">Name</th>
                <th className="w-[250px] px-5 py-4">Email</th>
                <th className="w-[180px] px-5 py-4">Mobile</th>
                <th className="w-[180px] px-5 py-4">Category</th>
                <th className="w-[220px] px-5 py-4">Course</th>
                <th className="w-[250px] px-5 py-4">Parent</th>
                <th className="w-[150px] px-5 py-4 text-center">
                  Status
                </th>
                <th className="w-[180px] px-5 py-4 text-center">
                  Actions
                </th>
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

                  <td className="px-5 py-4">{student.phone}</td>

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

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`inline-flex rounded-full px-4 py-2 text-sm font-bold capitalize ${student.status === "active"
                        ? " text-[var(--color-primary)]"
                        : " text-[var(--color-danger)]"
                        }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        to={`/dashboard/students/edit/${student._id}`}
                        className="flex h-10 w-10 items-center justify-center rounded-lg  text-[var(--color-primary)] transition-all "
                        title="Edit Student"
                      >
                        <FaEdit size={20} />
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          toggleStatus(student._id, student.status)
                        }
                        className={`relative h-6 w-11 rounded-full transition-all duration-300 ${student.status === "active"
                          ? "bg-[var(--color-primary)]"
                          : "bg-[var(--color-danger)]"
                          }`}
                      >
                        <span
                          className={`absolute top-[2px] h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ${student.status === "active"
                            ? "left-[22px]"
                            : "left-[2px]"
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

        <div className="flex flex-col gap-4 border-t border-[var(--color-border)] p-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm font-semibold text-[var(--color-muted)]">
            Total Students: {totalStudents}
          </p>

          <div className="flex flex-col gap-4 border-t border-[var(--color-border)] p-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm font-semibold text-[var(--color-muted)]">
              Total Students: {totalStudents}
            </p>

            <AppPagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Students;