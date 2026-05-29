import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { theme } from "../../theme/theme";
import ModuleCard from "../../components/dashboard/ModuleCard";

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
      <h1 style={styles.heading}>
        {user?.role === "admin"
          ? "Admin Dashboard"
          : user?.role === "teacher"
          ? "Teacher Dashboard"
          : "Student Dashboard"}
      </h1>

      <div style={styles.grid}>
        {cards.map((card) => (
          <ModuleCard
            key={card[0]}
            title={card[0]}
            description={card[1]}
            icon={card[2]}
          />
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  heading: {
    color: theme.colors.dark,
    marginBottom: "25px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "22px"
  }
};

export default Dashboard;