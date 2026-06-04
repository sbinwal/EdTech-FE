import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaPlay } from "react-icons/fa";

import API from "../../../api/axios";
import AppPagination from "../../../components/common/AppPagination";

interface Course {
  _id: string;
  title: string;
  classLevel: string;
}

interface Lecture {
  _id: string;
  title: string;
  chapterName: string;
  videoUrl: string;
  duration: number;
  lectureDate: string;
  description: string;
  status: "active" | "inactive";
  course?: Course;
}

function Lectures() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLectures, setTotalLectures] = useState(0);

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const SERVER_BASE_URL = API_BASE_URL.replace("/api", "");

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchLectures = async () => {
    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("limit", String(limit));

    if (search.trim()) params.append("search", search.trim());
    if (course) params.append("course", course);
    if (status) params.append("status", status);

    const res = await API.get(`/lectures?${params.toString()}`, authHeader);

    setLectures(res.data.lectures || []);
    setTotalPages(res.data.pagination?.totalPages || 1);
    setTotalLectures(res.data.pagination?.totalLectures || 0);
  };

  const fetchCourses = async () => {
    const res = await API.get("/courses");
    const data = res.data.courses || res.data;
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    fetchLectures();
  }, [page, search, course, status]);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const action = currentStatus === "active" ? "disable" : "enable";

    const confirmStatus = window.confirm(
      `Are you sure you want to ${action} this lecture?`
    );

    if (!confirmStatus) return;

    await API.patch(`/lectures/${id}/status`, {}, authHeader);
    fetchLectures();
  };

  const getVideoLink = (videoUrl: string) => {
    if (!videoUrl) return "";
    if (videoUrl.startsWith("http")) return videoUrl;
    return `${SERVER_BASE_URL}${videoUrl}`;
  };

  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <span className="text-sm font-extrabold uppercase tracking-wider text-[var(--color-primary)]">
            Admin
          </span>

          <h1 className="app-heading mt-2 text-3xl md:text-4xl">
            Lectures
          </h1>

          <p className="app-muted mt-3">
            Upload and manage course lectures.
          </p>
        </div>

        <Link
          to="/dashboard/lectures/create"
          className="app-button-primary inline-flex items-center gap-2 px-5 py-2 text-sm"
        >
          + Add Lecture
        </Link>
      </div>

      <div className="app-card max-w-full overflow-hidden">
        <div className="grid grid-cols-1 gap-4 border-b border-[var(--color-border)] p-6 md:grid-cols-3">
          <input
            className="app-input"
            placeholder="Search title, chapter or description"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            className="app-input"
            value={course}
            onChange={(e) => {
              setCourse(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Courses</option>

            {courses.map((item) => (
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
          <table className="min-w-[1450px] table-fixed text-left">
            <thead className="sticky top-0 z-10 bg-slate-50">
              <tr>
                <th className="w-[230px] px-5 py-4">Title</th>
                <th className="w-[240px] px-5 py-4">Course</th>
                <th className="w-[180px] px-5 py-4">Chapter</th>
                <th className="w-[140px] px-5 py-4">Duration</th>
                <th className="w-[170px] px-5 py-4">Date</th>
                <th className="w-[160px] px-5 py-4 text-center">Video</th>
                <th className="w-[150px] px-5 py-4 text-center">Status</th>
                <th className="w-[180px] px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {lectures.map((lecture) => (
                <tr
                  key={lecture._id}
                  className="border-t border-[var(--color-border)]"
                >
                  <td className="px-5 py-4 font-semibold">
                    {lecture.title}
                  </td>

                  <td className="px-5 py-4">
                    {lecture.course?.title || "-"}
                  </td>

                  <td className="px-5 py-4">
                    {lecture.chapterName}
                  </td>

                  <td className="px-5 py-4">
                    {lecture.duration} mins
                  </td>

                  <td className="px-5 py-4">
                    {formatDate(lecture.lectureDate)}
                  </td>

                  <td className="px-5 py-4 text-center">
                    {lecture.videoUrl ? (
                      <a
                        href={getVideoLink(lecture.videoUrl)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)] hover:text-white"
                        title="Open Video"
                      >
                        <FaPlay size={13} />
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`inline-flex rounded-full px-4 py-2 text-sm font-bold capitalize ${
                        lecture.status === "active"
                          ? "bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                          : "bg-[var(--color-danger-light)] text-[var(--color-danger)]"
                      }`}
                    >
                      {lecture.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        to={`/dashboard/lectures/edit/${lecture._id}`}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)] hover:text-white"
                        title="Edit Lecture"
                      >
                        <FaEdit size={14} />
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          toggleStatus(lecture._id, lecture.status)
                        }
                        className={`relative h-6 w-11 rounded-full transition-all duration-300 ${
                          lecture.status === "active"
                            ? "bg-[var(--color-primary)]"
                            : "bg-[var(--color-danger)]"
                        }`}
                      >
                        <span
                          className={`absolute top-[2px] h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ${
                            lecture.status === "active"
                              ? "left-[22px]"
                              : "left-[2px]"
                          }`}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {lectures.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-8 text-center text-[var(--color-muted)]"
                  >
                    No lectures found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-[var(--color-border)] p-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm font-semibold text-[var(--color-muted)]">
            Total Lectures: {totalLectures}
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

export default Lectures;