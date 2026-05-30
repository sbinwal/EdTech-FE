import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../api/axios";
import { type Course } from "../types/course";

function CourseDetails() {
  const { courseId } = useParams();

  const [course, setCourse] = useState<Course | null>(null);

  const fetchCourse = async () => {
    try {
      const res = await API.get(`/courses/${courseId}`);
      setCourse(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  if (!course) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[var(--color-page)] text-xl font-semibold text-[var(--color-muted)]">
        Loading course details...
      </div>
    );
  }

  return (
    <section className="min-h-[80vh] bg-[var(--color-page)] px-4 py-12 md:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="app-card p-6 md:p-10">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-extrabold text-[var(--color-primary)]">
            {course.category?.name}
          </span>

          <h1 className="app-heading mt-6 text-4xl leading-tight md:text-5xl">
            {course.title}
          </h1>

          <p className="app-muted mt-5 text-lg leading-8">
            {course.description ||
              "Complete course with expert guidance, recorded lectures, tests, and progress tracking."}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              "📹 Recorded Lectures",
              "📝 Notes & Assignments",
              "📈 Progress Tracking",
              "🎯 Mock Tests",
              "👨‍🏫 Expert Guidance"
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[var(--color-border)] bg-slate-50 p-4 font-bold text-[var(--color-text)]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="app-card sticky top-8 p-6 md:p-8">
            <h3 className="app-heading text-2xl">
              Class {course.classLevel}
            </h3>

            <p className="app-muted mt-8 font-semibold">
              Monthly Fee
            </p>

            <h2 className="mt-2 text-5xl font-black text-[var(--color-secondary)]">
              ₹{course.fees}
            </h2>

            <p className="app-muted mt-1">
              per month
            </p>

            <button className="app-button-primary mt-8 w-full py-4 text-base cursor-pointer">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseDetails;