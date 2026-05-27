import React, { useState, useEffect } from "react";
import { CustomizedOrder } from "../../types";
import { ShoppingBag } from "lucide-react";

interface NavigationProps {
  order: CustomizedOrder;
  onOpenCart: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Navigation({ order, onOpenCart, onScrollToSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      id="navigation-bar"
      className={`
        fixed top-0 inset-x-0 z-40 transition-all duration-500 py-4 px-4 lg:px-8
        ${isScrolled 
          ? "bg-[#0c0d12]/35 backdrop-blur-xl border-b border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.55)] md:py-3.5" 
          : "bg-transparent md:py-6"
        }
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logotype */}
        <button 
          id="brand-logo-nav"
          onClick={() => onScrollToSection("hero-section")} 
          className="flex items-center gap-2 text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-200/20 via-[#7ea18b]/35 to-[#5c7a67]/20 flex items-center justify-center border border-[#7ea18b]/30 shadow-inner overflow-hidden">
            <span className="font-serif-display text-xs text-[#7ea18b] font-bold group-hover:scale-110 transition-transform duration-500">L</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xs uppercase tracking-[0.25em] font-display-modern font-bold text-white group-hover:text-[#7ea18b] transition-colors duration-200">
              Living Word
            </h1>
            <span className="text-[7.5px] uppercase tracking-[0.2em] font-sans-lux text-stone-500 font-bold">SCRIPTURE FRAMING CO.</span>
          </div>
        </button>

        {/* Floating Navigation Core Links */}
        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.18em] font-display-modern font-bold text-stone-300">
          <button 
            id="nav-link-inspiration"
            onClick={() => onScrollToSection("inspirations-section")} 
            className="hover:text-[#7ea18b] transition-colors cursor-pointer"
          >
            Inspirations
          </button>
          
          <button 
            id="nav-link-customizer"
            onClick={() => onScrollToSection("customizer-section")} 
            className="hover:text-[#7ea18b] transition-colors cursor-pointer"
          >
            Design Studio
          </button>
        </div>

        {/* Right side controls: Quotes capsule and trigger */}
        <div className="flex items-center gap-3">
          {/* Quick interactive stats capsule */}
          <button
            id="nav-capsule-checkout-btn"
            onClick={onOpenCart}
            className="flex items-center gap-2 p-1 pl-3.5 pr-2 rounded-full bg-[#121318] hover:bg-black text-white shadow-2xl transition-all border border-white/10 scale-100 active:scale-95 duration-150"
          >
            <div className="flex flex-col items-start pr-2 border-r border-white/10 text-left">
              <span className="text-[8px] uppercase tracking-widest text-[#7ea18b] font-bold">Configured Quote</span>
              <span className="text-xs font-bold font-sans text-stone-200">${order.totalPrice}.00</span>
            </div>

            <div className="w-8 h-8 rounded-full bg-white/15 text-[#7ea18b] flex items-center justify-center flex-shrink-0 border border-white/10 relative">
              <ShoppingBag className="w-4 h-4" />
              {/* Highlight Dot */}
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
