import { Bell, Search } from "lucide-react";

function Topbar() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#050505]/80 px-8 py-6 backdrop-blur-xl">
      {/* Left Side (Empty for Dashboard Heading Alignment) */}
      <div />

      {/* Right Side */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="flex w-80 items-center rounded-2xl border border-white/10 bg-[#111111] px-4 py-3 transition-all duration-300 focus-within:border-purple-500">
          <Search size={18} className="text-gray-500" />

          <input
            type="text"
            placeholder="Search..."
            className="ml-3 w-full bg-transparent text-white placeholder:text-gray-500 outline-none"
          />
        </div>

        {/* Notification */}
        <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#111111] transition-all duration-300 hover:border-purple-500 hover:bg-[#181818]">
          <Bell size={20} className="text-white" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111111] px-4 py-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 font-bold text-white">
            M
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Mohsin</h4>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;