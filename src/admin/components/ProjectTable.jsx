import { Pencil, Trash2, Star, Eye, FolderOpen } from "lucide-react"; // 🟢 FolderOpen Import Add Kiya
import { Link } from "react-router-dom";

function ProjectTable({ projects = [], onDelete, onEdit, onToggleFeatured }) {
  // 🟢 Safe check: Agar projects undefined ya empty hai toh message dikhayein
  const hasProjects = projects && projects.length > 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-lg">
      <table className="w-full">
        <thead className="border-b border-white/10 bg-[#181818]">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Project
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Category
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Status
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Featured
            </th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/5">
          {!hasProjects ? (
            <tr>
              <td colSpan="5" className="px-6 py-16 text-center text-gray-500">
                <div className="flex flex-col items-center gap-2">
                  <FolderOpen size={40} className="opacity-20" />
                  <p className="text-lg font-medium">No projects added yet.</p>
                  <p className="text-sm text-gray-600">Click "New Project" to get started.</p>
                </div>
              </td>
            </tr>
          ) : (
            projects.map((project) => (
              <tr
                key={project.id}
                className="border-b border-white/5 transition-all duration-300 hover:bg-white/5 last:border-0"
              >
                <td className="px-6 py-5 font-medium text-white">
                  {project.title}
                </td>
                <td className="px-6 py-5 text-gray-300">
                  {project.category}
                </td>
                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      project.status === "Published"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                
                {/* Featured Column */}
                <td className="px-6 py-5">
                  <button
                    onClick={() => onToggleFeatured(project.id)}
                    className={`rounded-xl p-2 transition-all duration-300 hover:scale-110 active:scale-95 ${
                      project.featured 
                        ? "text-yellow-400 hover:bg-yellow-500/10" 
                        : "text-gray-500 hover:bg-white/5"
                    }`}
                    title={project.featured ? "Unmark Featured" : "Mark as Featured"}
                  >
                    <Star size={18} className={project.featured ? "fill-yellow-400" : ""} />
                  </button>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-end gap-3">
                    
                    {/* View Live Project (Eye Icon) */}
                    <Link
                      to={`/project/${project.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl p-2 text-green-400 transition-all duration-300 hover:bg-green-500/10 hover:scale-110 active:scale-95"
                      title="View Live Project"
                    >
                      <Eye size={18} />
                    </Link>

                    {/* Edit */}
                    <button
                      onClick={() => onEdit(project)}
                      className="rounded-xl p-2 text-blue-400 transition-all duration-300 hover:bg-blue-500/10 hover:scale-110 active:scale-95"
                      title="Edit Project"
                    >
                      <Pencil size={18} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => onDelete(project.id)}
                      className="rounded-xl p-2 text-red-400 transition-all duration-300 hover:bg-red-500/10 hover:scale-110 active:scale-95"
                      title="Delete Project"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectTable;