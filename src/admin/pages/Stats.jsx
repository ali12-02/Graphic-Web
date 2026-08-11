import { useState, useEffect } from "react";
import { Save, Star, Users, FolderOpen, Palette, Type, Timer, Award } from "lucide-react"; 
import DashboardLayout from "../layout/DashboardLayout";

function Stats() {
  const [stats, setStats] = useState({
    projects: 70,
    clients: 100,
    awards: 12, // 🟢 New: Awards
    iconColor: "#a855f7",
    textColor: "#ffffff",
    subtitleColor: "#9ca3af",
    animationSpeed: 1.5,
    projectPercent: 80,
    clientPercent: 100,
    awardsPercent: 80, // 🟢 New: Awards circle fill %
  });

  // Load saved stats
  useEffect(() => {
    const savedStats = JSON.parse(localStorage.getItem("studioStats"));
    if (savedStats) setStats(savedStats);
  }, []);

  const handleSave = () => {
    localStorage.setItem("studioStats", JSON.stringify(stats));
    window.dispatchEvent(new Event("statsUpdated"));
    alert("✅ Studio Stats Updated Successfully!");
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Studio Stats</h1>
          <p className="mt-2 text-gray-400">Update statistics, colors, and animation settings.</p>
        </div>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-2xl p-8 space-y-6 max-w-2xl">
        
        {/* Projects Uploaded */}
        <div>
          <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
            <FolderOpen size={18} className="text-purple-400" /> Total Projects Uploaded
          </label>
          <input
            type="number"
            value={stats.projects}
            onChange={(e) => setStats({ ...stats, projects: parseInt(e.target.value) || 0 })}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
          />
        </div>

        {/* Clients Satisfied */}
        <div>
          <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
            <Users size={18} className="text-purple-400" /> Clients Satisfied
          </label>
          <input
            type="number"
            value={stats.clients}
            onChange={(e) => setStats({ ...stats, clients: parseInt(e.target.value) || 0 })}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
          />
        </div>

        {/* 🟢 NEW: Awards Won */}
        <div>
          <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
            <Award size={18} className="text-yellow-400" /> Awards Won
          </label>
          <input
            type="number"
            min="0"
            value={stats.awards}
            onChange={(e) => setStats({ ...stats, awards: parseInt(e.target.value) || 0 })}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
          />
        </div>

        {/* 🟢 COLORS & ANIMATION CONTROLS */}
        <div className="border-t border-white/10 pt-6 space-y-6">
          
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <Palette size={20} className="text-purple-400" /> Circle & Text Settings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                <Palette size={18} className="text-purple-400" /> Circle Color
              </label>
              <div className="flex items-center gap-4">
                <input type="color" value={stats.iconColor} onChange={(e) => setStats({ ...stats, iconColor: e.target.value })} className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent" />
                <div className="h-6 w-24 rounded border border-white/10" style={{ backgroundColor: stats.iconColor }}></div>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                <Type size={18} className="text-purple-400" /> Main Text Color
              </label>
              <div className="flex items-center gap-4">
                <input type="color" value={stats.textColor} onChange={(e) => setStats({ ...stats, textColor: e.target.value })} className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent" />
                <div className="h-6 w-24 rounded border border-white/10" style={{ backgroundColor: stats.textColor }}></div>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                <Type size={18} className="text-gray-400" /> Subtitle Color
              </label>
              <div className="flex items-center gap-4">
                <input type="color" value={stats.subtitleColor} onChange={(e) => setStats({ ...stats, subtitleColor: e.target.value })} className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent" />
                <div className="h-6 w-24 rounded border border-white/10" style={{ backgroundColor: stats.subtitleColor }}></div>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                <Timer size={18} className="text-purple-400" /> Animation Speed (Seconds)
              </label>
              <input type="number" step="0.1" min="0.3" max="5" value={stats.animationSpeed} onChange={(e) => setStats({ ...stats, animationSpeed: parseFloat(e.target.value) || 1.5 })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" />
            </div>
          </div>

          {/* 🟢 Circle Fill Percentages for all 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                <FolderOpen size={18} className="text-purple-400" /> Projects Fill (%)
              </label>
              <input type="number" min="0" max="100" value={stats.projectPercent} onChange={(e) => setStats({ ...stats, projectPercent: parseInt(e.target.value) || 0 })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                <Users size={18} className="text-purple-400" /> Clients Fill (%)
              </label>
              <input type="number" min="0" max="100" value={stats.clientPercent} onChange={(e) => setStats({ ...stats, clientPercent: parseInt(e.target.value) || 0 })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                <Award size={18} className="text-yellow-400" /> Awards Fill (%)
              </label>
              <input type="number" min="0" max="100" value={stats.awardsPercent} onChange={(e) => setStats({ ...stats, awardsPercent: parseInt(e.target.value) || 0 })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button onClick={handleSave} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition w-full justify-center mt-4">
          <Save size={20} /> Save Studio Stats
        </button>
      </div>
    </DashboardLayout>
  );
}

export default Stats;