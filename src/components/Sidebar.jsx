import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard, ShieldAlert, Camera, Map, FileBarChart,
  Settings, LogOut, Shield, ChevronLeft, ChevronRight, X,
} from "lucide-react";

const allNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard", adminOnly: true },
  { icon: ShieldAlert, label: "Pelanggaran", path: "/violations", adminOnly: true },
  { icon: Camera, label: "Kamera", path: "/cameras" },
  { icon: Map, label: "Peta Zona", path: "/zone-map", adminOnly: true },
  { icon: FileBarChart, label: "Laporan", path: "/reports", adminOnly: true },
  { icon: Settings, label: "Pengaturan", path: "/settings", adminOnly: true },
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "admin";
  const navItems = allNavItems.filter(item => !item.adminOnly || isAdmin);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={onMobileClose} />}

      <aside className={`
        fixed top-0 h-screen bg-white border-r border-gray-200 flex flex-col z-50 transition-all duration-300
        ${mobileOpen ? "left-0 w-64" : "-left-64 lg:left-0"}
        ${collapsed ? "lg:w-20" : "lg:w-64"}
      `}>
        <div className="h-14 flex items-center justify-between px-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-white" />
            </div>
            {(!collapsed || mobileOpen) && (
              <div>
                <h1 className="text-sm font-bold text-gray-900 leading-none">SafeTrack</h1>
                <p className="text-[10px] font-medium text-primary-600 uppercase tracking-wider">AI Monitor</p>
              </div>
            )}
          </div>
          <button onClick={mobileOpen ? onMobileClose : onToggle} className="w-7 h-7 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
            {mobileOpen ? <X className="w-4 h-4" /> : collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
        <nav className="flex-1 py-3 px-3 space-y-0.5 overflow-y-auto">
          {(!collapsed || mobileOpen) && <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Menu</p>}
          {navItems.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <button key={label} onClick={() => { navigate(path); onMobileClose?.(); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-primary-50 text-primary-700" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`}
                title={collapsed && !mobileOpen ? label : undefined}>
                <Icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? "text-primary-600" : ""}`} />
                {(!collapsed || mobileOpen) && <span>{label}</span>}
              </button>
            );
          })}
        </nav>
        <div className="border-t border-gray-100 p-3">
          <div className={`flex items-center gap-3 px-3 py-2 ${collapsed && !mobileOpen ? "justify-center" : ""}`}>
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs shrink-0">{user?.initial || "U"}</div>
            {(!collapsed || mobileOpen) && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-[10px] text-gray-400 truncate">{isAdmin ? "Administrator" : "Pengawas K3"}</p>
              </div>
            )}
          </div>
          <button onClick={() => { logout(); navigate("/login"); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-danger-600 hover:bg-danger-50 transition-all mt-1 ${collapsed && !mobileOpen ? "justify-center" : ""}`}>
            <LogOut className="w-4 h-4 shrink-0" />
            {(!collapsed || mobileOpen) && <span>Keluar</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
