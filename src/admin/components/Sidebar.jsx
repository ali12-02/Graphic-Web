import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  FolderTree,
  Settings,
  Plus,
  Tags,
  Palette,
  FileText,
  Search, // ✅ Icon for Empty State
} from "lucide-react";

// 🟢 CHANGE 1: searchTerm prop accept kiya
function Sidebar({ searchTerm = "" }) {
  const navigate = useNavigate();
  const [theme, setTheme] = useState({
    adminSidebar: "#0A0A0A",
    adminSidebarHeading: "#ffffff",
    adminAccent: "#a855f7",
    adminMenuText: "#9ca3af",
    adminBorder: "#ffffff10",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("themeConfig"));
    if (saved) {
      setTheme({
        adminSidebar: saved.adminSidebar || "#0A0A0A",
        adminSidebarHeading: saved.adminSidebarHeading || "#ffffff",
        adminAccent: saved.adminAccent || "#a855f7",
        adminMenuText: saved.adminMenuText || "#9ca3af",
        adminBorder: saved.adminBorder || "#ffffff10",
      });
    }

    const handleGlobalUpdate = () => {
      const updated = JSON.parse(localStorage.getItem("themeConfig"));
      if (updated) {
        setTheme({
          adminSidebar: updated.adminSidebar || "#0A0A0A",
          adminSidebarHeading: updated.adminSidebarHeading || "#ffffff",
          adminAccent: updated.adminAccent || "#a855f7",
          adminMenuText: updated.adminMenuText || "#9ca3af",
          adminBorder: updated.adminBorder || "#ffffff10",
        });
      }
    };

    window.addEventListener("globalThemeUpdated", handleGlobalUpdate);
    return () => window.removeEventListener("globalThemeUpdated", handleGlobalUpdate);
  }, []);

  // 🟢 CHANGE: Removed Stats & Button Manager from menu
  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Projects", icon: FolderKanban, path: "/dashboard/projects" },
    { name: "Add Project", icon: Plus, path: "/dashboard/add-project" },
    { name: "Offers", icon: Tags, path: "/dashboard/offers" },
    { name: "Theme Settings", icon: Palette, path: "/dashboard/theme-settings" },
    { name: "Content Manager", icon: FileText, path: "/dashboard/content-manager" },
    { name: "Categories", icon: FolderTree, path: "/dashboard/categories" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  // 🟢 CHANGE 2: Filter menu items based on searchTerm
  const filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside 
      className="w-72 h-full flex flex-col border-r relative shadow-2xl"
      style={{ 
        backgroundColor: theme.adminSidebar, 
        borderColor: theme.adminBorder || "#ffffff10" 
      }}
    >
      {/* Decorative Glass Overlay for a 3D premium depth effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/50 pointer-events-none"></div>

      {/* Glowing top ambient light */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 rounded-full blur-[60px] opacity-20 pointer-events-none"
        style={{ backgroundColor: theme.adminAccent }}
      ></div>

      {/* Header / Logo Section */}
      <div className="p-8 border-b flex-shrink-0 relative z-10" style={{ borderColor: theme.adminBorder || "#ffffff10" }}>
        <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: theme.adminSidebarHeading }}>
          KREATIVE <span className="font-light opacity-70">CMS</span>
        </h1>
        {/* Premium gradient divider under logo */}
        <div 
          className="w-12 h-1 mt-3 rounded-full"
          style={{ background: `linear-gradient(to right, ${theme.adminAccent}, #ffffff60)` }}
        ></div>
        <p className="mt-3 text-xs tracking-wider uppercase" style={{ color: theme.adminMenuText }}>
          Graphic Web Administrator
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-5 space-y-1 overflow-y-auto relative z-10">
        
        {/* 🟢 CHANGE 3: Agar filteredMenu empty hai to message dikhayen */}
        {filteredMenu.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100%-50px)] text-gray-500 opacity-70 mt-10">
            <Search size={40} className="mb-3 opacity-20" />
            <p className="text-sm font-medium">No results found</p>
            <p className="text-xs text-gray-600 mt-1">Try adjusting your search</p>
          </div>
        ) : (
          filteredMenu.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.name}>
                <NavLink to={item.path} end={item.path === "/dashboard"}>
                  {({ isActive }) => (
                    <div
                      className={`group relative flex cursor-pointer items-center gap-4 rounded-2xl px-5 py-3.5 font-medium transition-all duration-300 ease-out active:scale-95 ${
                        isActive 
                          ? `text-white shadow-lg scale-[1.02]` 
                          : "hover:translate-x-1 hover:scale-[1.02] hover:text-white"
                      }`}
                      style={{
                        background: isActive 
                          ? `linear-gradient(135deg, ${theme.adminAccent}, ${theme.adminAccent}cc)` 
                          : "transparent",
                        boxShadow: isActive 
                          ? `0 8px 32px ${theme.adminAccent}40` 
                          : "none",
                        color: isActive ? "#ffffff" : theme.adminMenuText,
                      }}
                    >
                      {/* Left Active Indicator Bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"></span>
                      )}

                      {/* Massive Glow behind active icon */}
                      {isActive && (
                        <div 
                          className="absolute inset-0 rounded-2xl blur-xl opacity-30 pointer-events-none"
                          style={{ backgroundColor: theme.adminAccent }}
                        ></div>
                      )}

                      {/* Neon Hover Glow behind inactive items */}
                      {!isActive && (
                        <div 
                          className="absolute inset-0 rounded-2xl bg-purple-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{ backgroundColor: theme.adminAccent }}
                        ></div>
                      )}
                      
                      <Icon 
                        size={20} 
                        className={`transition-all duration-300 relative z-10 ${isActive ? "rotate-3 scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" : "group-hover:rotate-6 group-hover:scale-110"}`} 
                      />
                      <span className="relative z-10">{item.name}</span>
                    </div>
                  )}
                </NavLink>
                
                {/* Subtle divider between items (except last) */}
                {index !== filteredMenu.length - 1 && (
                  <div 
                    className="mx-5 my-1 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(to right, transparent, ${theme.adminBorder}, transparent)` }}
                  ></div>
                )}
              </div>
            );
          })
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;