// sections/allprojects.jsx
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

// ============================================
// YOUR PROJECT DATA - EDIT THIS ARRAY
// ============================================
const projectsData = [
  {
    id: 1,
    title: "EcoTrack Dashboard",
    category: "Web Application",
    description: "A comprehensive environmental monitoring dashboard that tracks carbon footprint, energy consumption, and sustainability metrics for enterprise clients. Features real-time data visualization and predictive analytics.",
    image: "/projects/project1.jpg", // Path to your image in public folder
    pdf: "/pdfs/project1.pdf",       // Path to your PDF in public folder
    status: "Published"               // "Published" or "Draft"
  },
  {
    id: 2,
    title: "Neural Design System",
    category: "UI/UX Framework",
    description: "A modern, AI-powered design system with adaptive components and intelligent theming. Built with React and Tailwind CSS, featuring dark mode, accessibility-first principles, and micro-interactions.",
    image: "/projects/project2.jpg",
    pdf: "/pdfs/project2.pdf",
    status: "Published"
  },
  {
    id: 3,
    title: "Portfolio AI Assistant",
    category: "Machine Learning",
    description: "An intelligent chatbot that helps creatives build their portfolios by suggesting project descriptions, generating tags, and optimizing content for better engagement.",
    image: "/projects/project3.jpg",
    pdf: null, // No PDF for this project
    status: "Published"
  },
  {
    id: 4,
    title: "Mobile Fitness App",
    category: "Mobile Development",
    description: "A cross-platform fitness tracking application with workout plans, nutrition tracking, and social features. Built with React Native and Firebase.",
    image: "/projects/project4.jpg",
    pdf: "/pdfs/project4.pdf",
    status: "Draft" // This won't show in published view
  }
];

// ============================================
// PROJECTS LIST COMPONENT (Card Grid View)
// ============================================
export function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage first (for admin updates)
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];

    if (savedProjects.length > 0) {
      const published = savedProjects.filter(
        (project) => project.status === "Published"
      );
      setProjects(published);
    } else {
      // Fallback to the hardcoded data
      const published = projectsData.filter(
        (project) => project.status === "Published"
      );
      setProjects(published);
    }
  }, []);

  const openProject = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <section className="bg-[#050505] px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 uppercase tracking-[6px] text-gray-400">
          Selected Work
        </p>

        <h2 className="mb-20 text-6xl font-bold text-white md:text-8xl">
          Recent Projects
        </h2>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              onClick={() => openProject(project.id)}
              className="group relative cursor-pointer overflow-hidden rounded-[35px] border border-white/10 bg-[#0b0b0b] transition hover:border-purple-500"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/projects/fallback.jpg"}
                  alt={project.title}
                  className="h-[550px] w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />

                <div className="absolute left-8 top-8">
                  <span className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs uppercase tracking-[3px] text-white backdrop-blur-md">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-10">
                <h3 className="text-5xl font-bold text-white">
                  {project.title}
                </h3>

                <p className="mt-5 max-w-2xl text-lg text-gray-300">
                  {project.description}
                </p>

                <div className="mt-8 flex gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openProject(project.id);
                    }}
                    className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
                  >
                    View Project
                  </button>

                  {project.pdf && (
                    <a
                      href={project.pdf}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="rounded-xl bg-purple-600 px-6 py-3 text-white transition hover:bg-purple-700"
                    >
                      View PDF
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROJECT PREVIEW COMPONENT (Detailed View)
// ============================================
export function ProjectPreview() {
  const { id } = useParams();

  const project = useMemo(() => {
    // Check localStorage first
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const found = savedProjects.find((item) => String(item.id) === String(id));
    if (found) return found;
    
    // Fallback to hardcoded data
    return projectsData.find((item) => String(item.id) === String(id));
  }, [id]);

  useEffect(() => {
    document.title = project ? project.title : "Project Not Found";
  }, [project]);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-[#140b22] to-[#050505] text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Project Not Found</h1>
          <p className="mt-4 text-gray-400">
            This project does not exist or has been removed.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(168,85,247,.5)]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#030303] via-[#12081d] to-[#050505] text-white">
      <div className="grid h-full grid-cols-1 lg:grid-cols-2">
        {/* LEFT IMAGE */}
        <div className="sticky top-0 flex h-screen items-center justify-center bg-gradient-to-br from-[#050505] via-[#12081d] to-[#24104a] p-10">
          <img
            src={project.image || "/projects/fallback.jpg"}
            alt={project.title}
            className="max-h-[92vh] max-w-full rounded-[30px] border border-purple-500/30 object-contain shadow-[0_0_80px_rgba(168,85,247,.25)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_120px_rgba(168,85,247,.45)]"
          />
        </div>

        {/* RIGHT DETAILS */}
        <div className="h-screen overflow-y-auto bg-gradient-to-b from-[#0b0b0b] via-[#140b22] to-[#070707] px-12 py-16">
          <span className="inline-block rounded-full border border-purple-500/40 bg-purple-500/15 px-5 py-2 text-xs uppercase tracking-[3px] text-purple-300 backdrop-blur-md">
            {project.category}
          </span>

          <h1 className="mt-8 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-5xl font-bold text-transparent">
            {project.title}
          </h1>

          <p className="mt-8 whitespace-pre-line text-lg leading-9 text-gray-300">
            {project.description}
          </p>

          {project.pdf && (
            <a
              href={project.pdf}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-fuchsia-600 hover:to-purple-600 hover:shadow-[0_0_35px_rgba(168,85,247,.55)]"
            >
              📄 View PDF
            </a>
          )}

          <div className="mt-16 rounded-3xl border border-purple-500/20 bg-white/5 p-8 backdrop-blur-md">
            <h2 className="mb-8 text-2xl font-semibold text-purple-300">
              Project Information
            </h2>

            <div className="space-y-8">
              <div>
                <p className="text-sm uppercase tracking-[4px] text-gray-500">
                  Category
                </p>
                <p className="mt-2 text-xl font-medium text-white">
                  {project.category}
                </p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[4px] text-gray-500">
                  Project Title
                </p>
                <p className="mt-2 text-xl font-medium text-white">
                  {project.title}
                </p>
              </div>
            </div>

            <Link
              to="/"
              className="mt-12 inline-flex items-center rounded-xl border border-purple-500/40 bg-purple-500/10 px-8 py-4 font-semibold text-purple-300 transition-all duration-300 hover:scale-105 hover:border-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-fuchsia-600 hover:text-white hover:shadow-[0_0_35px_rgba(168,85,247,.55)]"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// DEFAULT EXPORT (Main Component)
// ============================================
const AllProjects = () => {
  // This component can be used as a container
  // but we're exporting individual components for routing
  return null;
};

export default AllProjects;