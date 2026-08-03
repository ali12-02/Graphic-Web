import { useEffect, useState } from "react";

import DashboardLayout from "../layout/DashboardLayout";

import StatCard from "../components/StatCard";
import RecentProjects from "../components/RecentProjects";
import QuickActions from "../components/QuickActions";

function Dashboard() {
  const [projects, setProjects] = useState([]);

  // Load Projects
  const loadProjects = () => {
    const savedProjects =
      JSON.parse(localStorage.getItem("projects")) || [];

    setProjects(savedProjects);
  };

  useEffect(() => {
    loadProjects();

    // Listen for updates
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

  // Statistics
  const totalProjects = projects.length;

  const publishedProjects = projects.filter(
    (project) => project.status === "Published"
  ).length;

  const draftProjects = projects.filter(
    (project) => project.status === "Draft"
  ).length;

  const featuredProjects = projects.filter(
    (project) => project.featured === true
  ).length;

  return (
    <DashboardLayout>
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/3 h-96 w-96 rounded-full bg-purple-600/20 blur-[180px]" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[180px]" />
      </div>

      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-400">
          Welcome back, Mohsin 👋
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Projects"
          value={totalProjects}
        />

        <StatCard
          title="Published"
          value={publishedProjects}
        />

        <StatCard
          title="Draft"
          value={draftProjects}
        />

        <StatCard
          title="Featured"
          value={featuredProjects}
        />
      </div>

      {/* Bottom Section */}
      <div className="grid gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentProjects />
        </div>

        <div>
          <QuickActions />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;