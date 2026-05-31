import DashboardLayout from "../components/DashboardLayout";
import { dashboardStats } from "../data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Download, FileText, TrendingUp, ShieldAlert, Users, Calendar } from "lucide-react";

const weeklyData = [
  { day: "Sen", pelanggaran: 8, selesai: 6 }, { day: "Sel", pelanggaran: 12, selesai: 10 },
  { day: "Rab", pelanggaran: 6, selesai: 5 }, { day: "Kam", pelanggaran: 15, selesai: 11 },
  { day: "Jum", pelanggaran: 10, selesai: 9 }, { day: "Sab", pelanggaran: 4, selesai: 4 },
  { day: "Min", pelanggaran: 5, selesai: 3 },
];
const zoneData = [
  { zone: "Zona A", violations: 18, color: "#6366f1" }, { zone: "Zona B", violations: 24, color: "#ef4444" },
  { zone: "Zona C", violations: 8, color: "#10b981" }, { zone: "Zona D", violations: 10, color: "#f59e0b" },
];
const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (<div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-lg"><p className="text-[10px] text-gray-400">{label}</p>
    {payload.map((p, i) => <p key={i} className="text-xs font-semibold" style={{ color: p.color }}>{p.name}: {p.value}</p>)}</div>);
};

export default function ReportsPage() {
  const tot = weeklyData.reduce((a, b) => a + b.pelanggaran, 0);
  const res = weeklyData.reduce((a, b) => a + b.selesai, 0);
  const rate = Math.round((res / tot) * 100);
  return (
    <DashboardLayout pageTitle="Laporan & Analitik" pageSubtitle="Insight performa keselamatan">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 stagger-children">
        {[
          { label: "Pelanggaran Mingguan", value: tot, change: "-12%", icon: ShieldAlert, color: "primary" },
          { label: "Tingkat Penyelesaian", value: `${rate}%`, change: "+5%", icon: TrendingUp, color: "emerald" },
          { label: "Rata-rata Respon", value: "2.4m", change: "-18d", icon: Calendar, color: "blue" },
          { label: "Skor Keselamatan", value: `${dashboardStats.safetyScore}%`, change: "+2.4%", icon: Users, color: "amber" },
        ].map((k) => { const Icon = k.icon; return (
          <div key={k.label} className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <Icon className={`w-5 h-5 text-${k.color}-600`} />
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{k.change}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{k.value}</p><p className="text-xs text-gray-500 mt-0.5">{k.label}</p>
          </div>
        ); })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        <div className="lg:col-span-8 card p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <div><h3 className="text-sm font-semibold text-gray-900">Tren Mingguan</h3><p className="text-xs text-gray-400 mt-0.5">Pelanggaran vs selesai</p></div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-500 hover:text-gray-700"><Download className="w-3 h-3" /> Ekspor</button>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weeklyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} /><Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="pelanggaran" name="Pelanggaran" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="selesai" name="Selesai" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="lg:col-span-4 card p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Per Zona</h3><p className="text-xs text-gray-400 mb-3">Distribusi</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart><Pie data={zoneData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="violations" strokeWidth={0}>
              {zoneData.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie></PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {zoneData.map((z) => (<div key={z.zone} className="flex items-center justify-between"><div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: z.color }} /><span className="text-[10px] text-gray-500">{z.zone}</span></div><span className="text-[10px] font-bold text-gray-700">{z.violations}</span></div>))}
          </div>
        </div>
      </div>
      <div className="card">
        <div className="p-5 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-900">Laporan Tersedia</h3></div>
        <div className="divide-y divide-gray-50">
          {[["Laporan Mingguan — Mei W4","26 Mei 2026","2.4 MB"],["Laporan Mingguan — Mei W3","19 Mei 2026","1.8 MB"],["Laporan Bulanan — April","01 Mei 2026","5.2 MB"],["Audit K3 Q1 2026","01 Apr 2026","8.1 MB"]].map(([n,d,s],i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3 group table-row-hover">
              <div className="flex items-center gap-3"><FileText className="w-4 h-4 text-primary-600" /><div><p className="text-xs font-medium text-gray-900">{n}</p><p className="text-[10px] text-gray-400">{d} • {s}</p></div></div>
              <button className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] text-gray-400 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all"><Download className="w-3 h-3" /> Unduh</button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
