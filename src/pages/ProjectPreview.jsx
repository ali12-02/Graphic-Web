import { useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ProjectPreview() {
  const { id } = useParams();

  const project = useMemo(() => {
    const savedProjects =
      JSON.parse(localStorage.getItem("projects")) || [];

    return savedProjects.find(
      (item) => String(item.id) === String(id)
    );
  }, [id]);

  useEffect(() => {
    document.title = project ? project.title : "Project";
  }, [project]);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-[#140b22] to-[#050505] text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold">
            Project Not Found
          </h1>

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
            src={
              project.image && project.image !== ""
                ? project.image
                : "/projects/project1.jpg"
            }
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

export default ProjectPreview;