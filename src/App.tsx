import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/dashboard/courses/Courses";
import AddCourse from "./pages/dashboard/courses/AddCourse";
import EditCourse from "./pages/dashboard/courses/EditCourse";
import Dashboard from "./pages/dashboard/Dashboard";
import Students from "./pages/dashboard/Students";
import Materials from "./pages/dashboard/Materials";
import Tests from "./pages/dashboard/Tests";
import Attendance from "./pages/dashboard/Attendance";
import Fees from "./pages/dashboard/Fees";
import Announcements from "./pages/dashboard/Announcements";
import AddStudent from "./pages/dashboard/AddStudent";
import EditStudent from "./pages/dashboard/EditStudent";
import Categories from "./pages/dashboard/categories/Categories";
import AddCategory from "./pages/dashboard/categories/AddCategory";
import EditCategory from "./pages/dashboard/categories/EditCategory";
import Course from "./pages/course";
import Lectures from "./pages/dashboard/lectures/Lectures";
import AddLecture from "./pages/dashboard/lectures/AddLecture";
import EditLecture from "./pages/dashboard/lectures/EditLecture";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
        <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
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
        <Route path="/dashboard/lectures" element={<ProtectedRoute><DashboardLayout><Lectures /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/materials" element={<ProtectedRoute><DashboardLayout><Materials /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/tests" element={<ProtectedRoute><DashboardLayout><Tests /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/attendance" element={<ProtectedRoute><DashboardLayout><Attendance /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/fees" element={<ProtectedRoute><DashboardLayout><Fees /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard/announcements" element={<ProtectedRoute><DashboardLayout><Announcements /></DashboardLayout></ProtectedRoute>} />
        <Route
          path="/dashboard/students/edit/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <EditStudent />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/categories"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Categories />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/categories/create"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AddCategory />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/categories/edit/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <EditCategory />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/courses"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Courses />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/course"
          element={
           
              <MainLayout>
                <Course/>
              </MainLayout>
           
          }
        />

        <Route
          path="/dashboard/courses/create"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AddCourse />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/courses/edit/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <EditCourse />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
  path="/dashboard/lectures"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <Lectures />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard/lectures/create"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <AddLecture />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard/lectures/edit/:id"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <EditLecture />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;