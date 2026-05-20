import React, { useState } from "react";
import { CustomizedOrder, BibleVerse } from "../types";
import { 
  BIBLE_VERSES, 
  VERSE_FONTS,
  BACKGROUND_ARTWORKS
} from "../data";
import { 
  BookOpen, 
  Sparkles, 
  PenTool, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Check, 
  Palette
} from "lucide-react";

interface CustomizerPanelProps {
  order: CustomizedOrder;
  onUpdateOrder: (fields: Partial<CustomizedOrder>) => void;
}

export default function CustomizerPanel({ order, onUpdateOrder }: CustomizerPanelProps) {
  // Tabs representing custom scripture and backdrop customization
  const [activeTab, setActiveTab] = useState<"scripture" | "backdrop">("scripture");
  const [verseFilter, setVerseFilter] = useState<"all" | "Strength" | "Peace" | "Love" | "Hope" | "Grace">("all");
  const [isCustomVerse, setIsCustomVerse] = useState<boolean>(!!order.customText);

  const filteredVerses = verseFilter === "all" 
    ? BIBLE_VERSES 
    : BIBLE_VERSES.filter(v => v.category === verseFilter);

  const selectVerse = (verse: BibleVerse) => {
    setIsCustomVerse(false);
    onUpdateOrder({ 
      verse, 
      customText: undefined, 
      customReference: undefined,
      totalPrice: 129
    });
  };

  const handleCustomTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsCustomVerse(true);
    onUpdateOrder({ customText: e.target.value, totalPrice: 129 });
  };

  const handleCustomRefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCustomVerse(true);
    onUpdateOrder({ customReference: e.target.value, totalPrice: 129 });
  };

  return (
    <div className="w-full flex flex-col glass-panel-light !bg-[#0c0d12]/65 rounded-3xl border border-white/10 shadow-2xl overflow-hidden backdrop-blur-2xl">
      {/* Premium Navigation Tabs */}
      <div className="flex border-b border-white/5 bg-white/2 select-none">
        {(["scripture", "backdrop"] as const).map((tab) => {
          const isActive = activeTab === tab;
          const getIcon = () => {
            switch(tab) {
              case "scripture": return <BookOpen className="w-4 h-4" />;
              case "backdrop": return <Palette className="w-4 h-4" />;
            }
          };

          return (
            <button
              key={tab}
              id={`customizer-tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`
                flex-1 flex items-center justify-center gap-2 py-4 px-4 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap
                ${isActive 
                  ? "border-[#7ea18b] text-[#7ea18b] bg-white/5 font-bold shadow-sm" 
                  : "border-transparent text-stone-400 hover:text-white hover:bg-white/5"
                }
              `}
            >
              {getIcon()}
              {tab === "scripture" ? "Scripture & Typesetting" : "Vivid Print Backdrops"}
            </button>
          );
        })}
      </div>

      <div className="p-6 md:p-8 flex-grow flex flex-col justify-between min-h-[460px]">
        {/* TAB CONTENTS */}
        
        {/* 1. SCRIPTURES & CUSTOM INPUT */}
        {activeTab === "scripture" && (
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-xs uppercase tracking-widest font-bold text-stone-400">Step 1: Choose or Author Scripture</span>
                <span className="text-xs font-sans text-stone-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#7ea18b]" /> Curated scriptural wisdom
                </span>
              </div>
              
              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {(["all", "Strength", "Peace", "Love", "Hope", "Grace"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setVerseFilter(cat);
                      setIsCustomVerse(false);
                    }}
                    className={`
                      text-[11px] px-2.5 py-1 rounded-full transition-all border
                      ${verseFilter === cat && !isCustomVerse
                        ? "bg-[#7ea18b] border-[#7ea18b] text-stone-950 font-semibold"
                        : "bg-white/5 text-stone-300 border-white/10 hover:bg-white/10"
                      }
                    `}
                  >
                    {cat === "all" ? "All Verses" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Verses Preset selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[170px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
              {filteredVerses.map((bibleVerse) => {
                const isSelected = !isCustomVerse && order.verse.id === bibleVerse.id;
                return (
                  <button
                    key={bibleVerse.id}
                    onClick={() => selectVerse(bibleVerse)}
                    className={`
                      p-3.5 rounded-xl text-left border transition-all duration-300 relative group flex flex-col justify-between min-h-[95px]
                      ${isSelected
                        ? "border-[#7ea18b] bg-[#7ea18b]/10 shadow-lg"
                        : "border-white/10 hover:border-white/20 bg-white/5"
                      }
                    `}
                  >
                    <p className="text-xs font-serif-lux text-stone-200 line-clamp-3 leading-relaxed mb-2.5">
                      "{bibleVerse.verse}"
                    </p>
                    <div className="flex items-center justify-between mt-auto w-full">
                      <span className="text-[9px] font-sans uppercase tracking-widest text-stone-400 font-semibold">{bibleVerse.reference}</span>
                      <span className="text-[8px] bg-[#7ea18b]/15 border border-[#7ea18b]/20 font-sans text-[#7ea18b] px-1.5 py-0.5 rounded font-medium">{bibleVerse.category}</span>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-[#7ea18b] text-stone-950 flex items-center justify-center">
                        <Check className="w-2 h-2 stroke-[3px]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Custom Input Header */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-white/10" />
              <span className="flex-shrink mx-3.5 text-[9px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-1.5">
                <PenTool className="w-3 h-3" /> Or Write Your Own Verse / Message
              </span>
              <div className="flex-grow border-t border-white/10" />
            </div>

            {/* Custom Inputs */}
            <div className="space-y-3 bg-black/45 p-4 rounded-xl border border-white/5 shadow-inner">
              <div className="flex flex-col gap-1">
                <textarea
                  id="custom-verse-textarea"
                  rows={2}
                  value={order.customText || ""}
                  onChange={handleCustomTextChange}
                  placeholder="For example: 'He heals the brokenhearted and binds up their wounds...'"
                  className="w-full text-xs font-serif-lux bg-stone-950/70 border border-white/10 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-[#7ea18b] focus:border-[#7ea18b] shadow-sm transition-all text-white leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <input
                    id="custom-verse-reference"
                    type="text"
                    value={order.customReference || ""}
                    onChange={handleCustomRefChange}
                    placeholder="e.g. Psalms 147:3 or Warm Greeting"
                    className="w-full text-xs text-white bg-stone-950/70 border border-white/10 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-[#7ea18b] focus:border-[#7ea18b] shadow-sm transition-all"
                  />
                </div>
                
                <div className="flex items-center">
                  {isCustomVerse && (
                    <div className="w-full text-[10px] text-emerald-200/90 font-sans leading-tight">
                      ✏️ Personal scripture active. Custom rendering on premium print.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Typography Settings */}
            <div className="space-y-3 p-4 bg-white/3 rounded-xl border border-white/5">
              <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400 block">Typesetting & Sizing</span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Font Choices */}
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] text-stone-300 font-semibold mb-1">Font family</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {VERSE_FONTS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => onUpdateOrder({ font: f, totalPrice: 129 })}
                        className={`text-xs p-1.5 py-2 rounded-lg border text-center transition-all ${order.font.id === f.id ? "border-[#7ea18b] bg-[#7ea18b]/15 text-white font-bold" : "border-white/10 text-stone-300 bg-black/20"}`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizing & Layout Controls */}
                <div className="flex flex-col justify-between gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-stone-300 font-semibold">Scale</span>
                    <span className="text-[10px] font-mono font-bold text-[#7ea18b]">{order.textScale.toFixed(2)}x</span>
                  </div>
                  <input
                    id="font-size-scale-slider"
                    type="range"
                    min="0.8"
                    max="1.3"
                    step="0.05"
                    value={order.textScale}
                    onChange={(e) => onUpdateOrder({ textScale: parseFloat(e.target.value), totalPrice: 129 })}
                    className="w-full accent-[#7ea18b] h-1 bg-stone-950 rounded-lg appearance-none cursor-pointer"
                  />

                  <div className="flex items-center gap-4 mt-1 justify-between">
                    {/* Aligns */}
                    <div className="flex p-0.5 rounded-lg bg-stone-950/60 border border-white/10 w-fit">
                      {(["left", "center", "right"] as const).map((align) => {
                        const Icon = align === "left" ? AlignLeft : align === "right" ? AlignRight : AlignCenter;
                        return (
                          <button
                            key={align}
                            onClick={() => onUpdateOrder({ alignment: align, totalPrice: 129 })}
                            className={`p-1.5 rounded-md ${order.alignment === align ? "bg-white/15 text-white" : "text-stone-400 hover:text-stone-200"}`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </button>
                        );
                      })}
                    </div>

                    {/* Italics */}
                    <button
                      onClick={() => onUpdateOrder({ italics: !order.italics, totalPrice: 129 })}
                      className={`px-2.5 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded-lg border transition-all ${order.italics ? "border-[#7ea18b] text-[#7ea18b] bg-[#7ea18b]/5" : "border-white/10 text-stone-400"}`}
                    >
                      <span className="italic mr-1">I</span> Italics
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. CHOOSE THE BACKDROP ARTWORK */}
        {activeTab === "backdrop" && (
          <div className="space-y-5">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-stone-400">Step 2: Select Vivid Print Backdrop Art</span>
              <p className="text-xs text-stone-400 mt-1">Replace plain cotton with beautiful high-definition scenic, celestial, and minimalist fine-art watermarks printed directly behind the scriptures.</p>
            </div>

            {/* Grid display of photographic and abstract artworks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
              {BACKGROUND_ARTWORKS.map((bg) => {
                const isSelected = order.backgroundArtwork.id === bg.id;
                return (
                  <button
                    key={bg.id}
                    onClick={() => onUpdateOrder({ backgroundArtwork: bg, totalPrice: 129 })}
                    className={`
                      group relative rounded-xl p-3 border text-left flex flex-col justify-between transition-all duration-300 min-h-[95px] overflow-hidden
                      ${isSelected
                        ? "border-[#7ea18b] bg-[#7ea18b]/10 ring-1 ring-[#7ea18b]/30"
                        : "border-white/10 hover:border-white/20 bg-white/5"
                      }
                    `}
                  >
                    {/* Background miniature preview watermark */}
                    {bg.url ? (
                      <div className="absolute inset-0 z-0 opacity-15 group-hover:opacity-25 transition-opacity duration-300">
                        <img
                          src={bg.url}
                          alt=""
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 z-0 bg-stone-900 opacity-20" />
                    )}

                    <div className="relative z-10 flex flex-col h-full justify-between items-start gap-1 w-full">
                      <div className="flex items-center justify-between w-full gap-2">
                        <span className="text-[11px] font-bold text-white leading-tight">{bg.name}</span>
                        <span className="text-[8px] uppercase tracking-wider bg-white/10 text-stone-300 px-1.5 py-0.5 rounded flex-shrink-0 font-semibold font-sans">{bg.category}</span>
                      </div>
                      
                      <span className="text-[10px] text-stone-400 leading-snug mt-1 group-hover:text-stone-300 transition-colors">
                        {bg.description}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="absolute bottom-2.5 right-2.5 w-4 h-4 rounded-full bg-[#7ea18b] text-stone-950 flex items-center justify-center z-10 shadow border border-stone-950/20">
                        <Check className="w-2.5 h-2.5 stroke-[3px]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="p-3 bg-stone-900/40 border border-[#7ea18b]/10 rounded-xl">
              <p className="text-[11px] leading-relaxed text-stone-300">
                🌲 <strong>Misty Nature Backings:</strong> All prints use lightfast bio-pigment ink. Each print is mounted flush within mitered Appalachian hardwood casings to withstand humidity shifts.
              </p>
            </div>
          </div>
        )}

        {/* Pricing Subtotal Display Bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between bg-black/40 p-4 rounded-xl">
          <div className="flex flex-col text-center sm:text-left">
            <span className="text-[9px] uppercase tracking-[0.15em] text-stone-400 font-bold">Artisan Wood Casing & Print</span>
            <div className="flex items-baseline justify-center sm:justify-start gap-1.5 mt-0.5">
              <span className="text-2xl font-extrabold text-[#7ea18b] font-display-modern">$129.00</span>
              <span className="text-xs font-serif-lux text-stone-400 italic">USD</span>
            </div>
            <span className="text-[9.5px] text-stone-500 mt-1">Includes mitered Walnut frame, heavy stock archival mat board, and museum glass</span>
          </div>

          <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
            <div className="text-[10px] text-stone-300 font-sans flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Free Archival Shipping
            </div>
            <span className="text-[9.5px] text-stone-500 mt-0.5">Custom mounded & shipped in 48 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
}
