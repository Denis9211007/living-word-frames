import React, { RefObject } from "react";
import { CustomizedOrder } from "../../types";
import { Sparkles } from "lucide-react";
import InteractiveFrame from "../frames/InteractiveFrame";

interface HeroSectionProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  activeOrder: CustomizedOrder;
  onUpdateOrder: (fields: Partial<CustomizedOrder>) => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function HeroSection({
  sectionRef,
  activeOrder,
  onUpdateOrder,
  onScrollToSection,
}: HeroSectionProps) {
  return (
    <div
      ref={sectionRef}
      id="hero-section"
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 lg:px-8 overflow-hidden bg-transparent"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Hero details */}
        <div className="lg:col-span-6 space-y-6 lg:space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-lg text-stone-300">
            <Sparkles className="w-3.5 h-3.5 text-[#7ea18b]" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-display-modern font-bold">Museum-Quality Premium Prints</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-white tracking-tight leading-[1.1]">
              Your Sacred Verses. <br />
              <span className="font-serif-lux italic font-light text-[#7ea18b]">Enclosed In Living Light.</span>
            </h1>
            <p className="text-sm md:text-base text-stone-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light font-sans">
              Living Word Frames unites master-level FSC wood tailoring with anti-reflect science and crisp Italian lettermatching. Design an exquisite heirloom frame designed to fill your home with peace.
            </p>
          </div>

          {/* Quick value statements */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 pt-2 text-center">
            <div className="space-y-1">
              <span className="block text-lg font-bold text-white font-sans">100%</span>
              <span className="block text-[10px] uppercase tracking-wider text-stone-500 font-bold">Solid Woods</span>
            </div>
            <div className="space-y-1 border-x border-white/10">
              <span className="block text-lg font-bold text-white font-sans">99%</span>
              <span className="block text-[10px] uppercase tracking-wider text-stone-500 font-bold">Anti-Glare</span>
            </div>
            <div className="space-y-1">
              <span className="block text-lg font-bold text-white font-sans">Free</span>
              <span className="block text-[10px] uppercase tracking-wider text-stone-500 font-bold">Courier Delivery</span>
            </div>
          </div>

          {/* CTA anchors */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              id="hero-go-customizer-btn"
              onClick={() => onScrollToSection("customizer-section")}
              className="w-full sm:w-auto px-8 py-4 bg-[#7ea18b] hover:bg-[#6ba080] text-[#0c0d12] rounded-full text-xs uppercase tracking-widest font-extrabold shadow-xl transition-all hover:translate-y-[-2px] duration-350 cursor-pointer"
            >
              Launch Design Studio
            </button>
            
            <button
              id="hero-go-inspirations-btn"
              onClick={() => onScrollToSection("inspirations-section")}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-stone-200 rounded-full text-xs uppercase tracking-widest font-bold border border-white/10 hover:border-white/20 transition-all shadow-md cursor-pointer"
            >
              Browse Curated Kits
            </button>
          </div>
        </div>

        {/* Hero right: Dynamic glowing masterpiece preview */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center w-full">
          <InteractiveFrame 
            order={activeOrder} 
            onUpdateOrder={onUpdateOrder} 
          />
        </div>

      </div>

      {/* Decorative architectural layout line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
