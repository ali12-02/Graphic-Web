import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ============================================
// STATIC FALLBACK DATA
// ============================================
const projectsData = [
  {
    id: 1,
    title: "EcoTrack Dashboard",
    category: "Web Application",
    description: "A comprehensive environmental monitoring dashboard.",
    image: "/projects/project1.jpg", 
    pdf: "/pdfs/project1.pdf",       
    status: "Published"               
  },
  {
    id: 2,
    title: "Neural Design System",
    category: "UI/UX Framework",
    description: "A modern, AI-powered design system.",
    image: "/projects/project2.jpg",
    pdf: "/pdfs/project2.pdf",
    status: "Published"
  },
  {
    id: 3,
    title: "Portfolio AI Assistant",
    category: "Machine Learning",
    description: "An intelligent chatbot that helps creatives build their portfolios.",
    image: "/projects/project3.jpg",
    pdf: null, 
    status: "Published"
  },
  {
    id: 4,
    title: "Mobile Fitness App",
    category: "Mobile Development",
    description: "A cross-platform fitness tracking application with workout plans.",
    image: "/projects/project4.jpg",
    pdf: "/pdfs/project4.pdf",
    status: "Draft" 
  }
];

// ============================================
// PROJECTS LIST COMPONENT (Behance Layout + Clear Text)
// ============================================
export function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  // 🟢 FUNCTION TO LOAD PROJECTS
  const loadProjects = () => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];

    if (savedProjects.length > 0) {
      const published = savedProjects.filter(
        (project) => project.status === "Published"
      );
      setProjects(published);
    } else {
      const published = projectsData.filter(
        (project) => project.status === "Published"
      );
      setProjects(published);
    }
  };

  // 🟢 INITIAL LOAD + LISTEN FOR UPDATES
  useEffect(() => {
    loadProjects();

    const handleProjectsUpdate = () => {
      loadProjects();
    };

    window.addEventListener("projectsUpdated", handleProjectsUpdate);

    return () => {
      window.removeEventListener("projectsUpdated", handleProjectsUpdate);
    };
  }, []);

  const openProject = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <section id="recent-projects" className="bg-[#050505] px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row items-end justify-between gap-4 border-b border-white/5 pb-8">
          <div>
            <p className="uppercase tracking-[6px] text-gray-400 text-sm mb-3">Selected Work</p>
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">Recent Projects</h2>
          </div>
        </div>

        {/* 🟢 FINAL BEHANCE GRID WITH CLEAN TEXT BELOW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => {
            // Behance style size mix
            const isWide = index % 3 === 0;      // Card 1 is Wide
            const isTall = index % 3 === 1;      // Card 2 is Tall
            const isSquare = index % 3 === 2;    // Card 3 is Square

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                onClick={() => openProject(project.id)}
                className="group relative cursor-pointer flex flex-col"
              >
                {/* 🟢 IMAGE CONTAINER (Behance Sizes) */}
                <div
                  className={`overflow-hidden rounded-2xl bg-[#1a1a1a] border border-white/5 hover:border-purple-500/50 transition-all duration-300 ${
                    isWide ? "aspect-[2/1]" : 
                    isTall ? "aspect-[3/4]" : 
                    "aspect-square"
                  }`}
                >
                  <img
                    src={project.image || "/projects/fallback.jpg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                {/* 🟢 TEXT CONTENT (Exactly like you wanted, under the image) */}
                <div className="mt-4 text-left">
                  {/* Meta Row */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                      {project.category}
                    </span>
                    <span className="text-[11px] text-green-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                      {project.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-1 text-gray-400 leading-relaxed line-clamp-2 text-sm">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">No published projects yet. Stay tuned!</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================
// DEFAULT EXPORT
// ============================================
const AllProjects = () => {
  return null;
};

export default AllProjects;