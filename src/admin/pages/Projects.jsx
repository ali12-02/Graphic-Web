import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 🟢 Import useNavigate

import DashboardLayout from "../layout/DashboardLayout";

import AddProjectModal from "../components/AddProjectModal";
import ProjectTable from "../components/ProjectTable";

function Projects() {
  const navigate = useNavigate(); // 🟢 Initialize navigate
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

    window.addEventListener(
      "projectsUpdated",
      loadProjects
    );

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
          id: Date.now().toString(),
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

    // Dashboard update
    window.dispatchEvent(
      new Event("projectsUpdated")
    );

    setEditingProject(null);
    setIsModalOpen(false);
  };

  // Toggle Featured
  const handleToggleFeatured = (id) => {
    const updatedProjects = projects.map((project) =>
      project.id === id
        ? { ...project, featured: !project.featured }
        : project
    );

    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    window.dispatchEvent(new Event("projectsUpdated"));
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
      {/* 🟢 Header with Button */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Projects
          </h1>

          <p className="mt-2 text-gray-400">
            Manage your portfolio projects
          </p>
        </div>
        
        {/* 🟢 UPDATED: Add Project Button (Redirects to Add Project Page) */}
        <button
          onClick={() => navigate("/dashboard/add-project")}
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-white transition hover:bg-purple-700 shadow-lg shadow-purple-900/30"
        >
          <Plus size={18} /> New Project
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
        onToggleFeatured={handleToggleFeatured}
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