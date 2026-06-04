import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-[var(--color-page)]">
      <section className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-between gap-12 px-4 py-12 md:flex-row md:px-8 md:py-20">
        <div className="max-w-2xl text-center md:text-left">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-[var(--color-primary)]">
            Trusted Coaching Institute
          </span>

          <h1 className="app-heading mt-6 text-4xl leading-tight md:text-6xl">
            Build Your Future With
            <span className="block text-[var(--color-primary)]">
              Quality Education
            </span>
          </h1>

          <p className="app-muted mt-6 text-lg leading-8">
            Specialized coaching for Sainik School entrance preparation and
            academic classes from Class 3rd to 10th. Access recorded lectures,
            study material, tests, attendance tracking and performance reports.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
            <Link
              to="/register"
              className="app-button-primary px-8 py-4 text-center"
            >
              Get Started
            </Link>

            <Link
              to="/course"
              className="rounded-xl border-2 border-[var(--color-primary)] px-8 py-4 text-center font-bold text-[var(--color-primary)] transition hover:bg-blue-50"
            >
              View Courses
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4">
            <div>
              <h3 className="text-3xl font-black text-[var(--color-primary)]">
                500+
              </h3>
              <p className="app-muted text-sm">Students</p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-[var(--color-primary)]">
                20+
              </h3>
              <p className="app-muted text-sm">Courses</p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-[var(--color-primary)]">
                95%
              </h3>
              <p className="app-muted text-sm">Success Rate</p>
            </div>
          </div>
        </div>

        <div className="app-card flex w-full max-w-lg flex-col items-center justify-center p-8">
          <div className="text-8xl">🎓</div>

          <h3 className="app-heading mt-6 text-2xl">
            Lakshya Academy
          </h3>

          <p className="app-muted mt-3 text-center leading-7">
            Sainik School Preparation, Academic Excellence, Recorded Lectures,
            Tests, Assignments and Student Progress Tracking in one platform.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-[var(--color-primary)]">
              Sainik School
            </span>

            <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-[var(--color-secondary)]">
              Academic Classes
            </span>

            <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-green-600">
              Recorded Lectures
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="app-card p-6">
            <div className="text-4xl">📹</div>

            <h3 className="app-heading mt-4 text-xl">
              Recorded Lectures
            </h3>

            <p className="app-muted mt-3">
              Access subject-wise recorded classes anytime.
            </p>
          </div>

          <div className="app-card p-6">
            <div className="text-4xl">📝</div>

            <h3 className="app-heading mt-4 text-xl">
              Tests & Assignments
            </h3>

            <p className="app-muted mt-3">
              Practice with MCQ tests and regular assignments.
            </p>
          </div>

          <div className="app-card p-6">
            <div className="text-4xl">📈</div>

            <h3 className="app-heading mt-4 text-xl">
              Progress Tracking
            </h3>

            <p className="app-muted mt-3">
              Monitor attendance, performance and improvement areas.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;