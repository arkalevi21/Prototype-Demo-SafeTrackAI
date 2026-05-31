import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function DashboardLayout({ children, pageTitle, pageSubtitle }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ml-0 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"}`}>
        <TopBar title={pageTitle} subtitle={pageSubtitle} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto min-w-0">{children}</main>
      </div>
    </div>
  );
}
