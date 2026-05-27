import React, { useState } from "react";
import { Truck, ShieldCheck, RotateCcw } from "lucide-react";

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const [newsletterJoined, setNewsletterJoined] = useState(false);

  return (
    <footer className="relative z-10 bg-[#0a0b0e] text-stone-300 border-t border-[#1e2026] py-16 px-4 lg:px-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
        
        {/* Logo brand outline */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-left">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 shadow-inner overflow-hidden">
              <span className="font-serif-display text-xs text-[#7ea18b] font-bold">L</span>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xs uppercase tracking-[0.25em] font-display-modern font-bold text-white">
                Living Word
              </h3>
              <span className="text-[7.5px] uppercase tracking-[0.2em] font-sans-lux text-stone-500 font-bold">SCRIPTURE FRAMING CO.</span>
            </div>
          </div>
          
          <p className="text-xs text-stone-500 leading-relaxed">
            We design and craft luxury scripture reminders to safeguard hope, peace, and spiritual fortitude inside the spaces of modern residences.
          </p>
        </div>

        {/* Delivery & Security assurance details */}
        <div className="space-y-3 font-sans">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#7ea18b]">Worldwide Dispatch</h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-stone-500" /> Free Priority Courier standard
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-500" /> Transit insurance guaranteed replaced
            </li>
            <li className="flex items-center gap-2">
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" /> 14-day premium quality assurance
            </li>
          </ul>
        </div>

        {/* Standard Navigation anchors */}
        <div className="space-y-3 font-sans">
          <h4 className="text-xs font-bold uppercase tracking-widest text-stone-350">Brand Links</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button 
                onClick={() => onScrollToSection("inspirations-section")} 
                className="hover:text-white transition-colors cursor-pointer text-stone-400"
              >
                Curated Presets
              </button>
            </li>
            <li>
              <button 
                onClick={() => onScrollToSection("customizer-section")} 
                className="hover:text-white transition-colors cursor-pointer text-stone-400"
              >
                Customizer Studio
              </button>
            </li>
          </ul>
        </div>

        {/* Custom newsletter join forms */}
        <div className="space-y-3 font-sans">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-[#7ea18b]">Living Word Newsletter</h4>
          <p className="text-xs text-stone-500 leading-relaxed font-sans">Receive occasional collections of hand-lettered verses, botanical illustrations, and artisan releases.</p>
          
          <div className="flex gap-2">
            <input 
              id="newsletter-email-input"
              type="email" 
              placeholder="Enter email address" 
              className="w-full text-xs px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-sans focus:outline-none focus:ring-1 focus:ring-[#7ea18b]"
            />
            <button 
              onClick={() => setNewsletterJoined(true)} 
              className="px-3 py-2 bg-[#7ea18b] hover:bg-[#6ba080] text-stone-900 rounded-lg text-xs font-bold transition-all cursor-pointer"
            >
              {newsletterJoined ? "Joined" : "Join"}
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#1e2026] flex flex-col md:flex-row items-center justify-between text-[10px] text-stone-500 font-sans leading-relaxed">
        <span>&copy; {new Date().getFullYear()} Living Word Framing Co. LLC. Handcrafted and engraved inside the United States. All Rights Reserved.</span>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a className="hover:text-stone-350 transition-colors cursor-pointer">Privacy Charter</a>
          <a className="hover:text-stone-350 transition-colors cursor-pointer">Terms of Craft</a>
          <a className="hover:text-stone-350 transition-colors cursor-pointer">Accessibility Protocol</a>
        </div>
      </div>
    </footer>
  );
}
