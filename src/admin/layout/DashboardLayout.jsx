import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout({ children }) {
  // Default premium dark colors agar settings save nahi hain
  const [theme, setTheme] = useState({
    adminCardBg: "#111111",
    adminTopbarBg: "#0a0a0a",
    adminSidebar: "#0a0a0a",
    adminBorder: "#ffffff10",
    webAccent: "#a855f7",
  });

  // 🟢 NEW: State for Search
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load from LocalStorage on mount
    const saved = JSON.parse(localStorage.getItem("themeConfig"));
    if (saved) {
      setTheme({
        adminCardBg: saved.adminCardBg || "#111111",
        adminTopbarBg: saved.adminTopbarBg || "#0a0a0a",
        adminSidebar: saved.adminSidebar || "#0a0a0a",
        adminBorder: saved.adminBorder || "#ffffff10",
        webAccent: saved.webAccent || "#a855f7",
      });
    }

    // Listen to live updates
    const handleGlobalUpdate = () => {
      const updated = JSON.parse(localStorage.getItem("themeConfig"));
      if (updated) {
        setTheme({
          adminCardBg: updated.adminCardBg || "#111111",
          adminTopbarBg: updated.adminTopbarBg || "#0a0a0a",
          adminSidebar: updated.adminSidebar || "#0a0a0a",
          adminBorder: updated.adminBorder || "#ffffff10",
          webAccent: updated.webAccent || "#a855f7",
        });
      }
    };

    window.addEventListener("globalThemeUpdated", handleGlobalUpdate);
    return () => window.removeEventListener("globalThemeUpdated", handleGlobalUpdate);
  }, []);

  return (
    // Outer Container - Dark Premium Canvas
    <div 
      className="flex min-h-screen relative" 
      style={{ 
        backgroundColor: theme.adminCardBg,
        backgroundImage: `radial-gradient(circle at 0% 0%, ${theme.webAccent}10 0%, transparent 50%)` // Subtle soft glow at top left
      }}
    >
      
      {/* Decorative Premium Glow Orb (Background art for premium feel) */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none blur-[120px] opacity-10"
        style={{ backgroundColor: theme.webAccent }}
      ></div>

      {/* 🟢 UPDATE: Search term pass kar rahe hain Sidebar ko */}
      <Sidebar searchTerm={searchTerm} />
      
      <div className="flex flex-1 flex-col overflow-hidden relative z-10">
        {/* Topbar with a subtle bottom glass line */}
        <div 
          className="flex-shrink-0 relative"
          style={{ 
            backgroundColor: theme.adminTopbarBg,
            borderBottom: `1px solid ${theme.adminBorder}`
          }}
        >
          {/* Topbar Glass Overlay for premium depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
          
          {/* 🟢 UPDATE: onSearch function pass kar rahe hain Topbar ko */}
          <Topbar onSearch={setSearchTerm} />
        </div>

        {/* Main Content Area */}
        <main 
          className="flex-1 overflow-y-auto p-6 lg:p-8 relative"
        >
          {/* Container for children with modern glass-like aesthetics */}
          <div className="max-w-7xl mx-auto relative">
            {/* Inner subtle gradient glow behind children */}
            <div 
              className="absolute inset-0 pointer-events-none rounded-3xl blur-[60px] opacity-20"
              style={{ backgroundColor: theme.webAccent }}
            ></div>
            
            {/* Children Content with a slightly lighter glass card feel */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;