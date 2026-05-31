import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Save, Trash2 } from "lucide-react";
import ZoneDrawer from "./ZoneDrawer";

export default function CrudModal({ isOpen, onClose, title, fields, onSave, onDelete, isEdit }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 sm:p-8" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden animate-slide-in flex flex-col max-h-full" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900">{isEdit ? "Edit " : "Tambah "}{title}</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
          {fields.map((f, i) => (
            <div key={i}>
              {f.type !== "zone-drawer" && (
                <label className="block text-[10px] sm:text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">{f.label}</label>
              )}
              {f.type === "select" ? (
                <select className="w-full h-9 sm:h-10 px-3 rounded-lg border border-gray-200 text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-primary-500 bg-white" defaultValue={f.value}>
                  {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : f.type === "file" ? (
                <input type="file" accept="image/*" className="w-full text-xs sm:text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer" />
              ) : f.type === "zone-drawer" ? (
                <ZoneDrawer value={f.value} />
              ) : (
                <input type={f.type || "text"} placeholder={f.placeholder} defaultValue={f.value} className="w-full h-9 sm:h-10 px-3 rounded-lg border border-gray-200 text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-primary-500" />
              )}
            </div>
          ))}
        </div>
        <div className="p-4 sm:p-5 border-t border-gray-100 flex items-center justify-between gap-3 bg-gray-50 shrink-0">
          {isEdit ? (
            <button onClick={onDelete} className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 text-xs font-medium transition-all">
              <Trash2 className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Hapus</span>
            </button>
          ) : <div />}
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-3 sm:px-4 py-2 rounded-lg text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 text-xs font-medium transition-all">Batal</button>
            <button onClick={onSave} className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 text-xs font-medium transition-all shadow-sm">
              <Save className="w-3.5 h-3.5" /> Simpan
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
