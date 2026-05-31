import { recentActivity } from "../data";
import { AlertTriangle, ShieldX, CheckCircle, Info } from "lucide-react";

const iconMap = {
  warning: { icon: AlertTriangle, bg: "bg-amber-50", color: "text-amber-500" },
  critical: { icon: ShieldX, bg: "bg-red-50", color: "text-red-500" },
  success: { icon: CheckCircle, bg: "bg-emerald-50", color: "text-emerald-500" },
  info: { icon: Info, bg: "bg-blue-50", color: "text-blue-500" },
};

export default function ActivityFeed() {
  return (
    <div className="card p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Aktivitas Terkini</h3>
        <span className="text-[10px] text-gray-400">Event sistem langsung</span>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto">
        {recentActivity.map((item) => {
          const cfg = iconMap[item.type] || iconMap.info;
          const Icon = cfg.icon;
          return (
            <div key={item.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
              <Icon className={`w-4 h-4 ${cfg.color} shrink-0 mt-0.5`} />
              <div className="min-w-0">
                <p className="text-xs text-gray-700 leading-relaxed">{item.message}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button className="mt-3 text-xs text-primary-600 hover:text-primary-700 font-medium text-center">Lihat Semua Aktivitas</button>
    </div>
  );
}
