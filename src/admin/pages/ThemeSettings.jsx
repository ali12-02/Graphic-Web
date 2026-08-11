import { useState, useEffect } from "react";
import { Save, Globe, ShieldCheck, Layout, Monitor, Menu, Search, User, Square } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function ThemeSettings() {
  const defaultSettings = {
    webBg: "#050505",
    webText: "#ffffff",
    webAccent: "#a855f7",
    
    adminSidebar: "#0A0A0A",
    adminSidebarHeading: "#ffffff",
    adminMenuText: "#9ca3af",
    adminActiveBg: "#a855f7",
    adminActiveText: "#ffffff",
    
    adminTopbarBg: "#050505",
    adminSearchBg: "#111111",
    adminSearchText: "#ffffff",
    adminProfileBg: "#111111",
    adminProfileText: "#ffffff",
    
    adminCardBg: "#111111",
    adminBorder: "#ffffff10",
  };

  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("themeConfig"));
    if (saved) {
      setSettings({
        webBg: saved.webBg || defaultSettings.webBg,
        webText: saved.webText || defaultSettings.webText,
        webAccent: saved.webAccent || defaultSettings.webAccent,
        
        adminSidebar: saved.adminSidebar || defaultSettings.adminSidebar,
        adminSidebarHeading: saved.adminSidebarHeading || defaultSettings.adminSidebarHeading,
        adminMenuText: saved.adminMenuText || defaultSettings.adminMenuText,
        adminActiveBg: saved.adminActiveBg || defaultSettings.adminActiveBg,
        adminActiveText: saved.adminActiveText || defaultSettings.adminActiveText,
        
        adminTopbarBg: saved.adminTopbarBg || defaultSettings.adminTopbarBg,
        adminSearchBg: saved.adminSearchBg || defaultSettings.adminSearchBg,
        adminSearchText: saved.adminSearchText || defaultSettings.adminSearchText,
        adminProfileBg: saved.adminProfileBg || defaultSettings.adminProfileBg,
        adminProfileText: saved.adminProfileText || defaultSettings.adminProfileText,
        
        adminCardBg: saved.adminCardBg || defaultSettings.adminCardBg,
        adminBorder: saved.adminBorder || defaultSettings.adminBorder,
      });
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("themeConfig", JSON.stringify(settings));
    window.dispatchEvent(new Event("globalThemeUpdated"));
    alert("✅ Global Colors Updated Successfully!");
  };

  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden">
      <div className="h-screen flex-shrink-0"><Sidebar /></div>
      <div className="flex flex-1 flex-col h-screen overflow-hidden">
        <div className="flex-shrink-0 z-10"><Topbar /></div>
        <main className="flex-1 overflow-y-auto relative">
          <div className="sticky top-0 z-20 bg-[#050505] px-8 py-6 border-b border-white/5 flex items-center justify-between shadow-lg">
            <div>
              <h1 className="text-4xl font-bold text-white">Theme Settings</h1>
              <p className="mt-2 text-gray-400">Manage global colors for Website & Admin Panel.</p>
            </div>
            <button onClick={handleSave} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg shadow-purple-900/30">
              <Save size={18} /> Save Global Colors
            </button>
          </div>

          <div className="p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* WEBSITE COLORS */}
              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-600/10 blur-[50px] pointer-events-none"></div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/5 pb-4"><Globe size={20} className="text-purple-400" /> Website Colors</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Background Color</label>
                    <div className="flex items-center gap-4">
                      <input type="color" value={settings.webBg} onChange={(e) => setSettings({...settings, webBg: e.target.value})} className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                      <input type="text" value={settings.webBg} onChange={(e) => setSettings({...settings, webBg: e.target.value})} className="flex-1 h-10 bg-[#0a0a0a] border border-white/10 rounded px-3 text-white font-mono text-sm outline-none focus:border-purple-500" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Main Text Color</label>
                    <div className="flex items-center gap-4">
                      <input type="color" value={settings.webText} onChange={(e) => setSettings({...settings, webText: e.target.value})} className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                      <input type="text" value={settings.webText} onChange={(e) => setSettings({...settings, webText: e.target.value})} className="flex-1 h-10 bg-[#0a0a0a] border border-white/10 rounded px-3 text-white font-mono text-sm outline-none focus:border-purple-500" />
                      <div className="flex-1 h-10 rounded border border-white/10 flex items-center justify-center text-sm font-medium bg-[#1a1a1a]" style={{ color: settings.webText }}>Sample Text</div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Accent Color (Purple/Buttons)</label>
                    <div className="flex items-center gap-4">
                      <input type="color" value={settings.webAccent} onChange={(e) => setSettings({...settings, webAccent: e.target.value})} className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                      <input type="text" value={settings.webAccent} onChange={(e) => setSettings({...settings, webAccent: e.target.value})} className="flex-1 h-10 bg-[#0a0a0a] border border-white/10 rounded px-3 text-white font-mono text-sm outline-none focus:border-purple-500" />
                      <div className="flex-1 h-10 rounded border border-white/10 flex items-center justify-center text-sm font-medium text-white" style={{ backgroundColor: settings.webAccent }}>Button Preview</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ADMIN PANEL COLORS */}
              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-600/10 blur-[50px] pointer-events-none"></div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/5 pb-4"><ShieldCheck size={20} className="text-purple-400" /> Admin Panel Colors</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Sidebar Background</label>
                    <div className="flex items-center gap-4">
                      <input type="color" value={settings.adminSidebar} onChange={(e) => setSettings({...settings, adminSidebar: e.target.value})} className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                      <input type="text" value={settings.adminSidebar} onChange={(e) => setSettings({...settings, adminSidebar: e.target.value})} className="flex-1 h-10 bg-[#0a0a0a] border border-white/10 rounded px-3 text-white font-mono text-sm outline-none focus:border-purple-500" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Heading Text</label>
                    <div className="flex items-center gap-4">
                      <input type="color" value={settings.adminSidebarHeading} onChange={(e) => setSettings({...settings, adminSidebarHeading: e.target.value})} className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                      <input type="text" value={settings.adminSidebarHeading} onChange={(e) => setSettings({...settings, adminSidebarHeading: e.target.value})} className="flex-1 h-10 bg-[#0a0a0a] border border-white/10 rounded px-3 text-white font-mono text-sm outline-none focus:border-purple-500" />
                      <div className="flex-1 h-10 rounded border border-white/10 flex items-center justify-center text-sm font-medium bg-[#1a1a1a]" style={{ color: settings.adminSidebarHeading }}>KREATIVE CMS</div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Menu Text Color</label>
                    <div className="flex items-center gap-4">
                      <input type="color" value={settings.adminMenuText} onChange={(e) => setSettings({...settings, adminMenuText: e.target.value})} className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                      <input type="text" value={settings.adminMenuText} onChange={(e) => setSettings({...settings, adminMenuText: e.target.value})} className="flex-1 h-10 bg-[#0a0a0a] border border-white/10 rounded px-3 text-white font-mono text-sm outline-none focus:border-purple-500" />
                      <div className="flex-1 h-10 rounded border border-white/10 flex items-center justify-center text-sm font-medium bg-[#1a1a1a]" style={{ color: settings.adminMenuText }}>Dashboard</div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Active Item Background</label>
                    <div className="flex items-center gap-4">
                      <input type="color" value={settings.adminActiveBg} onChange={(e) => setSettings({...settings, adminActiveBg: e.target.value})} className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                      <input type="text" value={settings.adminActiveBg} onChange={(e) => setSettings({...settings, adminActiveBg: e.target.value})} className="flex-1 h-10 bg-[#0a0a0a] border border-white/10 rounded px-3 text-white font-mono text-sm outline-none focus:border-purple-500" />
                      <div className="flex-1 h-10 rounded border border-white/10 flex items-center justify-center text-sm font-medium text-white" style={{ backgroundColor: settings.adminActiveBg }}>Active Menu</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TOPBAR & SEARCH */}
              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-600/10 blur-[50px] pointer-events-none"></div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/5 pb-4"><Monitor size={20} className="text-purple-400" /> Topbar & Search</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Topbar Background</label>
                    <div className="flex items-center gap-4">
                      <input type="color" value={settings.adminTopbarBg} onChange={(e) => setSettings({...settings, adminTopbarBg: e.target.value})} className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                      <input type="text" value={settings.adminTopbarBg} onChange={(e) => setSettings({...settings, adminTopbarBg: e.target.value})} className="flex-1 h-10 bg-[#0a0a0a] border border-white/10 rounded px-3 text-white font-mono text-sm outline-none focus:border-purple-500" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Search Bar Background</label>
                    <div className="flex items-center gap-4">
                      <input type="color" value={settings.adminSearchBg} onChange={(e) => setSettings({...settings, adminSearchBg: e.target.value})} className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                      <input type="text" value={settings.adminSearchBg} onChange={(e) => setSettings({...settings, adminSearchBg: e.target.value})} className="flex-1 h-10 bg-[#0a0a0a] border border-white/10 rounded px-3 text-white font-mono text-sm outline-none focus:border-purple-500" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Search Text Color</label>
                    <div className="flex items-center gap-4">
                      <input type="color" value={settings.adminSearchText} onChange={(e) => setSettings({...settings, adminSearchText: e.target.value})} className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                      <input type="text" value={settings.adminSearchText} onChange={(e) => setSettings({...settings, adminSearchText: e.target.value})} className="flex-1 h-10 bg-[#0a0a0a] border border-white/10 rounded px-3 text-white font-mono text-sm outline-none focus:border-purple-500" />
                      <div className="flex-1 h-10 rounded border border-white/10 flex items-center justify-center text-sm font-medium bg-[#1a1a1a]" style={{ color: settings.adminSearchText }}>Search...</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PROFILE & CARDS */}
              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-600/10 blur-[50px] pointer-events-none"></div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/5 pb-4"><User size={20} className="text-purple-400" /> Profile & Cards</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Profile Card Background</label>
                    <div className="flex items-center gap-4">
                      <input type="color" value={settings.adminProfileBg} onChange={(e) => setSettings({...settings, adminProfileBg: e.target.value})} className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                      <input type="text" value={settings.adminProfileBg} onChange={(e) => setSettings({...settings, adminProfileBg: e.target.value})} className="flex-1 h-10 bg-[#0a0a0a] border border-white/10 rounded px-3 text-white font-mono text-sm outline-none focus:border-purple-500" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Card Background</label>
                    <div className="flex items-center gap-4">
                      <input type="color" value={settings.adminCardBg} onChange={(e) => setSettings({...settings, adminCardBg: e.target.value})} className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                      <input type="text" value={settings.adminCardBg} onChange={(e) => setSettings({...settings, adminCardBg: e.target.value})} className="flex-1 h-10 bg-[#0a0a0a] border border-white/10 rounded px-3 text-white font-mono text-sm outline-none focus:border-purple-500" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Border Color</label>
                    <div className="flex items-center gap-4">
                      <input type="color" value={settings.adminBorder} onChange={(e) => setSettings({...settings, adminBorder: e.target.value})} className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                      <input type="text" value={settings.adminBorder} onChange={(e) => setSettings({...settings, adminBorder: e.target.value})} className="flex-1 h-10 bg-[#0a0a0a] border border-white/10 rounded px-3 text-white font-mono text-sm outline-none focus:border-purple-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ThemeSettings;