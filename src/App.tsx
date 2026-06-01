import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/course";
import CourseDetails from "./pages/CourseDetails";

import Dashboard from "./pages/dashboard/Dashboard";
import Students from "./pages/dashboard/Students";
import DashboardCourses from "./pages/dashboard/DashboardCourses";
import DashboardCategories from "./pages/dashboard/DashboardCategories";
import Lectures from "./pages/dashboard/Lectures";
import Materials from "./pages/dashboard/Materials";
import Tests from "./pages/dashboard/Tests";
import Attendance from "./pages/dashboard/Attendance";
import Fees from "./pages/dashboard/Fees";
import Announcements from "./pages/dashboard/Announcements";
import AddStudent from "./pages/dashboard/AddStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
        <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
        <Route path="/courses" element={<MainLayout><Courses /></MainLayout>} />
        <Route path="/courses/:courseId" element={<MainLayout><CourseDetails /></MainLayout>} />

        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
        <Route
          path="/dashboard/students"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Students />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/students/create"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AddStudent />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard/courses" element={<ProtectedRoute><DashboardLayout><DashboardCourses /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/categories" element={<ProtectedRoute><DashboardLayout><DashboardCategories /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/lectures" element={<ProtectedRoute><DashboardLayout><Lectures /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/materials" element={<ProtectedRoute><DashboardLayout><Materials /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/tests" element={<ProtectedRoute><DashboardLayout><Tests /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/attendance" element={<ProtectedRoute><DashboardLayout><Attendance /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/fees" element={<ProtectedRoute><DashboardLayout><Fees /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/announcements" element={<ProtectedRoute><DashboardLayout><Announcements /></DashboardLayout></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;