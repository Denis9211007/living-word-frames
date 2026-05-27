import React, { RefObject } from "react";
import { CustomizedOrder } from "../../types";
import InteractiveFrame from "../frames/InteractiveFrame";
import CustomizerPanel from "../ui/CustomizerPanel";

interface DesignStudioProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  activeOrder: CustomizedOrder;
  onUpdateOrder: (fields: Partial<CustomizedOrder>) => void;
  onOpenCart: () => void;
}

export default function DesignStudio({
  sectionRef,
  activeOrder,
  onUpdateOrder,
  onOpenCart,
}: DesignStudioProps) {
  return (
    <div
      ref={sectionRef}
      id="customizer-section"
      className="py-20 lg:py-28 px-4 lg:px-8 bg-transparent"
    >
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header titles */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#7ea18b] font-bold">The Customizer</span>
          <h2 className="text-3xl font-serif-display font-medium text-white tracking-tight">
            Design Your Casing
          </h2>
          <p className="text-xs md:text-sm text-stone-400 leading-relaxed font-light font-sans">
            Craft a highly personal daily reminder. Select curated scriptures or input custom wedding vows/blessings, select solid Appalachian hardwoods, choose backing liners, and align your typography.
          </p>
        </div>

        {/* Interactive Split Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sandbox Render */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <InteractiveFrame 
              order={activeOrder} 
              onUpdateOrder={onUpdateOrder} 
            />
          </div>

          {/* Right option panel */}
          <div className="lg:col-span-7">
            <CustomizerPanel 
              order={activeOrder} 
              onUpdateOrder={onUpdateOrder} 
            />
            
            <div className="mt-6 p-5 rounded-2xl glass-panel-light flex flex-col sm:flex-row gap-4 items-center justify-between border-white/10 shadow-2xl !bg-white/5">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold text-white">Satisfied with your design?</span>
                <p className="text-[11px] text-stone-400 leading-relaxed">Our handcrafting backlog is currently processing orders on same-day schedules.</p>
              </div>
              
              <button
                id="checkout-trigger-under-customizer-btn"
                onClick={onOpenCart}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#7ea18b] hover:bg-[#6ba080] text-[#0c0d12] rounded-xl text-xs uppercase tracking-widest font-extrabold shadow-lg transition-all cursor-pointer"
              >
                Configure & Checkout — ${activeOrder.totalPrice}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
