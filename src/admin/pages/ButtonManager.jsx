import { useState, useEffect } from "react";
import { Save, Plus, Trash2, MousePointer2, Globe } from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";

function ButtonManager() {
  // 🟢 DEFAULT DATA
  const defaultButtons = {
    adminButtons: [
      { id: 1, label: "Visit Live Site", url: "/" },
      { id: 2, label: "Logout", url: "/admin" },
    ],
    webButtons: [
      { id: 101, label: "Portfolio", url: "/work" },
      { id: 102, label: "About", url: "/about" },
      { id: 103, label: "Featured", url: "/#featured-projects-section" },
      { id: 104, label: "Hire Me", url: "/contact" },
      { id: 105, label: "View Project", url: "/#recent-projects" },
    ],
  };

  const [buttons, setButtons] = useState(defaultButtons);

  // Load saved data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("buttonConfig"));
    if (saved) setButtons(saved);
  }, []);

  const handleSave = () => {
    localStorage.setItem("buttonConfig", JSON.stringify(buttons));
    window.dispatchEvent(new Event("buttonsUpdated"));
    alert("✅ All Buttons Updated Successfully!");
  };

  // 🟢 ADMIN PANEL HANDLERS
  const addAdminButton = () => {
    setButtons({
      ...buttons,
      adminButtons: [
        ...buttons.adminButtons,
        { id: Date.now(), label: "New Admin Button", url: "#" },
      ],
    });
  };
  const removeAdminButton = (id) => {
    setButtons({
      ...buttons,
      adminButtons: buttons.adminButtons.filter((btn) => btn.id !== id),
    });
  };
  const updateAdminButton = (id, field, value) => {
    setButtons({
      ...buttons,
      adminButtons: buttons.adminButtons.map((btn) =>
        btn.id === id ? { ...btn, [field]: value } : btn
      ),
    });
  };

  // 🟢 WEB PANEL HANDLERS
  const addWebButton = () => {
    setButtons({
      ...buttons,
      webButtons: [
        ...buttons.webButtons,
        { id: Date.now(), label: "New Web Button", url: "#" },
      ],
    });
  };
  const removeWebButton = (id) => {
    setButtons({
      ...buttons,
      webButtons: buttons.webButtons.filter((btn) => btn.id !== id),
    });
  };
  const updateWebButton = (id, field, value) => {
    setButtons({
      ...buttons,
      webButtons: buttons.webButtons.map((btn) =>
        btn.id === id ? { ...btn, [field]: value } : btn
      ),
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Button Manager</h1>
          <p className="mt-2 text-gray-400">Manage labels and URLs for all buttons across the website.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ===== ADMIN PANEL BUTTONS ===== */}
        <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-600/10 blur-[50px] pointer-events-none"></div>
          
          <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
            <MousePointer2 size={20} className="text-purple-400" /> Admin Panel Buttons
          </h3>
          
          <div className="space-y-4">
            {buttons.adminButtons.map((btn) => (
              <div key={btn.id} className="flex flex-wrap items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/5">
                <div className="flex-1 min-w-[120px]">
                  <input 
                    type="text" 
                    value={btn.label} 
                    onChange={(e) => updateAdminButton(btn.id, 'label', e.target.value)} 
                    placeholder="Label" 
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none" 
                  />
                </div>
                <div className="flex-1 min-w-[120px]">
                  <input 
                    type="text" 
                    value={btn.url} 
                    onChange={(e) => updateAdminButton(btn.id, 'url', e.target.value)} 
                    placeholder="URL" 
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none" 
                  />
                </div>
                <button 
                  onClick={() => removeAdminButton(btn.id)} 
                  className="text-red-400 hover:text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            
            <button 
              onClick={addAdminButton} 
              className="flex items-center gap-2 bg-purple-600/20 text-purple-300 px-4 py-2 rounded-full hover:bg-purple-600/40 transition text-sm mt-2"
            >
              <Plus size={14} /> Add Admin Button
            </button>
          </div>
        </div>

        {/* ===== WEB / HERO BUTTONS ===== */}
        <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-600/10 blur-[50px] pointer-events-none"></div>
          
          <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
            <Globe size={20} className="text-purple-400" /> Website / Hero Buttons
          </h3>
          
          <div className="space-y-4">
            {buttons.webButtons.map((btn) => (
              <div key={btn.id} className="flex flex-wrap items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/5">
                <div className="flex-1 min-w-[120px]">
                  <input 
                    type="text" 
                    value={btn.label} 
                    onChange={(e) => updateWebButton(btn.id, 'label', e.target.value)} 
                    placeholder="Label" 
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none" 
                  />
                </div>
                <div className="flex-1 min-w-[120px]">
                  <input 
                    type="text" 
                    value={btn.url} 
                    onChange={(e) => updateWebButton(btn.id, 'url', e.target.value)} 
                    placeholder="URL" 
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none" 
                  />
                </div>
                <button 
                  onClick={() => removeWebButton(btn.id)} 
                  className="text-red-400 hover:text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            
            <button 
              onClick={addWebButton} 
              className="flex items-center gap-2 bg-purple-600/20 text-purple-300 px-4 py-2 rounded-full hover:bg-purple-600/40 transition text-sm mt-2"
            >
              <Plus size={14} /> Add Web Button
            </button>
          </div>
        </div>
      </div>

      <button onClick={handleSave} className="mt-8 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition w-full justify-center max-w-2xl mx-auto">
        <Save size={20} /> Save All Buttons
      </button>
    </DashboardLayout>
  );
}

export default ButtonManager;