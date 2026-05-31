import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "../components/DashboardLayout";
import CrudModal from "../components/CrudModal";
import { cameraFeeds } from "../data";
import { Camera, Wifi, WifiOff, Maximize2, RotateCcw, Circle, X, ShieldCheck, ShieldAlert, AlertTriangle, Cpu, Clock, ChevronLeft, ChevronRight, Plus, Edit2 } from "lucide-react";

// Simulated AI detection data per camera zone
const detectionData = {
  A: [
    { id: 1, x: 18, y: 52, w: 9, h: 22, status: "violation", type: "Helm", confidence: 94 },
    { id: 2, x: 38, y: 48, w: 8, h: 20, status: "safe", confidence: 98 },
    { id: 3, x: 55, y: 55, w: 9, h: 22, status: "violation", type: "Rompi", confidence: 91 },
    { id: 4, x: 72, y: 42, w: 8, h: 20, status: "safe", confidence: 96 },
    { id: 5, x: 30, y: 70, w: 8, h: 18, status: "safe", confidence: 97 },
    { id: 6, x: 82, y: 62, w: 9, h: 20, status: "violation", type: "Helm", confidence: 89 },
  ],
  B: [
    { id: 1, x: 42, y: 50, w: 10, h: 24, status: "violation", type: "Zona Merah", confidence: 97 },
    { id: 2, x: 58, y: 55, w: 9, h: 22, status: "violation", type: "Zona Merah", confidence: 95 },
    { id: 3, x: 25, y: 60, w: 8, h: 20, status: "safe", confidence: 94 },
    { id: 4, x: 75, y: 48, w: 8, h: 20, status: "safe", confidence: 92 },
  ],
  C: [
    { id: 1, x: 35, y: 55, w: 9, h: 22, status: "safe", confidence: 96 },
    { id: 2, x: 55, y: 52, w: 9, h: 22, status: "safe", confidence: 98 },
    { id: 3, x: 20, y: 60, w: 8, h: 20, status: "safe", confidence: 95 },
  ],
  D: [
    { id: 1, x: 22, y: 48, w: 9, h: 22, status: "violation", type: "Hairnet", confidence: 93 },
    { id: 2, x: 45, y: 52, w: 9, h: 22, status: "safe", confidence: 97 },
    { id: 3, x: 65, y: 50, w: 9, h: 22, status: "safe", confidence: 96 },
    { id: 4, x: 38, y: 68, w: 8, h: 18, status: "safe", confidence: 94 },
  ],
};

function FullscreenCamera({ cam, onClose, onPrev, onNext, camIndex, totalCams }) {
  const [showBoxes, setShowBoxes] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const isOnline = cam.status === "Online";
  const detections = isOnline ? (detectionData[cam.zone] || []) : [];
  const violations = detections.filter(d => d.status === "violation");
  const safe = detections.filter(d => d.status === "safe");

  useEffect(() => {
    const interval = setInterval(() => setElapsedTime(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  const now = new Date();
  const timeStr = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return createPortal(
    <div className="fixed inset-0 bg-slate-50 flex flex-col" style={{ zIndex: 99999 }}>
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-6 py-2 sm:py-3 bg-white border-b border-gray-200 gap-3 sm:gap-0 shrink-0">
        <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${isOnline ? "bg-red-500 animate-pulse-dot" : "bg-gray-400"}`} />
            <span className="text-xs sm:text-sm font-bold text-gray-900">{cam.id}</span>
            <span className="text-xs text-gray-300 hidden sm:inline">—</span>
            <span className="text-xs sm:text-sm text-gray-600">{cam.location}</span>
          </div>
          <div className="flex items-center gap-2">
            {isOnline ? (
              <div className="flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-red-50 border border-red-200">
                <Circle className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-red-500 fill-red-500 animate-pulse-dot" />
                <span className="text-[9px] sm:text-[10px] font-bold text-red-500 uppercase tracking-wider">REC</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-gray-100 border border-gray-200">
                <WifiOff className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" />
                <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider">Offline</span>
              </div>
            )}
            <span className="text-[10px] sm:text-xs font-mono text-gray-400 hidden sm:inline">{timeStr} WIB</span>
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2">
          <span className="text-[10px] font-mono text-gray-400 sm:hidden">{timeStr} WIB</span>
          <div className="flex items-center gap-2">
            {isOnline && (
              <button onClick={() => setShowBoxes(!showBoxes)}
                className={`flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition-all ${showBoxes ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-500 border border-gray-200"}`}>
                <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">{showBoxes ? "AI Deteksi: ON" : "AI Deteksi: OFF"}</span>
                <span className="sm:hidden">{showBoxes ? "AI: ON" : "AI: OFF"}</span>
              </button>
            )}
            <button onClick={onClose} className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors">
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Feed */}
      <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center">
        {/* Prev Button */}
        <button onClick={onPrev} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 backdrop-blur-sm border border-transparent flex items-center justify-center text-gray-700 hover:text-black hover:bg-white shadow-lg transition-all">
          <ChevronLeft className="w-5 h-5" />
        </button>
        {/* Next Button */}
        <button onClick={onNext} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 backdrop-blur-sm border border-transparent flex items-center justify-center text-gray-700 hover:text-black hover:bg-white shadow-lg transition-all">
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* 16:9 Container for perfect AI box alignment */}
        <div className="relative w-full aspect-video" style={{ maxHeight: "100%", maxWidth: "calc(100vh * 16 / 9)" }}>
          {isOnline ? (
            <img src={cam.image} alt={cam.id} className="w-full h-full object-cover" />
          ) : (
          <>
            <img src={cam.image} alt={cam.id} className="w-full h-full object-cover opacity-30 blur-sm grayscale" />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-[5]">
              <WifiOff className="w-16 h-16 text-gray-400 mb-3" />
              <p className="text-lg font-semibold text-gray-500">Sinyal Hilang</p>
              <p className="text-sm text-gray-400 mt-1">Kamera tidak merespon — periksa koneksi</p>
            </div>
          </>
        )}

        {/* AI Detection Overlays */}
        {showBoxes && detections.map((det) => {
          const isViolation = det.status === "violation";
          return (
            <div key={det.id} className="absolute animate-fade-in" style={{ left: `${det.x}%`, top: `${det.y}%`, width: `${det.w}%`, height: `${det.h}%` }}>
              <div className={`w-full h-full border-2 rounded-sm ${isViolation ? "border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]" : "border-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.3)]"}`}>
                <div className={`absolute -top-0.5 -left-0.5 w-3 h-3 ${isViolation ? "border-t-2 border-l-2 border-red-400" : "border-t-2 border-l-2 border-emerald-400"}`} />
                <div className={`absolute -top-0.5 -right-0.5 w-3 h-3 ${isViolation ? "border-t-2 border-r-2 border-red-400" : "border-t-2 border-r-2 border-emerald-400"}`} />
                <div className={`absolute -bottom-0.5 -left-0.5 w-3 h-3 ${isViolation ? "border-b-2 border-l-2 border-red-400" : "border-b-2 border-l-2 border-emerald-400"}`} />
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${isViolation ? "border-b-2 border-r-2 border-red-400" : "border-b-2 border-r-2 border-emerald-400"}`} />
              </div>
              <div className={`absolute -top-6 left-0 flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${isViolation ? "bg-red-500 text-white" : "bg-emerald-500 text-white"}`}>
                {isViolation ? <AlertTriangle className="w-2.5 h-2.5" /> : <ShieldCheck className="w-2.5 h-2.5" />}
                {isViolation ? `Pelanggaran: ${det.type}` : "Aman"}
              </div>
              <div className={`absolute -bottom-5 left-0 px-1 py-0.5 rounded text-[9px] font-mono ${isViolation ? "bg-red-500/80 text-white" : "bg-emerald-500/80 text-white"}`}>
                {det.confidence}%
              </div>
            </div>
          );
        })}

          {/* Scan line animation */}
          {showBoxes && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"
                style={{ top: `${(elapsedTime * 3) % 100}%`, transition: "top 1s linear" }} />
            </div>
          )}
        </div>

        {/* AI Model Watermark */}
        {/* Camera Index */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-700">{camIndex + 1}</span>
          <span className="text-xs text-gray-400">/</span>
          <span className="text-xs text-gray-400">{totalCams}</span>
        </div>
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-primary-600" />
          <span className="text-[10px] font-mono text-gray-600">SafeTrack AI • YOLOv8</span>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-6 py-2 sm:py-3 bg-white border-t border-gray-200 gap-3 sm:gap-0 shrink-0">
        <div className="flex items-center justify-between w-full sm:w-auto gap-3 sm:gap-6">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600" />
            <span className="text-[10px] sm:text-xs text-gray-500">Model: <span className="text-gray-900 font-medium">YOLOv8-SafeTrack</span></span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
            <span className="text-[10px] sm:text-xs text-gray-500">Inferensi: <span className="text-gray-900 font-medium">{isOnline ? "24ms" : "—"}</span></span>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:flex items-center w-full sm:w-auto gap-2 sm:gap-4">
          {isOnline ? (<>
            <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-0.5 sm:gap-2 px-1 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-gray-100 text-center">
              <span className="text-[9px] sm:text-xs text-gray-500 hidden sm:inline">Terdeteksi:</span>
              <span className="text-[9px] text-gray-500 sm:hidden">Total</span>
              <span className="text-[11px] sm:text-sm font-bold text-gray-900">{detections.length} <span className="text-[9px] sm:text-xs text-gray-400 font-normal">orang</span></span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-0.5 sm:gap-2 px-1 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-center">
              <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 hidden sm:block" />
              <span className="text-[9px] text-emerald-600 sm:hidden">Aman</span>
              <span className="text-[11px] sm:text-xs font-semibold text-emerald-700">{safe.length} <span className="hidden sm:inline">Aman</span></span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-0.5 sm:gap-2 px-1 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-red-50 border border-red-200 text-center">
              <ShieldAlert className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-600 hidden sm:block" />
              <span className="text-[9px] text-red-600 sm:hidden">Peringatan</span>
              <span className="text-[11px] sm:text-xs font-semibold text-red-700">{violations.length} <span className="hidden sm:inline">Pelanggaran</span></span>
            </div>
          </>) : (
            <div className="col-span-3 flex items-center justify-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-red-50 border border-red-200">
              <WifiOff className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" />
              <span className="text-[10px] sm:text-xs font-semibold text-red-600">Offline — Tidak ada data</span>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function CamerasPage() {
  const [fullscreenIndex, setFullscreenIndex] = useState(null);
  const [crud, setCrud] = useState({ isOpen: false, isEdit: false });
  const on = cameraFeeds.filter(c => c.status === "Online").length;
  const off = cameraFeeds.filter(c => c.status === "Offline").length;
  const fullscreenCam = fullscreenIndex !== null ? cameraFeeds[fullscreenIndex] : null;
  const handlePrev = () => setFullscreenIndex(i => (i - 1 + cameraFeeds.length) % cameraFeeds.length);
  const handleNext = () => setFullscreenIndex(i => (i + 1) % cameraFeeds.length);

  return (
    <DashboardLayout pageTitle="Pemantauan Kamera" pageSubtitle={`${on} online • ${off} offline`}>
      <div className="flex flex-wrap items-center gap-3 stagger-children">
        {[{ label: "Total", value: cameraFeeds.length, icon: Camera, color: "primary" },{ label: "Online", value: on, icon: Wifi, color: "emerald" },{ label: "Offline", value: off, icon: WifiOff, color: "red" }].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card px-5 py-3 flex items-center gap-3">
            <Icon className={`w-5 h-5 text-${color}-600`} />
            <div><p className={`text-xl font-bold text-${color}-600`}>{value}</p><p className="text-[10px] text-gray-400">{label}</p></div>
          </div>
        ))}
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all"><RotateCcw className="w-3.5 h-3.5" /> Refresh</button>
          <button onClick={() => setCrud({ isOpen: true, isEdit: false })} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 text-xs font-medium transition-all shadow-sm"><Plus className="w-3.5 h-3.5" /> Tambah Kamera</button>
        </div>
      </div>
      <div className="space-y-6">
        {[...new Set(cameraFeeds.map(c => c.location))].sort().map(zoneName => {
          const zoneCams = cameraFeeds.filter(c => c.location === zoneName);
          return (
            <div key={zoneName} className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-2">{zoneName}</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 stagger-children">
                {zoneCams.map((cam) => {
                  const isOn = cam.status === "Online";
                  return (
                    <div key={cam.id} className={`card overflow-hidden group hover:shadow-md transition-all relative ${!isOn ? "opacity-50 grayscale" : ""}`}>
                      <button onClick={(e) => { e.stopPropagation(); setCrud({ isOpen: true, isEdit: true }); }} className="absolute top-2 right-2 z-30 w-7 h-7 rounded-md bg-white/90 shadow-sm flex items-center justify-center text-gray-500 hover:text-primary-600 opacity-0 group-hover:opacity-100 transition-all">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="relative h-24 sm:h-32 md:h-40 bg-gray-900 overflow-hidden">
                        {isOn ? (<>
                          <img src={cam.image} alt={`${cam.id} - ${cam.location}`} className="w-full h-full object-cover" />
                          <div className="absolute top-1 left-1 sm:top-2 sm:left-2 flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-red-500/90 backdrop-blur-sm"><Circle className="w-1.5 h-1.5 text-white fill-white animate-pulse-dot" /><span className="text-[7px] sm:text-[9px] font-bold text-white uppercase tracking-wider hidden sm:inline">Langsung</span></div>
                          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 px-1 sm:px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-sm"><span className="text-[8px] sm:text-[9px] font-mono font-bold text-white/90">{cam.id}</span></div>
                          <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 px-1 sm:px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-sm"><span className="text-[8px] sm:text-[9px] font-mono text-white/80">{new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span></div>
                          <button onClick={() => { const idx = cameraFeeds.findIndex(c => c.id === cam.id); setFullscreenIndex(idx); }} className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-black/60 opacity-0 group-hover:opacity-100 transition-all">
                            <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                        </>) : (
                          <div className="w-full h-full flex flex-col items-center justify-center relative cursor-pointer" onClick={() => { const idx = cameraFeeds.findIndex(c => c.id === cam.id); setFullscreenIndex(idx); }}>
                            <img src={cam.image} alt={cam.id} className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm" />
                            <div className="relative text-center z-10"><WifiOff className="w-4 h-4 sm:w-6 sm:h-6 text-white/60 mx-auto mb-0.5 sm:mb-1" /><p className="text-[8px] sm:text-[10px] text-white/60 font-medium hidden sm:block">Sinyal Hilang</p></div>
                            <div className="absolute top-1 left-1 sm:top-2 sm:left-2 flex items-center gap-1 px-1 sm:px-2 py-0.5 rounded-full bg-gray-700/80"><span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-red-500" /><span className="text-[7px] sm:text-[9px] font-bold text-white/80 uppercase tracking-wider hidden sm:inline">Offline</span></div>
                            <button className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white opacity-0 group-hover:opacity-100 transition-all"><Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /></button>
                          </div>
                        )}
                      </div>
                      <div className="p-2 sm:p-3">
                        <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                          <span className="text-[10px] sm:text-xs font-bold text-gray-900">{cam.id}</span>
                          <span className={`flex items-center gap-0.5 sm:gap-1 px-1 sm:px-1.5 py-0.5 rounded-full text-[7px] sm:text-[9px] font-semibold ${isOn ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}><span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${isOn ? "bg-emerald-500" : "bg-red-500"}`} />{isOn ? "Online" : "Offline"}</span>
                        </div>
                        <p className="text-[8px] sm:text-[10px] text-gray-500 truncate">{cam.location}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Modal with AI Detection */}
      {fullscreenCam && <FullscreenCamera cam={fullscreenCam} onClose={() => setFullscreenIndex(null)} onPrev={handlePrev} onNext={handleNext} camIndex={fullscreenIndex} totalCams={cameraFeeds.length} />}

      <CrudModal 
        isOpen={crud.isOpen} 
        isEdit={crud.isEdit}
        onClose={() => setCrud({ isOpen: false, isEdit: false })}
        title="Kamera CCTV"
        onSave={() => setCrud({ isOpen: false, isEdit: false })}
        onDelete={() => setCrud({ isOpen: false, isEdit: false })}
        fields={[
          { label: "ID Kamera", placeholder: "Contoh: CAM-13", value: crud.isEdit ? "CAM-01" : "" },
          { label: "Zona Lokasi", type: "select", options: ["Zona A - Produksi", "Zona B - Gudang", "Zona C - Loading Dock", "Zona D - Packaging"], value: "Zona A - Produksi" },
          { label: "Status Koneksi", type: "select", options: ["Online", "Offline"], value: "Online" },
          { label: "URL Stream (RTSP/HTTP)", placeholder: "rtsp://192.168.1.100:554/stream1" }
        ]}
      />
    </DashboardLayout>
  );
}
