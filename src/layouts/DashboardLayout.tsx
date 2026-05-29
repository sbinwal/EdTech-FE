import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { theme } from "../theme/theme";

interface Props {
  children: React.ReactNode;
}

function DashboardLayout({ children }: Props) {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const adminMenu = [
    { label: "Dashboard", path: "/dashboard", icon: "🏠" },
    { label: "Students", path: "/dashboard/students", icon: "👨‍🎓" },
    { label: "Courses", path: "/dashboard/courses", icon: "📚" },
    { label: "Categories", path: "/dashboard/categories", icon: "🗂️" },
    { label: "Lectures", path: "/dashboard/lectures", icon: "🎥" },
    { label: "Materials", path: "/dashboard/materials", icon: "📄" },
    { label: "Tests", path: "/dashboard/tests", icon: "📝" },
    { label: "Attendance", path: "/dashboard/attendance", icon: "✅" },
    { label: "Fees", path: "/dashboard/fees", icon: "💰" },
    { label: "Announcements", path: "/dashboard/announcements", icon: "📢" }
  ];

  const teacherMenu = [
    { label: "Dashboard", path: "/dashboard", icon: "🏠" },
    { label: "Lectures", path: "/dashboard/lectures", icon: "🎥" },
    { label: "Materials", path: "/dashboard/materials", icon: "📄" },
    { label: "Tests", path: "/dashboard/tests", icon: "📝" },
    { label: "Attendance", path: "/dashboard/attendance", icon: "✅" },
    { label: "Students", path: "/dashboard/students", icon: "👨‍🎓" }
  ];

  const studentMenu = [
    { label: "Dashboard", path: "/dashboard", icon: "🏠" },
    { label: "My Courses", path: "/dashboard/courses", icon: "📚" },
    { label: "Lectures", path: "/dashboard/lectures", icon: "🎥" },
    { label: "Materials", path: "/dashboard/materials", icon: "📄" },
    { label: "Tests", path: "/dashboard/tests", icon: "📝" },
    { label: "Attendance", path: "/dashboard/attendance", icon: "✅" },
    { label: "Fees", path: "/dashboard/fees", icon: "💰" },
    { label: "Notifications", path: "/dashboard/announcements", icon: "🔔" }
  ];

  const menu =
    user?.role === "admin"
      ? adminMenu
      : user?.role === "teacher"
      ? teacherMenu
      : studentMenu;

  const logout = () => {
    localStorage.removeItem("token");
    authContext?.setUser(null);
    navigate("/login");
  };

  return (
    <div style={styles.wrapper}>
      <aside
        style={{
          ...styles.sidebar,
          width: collapsed ? "90px" : "280px"
        }}
      >
        <div style={styles.sidebarTop}>
          <h2 style={styles.logo}>{collapsed ? "B" : "BFA"}</h2>

          <button
            onClick={() => setCollapsed(!collapsed)}
            style={styles.collapseBtn}
          >
            {collapsed ? "☰" : "×"}
          </button>
        </div>

        {!collapsed && <p style={styles.role}>{user?.role?.toUpperCase()}</p>}

        <nav style={styles.nav}>
          {menu.map((item) => (
            <Link key={item.path} to={item.path} style={styles.link}>
              <span>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <button onClick={logout} style={styles.logout}>
          {collapsed ? "🚪" : "Logout"}
        </button>
      </aside>

      <div style={styles.contentWrapper}>
        <header style={styles.header}>
          <div>
            <h3 style={styles.welcome}>Welcome, {user?.name}</h3>
            <p style={styles.email}>{user?.email}</p>
          </div>

          <div style={styles.profile}>
            <div style={styles.profileIcon}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{user?.name}</strong>
              <p style={styles.profileRole}>{user?.role}</p>
            </div>
          </div>
        </header>

        <main style={styles.main}>{children}</main>

        <footer style={styles.footer}>
          © {new Date().getFullYear()} Bright Future Academy. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: theme.font.main,
    backgroundColor: theme.colors.light
  },
  sidebar: {
    backgroundColor: theme.colors.dark,
    color: theme.colors.white,
    padding: "25px 20px",
    transition: "0.3s",
    display: "flex",
    flexDirection: "column"
  },
  sidebarTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: {
    margin: 0,
    fontSize: "28px"
  },
  collapseBtn: {
    backgroundColor: "rgba(255,255,255,0.12)",
    color: theme.colors.white,
    border: "none",
    borderRadius: "8px",
    padding: "8px 10px",
    cursor: "pointer"
  },
  role: {
    color: "#cbd5e1",
    fontSize: "13px",
    marginTop: "15px"
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "25px"
  },
  link: {
    color: theme.colors.white,
    textDecoration: "none",
    padding: "13px 15px",
    borderRadius: "10px",
    backgroundColor: "rgba(255,255,255,0.08)",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontWeight: 600
  },
  logout: {
    marginTop: "35px",
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: theme.colors.secondary,
    color: theme.colors.white,
    fontWeight: 800,
    cursor: "pointer"
  },
  contentWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  header: {
    margin: "25px 35px 0",
    backgroundColor: theme.colors.white,
    padding: "20px 28px",
    borderRadius: "18px",
    boxShadow: "0 8px 22px rgba(15,23,42,0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  welcome: {
    margin: 0,
    color: theme.colors.dark
  },
  email: {
    marginBottom: 0,
    color: theme.colors.muted
  },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  profileIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: "20px"
  },
  profileRole: {
    margin: 0,
    color: theme.colors.muted,
    textTransform: "capitalize"
  },
  main: {
    flex: 1,
    padding: "35px"
  },
  footer: {
    backgroundColor: theme.colors.white,
    padding: "18px",
    textAlign: "center",
    color: theme.colors.muted
  }
};

export default DashboardLayout;