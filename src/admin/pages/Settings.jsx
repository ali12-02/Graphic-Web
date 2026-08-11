import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Save, Bell, User, Lock, ShieldAlert, CheckCircle, XCircle, RefreshCw, Trash2, Eye, EyeOff, Key } from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";

function Settings() {
  const navigate = useNavigate();

  // 🟢 1. NOTIFICATION SETTINGS
  const [notifSettings, setNotifSettings] = useState({
    projectAdded: true,
    contactMessage: true,
    offerAdded: true,
  });

  // 🟢 2. ADMIN CREDENTIALS
  const [adminCreds, setAdminCreds] = useState({
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // 🟢 3. PASSWORD VISIBILITY STATES
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // 🟢 4. UI STATES
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Load saved data on mount
  useEffect(() => {
    // Load Notification Settings
    const savedNotif = JSON.parse(localStorage.getItem("notificationSettings"));
    if (savedNotif) {
      setNotifSettings(savedNotif);
    }

    // Load Current Admin Credentials from Auth
    const savedAuth = JSON.parse(localStorage.getItem("authData"));
    if (savedAuth) {
      setAdminCreds((prev) => ({
        ...prev,
        username: savedAuth.username || "admin",
        currentPassword: savedAuth.password || "",
      }));
    }
  }, []);

  const handleNotifToggle = (key) => {
    setNotifSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminCreds((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    // 1. Save Notification Settings
    localStorage.setItem("notificationSettings", JSON.stringify(notifSettings));
    window.dispatchEvent(new Event("notificationSettingsUpdated"));

    // 2. Handle Password Change (If user entered a new password)
    if (adminCreds.newPassword) {
      if (adminCreds.newPassword !== adminCreds.confirmPassword) {
        setMessage({ type: "error", text: "New passwords do not match!" });
        setLoading(false);
        return;
      }

      // 🔐 Check Current Password
      const savedAuth = JSON.parse(localStorage.getItem("authData"));
      if (savedAuth && savedAuth.password !== adminCreds.currentPassword) {
        setMessage({ type: "error", text: "Current password is incorrect!" });
        setLoading(false);
        return;
      }

      // Save New Password
      const updatedAuth = {
        username: adminCreds.username || savedAuth?.username || "admin",
        password: adminCreds.newPassword
      };
      localStorage.setItem("authData", JSON.stringify(updatedAuth));
    } else {
      // Only Username changed
      const savedAuth = JSON.parse(localStorage.getItem("authData"));
      if (savedAuth) {
        savedAuth.username = adminCreds.username;
        localStorage.setItem("authData", JSON.stringify(savedAuth));
      }
    }

    setLoading(false);
    setMessage({ type: "success", text: "Settings saved successfully!" });
    
    // Clear password fields after save
    setAdminCreds((prev) => ({ ...prev, newPassword: "", confirmPassword: "" }));
  };

  const handleResetAll = () => {
    if (window.confirm("⚠️ Are you sure? This will delete ALL data (Projects, Offers, Stats, Categories). This cannot be undone!")) {
      localStorage.removeItem("projects");
      localStorage.removeItem("offers");
      localStorage.removeItem("categories");
      localStorage.removeItem("studioStats");
      localStorage.removeItem("websiteThemeConfig");
      localStorage.removeItem("buttonConfig");
      window.location.reload();
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Global Settings</h1>
          <p className="mt-2 text-gray-400">Manage notifications, admin credentials, and system data.</p>
        </div>
      </div>

      {message.text && (
        <div className={`mb-6 flex items-center gap-3 rounded-xl border p-4 ${message.type === "success" ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-red-500/30 bg-red-500/10 text-red-400"}`}>
          {message.type === "success" ? <CheckCircle size={20} /> : <XCircle size={20} />}
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}

      {/* NOTIFICATION SETTINGS SECTION */}
      <div className="mb-8 bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 border-b border-white/5 pb-4 mb-4">
          <Bell size={20} className="text-purple-400" />
          <h3 className="text-xl font-bold text-white">Notification Preferences</h3>
        </div>
        <p className="text-sm text-gray-400 mb-6">Choose which events should trigger a notification in the top bar.</p>

        <div className="space-y-4">
          {/* Toggle: Project Added */}
          <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#0a0a0a] p-4">
            <div>
              <h4 className="text-white font-medium">New Project Added</h4>
              <p className="text-sm text-gray-500">Notify when a new project is published.</p>
            </div>
            <button 
              onClick={() => handleNotifToggle("projectAdded")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifSettings.projectAdded ? "bg-purple-600" : "bg-gray-600"}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifSettings.projectAdded ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>

          {/* Toggle: Contact Message */}
          <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#0a0a0a] p-4">
            <div>
              <h4 className="text-white font-medium">Contact Form Message</h4>
              <p className="text-sm text-gray-500">Notify when a user submits the contact form.</p>
            </div>
            <button 
              onClick={() => handleNotifToggle("contactMessage")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifSettings.contactMessage ? "bg-purple-600" : "bg-gray-600"}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifSettings.contactMessage ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>

          {/* Toggle: Offer Added */}
          <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#0a0a0a] p-4">
            <div>
              <h4 className="text-white font-medium">New Offer Added</h4>
              <p className="text-sm text-gray-500">Notify when a new offer is added to the reel.</p>
            </div>
            <button 
              onClick={() => handleNotifToggle("offerAdded")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifSettings.offerAdded ? "bg-purple-600" : "bg-gray-600"}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifSettings.offerAdded ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* 🟢 UPDATED: ADMIN CREDENTIALS SECTION WITH CURRENT CREDENTIALS CARD */}
      <div className="mb-8 bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 border-b border-white/5 pb-4 mb-4">
          <ShieldAlert size={20} className="text-purple-400" />
          <h3 className="text-xl font-bold text-white">Admin Credentials</h3>
        </div>

        {/* 🟢 NEW: Read-Only Current Credentials Card */}
        <div className="mb-6 bg-[#0a0a0a] border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-3">
            <Key size={18} className="text-gray-400" />
            <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Current Credentials</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Current Username (Read Only) */}
            <div>
              <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                <User size={14} /> Username
              </label>
              <div className="w-full rounded-lg bg-[#1a1a1a] px-4 py-3 text-white border border-white/5 font-mono text-sm">
                {adminCreds.username || "admin"}
              </div>
            </div>

            {/* Current Password (Read Only with Show/Hide) */}
            <div className="relative">
              <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                <Lock size={14} /> Password
              </label>
              <div className="flex items-center justify-between w-full rounded-lg bg-[#1a1a1a] px-4 py-3 text-white border border-white/5 font-mono text-sm">
                <span>{showCurrentPass ? (adminCreds.currentPassword || "••••••••") : "••••••••"}</span>
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="text-gray-500 hover:text-white transition p-1 rounded hover:bg-white/5"
                >
                  {showCurrentPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-6">Update your login credentials below. Leave New Password blank to keep it unchanged.</p>

        <form onSubmit={handleSaveSettings} className="space-y-4 max-w-lg">
          
          {/* New Username */}
          <div>
            <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">
              <User size={16} className="text-purple-400" /> New Username
            </label>
            <input 
              type="text" 
              name="username"
              value={adminCreds.username}
              onChange={handleAdminChange}
              placeholder="Enter new username"
              className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-white outline-none focus:border-purple-500"
            />
          </div>

          {/* Current Password Input (Required to verify) */}
          <div className="relative">
            <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">
              <Lock size={16} className="text-purple-400" /> Current Password (to verify)
            </label>
            <div className="relative">
              <input 
                type={showCurrentPass ? "text" : "password"}
                name="currentPassword"
                value={adminCreds.currentPassword}
                onChange={handleAdminChange}
                placeholder="Enter current password"
                className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-white outline-none focus:border-purple-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPass(!showCurrentPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showCurrentPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">
              <Lock size={16} className="text-purple-400" /> New Password
            </label>
            <div className="relative">
              <input 
                type={showNewPass ? "text" : "password"}
                name="newPassword"
                value={adminCreds.newPassword}
                onChange={handleAdminChange}
                placeholder="Enter new password (leave blank to skip)"
                className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-white outline-none focus:border-purple-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showNewPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="relative">
            <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">
              <Lock size={16} className="text-purple-400" /> Confirm New Password
            </label>
            <div className="relative">
              <input 
                type={showConfirmPass ? "text" : "password"}
                name="confirmPassword"
                value={adminCreds.confirmPassword}
                onChange={handleAdminChange}
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-white outline-none focus:border-purple-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* RESET SECTION (Danger Zone) */}
      <div className="bg-[#0f0f0f] border border-red-500/20 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 border-b border-red-500/20 pb-4 mb-4">
          <RefreshCw size={20} className="text-red-400" />
          <h3 className="text-xl font-bold text-red-400">Danger Zone</h3>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-white font-medium">Reset All Data</h4>
            <p className="text-sm text-gray-500">This will permanently delete all projects, offers, categories, and theme settings.</p>
          </div>
          <button 
            onClick={handleResetAll}
            className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 px-6 py-3 text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            <Trash2 size={18} /> Reset Everything
          </button>
        </div>
      </div>

      {/* SAVE BUTTON */}
      <div className="mt-8 flex justify-end">
        <button 
          onClick={handleSaveSettings} 
          disabled={loading}
          className={`flex items-center gap-2 rounded-xl px-8 py-4 font-semibold text-white transition shadow-lg shadow-purple-900/30 ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
        >
          {loading ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <Save size={20} />} 
          Save Settings
        </button>
      </div>
    </DashboardLayout>
  );
}

export default Settings;