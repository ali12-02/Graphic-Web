import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  FolderTree,
  Image,
  Briefcase,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    sessionStorage.clear();

    navigate("/admin", { replace: true });
  };

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Projects",
      icon: FolderKanban,
      path: "/dashboard/projects",
    },
    {
      name: "Categories",
      icon: FolderTree,
      path: "/dashboard/categories",
    },
    {
      name: "Gallery",
      icon: Image,
      path: "/dashboard/gallery",
    },
    {
      name: "Services",
      icon: Briefcase,
      path: "/dashboard/services",
    },
    {
      name: "Messages",
      icon: MessageSquare,
      path: "/dashboard/messages",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  return (
    <aside className="w-72 h-screen bg-[#0A0A0A] border-r border-white/10 flex flex-col">

      {/* Logo */}
      <div className="p-8 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white">
          KREATIVE CMS
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Graphic Web Administrator
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-5 space-y-3">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
            >
              {({ isActive }) => (
                <div
                  className={`group relative flex cursor-pointer items-center gap-4 rounded-2xl px-5 py-4 font-medium transition-all duration-300 ease-out active:scale-95 ${
                    isActive
                      ? "scale-[1.02] bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 text-white shadow-lg shadow-purple-600/30"
                      : "text-gray-400 hover:translate-x-2 hover:scale-[1.02] hover:bg-purple-600/10 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-white"></span>
                  )}

                  <Icon
                    size={21}
                    className={`transition-all duration-300 ${
                      isActive
                        ? "rotate-3 scale-110"
                        : "group-hover:rotate-12 group-hover:scale-125"
                    }`}
                  />

                  <span>{item.name}</span>
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-5">
        <button
          onClick={handleLogout}
          className="group flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-red-400 transition-all duration-300 hover:translate-x-2 hover:bg-red-500/10 active:scale-95"
        >
          <LogOut
            size={21}
            className="transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
          />

          <span className="font-medium">
            Logout
          </span>
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;