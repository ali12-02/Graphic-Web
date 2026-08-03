import { useEffect, useState } from "react";

function RecentProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const savedProjects =
      JSON.parse(localStorage.getItem("projects")) || [];

    setProjects(savedProjects);
  }, []);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#111] p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Recent Projects
      </h2>

      {projects.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          No projects found.
        </div>
      ) : (
        <div className="space-y-4">
          {projects
            .slice()
            .reverse()
            .slice(0, 5)
            .map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-[#161616] px-4 py-3"
              >
                <div>
                  <h3 className="font-medium text-white">
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {project.category}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    project.status === "Published"
                      ? "bg-green-500/15 text-green-400"
                      : "bg-yellow-500/15 text-yellow-400"
                  }`}
                >
                  {project.status}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default RecentProjects;