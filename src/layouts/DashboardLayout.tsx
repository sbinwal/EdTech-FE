import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
}

function DashboardLayout({ children }: Props) {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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

  const menu = user?.role === "admin" ? adminMenu : studentMenu;

  const logout = () => {
    localStorage.removeItem("token");
    authContext?.setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <div className="h-screen min-w-0 overflow-hidden bg-[var(--color-page)] md:flex">
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 shrink-0 overflow-y-auto bg-[var(--color-sidebar)] p-5 text-white transition-all duration-300 md:static md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${desktopCollapsed ? "md:w-24" : "md:w-72"}`}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2
              className={`text-3xl font-black ${
                desktopCollapsed ? "md:hidden" : "block"
              }`}
            >
              LA
            </h2>

            <p
              className={`mt-2 text-sm text-slate-300 ${
                desktopCollapsed ? "hidden" : "block"
              }`}
            >
              {user?.role?.toUpperCase()}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="cursor-pointer rounded-lg bg-white/10 px-3 py-1 text-2xl md:hidden"
          >
            ×
          </button>

          <button
            type="button"
            onClick={() => setDesktopCollapsed(!desktopCollapsed)}
            className="hidden cursor-pointer rounded-lg bg-white/10 px-3 py-2 text-white md:block"
          >
            {desktopCollapsed ? "→" : "←"}
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center rounded-xl bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/20 ${
                desktopCollapsed ? "md:justify-center" : "gap-3"
              }`}
            >
              <span className="text-lg">{item.icon}</span>

              <span className={desktopCollapsed ? "md:hidden" : "block"}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={logout}
          className="mt-8 w-full cursor-pointer rounded-xl bg-[var(--color-secondary)] px-4 py-3 font-bold text-white"
        >
          <span className={desktopCollapsed ? "md:hidden" : "block"}>
            Logout
          </span>

          <span className={desktopCollapsed ? "hidden md:block" : "hidden"}>
            ⏻
          </span>
        </button>
      </aside>

      <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
        <header className="app-card m-4 flex shrink-0 items-center justify-between p-4 md:m-6 md:p-5">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="cursor-pointer text-3xl text-[var(--color-heading)] md:hidden"
            >
              ☰
            </button>

            <div className="min-w-0">
              <h3 className="truncate font-bold text-[var(--color-heading)] md:text-xl">
                Welcome, {user?.name}
              </h3>

              <p className="truncate text-sm text-[var(--color-muted)] md:text-base">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[var(--color-primary)] font-bold text-white"
            >
              {user?.name?.charAt(0).toUpperCase()}
            </button>

            {profileOpen && (
              <div className="app-card absolute right-0 top-14 z-50 w-60 p-4">
                <p className="font-bold text-[var(--color-heading)]">
                  {user?.name}
                </p>

                <p className="mt-1 break-all text-sm text-[var(--color-muted)]">
                  {user?.email}
                </p>

                <p className="mt-2 text-xs font-bold uppercase text-[var(--color-muted)]">
                  {user?.role}
                </p>

                <button
                  type="button"
                  onClick={logout}
                  className="mt-4 w-full cursor-pointer rounded-xl bg-red-500 py-2 font-bold text-white"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6">
          {children}
        </main>

        <footer className="shrink-0 bg-white p-4 text-center text-sm text-[var(--color-muted)]">
          © {new Date().getFullYear()} Lakshya Academy. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default DashboardLayout;