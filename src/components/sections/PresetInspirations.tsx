import React, { RefObject } from "react";
import { PRESETS } from "../../data";
import { Star, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import PresetFrameMiniature from "../frames/PresetFrameMiniature";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { useCarousel } from "../../hooks/useCarousel";

interface PresetInspirationsProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  onLoadPresetKit: (presetId: string) => void;
}

export default function PresetInspirations({
  sectionRef,
  onLoadPresetKit,
}: PresetInspirationsProps) {
  const windowWidth = useWindowWidth();

  const getItemsPerView = () => {
    if (windowWidth < 768) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  const itemsPerView = getItemsPerView();

  const {
    carouselIndex,
    maxIndex,
    handleNext,
    handlePrev,
    setIndex,
  } = useCarousel({
    totalItems: PRESETS.length,
    itemsPerView,
  });

  return (
    <div
      ref={sectionRef}
      id="inspirations-section"
      className="py-20 lg:py-28 px-4 lg:px-8 bg-transparent"
    >
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header Title block */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#7ea18b] font-bold">Designer Presets</span>
          <h2 className="text-2xl md:text-3.5xl font-serif-display font-medium text-white tracking-tight">
            Curated Masterpiece Assemblies
          </h2>
          <p className="text-xs md:text-sm text-stone-400 leading-relaxed font-light font-sans">
            Architects and designers crafted these high-harmony combinations of woods, backings, scriptures, and alignments ready for instant placement. Swipe or slide to explore.
          </p>
        </div>

        {/* Carousel Viewport Wrapper */}
        <div className="relative px-2 md:px-14">
          
          {/* Slide Track window with overflow-hidden */}
          <div className="overflow-hidden py-8 -my-8 px-8 -mx-8">
            <motion.div
              className="flex"
              animate={{ x: `-${carouselIndex * (100 / itemsPerView)}%` }}
              transition={{ type: "spring", stiffness: 180, damping: 25 }}
            >
              {PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  className="flex-shrink-0 px-3 transition-opacity duration-300 h-full"
                  style={{
                    width: `${100 / itemsPerView}%`
                  }}
                >
                  <div className="group flex flex-col h-full glass-panel-light !bg-stone-900/35 hover:!bg-stone-900/50 border-white/10 hover:border-[#7ea18b]/30 rounded-2xl p-4.5 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 relative">
                    
                    {/* Vivid print backdrop matching frame exactly (Miniature frame renderer) */}
                    <div className="aspect-[4/5] bg-black/40 rounded-xl flex items-center justify-center p-2.5 relative overflow-hidden mb-4 border border-white/5">
                      <PresetFrameMiniature 
                        material={preset.material}
                        mat={preset.mat}
                        backgroundArtwork={preset.backgroundArtwork}
                        verse={preset.verse}
                        font={preset.font}
                        italics={preset.italics}
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-sans font-semibold text-white tracking-wide">{preset.name}</span>
                          <div className="flex items-center text-[#7ea18b]">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="text-[11px] text-stone-350 ml-1 font-bold">{preset.stars}</span>
                          </div>
                        </div>
                        <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed font-light height-[36px]">
                          {preset.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-sm font-extrabold text-[#7ea18b]">${preset.price}.00</span>
                        <button 
                          id={`kit-${preset.id}`}
                          onClick={() => onLoadPresetKit(preset.id)}
                          className="text-[10px] uppercase tracking-wider font-extrabold text-[#7ea18b] hover:text-[#9fc2ab] flex items-center gap-1.5 transition-all bg-white/5 hover:bg-[#7ea18b]/10 px-3 py-1.5 rounded-lg border border-white/10 cursor-pointer"
                        >
                          Load Design <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Translucent overlay navigation controls */}
          {carouselIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-[-15px] md:left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-stone-950/80 border border-white/10 hover:border-[#7ea18b]/50 text-white flex items-center justify-center backdrop-blur-md shadow-xl hover:scale-105 transition-all cursor-pointer"
              aria-label="Previous preset"
            >
              &larr;
            </button>
          )}

          {carouselIndex < maxIndex && (
            <button
              onClick={handleNext}
              className="absolute right-[-15px] md:right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-stone-950/80 border border-white/10 hover:border-[#7ea18b]/50 text-white flex items-center justify-center backdrop-blur-md shadow-xl hover:scale-105 transition-all cursor-pointer"
              aria-label="Next preset"
            >
              &rarr;
            </button>
          )}

          {/* Slide Index dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  carouselIndex === i 
                    ? "w-6 bg-[#7ea18b]" 
                    : "w-1.5 bg-white/20 hover:bg-white/45"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
