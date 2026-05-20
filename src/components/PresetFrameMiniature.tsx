import React from "react";
import { FrameMaterial, MatBoard, BackgroundArtwork, BibleVerse, VerseFont } from "../types";

interface PresetFrameMiniatureProps {
  material: FrameMaterial;
  mat: MatBoard;
  backgroundArtwork: BackgroundArtwork;
  verse: BibleVerse;
  font: VerseFont;
  italics: boolean;
  customText?: string;
  customReference?: string;
  alignment?: "left" | "center" | "right";
  textScale?: number;
  size?: "sm" | "lg";
}

export default function PresetFrameMiniature({
  material,
  mat,
  backgroundArtwork,
  verse,
  font,
  italics,
  customText,
  customReference,
  alignment = "center",
  textScale = 1,
  size = "lg",
}: PresetFrameMiniatureProps) {
  
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

  const woodVars = getWoodThemeVars(material.id);

  const getAlignmentClass = () => {
    switch (alignment) {
      case "left": return "text-left";
      case "right": return "text-right";
      default: return "text-center";
    }
  };

  const displayText = customText || verse.verse;
  const displayRef = customReference || verse.reference;

  const isSm = size === "sm";
  const plankW = isSm ? 3.5 : 20;
  const paddingVal = isSm ? 3.5 : 20;
  const insetShadowVal = plankW - 0.75;
  const insetMainVal = plankW;
  const cutoutInset = isSm ? "inset-0.5" : "inset-2";

  return (
    <div className={`w-full h-full flex items-center justify-center select-none ${isSm ? "p-0" : "p-1"}`}>
      <div 
        className="relative w-full aspect-[11/14] bg-[#140e0b] shadow-lg"
        style={{
          boxShadow: isSm
            ? "0 4px 10px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.4)"
            : "0 15px 35px rgba(0,0,0,0.7), 0 3px 10px rgba(0,0,0,0.5)",
          padding: `${paddingVal}px`,
          "--plank-w": `${plankW}px`
        } as React.CSSProperties}
      >
        {/* TOP WOOD PLANK */}
        <div 
          className="absolute top-0 left-0 right-0 z-10 pointer-events-none wood-plank-h"
          style={{
            height: `${plankW}px`,
            clipPath: "polygon(0 0, 100% 0, calc(100% - var(--plank-w)) 100%, var(--plank-w) 100%)",
            ...woodVars
          } as React.CSSProperties}
        >
          <div className="wood-plank-h-grain" />
          <div className="wood-wear-scratches absolute inset-0 opacity-5" />
          <div className="wood-lacquer-finish" />
          <div className="wood-bevel-emboss-h" />
        </div>

        {/* BOTTOM WOOD PLANK */}
        <div 
          className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none wood-plank-h"
          style={{
            height: `${plankW}px`,
            clipPath: "polygon(var(--plank-w) 0, calc(100% - var(--plank-w)) 0, 100% 100%, 0 100%)",
            ...woodVars
          } as React.CSSProperties}
        >
          <div className="wood-plank-h-grain" />
          <div className="wood-wear-scratches absolute inset-0 opacity-5" />
          <div className="wood-lacquer-finish" />
          <div className="wood-bevel-emboss-h" />
        </div>

        {/* LEFT WOOD PLANK */}
        <div 
          className="absolute top-0 bottom-0 left-0 z-10 pointer-events-none wood-plank-v"
          style={{
            width: `${plankW}px`,
            clipPath: "polygon(0 0, 100% var(--plank-w), 100% calc(100% - var(--plank-w)), 0 100%)",
            ...woodVars
          } as React.CSSProperties}
        >
          <div className="wood-plank-v-grain" />
          <div className="wood-wear-scratches absolute inset-0 opacity-5" />
          <div className="wood-lacquer-finish" />
          <div className="wood-bevel-emboss-v" />
        </div>

        {/* RIGHT WOOD PLANK */}
        <div 
          className="absolute top-0 bottom-0 right-0 z-10 pointer-events-none wood-plank-v"
          style={{
            width: `${plankW}px`,
            clipPath: "polygon(0 var(--plank-w), 100% 0, 100% 100%, 0 calc(100% - var(--plank-w)))",
            ...woodVars
          } as React.CSSProperties}
        >
          <div className="wood-plank-v-grain" />
          <div className="wood-wear-scratches absolute inset-0 opacity-5" />
          <div className="wood-lacquer-finish" />
          <div className="wood-bevel-emboss-v" />
        </div>

        {/* Corner join lines */}
        <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-0 left-0 border-r border-black/45 transform origin-top-left rotate-45 opacity-60" 
            style={{ width: `${plankW}px`, height: `${plankW}px` }}
          />
          <div 
            className="absolute top-0 right-0 border-l border-black/45 transform origin-top-right -rotate-45 opacity-60" 
            style={{ width: `${plankW}px`, height: `${plankW}px` }}
          />
          <div 
            className="absolute bottom-0 left-0 border-r border-black/45 transform origin-bottom-left -rotate-45 opacity-60" 
            style={{ width: `${plankW}px`, height: `${plankW}px` }}
          />
          <div 
            className="absolute bottom-0 right-0 border-l border-black/45 transform origin-bottom-right rotate-45 opacity-60" 
            style={{ width: `${plankW}px`, height: `${plankW}px` }}
          />
        </div>

        {/* Inner shadow */}
        <div 
          className="absolute border border-black/40 pointer-events-none z-15 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.8)]" 
          style={{
            top: `${insetShadowVal}px`,
            bottom: `${insetShadowVal}px`,
            left: `${insetShadowVal}px`,
            right: `${insetShadowVal}px`,
          }}
        />

        {/* Interior area */}
        <div 
          className="absolute bg-[#fbfaf5] overflow-hidden z-10 select-none"
          style={{
            top: `${insetMainVal}px`,
            bottom: `${insetMainVal}px`,
            left: `${insetMainVal}px`,
            right: `${insetMainVal}px`,
          }}
        >
          {/* Mat Background */}
          <div className="absolute inset-0" style={{ backgroundColor: mat.colorClass === "bg-transparent" ? "transparent" : "" }} />
          
          {/* Accent light bevel */}
          <span 
            className="absolute border border-stone-300/35 pointer-events-none z-10" 
            style={{
              top: isSm ? "2px" : "4px",
              bottom: isSm ? "2px" : "4px",
              left: isSm ? "2px" : "4px",
              right: isSm ? "2px" : "4px",
            }}
          />

          {/* Core print cutout box */}
          <div 
            className={`
              absolute z-10 overflow-hidden border border-stone-300/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]
              ${cutoutInset}
              ${backgroundArtwork.textColorClass ? "bg-stone-900" : "bg-[#fcfdfa]"}
            `}
          >
            {/* Background Artwork */}
            {backgroundArtwork.url && (
              <div className="absolute inset-0 z-0">
                <img 
                  src={backgroundArtwork.url} 
                  alt=""
                  className="w-full h-full object-cover select-none scale-102"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute inset-0 z-1 ${backgroundArtwork.overlayClass}`} />
              </div>
            )}

            {/* Content centered inside */}
            <div className={`absolute inset-0 z-10 flex flex-col justify-between items-center ${isSm ? "p-0.5" : "p-1.5 md:p-2"} text-center`}>
              <span 
                className={`uppercase tracking-[0.25em] font-bold ${backgroundArtwork.id !== "none" ? "text-white/30" : "text-stone-350"}`}
                style={{ fontSize: isSm ? "3px" : "4px" }}
              >
                SCRIPTURE
              </span>

              {/* Centered quotation text */}
              <div className={`my-auto w-full px-1 flex flex-col justify-center items-center ${getAlignmentClass()}`}>
                <p 
                  className={`
                    font-serif-lux leading-relaxed transition-all duration-300 line-clamp-3 my-auto max-w-full
                    ${backgroundArtwork.textColorClass ? backgroundArtwork.textColorClass : "text-stone-900"}
                    ${font.fontFamily}
                    ${italics ? "italic" : ""}
                  `}
                  style={{ 
                    wordBreak: "keep-all",
                    fontSize: `${(isSm ? 3.5 : 5.1) * textScale}px`
                  }}
                >
                  "{displayText}"
                </p>
                {displayRef && (
                  <span 
                    className={`uppercase tracking-wider font-bold mt-0.5 block ${backgroundArtwork.id !== "none" ? "text-white/70" : "text-emerald-950/80"}`}
                    style={{ fontSize: isSm ? "2.6px" : "4px" }}
                  >
                    — {displayRef}
                  </span>
                )}
              </div>

              {/* Miniature frame footer */}
              <span 
                className={`uppercase tracking-[0.15em] font-bold ${backgroundArtwork.id !== "none" ? "text-white/20" : "text-stone-400/60"}`}
                style={{ fontSize: isSm ? "2.4px" : "3.5px" }}
              >
                ARTISAN CO.
              </span>
            </div>
          </div>

          {/* Glare Glass filter effect */}
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            <div className="absolute -inset-[180%] bg-gradient-to-tr from-transparent via-white/8 to-transparent transform rotate-[35deg]" />
            <div className="absolute inset-0 border border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]" />
          </div>

        </div>
      </div>
    </div>
  );
}
