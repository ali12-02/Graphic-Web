import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MouseReveal from "./components/MouseReveal";

import Hero from "./sections/Hero";
import Projects from "./sections/Projects";

import About from "./pages/About";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import ProjectPreview from "./pages/ProjectPreview";

import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import ProjectsAdmin from "./admin/Projects";
import Categories from "./admin/Categories";
import Gallery from "./admin/Gallery";
import ProtectedRoute from "./admin/ProtectedRoute";
import AboutSection from "./sections/AboutSection";


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
  <Projects />
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

        {/* Categories */}
        <Route
          path="/dashboard/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />

        {/* Gallery */}
        <Route
          path="/dashboard/gallery"
          element={
            <ProtectedRoute>
              <Gallery />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;