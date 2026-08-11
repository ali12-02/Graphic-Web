import { useState, useEffect } from "react"; // 🟢 Changed useMemo to useState
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Folder, ExternalLink, Sparkles, FileText, Wrench, User, Monitor, PenTool } from "lucide-react";

function ProjectPreview() {
  const { id } = useParams();
  const [project, setProject] = useState(null); // 🟢 Using state

  useEffect(() => {
    // 🟢 Fetch project from localStorage safely
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const found = savedProjects.find((item) => String(item.id) === String(id));
    setProject(found || null);
  }, [id]);

  useEffect(() => {
    if (project) {
      document.title = project.title || "Project";
    } else {
      document.title = "Project Not Found";
    }
    window.scrollTo(0, 0);
  }, [project]);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-[#140b22] to-[#050505] text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Project Not Found</h1>
          <p className="mt-4 text-gray-400">This project does not exist.</p>
          <Link to="/" className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(168,85,247,.5)]">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -100 }} // 🟢 Added exit for AnimatePresence compatibility
      transition={{ duration: 0.4, ease: "easeInOut" }} 
      className="min-h-screen bg-[#050505] text-white relative"
    >
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-600/10 blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <Link to="/work" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 lg:mb-12 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Portfolio</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE */}
          <div className="lg:col-span-8 space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-white via-purple-200 to-fuchsia-200 bg-clip-text text-transparent drop-shadow-lg">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                  <Folder size={14} className="text-purple-400" /> {project.category}
                </span>
                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                  <Calendar size={14} className="text-purple-400" /> 
                  {new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 w-fit backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-xs font-medium">{project.status === "Published" ? "Published" : "Draft"}</span>
            </div>

            {/* COVER IMAGE */}
            <div className="relative group rounded-3xl overflow-hidden bg-[#0f0f0f] border border-white/10 shadow-2xl shadow-purple-900/20">
              <div className="bg-[#1a1a1a] p-4 lg:p-8 flex items-center justify-center min-h-[400px] lg:min-h-[500px] relative">
                <img 
                  src={project.image && project.image !== "" ? project.image : "/projects/fallback.jpg"} 
                  alt={project.title} 
                  className="w-full h-auto max-h-[70vh] object-contain rounded-2xl transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none"></div>
              </div>
              <a href={project.image} target="_blank" rel="noopener noreferrer" className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2.5 bg-black/70 backdrop-blur-md border border-white/20 rounded-full text-gray-300 hover:bg-black hover:text-white hover:border-purple-400 transition-all z-10">
                <ExternalLink size={15} /> <span className="text-xs">View Full</span>
              </a>
            </div>

            {/* GALLERY IMAGES */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h3 className="text-xl font-bold text-white">Project Gallery</h3>
                  <span className="text-xs text-gray-400">{project.gallery.length} Images</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.gallery.map((imgUrl, index) => (
                    <div key={index} className="relative group/image aspect-square rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/5 hover:border-purple-500/30 transition">
                      <img src={imgUrl} alt={`Gallery ${index}`} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                      <a href={imgUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                        <ExternalLink size={20} className="text-white" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-600/10 blur-[50px] group-hover:scale-150 transition duration-500 pointer-events-none"></div>
              <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2 relative z-10">
                <Sparkles size={14} className="text-purple-400" /> About This Project
              </h3>
              <p className="text-lg leading-relaxed text-gray-300 font-light relative z-10">{project.description}</p>
            </div>

            {/* PDF LINK */}
            {project.pdf && (
              <div className="pt-2">
                <a 
                  href={project.pdf} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-3.5 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] shadow-lg shadow-purple-900/30"
                >
                  <FileText size={18} /> View Project PDF
                </a>
              </div>
            )}

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-10 h-fit">
            {/* OWNERS */}
            <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg">
              <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Owners</h4>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition cursor-default">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-500 flex items-center justify-center text-white font-bold">K</div>
                  <div><p className="text-sm font-medium text-white">Kreative Art & Design</p><p className="text-xs text-gray-500">Faisalabad, Pakistan</p></div>
                </div>
                <span className="text-xs text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full">Follow</span>
              </div>
            </div>

            {/* TOOLS */}
            <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg">
              <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Tools Used</h4>
              <div className="space-y-3">
                {project.tools && project.tools.length > 0 ? (
                  project.tools.map((tool, index) => (
                    <div key={index} className="flex items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/5 hover:border-purple-500/30 transition">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                        {tool.toLowerCase().includes('photoshop') && <Monitor size={16} className="text-blue-400" />}
                        {tool.toLowerCase().includes('illustrator') && <PenTool size={16} className="text-blue-400" />}
                        {tool.toLowerCase().includes('figma') && <User size={16} className="text-purple-400" />}
                        {!tool.toLowerCase().includes('photoshop') && !tool.toLowerCase().includes('illustrator') && !tool.toLowerCase().includes('figma') && <Wrench size={16} className="text-gray-400" />}
                      </div>
                      <span className="text-sm text-white">{tool}</span>
                    </div>
                  ))
                ) : (
                  <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-center"><span className="text-sm text-gray-500">No tools selected</span></div>
                )}
              </div>
            </div>

            {/* CREATIVE FIELDS */}
            <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg">
              <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Creative Fields</h4>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-black/40 border border-white/10 text-gray-300 px-3 py-1.5 rounded-full hover:border-purple-400 transition">Graphic Design</span>
                <span className="text-xs bg-black/40 border border-white/10 text-gray-300 px-3 py-1.5 rounded-full hover:border-purple-400 transition">Brand Identity</span>
                <span className="text-xs bg-black/40 border border-white/10 text-gray-300 px-3 py-1.5 rounded-full hover:border-purple-400 transition">UI/UX</span>
              </div>
            </div>

            {/* DETAILS */}
            <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg">
              <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Project Details</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-gray-500">Published</span><span className="text-white">{new Date(project.createdAt).toLocaleDateString()}</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-gray-500">Status</span><span className="text-green-400">{project.status}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Category</span><span className="text-white">{project.category}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectPreview;