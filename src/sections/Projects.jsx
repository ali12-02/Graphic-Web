import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultProjects from "../data/projects.json";

function Projects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedProjects =
      JSON.parse(localStorage.getItem("projects")) || [];

    if (savedProjects.length > 0) {
      const published = savedProjects.filter(
        (project) => project.status === "Published"
      );

      setProjects(published);
    } else {
      setProjects(defaultProjects);
    }
  }, []);

  const openProject = (projectId) => {
    const url = `${window.location.origin}/project/${projectId}`;
    window.open(url, "_blank");
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
                  src={
                    project.image && project.image !== ""
                      ? project.image
                      : "/projects/project1.jpg"
                  }
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

export default Projects;