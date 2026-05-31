import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { violationsLog } from "../data";
import { Search, Download, AlertTriangle, CheckCircle, Clock, HardHat, ShieldX, Shirt, Eye, X } from "lucide-react";

const severityConfig = { Critical: { bg: "bg-red-50", text: "text-red-600", dot: "bg-red-500" }, High: { bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-500" }, Medium: { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-500" }, Low: { bg: "bg-gray-100", text: "text-gray-500", dot: "bg-gray-400" } };
const sevLabel = { Critical: "Kritis", High: "Tinggi", Medium: "Sedang", Low: "Rendah" };
const statusConfig = { Open: { icon: Clock, color: "text-amber-600", bg: "bg-amber-50" }, Resolved: { icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" } };
const statusLabel = { Open: "Terbuka", Resolved: "Selesai" };
const typeIcons = { Helmet: HardHat, "Red Zone Intrusion": ShieldX, Vest: Shirt, Hairnet: AlertTriangle };
const typeLabel = { Helmet: "Helm", "Red Zone Intrusion": "Zona Merah", Vest: "Rompi", Hairnet: "Hairnet" };

export default function ViolationsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = violationsLog.filter((v) => {
    const mf = filter === "All" || v.status === filter;
    const ms = !search || v.type.toLowerCase().includes(search.toLowerCase()) || v.worker.toLowerCase().includes(search.toLowerCase()) || v.id.toLowerCase().includes(search.toLowerCase());
    return mf && ms;
  });
  const cnt = (s) => violationsLog.filter(v => v.status === s).length;
  const cntS = (s) => violationsLog.filter(v => v.severity === s).length;

  return (
    <DashboardLayout pageTitle="Manajemen Pelanggaran" pageSubtitle="Pantau dan kelola semua pelanggaran keselamatan">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 stagger-children">
        {[
          { label: "Total", value: violationsLog.length, color: "primary", sub: "Semua hari ini" },
          { label: "Terbuka", value: cnt("Open"), color: "amber", sub: "Perlu ditindak" },
          { label: "Selesai", value: cnt("Resolved"), color: "emerald", sub: "Ditutup hari ini" },
          { label: "Kritis", value: cntS("Critical"), color: "red", sub: "Tindakan segera" },
        ].map((c) => (
          <div key={c.label} className="card p-4">
            <p className={`text-xs font-semibold text-${c.color}-600 mb-1`}>{c.label}</p>
            <p className="text-2xl font-bold text-gray-900">{c.value}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{c.sub}</p>
          </div>
        ))}
      </div>
      <div className="card p-4 sm:p-5 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2 h-9 px-3 rounded-lg bg-gray-50 border border-gray-200 w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <input type="text" placeholder="Cari ID, tipe, pekerja..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none w-full" />
            </div>
            <div className="flex bg-gray-100 rounded-lg p-0.5 gap-0.5">
              {[["All","Semua"],["Open","Terbuka"],["Resolved","Selesai"]].map(([k,l]) => (
                <button key={k} onClick={() => setFilter(k)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${filter === k ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}>{l}</button>
              ))}
            </div>
          </div>
          <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium transition-all"><Download className="w-3.5 h-3.5" /> Ekspor</button>
        </div>
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full min-w-[750px] table-fixed">
            <thead><tr className="border-b border-gray-100">
              <th className="w-[8%] px-3 py-2 text-left text-[10px] font-semibold text-gray-400 uppercase">ID</th>
              <th className="w-[18%] px-3 py-2 text-left text-[10px] font-semibold text-gray-400 uppercase">Tipe</th>
              <th className="w-[14%] px-3 py-2 text-left text-[10px] font-semibold text-gray-400 uppercase">Pekerja</th>
              <th className="w-[22%] px-3 py-2 text-left text-[10px] font-semibold text-gray-400 uppercase">Lokasi</th>
              <th className="w-[10%] px-3 py-2 text-left text-[10px] font-semibold text-gray-400 uppercase">Waktu</th>
              <th className="w-[12%] px-3 py-2 text-left text-[10px] font-semibold text-gray-400 uppercase">Tingkat</th>
            <th className="w-[10%] px-3 py-2 text-left text-[10px] font-semibold text-gray-400 uppercase">Status</th>
            <th className="w-[6%] px-3 py-2"></th>
          </tr></thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((v) => {
              const TI = typeIcons[v.type] || AlertTriangle; const sv = severityConfig[v.severity]; const st = statusConfig[v.status]; const SI = st.icon;
              return (
                <tr key={v.id} className="table-row-hover group cursor-pointer" onClick={() => setSelected(v)}>
                  <td className="px-3 py-2.5 text-xs font-mono font-medium text-primary-600">{v.id}</td>
                  <td className="px-3 py-2.5"><div className="flex items-center gap-2"><div className={`w-6 h-6 rounded-md ${sv.bg} flex items-center justify-center`}><TI className={`w-3 h-3 ${sv.text}`} /></div><span className="text-xs font-medium text-gray-700 truncate">{typeLabel[v.type] || v.type}</span></div></td>
                  <td className="px-3 py-2.5 text-xs text-gray-600 truncate">{v.worker}</td>
                  <td className="px-3 py-2.5"><span className="text-xs text-gray-600 truncate block">{v.cameraLocation}</span><span className="text-[10px] text-gray-400 font-mono">{v.camera}</span></td>
                  <td className="px-3 py-2.5 text-xs text-gray-500 font-mono">{v.timestamp.split(" ")[1]}</td>
                  <td className="px-3 py-2.5"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${sv.bg} ${sv.text}`}><span className={`w-1.5 h-1.5 rounded-full ${sv.dot}`} />{sevLabel[v.severity]}</span></td>
                  <td className="px-3 py-2.5"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${st.bg} ${st.color}`}><SI className="w-3 h-3" />{statusLabel[v.status]}</span></td>
                  <td className="px-3 py-2.5"><button className="w-6 h-6 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-all"><Eye className="w-3.5 h-3.5" /></button></td>
                </tr>
              );
            })}
          </tbody>
          </table>
        </div>
        <div className="pt-3 border-t border-gray-100 mt-2"><p className="text-xs text-gray-400">Menampilkan {filtered.length} dari {violationsLog.length}</p></div>
      </div>
      {selected && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] flex items-center justify-center p-8" onClick={() => setSelected(null)}>
          <div className="bg-white border border-gray-200 rounded-xl w-full max-w-md p-6 shadow-xl animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900">Detail Pelanggaran</h3>
              <button onClick={() => setSelected(null)} className="w-7 h-7 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-400"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3">
              {[["ID", selected.id],["Tipe", typeLabel[selected.type] || selected.type],["Deskripsi", selected.description],["Pekerja", selected.worker],["Kamera", selected.camera],["Lokasi", selected.cameraLocation],["Waktu", selected.timestamp],["Tingkat", sevLabel[selected.severity]],["Status", statusLabel[selected.status]]].map(([l, v]) => (
                <div key={l} className="flex justify-between py-2 border-b border-gray-100"><span className="text-xs text-gray-500">{l}</span><span className="text-xs font-medium text-gray-900">{v}</span></div>
              ))}
            </div>
            <div className="mt-5 flex gap-2">
              <button className="flex-1 py-2 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-medium hover:bg-emerald-100 transition-all">Tandai Selesai</button>
              <button onClick={() => setSelected(null)} className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium hover:bg-gray-200 transition-all">Tutup</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
