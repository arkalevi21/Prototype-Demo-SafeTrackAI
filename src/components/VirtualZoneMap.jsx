import { AlertTriangle, Users, Camera } from "lucide-react";

const zones = [
  { id: "A", label: "Produksi", status: "warning", top: "5%", left: "3%", width: "44%", height: "42%" },
  { id: "B", label: "Gudang", status: "danger", top: "3%", left: "52%", width: "44%", height: "40%" },
  { id: "C", label: "Loading Dock", status: "safe", top: "52%", left: "5%", width: "38%", height: "43%" },
  { id: "D", label: "Packaging", status: "safe", top: "52%", left: "50%", width: "44%", height: "43%" },
];
const statusColors = {
  safe: { border: "border-emerald-400", bg: "bg-emerald-400/10", text: "text-emerald-600", dot: "bg-emerald-500" },
  warning: { border: "border-amber-400", bg: "bg-amber-400/10", text: "text-amber-600", dot: "bg-amber-500" },
  danger: { border: "border-red-400", bg: "bg-red-400/15", text: "text-red-600", dot: "bg-red-500" },
};

export default function VirtualZoneMap() {
  const alertCount = zones.filter(z => z.status !== "safe").length;
  return (
    <div className="card p-5 h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Peta Zona Virtual</h3>
        <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-amber-50 text-amber-600">{alertCount} Peringatan</span>
      </div>
      <div className="relative w-full rounded-lg overflow-hidden border border-gray-200 h-[200px] sm:h-[280px]">
        <img src="/factory-floor.png" alt="Denah Lantai Pabrik" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        {zones.map((zone) => {
          const c = statusColors[zone.status];
          return (
            <div key={zone.id} className={`absolute border-2 ${c.border} ${c.bg} rounded-md cursor-pointer hover:opacity-90 transition-opacity`}
              style={{ top: zone.top, left: zone.left, width: zone.width, height: zone.height }}>
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${c.dot} ${zone.status === "danger" ? "animate-pulse-dot" : ""}`} />
                <span className={`text-xs font-bold ${c.text}`}>{zone.id}</span>
              </div>
              {zone.status === "danger" && <div className="absolute top-2 right-2"><AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" /></div>}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-6 mt-3">
        {[{ label: "Aman", color: "bg-emerald-500" }, { label: "Peringatan", color: "bg-amber-500" }, { label: "Bahaya", color: "bg-red-500" }].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5"><span className={`w-2 h-2 rounded-full ${l.color}`} /><span className="text-[10px] text-gray-500">{l.label}</span></div>
        ))}
      </div>
    </div>
  );
}
