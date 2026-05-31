import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Bell, Monitor, Users, Globe, Lock, Save, Cpu } from "lucide-react";

function Toggle({ on, onToggle, label, desc }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
      <div><p className="text-sm text-gray-700">{label}</p><p className="text-xs text-gray-400 mt-0.5">{desc}</p></div>
      <button onClick={onToggle} className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-all ${on ? "bg-primary-600" : "bg-gray-200"}`}>
        <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${on ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [s, setS] = useState({ email: true, push: true, sound: false, auto: false, ai: true, helmet: true, vest: true, zone: true, hairnet: true });
  const t = (k) => setS(p => ({ ...p, [k]: !p[k] }));

  return (
    <DashboardLayout pageTitle="Pengaturan" pageSubtitle="Konfigurasi preferensi sistem dan aturan monitoring">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        <div className="lg:col-span-8 space-y-4 sm:space-y-5 stagger-children">
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4"><Users className="w-4 h-4 text-primary-600" /><h3 className="text-sm font-semibold text-gray-900">Profil</h3></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[["Nama Lengkap","Admin User","text"],["Alamat Email","admin@safetrack.ai","email"],["Peran","Administrator Sistem","text",true],["Telepon","+62 812 3456 7890","tel"]].map(([l,v,tp,dis]) => (
                <div key={l}><label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{l}</label>
                <input type={tp} defaultValue={v} disabled={dis} className={`mt-1 w-full h-9 px-3 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-primary-500 ${dis?"opacity-50 cursor-not-allowed":""}`} /></div>
              ))}
            </div>
            <button className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium transition-all"><Save className="w-3.5 h-3.5" /> Simpan</button>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3"><Bell className="w-4 h-4 text-amber-600" /><h3 className="text-sm font-semibold text-gray-900">Preferensi Notifikasi</h3></div>
            <Toggle on={s.email} onToggle={() => t("email")} label="Notifikasi Email" desc="Terima peringatan pelanggaran via email" />
            <Toggle on={s.push} onToggle={() => t("push")} label="Notifikasi Push" desc="Peringatan real-time di browser" />
            <Toggle on={s.sound} onToggle={() => t("sound")} label="Peringatan Suara" desc="Mainkan audio untuk pelanggaran kritis" />
            <Toggle on={s.auto} onToggle={() => t("auto")} label="Auto-Selesai (24 jam)" desc="Otomatis selesaikan setelah 24 jam" />
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3"><Cpu className="w-4 h-4 text-emerald-600" /><h3 className="text-sm font-semibold text-gray-900">Aturan Deteksi AI</h3></div>
            <Toggle on={s.ai} onToggle={() => t("ai")} label="Mesin Deteksi AI" desc="Toggle utama untuk semua deteksi" />
            <Toggle on={s.helmet} onToggle={() => t("helmet")} label="Deteksi Helm" desc="Deteksi helm keselamatan yang hilang" />
            <Toggle on={s.vest} onToggle={() => t("vest")} label="Deteksi Rompi" desc="Monitor kepatuhan rompi keselamatan" />
            <Toggle on={s.zone} onToggle={() => t("zone")} label="Intrusi Zona Merah" desc="Peringatan akses tidak sah" />
            <Toggle on={s.hairnet} onToggle={() => t("hairnet")} label="Deteksi Hairnet" desc="Monitor kepatuhan hairnet" />
          </div>
        </div>
        <div className="lg:col-span-4 space-y-4 sm:space-y-5 stagger-children">
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4"><Monitor className="w-4 h-4 text-blue-600" /><h3 className="text-sm font-semibold text-gray-900">Info Sistem</h3></div>
            {[["Platform","SafeTrack AI v2.1"],["Model AI","YOLOv8 + Custom"],["Status","Online","text-emerald-600"],["Uptime","99.97%"],["Retensi Data","90 hari"]].map(([l,v,vc]) => (
              <div key={l} className="flex justify-between py-2 border-b border-gray-50"><span className="text-xs text-gray-400">{l}</span><span className={`text-xs font-medium ${vc || "text-gray-700"}`}>{v}</span></div>
            ))}
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4"><Lock className="w-4 h-4 text-red-600" /><h3 className="text-sm font-semibold text-gray-900">Keamanan</h3></div>
            {["Ubah Kata Sandi","Autentikasi Dua Faktor","Sesi Aktif","Log Audit"].map((b) => (
              <button key={b} className="w-full py-2 rounded-lg hover:bg-gray-50 text-xs text-gray-600 text-left px-3 transition-all mb-1">{b}</button>
            ))}
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3"><Globe className="w-4 h-4 text-primary-600" /><h3 className="text-sm font-semibold text-gray-900">Tampilan</h3></div>
            <div><label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Bahasa</label>
            <select className="mt-1 w-full h-9 px-3 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-primary-500 appearance-none cursor-pointer"><option>Bahasa Indonesia</option><option>English</option></select></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
