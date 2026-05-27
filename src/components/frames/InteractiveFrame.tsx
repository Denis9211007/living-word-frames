import React, { useState } from "react";
import { CustomizedOrder } from "../../types";
import { INTERIOR_PREVIEWS } from "../../data";
import { Sparkles, Eye, Maximize, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

interface InteractiveFrameProps {
  order: CustomizedOrder;
  onUpdateOrder: (fields: Partial<CustomizedOrder>) => void;
}

export default function InteractiveFrame({ order, onUpdateOrder }: InteractiveFrameProps) {
  const [roomPreset, setRoomPreset] = useState<"none" | "living-room" | "cozy-bed" | "executive-office">("none");
  const [zoomIn, setZoomIn] = useState<boolean>(false);
  const [shineHover, setShineHover] = useState<boolean>(false);

  const getAlignmentClass = () => {
    switch (order.alignment) {
      case "left": return "text-left";
      case "right": return "text-right";
      default: return "text-center";
    }
  };

  const displayVerseText = order.customText || order.verse.verse;
  const displayVerseRef = order.customReference || order.verse.reference;

  const getWoodThemeVars = (materialId: string) => {
    switch (materialId) {
      case "honey-oak":
        return {
          "--wood-base": "var(--oak-base)",
          "--wood-pore": "var(--oak-pore)",
          "--wood-ambient": "var(--oak-ambient)",
          "--wood-hi": "var(--oak-hi)",
        };
      case "alabaster-birch":
        return {
          "--wood-base": "var(--birch-base)",
          "--wood-pore": "var(--birch-pore)",
          "--wood-ambient": "var(--birch-ambient)",
          "--wood-hi": "var(--birch-hi)",
        };
      case "royal-cherry":
        return {
          "--wood-base": "var(--cherry-base)",
          "--wood-pore": "var(--cherry-pore)",
          "--wood-ambient": "var(--cherry-ambient)",
          "--wood-hi": "var(--cherry-hi)",
        };
      case "matte-ebony":
        return {
          "--wood-base": "var(--ebony-base)",
          "--wood-pore": "var(--ebony-pore)",
          "--wood-ambient": "var(--ebony-ambient)",
          "--wood-hi": "var(--ebony-hi)",
        };
      case "rustic-driftwood":
        return {
          "--wood-base": "var(--driftwood-base)",
          "--wood-pore": "var(--driftwood-pore)",
          "--wood-ambient": "var(--driftwood-ambient)",
          "--wood-hi": "var(--driftwood-hi)",
        };
      default: // smoked-walnut
        return {
          "--wood-base": "var(--walnut-base)",
          "--wood-pore": "var(--walnut-pore)",
          "--wood-ambient": "var(--walnut-ambient)",
          "--wood-hi": "var(--walnut-hi)",
        };
    }
  };

  const woodVars = getWoodThemeVars(order.material.id);

  return (
    <div id="interactive-preview-viewport" className="flex flex-col items-center w-full">
      {/* Viewport Card */}
      <div 
        className={`relative w-full rounded-2xl overflow-hidden flex flex-col items-center justify-center transition-all duration-700 min-h-[480px] lg:min-h-[580px] p-6 lg:p-12 mb-6 ${
          roomPreset === "none" ? "glass-panel-dark" : ""
        }`}
      >
        {/* Wall Canvas Backdrop for Room Mode */}
        {roomPreset !== "none" && (
          <div className="absolute inset-0 z-0">
            <img 
              src={INTERIOR_PREVIEWS.find(p => p.id === roomPreset)?.url} 
              alt="Room Mockup Preview" 
              className="w-full h-full object-cover brightness-90 filter saturate-90 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Ambient vignette shadow layer to pull frame focus */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/35 mix-blend-multiply pointer-events-none" />
          </div>
        )}

        {/* Floating Ambient Ethereal Glow */}
        {roomPreset === "none" && (
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-950/10 filter blur-[100px] animate-glow-slow pointer-events-none" />
        )}

        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          {/* Main Simulated Frame Wrapper - All Wood, Sharp Corners (no rounded edges) */}
          <motion.div
            id="picture-frame-root"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ 
               scale: zoomIn ? 1.28 : 1, 
               opacity: 1,
               y: zoomIn ? 0 : [0, -3, 0],
            }}
            transition={{ 
               scale: { type: "spring", stiffness: 350, damping: 25 },
               y: { duration: 6, repeat: zoomIn ? 0 : Infinity, ease: "easeInOut" }
            }}
            onMouseEnter={() => setShineHover(true)}
            onMouseLeave={() => setShineHover(false)}
            className="relative w-full transition-all duration-300 rounded-none bg-[#140e0b] max-[340px]:max-w-[280px] sm:max-w-[420px] aspect-[11/14] p-[36px] md:p-[42px] shadow-[-25px_35px_65px_rgba(0,0,0,0.9),-4px_6px_25px_rgba(0,0,0,0.6)] [--plank-w:36px] md:[--plank-w:42px]"
          >
            {/* 3D WOOD MITER EXTRA REALISM ASSEMBLY (Parallel run graining stopping at precise 45deg joins) */}
            {/* 1. TOP WOOD PLANK */}
            <div 
              className="absolute top-0 left-0 right-0 h-[36px] md:h-[42px] z-10 pointer-events-none wood-plank-h"
              style={{
                clipPath: "polygon(0 0, 100% 0, calc(100% - var(--plank-w)) 100%, var(--plank-w) 100%)",
                ...woodVars
              } as React.CSSProperties}
            >
              <div className="wood-plank-h-grain" />
              <div className="wood-wear-scratches" />
              <div className="wood-lacquer-finish" />
              <div className="wood-bevel-emboss-h" />
            </div>

            {/* 2. BOTTOM WOOD PLANK */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[36px] md:h-[42px] z-10 pointer-events-none wood-plank-h"
              style={{
                clipPath: "polygon(var(--plank-w) 0, calc(100% - var(--plank-w)) 0, 100% 100%, 0 100%)",
                ...woodVars
              } as React.CSSProperties}
            >
              <div className="wood-plank-h-grain" />
              <div className="wood-wear-scratches" />
              <div className="wood-lacquer-finish" />
              <div className="wood-bevel-emboss-h" />
            </div>

            {/* 3. LEFT WOOD PLANK */}
            <div 
              className="absolute top-0 bottom-0 left-0 w-[36px] md:w-[42px] z-10 pointer-events-none wood-plank-v"
              style={{
                clipPath: "polygon(0 0, 100% var(--plank-w), 100% calc(100% - var(--plank-w)), 0 100%)",
                ...woodVars
              } as React.CSSProperties}
            >
              <div className="wood-plank-v-grain" />
              <div className="wood-wear-scratches" />
              <div className="wood-lacquer-finish" />
              <div className="wood-bevel-emboss-v" />
            </div>

            {/* 4. RIGHT WOOD PLANK */}
            <div 
              className="absolute top-0 bottom-0 right-0 w-[36px] md:w-[42px] z-10 pointer-events-none wood-plank-v"
              style={{
                clipPath: "polygon(0 var(--plank-w), 100% 0, 100% 100%, 0 calc(100% - var(--plank-w)))",
                ...woodVars
              } as React.CSSProperties}
            >
              <div className="wood-plank-v-grain" />
              <div className="wood-wear-scratches" />
              <div className="wood-lacquer-finish" />
              <div className="wood-bevel-emboss-v" />
            </div>

            {/* Real physical parting line seams at corners for artisan join details */}
            <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden rounded-none">
              <div className="absolute top-0 left-0 w-[42px] h-[42px] border-r border-[#000]/40 transform origin-top-left rotate-45 opacity-70" />
              <div className="absolute top-0 right-0 w-[42px] h-[42px] border-l border-[#000]/40 transform origin-top-right -rotate-45 opacity-70" />
              <div className="absolute bottom-0 left-0 w-[42px] h-[42px] border-r border-[#000]/40 transform origin-bottom-left -rotate-45 opacity-70" />
              <div className="absolute bottom-0 right-0 w-[42px] h-[42px] border-l border-[#000]/40 transform origin-bottom-right rotate-45 opacity-70" />
            </div>

            {/* Inset Shadow transition framing wood to mat-board */}
            <div className="absolute inset-[35px] md:inset-[41px] border border-black/40 pointer-events-none z-15 shadow-[inset_0_2px_5px_rgba(0,0,0,0.85)]" />

            {/* ART & MAT AREA WITH FULL GLASS INSIDE THE WOOD INNER EDGES */}
            <div 
              className="absolute inset-[36px] md:inset-[42px] bg-[#fbfaf5] shadow-[inset_0_3px_8px_rgba(0,0,0,0.15)] overflow-hidden z-10 select-none rounded-none"
            >
              {/* Actual Mat Board Surface Cardboard Lining */}
              <div className="absolute inset-0 bg-[#faf9f4]" style={{ backgroundColor: order.mat.colorClass === "bg-transparent" ? "transparent" : "" }} />

              {/* Gold bevel double mat line has been removed to follow "all wood, no gold yellow" guidelines, but keep clean white/neutral border */}
              <div className="absolute inset-1.5 md:inset-2.5 border border-stone-300/40 pointer-events-none z-10" />

              {/* Beveled Cutout Window for Scripture Print Area */}
              {/* In floating glass mode, it goes fully transparent. Otherwise, it creates a gorgeous beveled art insert */}
              <div 
                className={`
                  absolute inset-4 sm:inset-6 md:inset-8 z-10 overflow-hidden border border-stone-300/60 transition-all duration-350 shadow-[inset_0_1.5px_4px_rgba(0,0,0,0.06),_0_0.5px_0.5px_white]
                  ${order.backgroundArtwork && order.backgroundArtwork.textColorClass ? "bg-stone-900" : "bg-[#fcfdfa]"}
                `}
              >
                {/* 1. NATURE VISIBLE WATERMARK/BACKDROP ART */}
                {order.backgroundArtwork && order.backgroundArtwork.url && (
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={order.backgroundArtwork.url} 
                      alt={order.backgroundArtwork.name}
                      className="w-full h-full object-cover pointer-events-none select-none scale-101"
                      referrerPolicy="no-referrer"
                    />
                    <div className={`absolute inset-0 transition-opacity duration-500 z-1 ${order.backgroundArtwork.overlayClass}`} />
                  </div>
                )}

                {/* 2. TEXT & CONTENT (Fully centered and perfectly in context!) */}
                <div className="absolute inset-0 z-10 flex flex-col justify-between items-center p-4 md:p-6 text-center">
                  {/* Subtle top header accent */}
                  <span className={`text-[8px] uppercase tracking-[0.25em] font-semibold transition-colors duration-300 ${order.backgroundArtwork && order.backgroundArtwork.id !== "none" ? "text-white/40" : "text-stone-400"}`}>
                    S C R I P T U R E
                  </span>

                  {/* Centered Verse Section */}
                  <div className={`my-auto w-full px-2 ${getAlignmentClass()}`}>
                    <p 
                      style={{ fontSize: `${order.textScale}em` }}
                      className={`
                        text-xs sm:text-xs md:text-sm lg:text-base font-serif-lux transition-all duration-300 leading-relaxed
                        ${order.backgroundArtwork ? order.backgroundArtwork.textColorClass : "text-neutral-900"}
                        ${order.font.fontFamily}
                        ${order.font.letterSpacing}
                        ${order.font.lineHeight}
                        ${order.italics ? "italic" : ""}
                      `}
                    >
                      "{displayVerseText}"
                    </p>
                    
                    {displayVerseRef && (
                      <p className={`mt-3 text-[10px] font-display-modern uppercase tracking-widest font-semibold transition-colors duration-300 ${order.backgroundArtwork && order.backgroundArtwork.id !== "none" ? "text-white/80" : "text-emerald-900"}`}>
                        — {displayVerseRef}
                      </p>
                    )}
                  </div>

                  {/* Subtle bottom footer accent */}
                  <span className={`text-[7px] uppercase tracking-[0.2em] font-bold transition-colors duration-300 ${order.backgroundArtwork && order.backgroundArtwork.id !== "none" ? "text-white/35" : "text-stone-350"}`}>
                    MUSEUM ARCHIVAL EDITION
                  </span>
                </div>
              </div>

              {/* 3. SIMULATED REFLECTION & MUSEUM GLASS INSET OVERLAY */}
              <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                {/* Dynamic reflecting glare strip */}
                <div 
                  className="absolute -inset-[180%] bg-gradient-to-tr from-transparent via-white/12 to-transparent transform rotate-[35deg] transition-transform duration-[1000ms] ease-out"
                  style={{
                    transform: shineHover 
                      ? "translate(15%, 15%) rotate(35deg)" 
                      : "translate(-20%, -20%) rotate(35deg)"
                  }}
                />
                
                {/* Micro edge bevel reflection speculars */}
                <div className="absolute inset-0 border border-white/15 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.25),_inset_0_-1px_2px_rgba(0,0,0,0.1)]" />
              </div>
            </div>
          </motion.div>

          {/* Details tag below the frame */}
          <div className="mt-6 flex items-center gap-6 z-10">
            <span className="text-xs uppercase tracking-widest font-sans-lux text-stone-400 font-medium flex items-center gap-1.5 bg-[#12141a]/40 border border-white/5 px-3 py-1.5 rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#7ea18b]" /> Custom mitered frame
            </span>

            <span className="text-xs uppercase tracking-widest font-mono text-stone-500 py-1 flex items-center gap-1.5">
              Approx. Frame Size: {order.size.dimensions}
            </span>
          </div>
        </div>
      </div>

      {/* Frame Interaction Menu */}
      <div className="w-full flex flex-wrap gap-4 items-center justify-between p-4 rounded-2xl bg-[#0c0d12]/60 border border-white/5 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-2">
          {/* Background switcher label */}
          <span className="text-xs font-display-modern font-semibold uppercase tracking-wider text-[#7ea18b] px-2 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" /> Room Context:
          </span>

          <div className="flex p-0.5 rounded-lg bg-black/40 border border-white/10">
            <button 
              onClick={() => setRoomPreset("none")} 
              className={`text-xs font-sans px-2.5 py-1 rounded-md transition-all ${roomPreset === "none" ? "bg-[#7ea18b]/20 text-white font-semibold shadow" : "text-stone-400 hover:text-stone-250"}`}
            >
              Gallery Studio
            </button>
            <button 
              onClick={() => setRoomPreset("living-room")} 
              className={`text-xs font-sans px-2.5 py-1 rounded-md transition-all ${roomPreset === "living-room" ? "bg-[#7ea18b]/20 text-white font-semibold shadow" : "text-stone-400 hover:text-stone-250"}`}
            >
              Limestone Wall
            </button>
            <button 
              onClick={() => setRoomPreset("cozy-bed")} 
              className={`text-xs font-sans px-2.5 py-1 rounded-md transition-all ${roomPreset === "cozy-bed" ? "bg-[#7ea18b]/20 text-white font-semibold shadow" : "text-stone-400 hover:text-stone-250"}`}
            >
              Oak Studio
            </button>
            <button 
              onClick={() => setRoomPreset("executive-office")} 
              className={`text-xs font-sans px-2.5 py-1 rounded-md transition-all ${roomPreset === "executive-office" ? "bg-[#7ea18b]/20 text-white font-semibold shadow" : "text-stone-400 hover:text-stone-250"}`}
            >
              Dark Concrete
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick reset/zoom buttons */}
          <button 
            id="frame-zoom-toggle"
            onClick={() => setZoomIn(!zoomIn)} 
            className="flex items-center gap-1.5 text-xs text-stone-300 font-medium px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all shadow-sm"
          >
            <Maximize className="w-3.5 h-3.5" /> {zoomIn ? "Zoom Out" : "Focus In"}
          </button>
          
          <button 
            id="frame-reset-sizing"
            onClick={() => onUpdateOrder({ textScale: 1, alignment: "center", italics: false })}
            className="flex items-center gap-1.5 text-xs text-stone-300 font-medium px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all shadow-sm"
            title="Reset text styles to defaults"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset View
          </button>
        </div>
      </div>
    </div>
  );
}
