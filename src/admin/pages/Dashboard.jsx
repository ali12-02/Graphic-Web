import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // 🟢 Import Framer Motion
import DashboardLayout from "../layout/DashboardLayout";
import StatCard from "../components/StatCard";
import RecentProjects from "../components/RecentProjects";
import QuickActions from "../components/QuickActions";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  
  const [theme, setTheme] = useState({
    adminCardBg: "#111111",
    adminBorder: "#ffffff10",
  });

  const loadProjects = () => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(savedProjects);
  };

  useEffect(() => {
    loadProjects();
    window.addEventListener("projectsUpdated", loadProjects);

    const savedTheme = JSON.parse(localStorage.getItem("themeConfig"));
    if (savedTheme) {
      setTheme({
        adminCardBg: savedTheme.adminCardBg || "#111111",
        adminBorder: savedTheme.adminBorder || "#ffffff10",
      });
    }

    const handleThemeUpdate = () => {
      const updatedTheme = JSON.parse(localStorage.getItem("themeConfig"));
      if (updatedTheme) {
        setTheme({
          adminCardBg: updatedTheme.adminCardBg || "#111111",
          adminBorder: updatedTheme.adminBorder || "#ffffff10",
        });
      }
    };

    window.addEventListener("globalThemeUpdated", handleThemeUpdate);

    return () => {
      window.removeEventListener("projectsUpdated", loadProjects);
      window.removeEventListener("globalThemeUpdated", handleThemeUpdate);
    };
  }, []);

  const totalProjects = projects.length;
  const publishedProjects = projects.filter((project) => project.status === "Published").length;
  const draftProjects = projects.filter((project) => project.status === "Draft").length;
  const featuredProjects = projects.filter((project) => project.featured === true).length;

  // 🟢 Animation Configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Har item 0.1 second ke gap par aayega
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    },
  };

  return (
    <DashboardLayout>
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/3 h-96 w-96 rounded-full bg-purple-600/20 blur-[180px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[180px]" />
      </div>

      {/* 🟢 Animated Heading */}
      <motion.div 
        className="mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-gray-400">Welcome back, Mohsin 👋</p>
      </motion.div>

      {/* 🟢 Animated Statistics Grid */}
      <motion.div 
        className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Projects" 
            value={totalProjects} 
            style={{ backgroundColor: theme.adminCardBg, borderColor: theme.adminBorder }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard 
            title="Published" 
            value={publishedProjects} 
            style={{ backgroundColor: theme.adminCardBg, borderColor: theme.adminBorder }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard 
            title="Draft" 
            value={draftProjects} 
            style={{ backgroundColor: theme.adminCardBg, borderColor: theme.adminBorder }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard 
            title="Featured" 
            value={featuredProjects} 
            style={{ backgroundColor: theme.adminCardBg, borderColor: theme.adminBorder }}
          />
        </motion.div>
      </motion.div>

      {/* 🟢 Animated Bottom Section */}
      <motion.div 
        className="grid gap-8 xl:grid-cols-3"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        <div className="xl:col-span-2">
          <RecentProjects />
        </div>

        <div>
          <QuickActions />
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

export default Dashboard;