import { useState, useEffect } from "react";
import { Save, Globe, ShieldCheck, Layout, Monitor, User, Square, Plus, Trash2, CheckCircle, RefreshCw } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function ThemeSettings() {
  // 🟢 1. FRONTEND / WEBSITE COLORS (Jo user ko dikhegi)
  const defaultGlobal = {
    webBg: "#050505",    
    webText: "#ffffff",  
    webAccent: "#a855f7", 
    webBtnText: "#ffffff",      
    webBtnHover: "#9333ea",     
  };

  // 🟢 2. ADMIN PANEL COLORS (Jo Admin Dashboard mein dikhega)
  const defaultAdmin = {
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

    adminBtnText: "#ffffff",      
    adminBtnHover: "#7e22ce",     

    // 🟢 NEW: Live Site Button Colors
    liveSiteBtnBg: "#16a34a",     // Default Green
    liveSiteBtnText: "#ffffff",   // Default White
  };

  const [globalColors, setGlobalColors] = useState(defaultGlobal);
  const [adminColors, setAdminColors] = useState(defaultAdmin);

  // 🟢 3. PRESETS LIST (Saved Themes)
  const [presets, setPresets] = useState([]);
  const [presetName, setPresetName] = useState("");

  // 🟢 4. UI STATES
  const [selectedPresetId, setSelectedPresetId] = useState(null);
  const [message, setMessage] = useState("");

  // Load saved data on mount
  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem("themeConfig"));
    if (savedTheme) {
      setGlobalColors({
        webBg: savedTheme.webBg || defaultGlobal.webBg,
        webText: savedTheme.webText || defaultGlobal.webText,
        webAccent: savedTheme.webAccent || defaultGlobal.webAccent,
        webBtnText: savedTheme.webBtnText || defaultGlobal.webBtnText,
        webBtnHover: savedTheme.webBtnHover || defaultGlobal.webBtnHover,
      });
      
      setAdminColors({
        adminSidebar: savedTheme.adminSidebar || defaultAdmin.adminSidebar,
        adminSidebarHeading: savedTheme.adminSidebarHeading || defaultAdmin.adminSidebarHeading,
        adminMenuText: savedTheme.adminMenuText || defaultAdmin.adminMenuText,
        adminActiveBg: savedTheme.adminActiveBg || defaultAdmin.adminActiveBg,
        adminActiveText: savedTheme.adminActiveText || defaultAdmin.adminActiveText,
        
        adminTopbarBg: savedTheme.adminTopbarBg || defaultAdmin.adminTopbarBg,
        adminSearchBg: savedTheme.adminSearchBg || defaultAdmin.adminSearchBg,
        adminSearchText: savedTheme.adminSearchText || defaultAdmin.adminSearchText,
        adminProfileBg: savedTheme.adminProfileBg || defaultAdmin.adminProfileBg,
        adminProfileText: savedTheme.adminProfileText || defaultAdmin.adminProfileText,
        
        adminCardBg: savedTheme.adminCardBg || defaultAdmin.adminCardBg,
        adminBorder: savedTheme.adminBorder || defaultAdmin.adminBorder,

        adminBtnText: savedTheme.adminBtnText || defaultAdmin.adminBtnText,
        adminBtnHover: savedTheme.adminBtnHover || defaultAdmin.adminBtnHover,

        // 🟢 NEW
        liveSiteBtnBg: savedTheme.liveSiteBtnBg || defaultAdmin.liveSiteBtnBg,
        liveSiteBtnText: savedTheme.liveSiteBtnText || defaultAdmin.liveSiteBtnText,
      });
    }

    const savedPresets = JSON.parse(localStorage.getItem("themePresets")) || [];
    setPresets(savedPresets);
  }, []);

  // 🟢 Save Settings (Global + Admin)
  const handleSaveCurrent = () => {
    const finalConfig = {
      ...globalColors,
      ...adminColors,
    };

    localStorage.setItem("themeConfig", JSON.stringify(finalConfig));
    window.dispatchEvent(new Event("globalThemeUpdated"));
    window.dispatchEvent(new Event("frontendThemeUpdated"));
    
    setMessage("✅ Global Website & Admin Colors Saved!");
    setTimeout(() => setMessage(""), 3000);
  };

  // 🟢 Save Current Theme as a Preset
  const handleSavePreset = () => {
    if (!presetName.trim()) {
      setMessage("Please enter a name for this preset.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const finalConfig = {
      ...globalColors,
      ...adminColors,
    };

    const newPreset = {
      id: Date.now(),
      name: presetName.trim(),
      createdAt: new Date().toLocaleDateString(),
      theme: finalConfig
    };

    const updatedPresets = [...presets, newPreset];
    setPresets(updatedPresets);
    localStorage.setItem("themePresets", JSON.stringify(updatedPresets));
    
    setPresetName("");
    setMessage(`✅ Preset "${newPreset.name}" saved successfully!`);
    setTimeout(() => setMessage(""), 3000);
  };

  // 🟢 Apply a Saved Preset
  const handleApplyPreset = (presetId) => {
    const preset = presets.find(p => p.id === presetId);
    if (!preset) return;

    setGlobalColors({
      webBg: preset.theme.webBg || defaultGlobal.webBg,
      webText: preset.theme.webText || defaultGlobal.webText,
      webAccent: preset.theme.webAccent || defaultGlobal.webAccent,
      webBtnText: preset.theme.webBtnText || defaultGlobal.webBtnText,
      webBtnHover: preset.theme.webBtnHover || defaultGlobal.webBtnHover,
    });

    setAdminColors({
      adminSidebar: preset.theme.adminSidebar || defaultAdmin.adminSidebar,
      adminSidebarHeading: preset.theme.adminSidebarHeading || defaultAdmin.adminSidebarHeading,
      adminMenuText: preset.theme.adminMenuText || defaultAdmin.adminMenuText,
      adminActiveBg: preset.theme.adminActiveBg || defaultAdmin.adminActiveBg,
      adminActiveText: preset.theme.adminActiveText || defaultAdmin.adminActiveText,
      adminTopbarBg: preset.theme.adminTopbarBg || defaultAdmin.adminTopbarBg,
      adminSearchBg: preset.theme.adminSearchBg || defaultAdmin.adminSearchBg,
      adminSearchText: preset.theme.adminSearchText || defaultAdmin.adminSearchText,
      adminProfileBg: preset.theme.adminProfileBg || defaultAdmin.adminProfileBg,
      adminProfileText: preset.theme.adminProfileText || defaultAdmin.adminProfileText,
      adminCardBg: preset.theme.adminCardBg || defaultAdmin.adminCardBg,
      adminBorder: preset.theme.adminBorder || defaultAdmin.adminBorder,
      adminBtnText: preset.theme.adminBtnText || defaultAdmin.adminBtnText,
      adminBtnHover: preset.theme.adminBtnHover || defaultAdmin.adminBtnHover,
      liveSiteBtnBg: preset.theme.liveSiteBtnBg || defaultAdmin.liveSiteBtnBg,
      liveSiteBtnText: preset.theme.liveSiteBtnText || defaultAdmin.liveSiteBtnText,
    });

    const finalConfig = {
      ...globalColors,
      ...adminColors,
    };
    localStorage.setItem("themeConfig", JSON.stringify(finalConfig));
    window.dispatchEvent(new Event("globalThemeUpdated"));
    window.dispatchEvent(new Event("frontendThemeUpdated"));
    
    setMessage(`✅ Switched to "${preset.name}" theme!`);
    setTimeout(() => setMessage(""), 3000);
  };

  // 🟢 Delete a Preset
  const handleDeletePreset = (presetId) => {
    const updatedPresets = presets.filter(p => p.id !== presetId);
    setPresets(updatedPresets);
    localStorage.setItem("themePresets", JSON.stringify(updatedPresets));
    setMessage("🗑️ Preset deleted.");
    setTimeout(() => setMessage(""), 3000);
  };

  // 🟢 Reset to Default Theme
  const handleResetToDefault = () => {
    setGlobalColors(defaultGlobal);
    setAdminColors(defaultAdmin);
    localStorage.setItem("themeConfig", JSON.stringify({ ...defaultGlobal, ...defaultAdmin }));
    window.dispatchEvent(new Event("globalThemeUpdated"));
    window.dispatchEvent(new Event("frontendThemeUpdated"));
    setMessage("🔄 Reset to default theme!");
    setTimeout(() => setMessage(""), 3000);
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
            <button onClick={handleSaveCurrent} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg shadow-purple-900/30">
              <Save size={18} /> Save Global Colors
            </button>
          </div>

          <div className="p-8 max-w-4xl mx-auto">
            
            {/* 🟢 PRESETS SECTION (Top) */}
            <div className="mb-8 bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
                <Square size={20} className="text-purple-400" /> Theme Presets
              </h3>
              <p className="text-sm text-gray-400 mb-4">Save your favorite color combinations and switch between them instantly.</p>

              {message && (
                <div className="mb-4 flex items-center gap-2 text-sm text-green-400 bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-2">
                  <CheckCircle size={16} /> {message}
                </div>
              )}

              {/* Add Preset Input */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <input 
                  type="text" 
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  placeholder="Enter preset name (e.g. Dark Mode)"
                  className="flex-1 rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-white outline-none focus:border-purple-500"
                />
                <button 
                  onClick={handleSavePreset}
                  className="flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 px-6 py-3 text-white font-semibold transition"
                >
                  <Plus size={18} /> Save Preset
                </button>
              </div>

              {/* Presets Grid */}
              {presets.length === 0 ? (
                <div className="text-center py-8 text-gray-500 border border-white/5 rounded-xl bg-[#0a0a0a]">
                  <p>No presets saved yet. Create your first theme preset above!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {presets.map((preset) => (
                    <div key={preset.id} className={`relative border border-white/5 rounded-xl p-4 bg-[#0a0a0a] transition hover:border-purple-500/50`}>
                      <div className="flex gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full border border-white/10" style={{ backgroundColor: preset.theme.webBg }}></div>
                        <div className="w-6 h-6 rounded-full border border-white/10" style={{ backgroundColor: preset.theme.webAccent }}></div>
                        <div className="w-6 h-6 rounded-full border border-white/10" style={{ backgroundColor: preset.theme.adminSidebar }}></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium text-sm">{preset.name}</h4>
                          <p className="text-xs text-gray-500">Saved: {preset.createdAt}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleApplyPreset(preset.id)} className="text-xs text-purple-400 hover:text-purple-300 transition px-3 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20">Apply</button>
                          <button onClick={() => handleDeletePreset(preset.id)} className="text-red-400 hover:text-red-500 transition p-1 hover:bg-red-500/10 rounded-lg"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Reset to Default Button */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <button onClick={handleResetToDefault} className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 text-gray-300 hover:text-white transition">
                  <RefreshCw size={18} /> Reset to Default Theme
                </button>
              </div>
            </div>

            {/* 🟢 WEBSITE COLORS (Live Preview Section) */}
            <div className="mb-8 bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-600/10 blur-[50px] pointer-events-none"></div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
                <Globe size={20} className="text-purple-400" /> Frontend / Website Colors
              </h3>
              <p className="text-xs text-gray-400 mb-6 font-medium">🔴 These colors will instantly change your live public portfolio website.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* 1. Background Color */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-300 font-medium">Main Background</label>
                    <span className="text-[10px] text-gray-500">Overall Site BG</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="color" value={globalColors.webBg} onChange={(e) => setGlobalColors({...globalColors, webBg: e.target.value})} className="w-8 h-8 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                    <input type="text" value={globalColors.webBg} onChange={(e) => setGlobalColors({...globalColors, webBg: e.target.value})} className="flex-1 bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-white text-xs font-mono outline-none focus:border-purple-500" />
                  </div>
                  <div className="mt-3 w-full h-12 rounded bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-xs text-gray-400" style={{ backgroundColor: globalColors.webBg }}>
                    Live Preview Area
                  </div>
                </div>

                {/* 2. Text Color */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-300 font-medium">Main Text</label>
                    <span className="text-[10px] text-gray-500">Headings / Paragraphs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="color" value={globalColors.webText} onChange={(e) => setGlobalColors({...globalColors, webText: e.target.value})} className="w-8 h-8 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                    <input type="text" value={globalColors.webText} onChange={(e) => setGlobalColors({...globalColors, webText: e.target.value})} className="flex-1 bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-white text-xs font-mono outline-none focus:border-purple-500" />
                  </div>
                  <div className="mt-3 w-full h-12 rounded bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-sm font-bold" style={{ color: globalColors.webText }}>
                    Sample Text
                  </div>
                </div>

                {/* 3. Accent Color */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-300 font-medium">Accent / Buttons</label>
                    <span className="text-[10px] text-gray-500">CTA / Links / Hovers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="color" value={globalColors.webAccent} onChange={(e) => setGlobalColors({...globalColors, webAccent: e.target.value})} className="w-8 h-8 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                    <input type="text" value={globalColors.webAccent} onChange={(e) => setGlobalColors({...globalColors, webAccent: e.target.value})} className="flex-1 bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-white text-xs font-mono outline-none focus:border-purple-500" />
                  </div>
                  <button className="mt-3 w-full h-12 rounded border border-white/10 flex items-center justify-center text-sm font-bold text-white transition hover:scale-105" style={{ backgroundColor: globalColors.webAccent }}>
                    Preview Button
                  </button>
                </div>
              </div>

              {/* 🟢 FRONTEND BUTTON TEXT & HOVER COLORS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-6">
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-300 font-medium">Button Text Color</label>
                    <span className="text-[10px] text-gray-500">Text inside buttons</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="color" value={globalColors.webBtnText} onChange={(e) => setGlobalColors({...globalColors, webBtnText: e.target.value})} className="w-8 h-8 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                    <input type="text" value={globalColors.webBtnText} onChange={(e) => setGlobalColors({...globalColors, webBtnText: e.target.value})} className="flex-1 bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-white text-xs font-mono outline-none focus:border-purple-500" />
                  </div>
                  <button className="mt-3 w-full h-12 rounded border border-white/10 flex items-center justify-center text-sm font-bold transition hover:scale-105" style={{ backgroundColor: globalColors.webAccent, color: globalColors.webBtnText }}>
                    Button Text Preview
                  </button>
                </div>

                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-300 font-medium">Button Hover Color</label>
                    <span className="text-[10px] text-gray-500">Button BG on Mouse Over</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="color" value={globalColors.webBtnHover} onChange={(e) => setGlobalColors({...globalColors, webBtnHover: e.target.value})} className="w-8 h-8 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                    <input type="text" value={globalColors.webBtnHover} onChange={(e) => setGlobalColors({...globalColors, webBtnHover: e.target.value})} className="flex-1 bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-white text-xs font-mono outline-none focus:border-purple-500" />
                  </div>
                  <button className="mt-3 w-full h-12 rounded border border-white/10 flex items-center justify-center text-sm font-bold transition hover:scale-105" style={{ backgroundColor: globalColors.webBtnHover, color: globalColors.webBtnText }}>
                    Hover Preview
                  </button>
                </div>
              </div>
            </div>

            {/* 🟢 ADMIN PANEL COLORS */}
            <div className="mb-8 bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-600/10 blur-[50px] pointer-events-none"></div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
                <ShieldCheck size={20} className="text-purple-400" /> Admin Panel Colors
              </h3>
              <p className="text-xs text-gray-400 mb-4 font-medium">💠 These colors control the internal CMS dashboard.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                  <label className="text-sm text-gray-400 block mb-1">Sidebar Background</label>
                  <div className="flex items-center gap-3">
                    <input type="color" value={adminColors.adminSidebar} onChange={(e) => setAdminColors({...adminColors, adminSidebar: e.target.value})} className="w-8 h-8 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                    <input type="text" value={adminColors.adminSidebar} onChange={(e) => setAdminColors({...adminColors, adminSidebar: e.target.value})} className="flex-1 bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-white text-xs font-mono outline-none focus:border-purple-500" />
                  </div>
                </div>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                  <label className="text-sm text-gray-400 block mb-1">Sidebar Heading</label>
                  <div className="flex items-center gap-3">
                    <input type="color" value={adminColors.adminSidebarHeading} onChange={(e) => setAdminColors({...adminColors, adminSidebarHeading: e.target.value})} className="w-8 h-8 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                    <input type="text" value={adminColors.adminSidebarHeading} onChange={(e) => setAdminColors({...adminColors, adminSidebarHeading: e.target.value})} className="flex-1 bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-white text-xs font-mono outline-none focus:border-purple-500" />
                  </div>
                </div>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                  <label className="text-sm text-gray-400 block mb-1">Menu Text Color</label>
                  <div className="flex items-center gap-3">
                    <input type="color" value={adminColors.adminMenuText} onChange={(e) => setAdminColors({...adminColors, adminMenuText: e.target.value})} className="w-8 h-8 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                    <input type="text" value={adminColors.adminMenuText} onChange={(e) => setAdminColors({...adminColors, adminMenuText: e.target.value})} className="flex-1 bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-white text-xs font-mono outline-none focus:border-purple-500" />
                  </div>
                </div>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                  <label className="text-sm text-gray-400 block mb-1">Active Item BG</label>
                  <div className="flex items-center gap-3">
                    <input type="color" value={adminColors.adminActiveBg} onChange={(e) => setAdminColors({...adminColors, adminActiveBg: e.target.value})} className="w-8 h-8 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                    <input type="text" value={adminColors.adminActiveBg} onChange={(e) => setAdminColors({...adminColors, adminActiveBg: e.target.value})} className="flex-1 bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-white text-xs font-mono outline-none focus:border-purple-500" />
                  </div>
                </div>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                  <label className="text-sm text-gray-400 block mb-1">Topbar Background</label>
                  <div className="flex items-center gap-3">
                    <input type="color" value={adminColors.adminTopbarBg} onChange={(e) => setAdminColors({...adminColors, adminTopbarBg: e.target.value})} className="w-8 h-8 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                    <input type="text" value={adminColors.adminTopbarBg} onChange={(e) => setAdminColors({...adminColors, adminTopbarBg: e.target.value})} className="flex-1 bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-white text-xs font-mono outline-none focus:border-purple-500" />
                  </div>
                </div>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                  <label className="text-sm text-gray-400 block mb-1">Search Bar BG</label>
                  <div className="flex items-center gap-3">
                    <input type="color" value={adminColors.adminSearchBg} onChange={(e) => setAdminColors({...adminColors, adminSearchBg: e.target.value})} className="w-8 h-8 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                    <input type="text" value={adminColors.adminSearchBg} onChange={(e) => setAdminColors({...adminColors, adminSearchBg: e.target.value})} className="flex-1 bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-white text-xs font-mono outline-none focus:border-purple-500" />
                  </div>
                </div>
              </div>

              {/* 🟢 ADMIN BUTTONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-6 mb-6">
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-300 font-medium">Admin Button Text</label>
                    <span className="text-[10px] text-gray-500">Text inside Admin BTN</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="color" value={adminColors.adminBtnText} onChange={(e) => setAdminColors({...adminColors, adminBtnText: e.target.value})} className="w-8 h-8 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                    <input type="text" value={adminColors.adminBtnText} onChange={(e) => setAdminColors({...adminColors, adminBtnText: e.target.value})} className="flex-1 bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-white text-xs font-mono outline-none focus:border-purple-500" />
                  </div>
                  <button className="mt-3 w-full h-12 rounded border border-white/10 flex items-center justify-center text-sm font-bold transition hover:scale-105" style={{ backgroundColor: adminColors.adminActiveBg, color: adminColors.adminBtnText }}>
                    Admin BTN Preview
                  </button>
                </div>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-300 font-medium">Admin Button Hover</label>
                    <span className="text-[10px] text-gray-500">Admin BTN BG on Hover</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="color" value={adminColors.adminBtnHover} onChange={(e) => setAdminColors({...adminColors, adminBtnHover: e.target.value})} className="w-8 h-8 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                    <input type="text" value={adminColors.adminBtnHover} onChange={(e) => setAdminColors({...adminColors, adminBtnHover: e.target.value})} className="flex-1 bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-white text-xs font-mono outline-none focus:border-purple-500" />
                  </div>
                  <button className="mt-3 w-full h-12 rounded border border-white/10 flex items-center justify-center text-sm font-bold transition hover:scale-105" style={{ backgroundColor: adminColors.adminBtnHover, color: adminColors.adminBtnText }}>
                    Hover Preview
                  </button>
                </div>
              </div>

              {/* 🟢 NEW: LIVE SITE BUTTON COLORS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-6">
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-300 font-medium">Live Site Btn BG</label>
                    <span className="text-[10px] text-gray-500">Topbar Visit Live Site Button</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="color" value={adminColors.liveSiteBtnBg} onChange={(e) => setAdminColors({...adminColors, liveSiteBtnBg: e.target.value})} className="w-8 h-8 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                    <input type="text" value={adminColors.liveSiteBtnBg} onChange={(e) => setAdminColors({...adminColors, liveSiteBtnBg: e.target.value})} className="flex-1 bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-white text-xs font-mono outline-none focus:border-purple-500" />
                  </div>
                  <button className="mt-3 w-full h-12 rounded border border-white/10 flex items-center justify-center text-sm font-bold transition hover:scale-105" style={{ backgroundColor: adminColors.liveSiteBtnBg, color: adminColors.liveSiteBtnText }}>
                    Live Site Btn
                  </button>
                </div>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-300 font-medium">Live Site Btn Text</label>
                    <span className="text-[10px] text-gray-500">Text inside Live Site BTN</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="color" value={adminColors.liveSiteBtnText} onChange={(e) => setAdminColors({...adminColors, liveSiteBtnText: e.target.value})} className="w-8 h-8 rounded cursor-pointer border border-white/10 bg-transparent shrink-0" />
                    <input type="text" value={adminColors.liveSiteBtnText} onChange={(e) => setAdminColors({...adminColors, liveSiteBtnText: e.target.value})} className="flex-1 bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-white text-xs font-mono outline-none focus:border-purple-500" />
                  </div>
                  <button className="mt-3 w-full h-12 rounded border border-white/10 flex items-center justify-center text-sm font-bold transition hover:scale-105" style={{ backgroundColor: adminColors.liveSiteBtnBg, color: adminColors.liveSiteBtnText }}>
                    Live Site Text
                  </button>
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