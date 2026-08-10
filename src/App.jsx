import { Routes, Route, useLocation } from "react-router-dom";

// Common Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import MouseReveal from "./components/common/MouseReveal";

// Home Components
import Hero from "./components/home/Hero";
import AboutSection from "./components/home/AboutSection";
import { ProjectsList, ProjectPreview } from "./components/home/AllProjects";

// Pages
import About from "./pages/About";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Contact from "./pages/Contact";

// Admin Pages
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import ProjectsAdmin from "./admin/pages/Projects";
import AddProject from "./admin/pages/AddProject";
import Categories from "./admin/pages/Categories";
import Messages from "./admin/pages/Messages";

// Admin Layout
import ProtectedRoute from "./admin/layout/ProtectedRoute";

function App() {
  const location = useLocation();

  const isAdminPage =
    location.pathname === "/admin" ||
    location.pathname.startsWith("/dashboard");

  const isProjectPreview =
    location.pathname.startsWith("/project/");

  const hideLayout = isAdminPage || isProjectPreview;

  return (
    <>
      {!hideLayout && <MouseReveal />}
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <AboutSection />
              <ProjectsList />
            </>
          }
        />

        {/* Portfolio Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />

        {/* Project Preview */}
        <Route
          path="/project/:id"
          element={<ProjectPreview />}
        />

        {/* Admin Login */}
        <Route
          path="/admin"
          element={<Login />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Projects */}
        <Route
          path="/dashboard/projects"
          element={
            <ProtectedRoute>
              <ProjectsAdmin />
            </ProtectedRoute>
          }
        />

        {/* ✅ FIXED: Add Project Route (URL ab exactly match karega) */}
        <Route
          path="/dashboard/add-project"
          element={
            <ProtectedRoute>
              <AddProject />
            </ProtectedRoute>
          }
        />

        {/* Categories */}
        <Route
          path="/dashboard/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />

        {/* Messages */}
        <Route
          path="/dashboard/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;