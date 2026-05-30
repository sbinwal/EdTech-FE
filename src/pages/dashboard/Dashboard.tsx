import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Dashboard() {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  const cards =
    user?.role === "admin"
      ? [
          ["Students", "Add/update students, assign batches and manage fee status.", "👨‍🎓"],
          ["Courses", "Create courses, categories and monthly fees.", "📚"],
          ["Lectures", "Upload and manage recorded lectures.", "🎥"],
          ["Materials", "Upload PDFs, notes and assignments.", "📄"],
          ["Tests", "Create MCQ tests and view results.", "📝"],
          ["Attendance", "Mark offline class attendance.", "✅"],
          ["Fees", "Track paid and pending monthly fees.", "💰"],
          ["Announcements", "Send homework, exam and fee reminders.", "📢"]
        ]
      : [
          ["My Courses", "View your enrolled offline courses.", "📚"],
          ["Recorded Lectures", "Watch subject-wise recorded lectures.", "🎥"],
          ["Study Material", "Download PDFs, notes and assignments.", "📄"],
          ["Tests", "Attempt MCQ tests and view results.", "📝"],
          ["Attendance", "Check your offline class attendance.", "✅"],
          ["Fees", "View paid/pending fees and receipts.", "💰"],
          ["Notifications", "View exam, homework and fee reminders.", "🔔"]
        ];

  return (
    <div>
      <div className="mb-8">
        <span className="text-sm font-extrabold uppercase tracking-wider text-[var(--color-primary)]">
          Overview
        </span>

        <h1 className="app-heading mt-2 text-3xl md:text-4xl">
          {user?.role === "admin"
            ? "Admin Dashboard"
            : user?.role === "teacher"
            ? "Teacher Dashboard"
            : "Student Dashboard"}
        </h1>

        <p className="app-muted mt-3">
          Manage learning, attendance, fees, lectures and progress from one place.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="app-card p-5">
          <p className="app-muted text-sm font-semibold">Role</p>
          <h3 className="app-heading mt-2 text-2xl capitalize">
            {user?.role}
          </h3>
        </div>

        <div className="app-card p-5">
          <p className="app-muted text-sm font-semibold">Courses</p>
          <h3 className="app-heading mt-2 text-2xl">
            {user?.role === "admin" ? "All" : "Enrolled"}
          </h3>
        </div>

        <div className="app-card p-5">
          <p className="app-muted text-sm font-semibold">Fees</p>
          <h3 className="text-2xl font-black text-[var(--color-secondary)]">
            Track
          </h3>
        </div>

        <div className="app-card p-5">
          <p className="app-muted text-sm font-semibold">Status</p>
          <h3 className="text-2xl font-black text-green-600">
            Active
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div key={card[0]} className="app-card p-6 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="text-4xl">{card[2]}</div>

            <h3 className="app-heading mt-4 text-xl">
              {card[0]}
            </h3>

            <p className="app-muted mt-3 leading-7">
              {card[1]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;