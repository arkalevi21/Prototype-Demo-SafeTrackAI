import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowRight, Eye, EyeOff, Camera, Zap, HardHat, UserCog, Radio } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("admin");

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    login(selectedRole);
    setTimeout(() => navigate(selectedRole === "admin" ? "/dashboard" : "/cameras"), 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"><Shield className="w-5 h-5 text-white" /></div>
            <div><h1 className="text-xl font-bold text-white">SafeTrack</h1><p className="text-xs text-primary-200 uppercase tracking-wider font-medium">AI-Powered Safety</p></div>
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">Pemantauan Keselamatan<br />Tempat Kerja Cerdas</h2>
          <p className="text-primary-200 max-w-md">Pemantauan real-time berbasis AI untuk kepatuhan keselamatan kerja, monitoring aset, dan deteksi pelanggaran instan.</p>
          <div className="flex gap-4 mt-8">
            {[{ icon: Camera, label: "12 Kamera Live" }, { icon: Zap, label: "Deteksi AI" }, { icon: HardHat, label: "Monitoring APD" }].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2"><Icon className="w-3.5 h-3.5 text-primary-200" /><span className="text-xs text-white font-medium">{label}</span></div>
            ))}
          </div>
        </div>
        <div className="relative z-10 flex gap-12">
          {[{ val: "150+", label: "Pekerja Dipantau" }, { val: "99.7%", label: "Akurasi Deteksi" }, { val: "< 2d", label: "Respon Peringatan" }].map(({ val, label }) => (
            <div key={label}><p className="text-3xl font-bold text-white">{val}</p><p className="text-xs text-primary-200 mt-1">{label}</p></div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center"><Shield className="w-4 h-4 text-white" /></div>
            <span className="text-lg font-bold text-gray-900">SafeTrack AI</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Selamat Datang</h2>
          <p className="text-sm text-gray-500 mb-6">Masuk untuk mengakses dashboard keselamatan</p>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { key: "admin", label: "Administrator", desc: "Akses penuh sistem", icon: UserCog },
              { key: "pengawas", label: "Pengawas K3", desc: "Monitoring kamera", icon: Radio },
            ].map(({ key, label, desc, icon: Icon }) => (
              <button key={key} type="button" onClick={() => setSelectedRole(key)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${selectedRole === key ? "border-primary-500 bg-primary-50" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                <Icon className={`w-5 h-5 mb-2 ${selectedRole === key ? "text-primary-600" : "text-gray-400"}`} />
                <p className={`text-sm font-semibold ${selectedRole === key ? "text-primary-700" : "text-gray-700"}`}>{label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{desc}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">Email</label>
              <input type="email" defaultValue={selectedRole === "admin" ? "admin@safetrack.ai" : "pengawas@safetrack.ai"} key={selectedRole} className="mt-1.5 w-full h-11 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-50 transition-all" />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">Kata Sandi</label>
                <button type="button" className="text-xs text-primary-600 hover:text-primary-700 font-medium">Lupa?</button>
              </div>
              <div className="relative mt-1.5">
                <input type={showPass ? "text" : "password"} defaultValue="password123" className="w-full h-11 px-4 pr-10 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-50 transition-all" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full h-11 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-60">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><span>Masuk sebagai {selectedRole === "admin" ? "Admin" : "Pengawas K3"}</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-6 bg-gray-50 rounded-lg p-3">🔒 Mode prototipe — pilih peran dan klik <strong className="text-gray-600">Masuk</strong></p>
        </div>
      </div>
    </div>
  );
}
