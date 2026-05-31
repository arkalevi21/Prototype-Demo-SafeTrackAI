import { useState } from "react";
import { violationsLog } from "../data";
import { CheckCircle, Clock, HardHat, ShieldX, Shirt, AlertTriangle } from "lucide-react";

const severityConfig = {
  Critical: { bg: "bg-red-50", text: "text-red-600", dot: "bg-red-500" },
  High: { bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-500" },
  Medium: { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-500" },
  Low: { bg: "bg-gray-100", text: "text-gray-500", dot: "bg-gray-400" },
};
const sevLabel = { Critical: "Kritis", High: "Tinggi", Medium: "Sedang", Low: "Rendah" };
const statusConfig = {
  Open: { icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  Resolved: { icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
};
const statusLabel = { Open: "Terbuka", Resolved: "Selesai" };
const typeIcons = { Helmet: HardHat, "Red Zone Intrusion": ShieldX, Vest: Shirt, Hairnet: AlertTriangle };
const typeLabel = { Helmet: "Helm", "Red Zone Intrusion": "Zona Merah", Vest: "Rompi", Hairnet: "Hairnet" };

export default function ViolationsTable() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? violationsLog : violationsLog.filter(v => v.status === filter);

  return (
    <div className="card p-4 sm:p-5 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Log Pelanggaran</h3>
          <p className="text-xs text-gray-400 mt-0.5">{violationsLog.length} total pelanggaran tercatat hari ini</p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-0.5 gap-0.5 self-start sm:self-auto">
          {[["All","Semua"],["Open","Terbuka"],["Resolved","Selesai"]].map(([k,l]) => (
            <button key={k} onClick={() => setFilter(k)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${filter === k ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}>{l}</button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[700px] table-fixed">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="w-[10%] px-3 py-2 text-left text-[10px] font-semibold text-gray-400 uppercase">ID</th>
              <th className="w-[20%] px-3 py-2 text-left text-[10px] font-semibold text-gray-400 uppercase">Tipe</th>
              <th className="w-[15%] px-3 py-2 text-left text-[10px] font-semibold text-gray-400 uppercase">Pekerja</th>
              <th className="w-[22%] px-3 py-2 text-left text-[10px] font-semibold text-gray-400 uppercase">Lokasi</th>
              <th className="w-[9%] px-3 py-2 text-left text-[10px] font-semibold text-gray-400 uppercase">Waktu</th>
              <th className="w-[12%] px-3 py-2 text-left text-[10px] font-semibold text-gray-400 uppercase">Tingkat</th>
              <th className="w-[12%] px-3 py-2 text-left text-[10px] font-semibold text-gray-400 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((v) => {
              const TI = typeIcons[v.type] || AlertTriangle;
              const sv = severityConfig[v.severity]; const st = statusConfig[v.status]; const SI = st.icon;
              return (
                <tr key={v.id} className="table-row-hover">
                  <td className="px-3 py-2.5 text-xs font-mono font-medium text-primary-600">{v.id}</td>
                  <td className="px-3 py-2.5"><div className="flex items-center gap-2"><div className={`w-6 h-6 rounded-md ${sv.bg} flex items-center justify-center`}><TI className={`w-3 h-3 ${sv.text}`} /></div><span className="text-xs font-medium text-gray-700 truncate">{typeLabel[v.type] || v.type}</span></div></td>
                  <td className="px-3 py-2.5 text-xs text-gray-600 truncate">{v.worker}</td>
                  <td className="px-3 py-2.5"><span className="text-xs text-gray-600 truncate block">{v.cameraLocation}</span><span className="text-[10px] text-gray-400 font-mono">{v.camera}</span></td>
                  <td className="px-3 py-2.5 text-xs text-gray-500 font-mono">{v.timestamp.split(" ")[1]}</td>
                  <td className="px-3 py-2.5"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${sv.bg} ${sv.text}`}><span className={`w-1.5 h-1.5 rounded-full ${sv.dot}`} />{sevLabel[v.severity]}</span></td>
                  <td className="px-3 py-2.5"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${st.bg} ${st.color}`}><SI className="w-3 h-3" />{statusLabel[v.status]}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pt-3 border-t border-gray-100 mt-2"><p className="text-xs text-gray-400">Menampilkan {filtered.length} dari {violationsLog.length} data</p></div>
    </div>
  );
}
