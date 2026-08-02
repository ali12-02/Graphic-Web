import { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import AddProjectModal from "./AddProjectModal";
import ProjectTable from "./ProjectTable";
import { Plus, Search } from "lucide-react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [editingProject, setEditingProject] = useState(null);

  // Load Projects
  const loadProjects = () => {
    const savedProjects =
      JSON.parse(localStorage.getItem("projects")) || [];

    setProjects(savedProjects);
  };

  useEffect(() => {
    loadProjects();

    window.addEventListener("projectsUpdated", loadProjects);

    return () => {
      window.removeEventListener(
        "projectsUpdated",
        loadProjects
      );
    };
  }, []);

  // Save / Update
  const handleSave = (project) => {
    let updatedProjects = [];

    if (editingProject) {
      updatedProjects = projects.map((item) =>
        item.id === editingProject.id
          ? {
              ...item,
              ...project,
              id: editingProject.id,
            }
          : item
      );
    } else {
      updatedProjects = [
        ...projects,
        {
          id: Date.now(),
          title: project.title,
          category: project.category,
          description: project.description,
          image: project.image || "",
          pdf: project.pdf || "",
          status: project.status || "Published",
          featured: project.featured || false,
          createdAt:
            project.createdAt ||
            new Date().toISOString(),
        },
      ];
    }

    setProjects(updatedProjects);

    localStorage.setItem(
      "projects",
      JSON.stringify(updatedProjects)
    );

    // Dashboard & RecentProjects update
    window.dispatchEvent(
      new Event("projectsUpdated")
    );

    setEditingProject(null);
    setIsModalOpen(false);
  };

  // Delete
  const handleDelete = (id) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== id
    );

    setProjects(updatedProjects);

    localStorage.setItem(
      "projects",
      JSON.stringify(updatedProjects)
    );

    window.dispatchEvent(
      new Event("projectsUpdated")
    );
  };

  // Edit
  const handleEdit = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setEditingProject(null);
    setIsModalOpen(false);
  };

  // Search
  const filteredProjects = projects.filter((project) => {
    const title = project.title || "";
    const category = project.category || "";

    return (
      title.toLowerCase().includes(search.toLowerCase()) ||
      category.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Projects
          </h1>

          <p className="mt-2 text-gray-400">
            Manage your portfolio projects
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProject(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-white transition hover:bg-purple-700"
        >
          <Plus size={18} />
          New Project
        </button>

      </div>

      {/* Search */}
      <div className="mb-6 flex items-center rounded-2xl border border-white/10 bg-[#111] px-4 py-3">

        <Search
          size={18}
          className="text-gray-500"
        />

        <input
          type="text"
          placeholder="Search project..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="ml-3 w-full bg-transparent text-white placeholder:text-gray-500 outline-none"
        />

      </div>

      {/* Table */}
      <ProjectTable
        projects={filteredProjects}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* Modal */}
      <AddProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        editProject={editingProject}
      />
    </DashboardLayout>
  );
}

export default Projects;