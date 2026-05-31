import { dashboardStats } from "../data";
import { Users, Camera, ShieldAlert, Activity, AlertTriangle, Map } from "lucide-react";

const stats = [
  { key: "totalWorkers", label: "Total Pekerja", icon: Users, value: dashboardStats.totalWorkers, sub: "Aktif di lokasi hari ini", change: "+12", color: "primary" },
  { key: "activeCameras", label: "Kamera Aktif", icon: Camera, value: dashboardStats.activeCameras, sub: "Memantau semua zona", change: "2 offline", changeNeg: true, color: "blue" },
  { key: "violationsToday", label: "Pelanggaran Hari Ini", icon: ShieldAlert, value: dashboardStats.violationsToday, sub: "vs kemarin", color: "danger" },
  { key: "safetyScore", label: "Skor Keselamatan", icon: Activity, value: `${dashboardStats.safetyScore}%`, sub: "Rata-rata mingguan", change: "+2.4%", color: "success" },
  { key: "activeAlerts", label: "Peringatan Aktif", icon: AlertTriangle, value: dashboardStats.activeAlerts, sub: "Perlu perhatian", change: "Kritis", changeNeg: true, color: "warning" },
  { key: "zonesMonitored", label: "Zona Dipantau", icon: Map, value: dashboardStats.zonesMonitored, sub: "Sektor A, B, C, D", change: "Aman", color: "primary" },
];

const colorMap = {
  primary: { icon: "text-primary-600", border: "border-l-primary-500" },
  blue: { icon: "text-blue-600", border: "border-l-blue-500" },
  danger: { icon: "text-red-600", border: "border-l-red-500" },
  success: { icon: "text-emerald-600", border: "border-l-emerald-500" },
  warning: { icon: "text-amber-600", border: "border-l-amber-500" },
};

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 stagger-children">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const c = colorMap[stat.color];
        return (
          <div key={stat.key} className={`card p-4 border-l-4 ${c.border} hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between mb-2">
              <Icon className={`w-5 h-5 ${c.icon}`} />
              {stat.change && (
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${stat.changeNeg ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-600"}`}>{stat.change}</span>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
