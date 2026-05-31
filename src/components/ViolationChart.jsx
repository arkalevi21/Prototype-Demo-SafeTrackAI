import { violationTrend, violationsByType } from "../data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{payload[0].value} pelanggaran</p>
    </div>
  );
};

export default function ViolationChart() {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Tren Pelanggaran</h3>
          <p className="text-xs text-gray-400 mt-0.5">Frekuensi per jam hari ini</p>
        </div>
        <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-red-50 text-red-500">↑ Puncak 14:00</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-8">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={violationTrend}>
              <defs><linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366f1" stopOpacity={0.15} /><stop offset="100%" stopColor="#6366f1" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="violations" stroke="#6366f1" strokeWidth={2} fill="url(#areaFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="sm:col-span-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Berdasarkan Tipe</p>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart><Pie data={violationsByType} cx="50%" cy="50%" innerRadius={28} outerRadius={48} paddingAngle={3} dataKey="value" strokeWidth={0}>
              {violationsByType.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
            </Pie></PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {violationsByType.map((v) => (
              <div key={v.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: v.color }} /><span className="text-[10px] text-gray-500">{v.name === "Helmet" ? "Helm" : v.name === "Vest" ? "Rompi" : v.name === "Red Zone" ? "Zona Merah" : "Hairnet"}</span></div>
                <span className="text-[10px] font-semibold text-gray-700">{v.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
