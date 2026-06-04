import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { type Course, type Category } from "../types/course";

function Courses() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const navigate = useNavigate();

  const fetchCategories = async () => {
    const res = await API.get("/categories");
    setCategories(res?.data?.categories || []);
  };

  const fetchCourses = async () => {
    const res = await API.get("/courses");
    setCourses(res?.data || []);
  };

  useEffect(() => {
    fetchCategories();
    fetchCourses();
  }, []);

  const filteredCourses =
    selectedCategory === "all"
      ? courses
      : courses.filter(
          (course) => course.category?._id === selectedCategory
        );

  return (
    <section className="min-h-[80vh] bg-[var(--color-page)] px-4 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-sm font-extrabold uppercase tracking-wider text-[var(--color-primary)]">
            Courses
          </span>

          <h1 className="app-heading mt-3 text-4xl md:text-5xl">
            Choose Your Program
          </h1>

          <p className="app-muted mx-auto mt-4 max-w-2xl text-lg leading-8">
            Select Sainik School preparation or academic classes and enroll
            according to your class.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button
            className={`rounded-full cursor-pointer border px-5 py-2.5 font-bold transition ${
              selectedCategory === "all"
                ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                : "border-[var(--color-primary)] text-[var(--color-primary)]"
            }`}
            onClick={() => setSelectedCategory("all")}
          >
            All Courses
          </button>

          {categories.map((category) => (
            <button
              key={category._id}
              className={`rounded-full border px-5 py-2.5 font-bold cursor-pointer transition ${
                selectedCategory === category._id
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                  : "border-[var(--color-primary)] text-[var(--color-primary)]"
              }`}
              onClick={() => setSelectedCategory(category._id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course._id} className="app-card p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-extrabold text-[var(--color-primary)]">
                    {course.category?.name}
                  </span>

                  <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-extrabold text-[var(--color-secondary)]">
                    Class {course.classLevel}
                  </span>
                </div>

                <div className="mt-8 flex flex-col gap-5 sm:flex-row">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-5xl">
                    🎓
                  </div>

                  <div className="flex-1 rounded-2xl border border-[var(--color-border)] bg-slate-50 p-4">
                    <p className="font-semibold text-[var(--color-text)]">
                      📹 Recorded Lectures
                    </p>

                    <p className="mt-2 font-semibold text-[var(--color-text)]">
                      📈 Progress Tracking
                    </p>

                    <p className="mt-2 font-semibold text-[var(--color-text)]">
                      📝 Tests & Notes
                    </p>

                    <p className="mt-2 font-semibold text-[var(--color-text)]">
                      👨‍🏫 Expert Guidance
                    </p>
                  </div>
                </div>

                <h2 className="app-heading mt-8 text-2xl">
                  {course.title}
                </h2>

                <p className="app-muted mt-3 min-h-16 leading-7">
                  {course.description ||
                    "Complete course with expert guidance and recorded lectures."}
                </p>

                <div className="my-6 h-px bg-[var(--color-border)]" />

                <div>
                  <p className="app-muted font-semibold">
                    Monthly Fee
                  </p>

                  <h3 className="mt-1 text-4xl font-black text-[var(--color-secondary)]">
                    ₹{course.fees}
                  </h3>

                  <p className="app-muted">
                    per month
                  </p>
                </div>

                <button
                  className="app-button-primary mt-6 w-full py-3 cursor-pointer"
                  onClick={() =>
                    navigate(`/courses/${course._id}`)
                  }
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="app-muted col-span-full text-center text-lg">
              No courses found in this category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Courses;