import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import CrudModal from "../components/CrudModal";
import { violationsLog } from "../data";
import { AlertTriangle, Users, Camera, Radio, Plus, Edit2 } from "lucide-react";

const zones = [
  { id: "A", label: "Zona A - Produksi", desc: "Lantai produksi utama", status: "warning", workers: 42, cameras: 4, top: "5%", left: "3%", width: "44%", height: "42%" },
  { id: "B", label: "Zona B - Gudang", desc: "Area penyimpanan", status: "danger", workers: 28, cameras: 3, top: "3%", left: "52%", width: "44%", height: "40%" },
  { id: "C", label: "Zona C - Loading Dock", desc: "Area bongkar muat", status: "safe", workers: 35, cameras: 2, top: "52%", left: "5%", width: "38%", height: "43%" },
  { id: "D", label: "Zona D - Packaging", desc: "Area pengemasan & QC", status: "safe", workers: 45, cameras: 3, top: "52%", left: "50%", width: "44%", height: "43%" },
];
const sc = {
  safe: { border: "border-emerald-400", bg: "bg-emerald-400/10", text: "text-emerald-600", dot: "bg-emerald-500", label: "Aman", badge: "bg-emerald-50 text-emerald-600" },
  warning: { border: "border-amber-400", bg: "bg-amber-400/10", text: "text-amber-600", dot: "bg-amber-500", label: "Pelanggaran APD", badge: "bg-amber-50 text-amber-600" },
  danger: { border: "border-red-400", bg: "bg-red-400/15", text: "text-red-600", dot: "bg-red-500", label: "Intrusi", badge: "bg-red-50 text-red-600" },
};

export default function ZoneMapPage() {
  const [crud, setCrud] = useState({ isOpen: false, isEdit: false });
  const alerts = violationsLog.filter(v => v.status === "Open").length;
  return (
    <DashboardLayout pageTitle="Peta Zona Virtual" pageSubtitle="Pemantauan lantai pabrik secara real-time">
      <div className="flex justify-end mb-3 sm:mb-4 relative z-10">
        <button onClick={() => setCrud({ isOpen: true, isEdit: false })} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 text-xs font-medium transition-all shadow-sm"><Plus className="w-3.5 h-3.5" /> Tambah Zona</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 -mt-2">
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="card overflow-hidden animate-slide-in">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div><h3 className="text-sm font-semibold text-gray-900">Lantai Pabrik — Tampilan Langsung</h3><p className="text-xs text-gray-400 mt-0.5">Monitoring zona interaktif</p></div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-xs font-medium text-red-500"><Radio className="w-3 h-3 animate-pulse-dot" />{alerts} Peringatan</span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-xs font-medium text-emerald-600"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />Langsung</span>
              </div>
            </div>
            <div className="p-3 sm:p-4">
              <div className="relative w-full rounded-lg overflow-hidden border border-gray-200 h-[300px] sm:h-[460px]">
                <img src="/factory-floor.png" alt="Denah Pabrik" className="absolute inset-0 w-full h-full object-cover opacity-25" />
                {zones.map((z) => { const c = sc[z.status]; return (
                  <div key={z.id} className={`absolute border-2 ${c.border} ${c.bg} rounded-lg cursor-pointer group hover:opacity-90 transition-opacity`} style={{ top: z.top, left: z.left, width: z.width, height: z.height }}>
                    <div className="absolute top-2 left-2 flex items-center gap-1.5"><span className={`w-2 h-2 rounded-full ${c.dot} ${z.status === "danger" ? "animate-pulse-dot" : ""}`} /><span className={`text-xs font-bold ${c.text}`}>Zona {z.id}</span></div>
                    {z.status === "danger" && <div className="absolute top-2 right-2"><AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" /></div>}
                    <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white rounded-lg px-3 py-2 shadow-lg border border-gray-100">
                        <p className="text-xs font-semibold text-gray-900">{z.label}</p><p className="text-[10px] text-gray-400">{z.desc}</p>
                        <div className="flex gap-3 mt-1"><span className="flex items-center gap-1 text-[10px] text-gray-500"><Users className="w-3 h-3" />{z.workers} pekerja</span><span className="flex items-center gap-1 text-[10px] text-gray-500"><Camera className="w-3 h-3" />{z.cameras} kamera</span></div>
                      </div>
                    </div>
                  </div>
                ); })}
              </div>
            </div>
            <div className="px-5 pb-3 flex items-center justify-center gap-6">
              {[{ l: "Aman", c: "bg-emerald-500" }, { l: "Peringatan", c: "bg-amber-500" }, { l: "Bahaya", c: "bg-red-500" }].map((x) => (
                <div key={x.l} className="flex items-center gap-1.5"><span className={`w-2.5 h-2.5 rounded-full ${x.c}`} /><span className="text-xs text-gray-500">{x.l}</span></div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 xl:col-span-3 space-y-4 stagger-children">
          {zones.map((z) => { const c = sc[z.status]; return (
            <div key={z.id} className={`card p-4 border-l-4 ${c.border} relative group`}>
              <button onClick={() => setCrud({ isOpen: true, isEdit: true })} className="absolute top-2 right-2 w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 hover:text-primary-600 hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-all">
                <Edit2 className="w-3 h-3" />
              </button>
              <div className="flex items-center justify-between mb-2 pr-8"><h4 className="text-xs font-bold text-gray-900">Zona {z.id}</h4><span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${c.badge}`}>{c.label}</span></div>
              <p className="text-[10px] text-gray-400 mb-2">{z.label}</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded-md p-2 text-center"><p className="text-sm font-bold text-gray-900">{z.workers}</p><p className="text-[9px] text-gray-400">Pekerja</p></div>
                <div className="bg-gray-50 rounded-md p-2 text-center"><p className="text-sm font-bold text-gray-900">{z.cameras}</p><p className="text-[9px] text-gray-400">Kamera</p></div>
              </div>
            </div>
          ); })}
        </div>
      </div>
      <CrudModal 
        isOpen={crud.isOpen} 
        isEdit={crud.isEdit}
        onClose={() => setCrud({ isOpen: false, isEdit: false })}
        title="Zona Pemantauan"
        onSave={() => setCrud({ isOpen: false, isEdit: false })}
        onDelete={() => setCrud({ isOpen: false, isEdit: false })}
        fields={[
          { label: "ID Zona", placeholder: "Contoh: E", value: crud.isEdit ? "A" : "" },
          { label: "Nama Zona", placeholder: "Contoh: Produksi Baru", value: crud.isEdit ? "Zona A - Produksi" : "" },
          { label: "Deskripsi", placeholder: "Penjelasan area", value: crud.isEdit ? "Lantai produksi utama" : "" },
          { label: "Kapasitas Pekerja", type: "number", value: crud.isEdit ? "42" : "" }
        ]}
      />
    </DashboardLayout>
  );
}
