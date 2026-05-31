import { useState, useRef, useEffect } from "react";
import { Move } from "lucide-react";

export default function ZoneDrawer({ value, onChange, imageSrc = "/factory-floor.png" }) {
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [rect, setRect] = useState(value || { top: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    if (value && (value.width !== rect.width || value.height !== rect.height || value.top !== rect.top || value.left !== rect.left)) {
      setRect(value);
    }
  }, [value]);

  const updateRect = (newRect) => {
    setRect(newRect);
    if (onChange) onChange(newRect);
  };

  const getEventCoords = (e) => {
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const container = containerRef.current.getBoundingClientRect();
    let x = ((clientX - container.left) / container.width) * 100;
    let y = ((clientY - container.top) / container.height) * 100;

    // Clamp between 0 and 100
    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));

    return { x, y };
  };

  const handlePointerDown = (e) => {
    if (!containerRef.current) return;
    // prevent default to stop scrolling while dragging on touch
    if (e.type !== 'touchstart') e.preventDefault(); 
    
    const pos = getEventCoords(e);
    setStartPos(pos);
    setIsDrawing(true);
    updateRect({ top: pos.y, left: pos.x, width: 0, height: 0 });
  };

  const handlePointerMove = (e) => {
    if (!isDrawing || !containerRef.current) return;
    if (e.type === 'touchmove') {
      // It's a bit tricky to prevent default on touchmove here without passive: false listener,
      // but overflow hidden on body helps.
    }
    
    const pos = getEventCoords(e);
    const left = Math.min(startPos.x, pos.x);
    const top = Math.min(startPos.y, pos.y);
    const width = Math.abs(pos.x - startPos.x);
    const height = Math.abs(pos.y - startPos.y);

    updateRect({ top, left, width, height });
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const getStyle = () => {
    if (rect.width === 0 || rect.height === 0) return { display: 'none' };
    return {
      top: `${rect.top}%`,
      left: `${rect.left}%`,
      width: `${rect.width}%`,
      height: `${rect.height}%`
    };
  };

  return (
    <div className="space-y-2 mt-3 mb-2 animate-fade-in">
      <div className="flex items-center justify-between">
        <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Area Zona (Tarik & Lepas)</span>
        {rect.width > 0 && (
          <span className="text-[10px] font-mono font-bold text-primary-700 bg-primary-100 px-2 py-0.5 rounded shadow-sm">
            W: {Math.round(rect.width)}% • H: {Math.round(rect.height)}%
          </span>
        )}
      </div>
      <div 
        ref={containerRef}
        className="relative w-full rounded-lg border-2 border-dashed border-gray-300 overflow-hidden cursor-crosshair bg-slate-100 select-none touch-none hover:border-primary-400 transition-colors"
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        style={{ minHeight: '120px' }}
      >
        <img src={imageSrc} alt="Preview Denah" className="w-full h-auto object-contain opacity-70 pointer-events-none" />
        
        {/* Helper text overlay when empty */}
        {rect.width === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-gray-200 text-[10px] font-semibold text-gray-600">
               Pilih area di sini
             </div>
          </div>
        )}

        <div 
          className="absolute border-2 border-primary-500 bg-primary-500/30 shadow-[0_0_0_9999px_rgba(0,0,0,0.4)] transition-all duration-75 pointer-events-none flex items-center justify-center"
          style={getStyle()}
        >
          {rect.width > 5 && rect.height > 5 && (
            <Move className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-md animate-pulse" />
          )}
        </div>
      </div>
      <p className="text-[9px] sm:text-[10px] text-gray-400">Tips: Klik/sentuh gambar di atas dan tarik (drag) untuk membatasi area zona pengawasan.</p>
    </div>
  );
}
