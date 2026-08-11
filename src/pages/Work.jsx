import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 🟢 Import useNavigate
import { ArrowLeft, FolderOpen, ExternalLink } from "lucide-react";

function Work() {
  const navigate = useNavigate(); // 🟢 Initialize navigate
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = () => {
      const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
      setProjects(savedProjects);
      setLoading(false);
    };

    loadProjects();

    const handleUpdate = () => {
      const updatedProjects = JSON.parse(localStorage.getItem("projects")) || [];
      setProjects(updatedProjects);
    };

    window.addEventListener("projectsUpdated", handleUpdate);
    return () => window.removeEventListener("projectsUpdated", handleUpdate);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white py-20 lg:py-32 px-6 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-violet-600/20 blur-[170px]" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[170px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-600/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 lg:mb-12 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        <div className="text-center mb-16">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-4 bg-gradient-to-r from-white via-purple-200 to-fuchsia-200 bg-clip-text text-transparent">
            Our Work
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of our latest creative projects.
          </motion.p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-t-purple-500 border-white/10 rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <FolderOpen size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No projects found.</p>
            <p className="text-sm mt-2">Go to Admin Panel &gt; Projects to add your work!</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                // 🟢 CLICK TO NAVIGATE TO PREVIEW PAGE
                onClick={() => navigate(`/project/${project.id}`)}
                className="group relative bg-[#0f0f0f] border border-white/5 rounded-3xl overflow-hidden hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.1)] transition-all duration-300 cursor-pointer" // 🟢 Added cursor-pointer
              >
                <div className="relative aspect-video overflow-hidden bg-[#1a1a1a]">
                  <img 
                    src={project.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent opacity-60"></div>
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${project.status === "Published" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"}`}>
                      {project.status || "Draft"}
                    </span>
                  </div>
                </div>
                <div className="p-6 relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {project.title || "Untitled Project"}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {project.description || "No description available."}
                  </p>
                  <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs text-purple-400 font-medium uppercase tracking-wider">VIEW PROJECT</span>
                    <ExternalLink size={16} className="text-gray-500 group-hover:text-purple-400 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Work;