import { Bell, Search, Menu } from "lucide-react";
import { useState } from "react";

export default function TopBar({ title = "Ringkasan Dashboard", subtitle, onMenuClick }) {
  const [searchFocused, setSearchFocused] = useState(false);
  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const timeStr = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500">
          <Menu className="w-5 h-5" />
        </button>
        <div className="min-w-0">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{title}</h2>
          <p className="text-[10px] sm:text-xs text-gray-400 hidden sm:block">{subtitle || `${dateStr} • ${timeStr} WIB`}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className={`hidden sm:flex items-center gap-2 h-9 px-3 rounded-lg bg-gray-50 border transition-all ${searchFocused ? "border-primary-300 ring-2 ring-primary-50 w-56" : "border-gray-200 w-44"}`}>
          <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <input type="text" placeholder="Cari..." className="bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none w-full"
            onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} />
        </div>
        <button className="relative w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger-500 text-white text-[9px] font-bold flex items-center justify-center">3</span>
        </button>
        <div className="hidden sm:flex items-center gap-1.5 px-3 h-9 rounded-lg bg-success-50 border border-success-200">
          <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse-dot" />
          <span className="text-xs font-medium text-success-600">Langsung</span>
        </div>
      </div>
    </header>
  );
}
