import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Common Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import MouseReveal from "./components/common/MouseReveal";

// Home Components
import Hero from "./components/home/Hero";
import AboutSection from "./components/home/AboutSection";
import { ProjectsList } from "./components/home/AllProjects";

// Pages
import About from "./pages/About";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import ProjectPreview from "./pages/ProjectPreview";

// Admin Pages
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import ProjectsAdmin from "./admin/pages/Projects";
import AddProject from "./admin/pages/AddProject";
import Categories from "./admin/pages/Categories";
import Offers from "./admin/pages/Offers";
// 🟢 REMOVED: Stats and ButtonManager imports (Ab Brain manage karega)
import ThemeSettings from "./admin/pages/ThemeSettings";
import ContentManager from "./admin/pages/ContentManager";

// Admin Layout
import ProtectedRoute from "./admin/layout/ProtectedRoute";

function App() {
  const location = useLocation();
  const [theme, setTheme] = useState({ webBg: "#050505", webText: "#ffffff", webAccent: "#a855f7" });

  // 🟢 Load Theme Config for Website
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("themeConfig"));
    if (saved) {
      setTheme({
        webBg: saved.webBg || "#050505",
        webText: saved.webText || "#ffffff",
        webAccent: saved.webAccent || "#a855f7",
      });
    }

    const handleGlobalUpdate = () => {
      const updated = JSON.parse(localStorage.getItem("themeConfig"));
      if (updated) setTheme({
        webBg: updated.webBg || "#050505",
        webText: updated.webText || "#ffffff",
        webAccent: updated.webAccent || "#a855f7",
      });
    };

    window.addEventListener("globalThemeUpdated", handleGlobalUpdate);
    return () => window.removeEventListener("globalThemeUpdated", handleGlobalUpdate);
  }, []);

  const isAdminPage =
    location.pathname === "/admin" ||
    location.pathname.startsWith("/dashboard");

  const isProjectPreview =
    location.pathname.startsWith("/project/");

  const hideLayout = isAdminPage || isProjectPreview;

  return (
    <div style={{ backgroundColor: theme.webBg, color: theme.webText }}>
      {!hideLayout && <MouseReveal />}
      {!hideLayout && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
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

          {/* Team Page Route */}
          <Route path="/team" element={<Team />} />

          {/* Project Preview Route */}
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

          {/* Add Project */}
          <Route
            path="/dashboard/add-project"
            element={
              <ProtectedRoute>
                <AddProject />
              </ProtectedRoute>
            }
          />

          {/* Offers Route */}
          <Route
            path="/dashboard/offers"
            element={
              <ProtectedRoute>
                <Offers />
              </ProtectedRoute>
            }
          />

          {/* 🟢 REMOVED: Stats Route (Now managed by ContentManager Brain) */}

          {/* ThemeSettings Route */}
          <Route
            path="/dashboard/theme-settings"
            element={
              <ProtectedRoute>
                <ThemeSettings />
              </ProtectedRoute>
            }
          />

          {/* Content Manager (Central Brain) Route */}
          <Route
            path="/dashboard/content-manager"
            element={
              <ProtectedRoute>
                <ContentManager />
              </ProtectedRoute>
            }
          />

          {/* 🟢 REMOVED: Button Manager Route (Now managed by ContentManager Brain) */}

          {/* Categories */}
          <Route
            path="/dashboard/categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;