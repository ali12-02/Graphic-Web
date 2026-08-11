import { Bell, Search, Globe, LogOut, X, CheckCircle, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function Topbar({ onSearch }) { 
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  
  // 🟢 NOTIFICATION STATES
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // To detect clicks outside

  // 🟢 THEME STATE (Live Site Button Colors Added)
  const [theme, setTheme] = useState({ 
    adminCardBg: "#111111", 
    adminBorder: "#ffffff10",
    webAccent: "#a855f7",
    liveSiteBtnBg: "#16a34a",   // 🟢 Default Green
    liveSiteBtnText: "#ffffff"  // 🟢 Default White
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("themeConfig"));
    if (saved) {
      setTheme({
        adminCardBg: saved.adminCardBg || "#111111",
        adminBorder: saved.adminBorder || "#ffffff10",
        webAccent: saved.webAccent || "#a855f7",
        liveSiteBtnBg: saved.liveSiteBtnBg || "#16a34a",
        liveSiteBtnText: saved.liveSiteBtnText || "#ffffff"
      });
    }

    const handleGlobalUpdate = () => {
      const updated = JSON.parse(localStorage.getItem("themeConfig"));
      if (updated) {
        setTheme({
          adminCardBg: updated.adminCardBg || "#111111",
          adminBorder: updated.adminBorder || "#ffffff10",
          webAccent: updated.webAccent || "#a855f7",
          liveSiteBtnBg: updated.liveSiteBtnBg || "#16a34a",
          liveSiteBtnText: updated.liveSiteBtnText || "#ffffff"
        });
      }
    };

    window.addEventListener("globalThemeUpdated", handleGlobalUpdate);
    return () => window.removeEventListener("globalThemeUpdated", handleGlobalUpdate);
  }, []);

  // 🟢 NOTIFICATION LOGIC: Jab koi project update ho
  useEffect(() => {
    const handleProjectUpdate = () => {
      const projects = JSON.parse(localStorage.getItem("projects")) || [];
      const newNotif = {
        id: Date.now(),
        title: "New Project Added",
        description: `"${projects[projects.length - 1]?.title || 'Untitled'}" has been added.`,
        time: new Date().toLocaleTimeString(),
        type: "project",
        read: false
      };
      setNotifications(prev => [newNotif, ...prev]);
    };

    window.addEventListener("projectsUpdated", handleProjectUpdate);
    return () => window.removeEventListener("projectsUpdated", handleProjectUpdate);
  }, []);

  // 🟢 Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // 🟢 Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // 🟢 Remove a notification
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/admin", { replace: true });
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchValue(val);
    // 🟢 FIX: Parent component ko search value bhejna
    if (onSearch) {
      onSearch(val);
    }
  };

  // 🔥 Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header 
      className="sticky top-0 z-40 flex items-center justify-between border-b px-8 py-5 transition-all duration-300 group"
      style={{ 
        backgroundColor: `${theme.adminCardBg}cc`, 
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderColor: theme.adminBorder,
        boxShadow: `0 4px 30px rgba(0, 0, 0, 0.5)`
      }}
    >
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-60"></div>

      <div />
      <div className="flex items-center gap-4">
        
        {/* 🟢 UPDATED: Visit Live Site Button (Now uses Theme Colors) */}
        <button 
          onClick={() => navigate('/')} 
          className="group relative flex items-center gap-2 rounded-xl border px-5 py-2.5 transition-all duration-300 active:scale-95 overflow-hidden"
          style={{ 
            backgroundColor: theme.liveSiteBtnBg,
            color: theme.liveSiteBtnText,
            borderColor: `${theme.liveSiteBtnBg}60`
          }}
        >
          <div className="absolute inset-0 bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <Globe size={18} className="relative z-10 transition-transform group-hover:rotate-12 group-hover:scale-110" />
          <span className="relative z-10 text-sm font-medium hidden sm:block">Visit Live Site</span>
        </button>

        {/* Search Bar */}
        <div className={`relative flex w-72 items-center rounded-xl border px-4 py-2.5 transition-all duration-300 ease-in-out shadow-sm ${isFocused ? "w-80 shadow-[0_0_35px_-8px] scale-[1.02]" : ""}`} style={{ borderColor: isFocused ? theme.webAccent : theme.adminBorder, backgroundColor: isFocused ? `${theme.adminCardBg}` : `${theme.adminCardBg}dd`, boxShadow: isFocused ? `0 0 35px -5px ${theme.webAccent}60` : "0 2px 10px rgba(0,0,0,0.2)" }}>
          <Search size={18} className={`transition-all duration-300 ${isFocused ? "text-purple-400 scale-110" : "text-gray-500"}`} />
          <input 
            type="text" 
            placeholder="Search menu items..." 
            value={searchValue} 
            onChange={handleSearchChange} 
            onFocus={() => setIsFocused(true)} 
            onBlur={() => setIsFocused(false)} 
            className="ml-3 w-full bg-transparent text-white placeholder:text-gray-500 outline-none text-sm" 
          />
          <span className={`text-[10px] border border-white/10 bg-white/5 px-2 py-0.5 rounded ml-auto hidden sm:block transition-all duration-300 ${isFocused ? "opacity-40 scale-95" : "opacity-100"}`}>⌘K</span>
        </div>

        {/* 🔥 WORKING NOTIFICATION BELL 🔥 */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 hover:border-purple-500/80 hover:bg-purple-500/10 hover:shadow-[0_0_25px_-5px] hover:shadow-purple-500/30 active:scale-90"
            style={{ borderColor: theme.adminBorder, backgroundColor: theme.adminCardBg }}
          >
            <Bell size={20} className="text-white/80 transition-transform hover:rotate-12" />
            
            {/* 🔴 Notification Badge (Unread Count) */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-[#111] animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* 🔥 PREMIUM NOTIFICATION DROPDOWN MENU */}
          {isDropdownOpen && (
            <div 
              className="absolute right-0 mt-4 w-80 rounded-2xl border shadow-2xl overflow-hidden z-50"
              style={{ 
                backgroundColor: theme.adminCardBg, 
                borderColor: theme.adminBorder,
                boxShadow: `0 20px 60px rgba(0,0,0,0.8)`
              }}
            >
              <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: theme.adminBorder }}>
                <h4 className="font-bold text-white">Notifications</h4>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                    <CheckCircle size={40} className="opacity-20 mb-2" />
                    <p className="text-sm">All caught up!</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      className={`group flex items-start gap-3 rounded-xl p-3 transition-all duration-200 ${notif.read ? 'opacity-60 hover:opacity-100' : 'bg-purple-500/5'}`}
                      style={{ borderColor: theme.adminBorder }}
                    >
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                        <PlusCircle size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{notif.title}</p>
                        <p className="text-xs text-gray-400">{notif.description}</p>
                        <p className="mt-1 text-[10px] text-gray-500">{notif.time}</p>
                      </div>
                      <button 
                        onClick={() => removeNotification(notif.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-red-400"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-3 rounded-xl border px-4 py-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5" style={{ borderColor: theme.adminBorder, backgroundColor: theme.adminCardBg, boxShadow: `0 4px 15px rgba(0,0,0,0.4)` }}>
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 font-bold text-white shadow-md">
            <div className="absolute inset-0 rounded-full border-2 border-purple-500/50 animate-pulse"></div>
            M
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2" style={{ ringColor: theme.adminCardBg }}></span>
          </div>
          <div className="hidden sm:block">
            <h4 className="text-sm font-semibold text-white leading-tight">Mohsin</h4>
            <p className="text-[10px] text-gray-500 tracking-wider uppercase">Administrator</p>
          </div>
        </div>

        {/* Logout */}
        <button onClick={handleLogout} className="group relative flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white hover:border-red-400 hover:shadow-[0_0_25px_rgba(239,68,68,0.25)] active:scale-95 overflow-hidden">
          <div className="absolute inset-0 bg-red-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <LogOut size={18} className="relative z-10 transition-transform group-hover:-translate-x-1" />
          <span className="relative z-10 text-sm font-medium hidden sm:block">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Topbar;