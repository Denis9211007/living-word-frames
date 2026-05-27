import React, { useState, useRef } from "react";
import { CustomizedOrder } from "../types";
import { 
  FRAME_MATERIALS, 
  FRAME_SIZES, 
  MAT_BOARDS, 
  GLASS_TYPES, 
  BIBLE_VERSES, 
  VERSE_FONTS,
  BACKGROUND_ARTWORKS
} from "../data";
import Navigation from "../components/layout/Navigation";
import InteractiveFrame from "../components/frames/InteractiveFrame";
import CustomizerPanel from "../components/ui/CustomizerPanel";
import CartDrawer from "../components/layout/CartDrawer";
import PresetFrameMiniature from "../components/frames/PresetFrameMiniature";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { 
  Sparkles, 
  Star, 
  RotateCcw,
  ArrowRight,
  Truck,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const PRESETS = [
  {
    id: "gilded-sanctuary",
    name: "Cherrywood Sanctuary",
    stars: "5.0",
    description: "Royal Black Cherrywood encasing an Editorial Handcrafted Garamond layout on Warm white linen backing.",
    price: 185,
    material: FRAME_MATERIALS[3],
    mat: MAT_BOARDS[0],
    backgroundArtwork: BACKGROUND_ARTWORKS[5],
    verse: BIBLE_VERSES[2],
    font: VERSE_FONTS[0],
    italics: true,
  },
  {
    id: "smoked-cathedral",
    name: "The Smoked Cathedral",
    stars: "4.9",
    description: "Grand 16x20 Appalachian dark smoked Walnut casing paired with an oatmeal structured coarse backing mat.",
    price: 282,
    material: FRAME_MATERIALS[0],
    mat: MAT_BOARDS[1],
    backgroundArtwork: BACKGROUND_ARTWORKS[1],
    verse: BIBLE_VERSES[1],
    font: VERSE_FONTS[3],
    italics: false,
  },
  {
    id: "alabaster-calm",
    name: "The Alabaster Calm",
    stars: "4.9",
    description: "Light, minimal Scandinavian whitewashed Birch wood harboring a modern spaced sans-serif layout.",
    price: 176,
    material: FRAME_MATERIALS[1],
    mat: MAT_BOARDS[0],
    backgroundArtwork: BACKGROUND_ARTWORKS[7],
    verse: BIBLE_VERSES[5],
    font: VERSE_FONTS[2],
    italics: false,
  },
  {
    id: "modern-covenant",
    name: "The Midnight Covenant",
    stars: "5.0",
    description: "Sleek Matte Obsidian Ebony wood casing holding a charcoal linen backing mat board with high-gloss reflex polymer.",
    price: 169,
    material: FRAME_MATERIALS[4],
    mat: MAT_BOARDS[2],
    backgroundArtwork: BACKGROUND_ARTWORKS[4],
    verse: BIBLE_VERSES[6],
    font: VERSE_FONTS[1],
    italics: false,
  }
];

export default function Page() {
  // Initialize Default Order Customization
  const [activeOrder, setActiveOrder] = useState<CustomizedOrder>({
    id: "temp-config-id",
    material: FRAME_MATERIALS[0], // Smoked American Walnut
    size: FRAME_SIZES[1], // 11" x 14"
    mat: MAT_BOARDS[0], // Linen Warm White
    glass: GLASS_TYPES[0], // Anti-Reflection Museum Glass
    verse: BIBLE_VERSES[0], // Jeremiah 29:11
    font: VERSE_FONTS[0], // Classical Garamond
    alignment: "center",
    textScale: 1,
    italics: false,
    backgroundArtwork: BACKGROUND_ARTWORKS[1], // Misty Pine Forest
    totalPrice: 129, // Flat premium rate
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [newsletterJoined, setNewsletterJoined] = useState(false);

  // Carousel slider responsive tracking with custom hook
  const [carouselIndex, setCarouselIndex] = useState(0);
  const windowWidth = useWindowWidth();

  const getItemsPerView = () => {
    if (windowWidth < 768) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  const itemsPerView = getItemsPerView();
  const maxIndex = Math.max(0, PRESETS.length - itemsPerView);
  const safeCarouselIndex = Math.min(Math.max(0, carouselIndex), maxIndex);

  const handleNext = () => {
    setCarouselIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  // References to scroll sections
  const heroRef = useRef<HTMLDivElement>(null);
  const inspirationsRef = useRef<HTMLDivElement>(null);
  const customizerRef = useRef<HTMLDivElement>(null);

  const handleUpdateOrder = (fields: Partial<CustomizedOrder>) => {
    setActiveOrder((prev) => {
      const updated = { ...prev, ...fields };
      // All customized orders here carry our fixed handcrafted price of 129
      updated.totalPrice = 129;
      return updated;
    });
  };

  const handleScrollToSection = (sectionId: string) => {
    let targetRef: React.RefObject<HTMLDivElement | null> | null = null;
    switch (sectionId) {
      case "hero-section": targetRef = heroRef; break;
      case "inspirations-section": targetRef = inspirationsRef; break;
      case "customizer-section": targetRef = customizerRef; break;
    }
    
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Preset configuration click-loader
  const loadPresetKit = (presetName: string) => {
    let updatedFields: Partial<CustomizedOrder> = {};
    
    switch (presetName) {
      case "gilded-sanctuary":
        updatedFields = {
          material: FRAME_MATERIALS[3], // Royal Black Cherry
          size: FRAME_SIZES[1], // 11" x 14"
          mat: MAT_BOARDS[0], // Linen Warm White
          glass: GLASS_TYPES[0], // Museum Glass
          verse: BIBLE_VERSES[2], // Psalm 23
          font: VERSE_FONTS[0], // Garamond
          alignment: "center",
          textScale: 0.95,
          italics: true,
          backgroundArtwork: BACKGROUND_ARTWORKS[5], // Sovereign Sunbeams
        };
        break;
      case "smoked-cathedral":
        updatedFields = {
          material: FRAME_MATERIALS[0], // Smoked American Walnut
          size: FRAME_SIZES[3], // 16" x 20"
          mat: MAT_BOARDS[1], // Oatmeal Textured
          glass: GLASS_TYPES[0], // Museum Glass
          verse: BIBLE_VERSES[1], // Isaiah 41:10
          font: VERSE_FONTS[3], // Playfair Editorial
          alignment: "center",
          textScale: 1.05,
          italics: false,
          backgroundArtwork: BACKGROUND_ARTWORKS[1], // Misty Pine Forest
        };
        break;
      case "alabaster-calm":
        updatedFields = {
          material: FRAME_MATERIALS[1], // Alabaster Birch
          size: FRAME_SIZES[2], // 12" x 12"
          mat: MAT_BOARDS[0], // Linen White
          glass: GLASS_TYPES[2], // Soft Light Frosted
          verse: BIBLE_VERSES[5], // Numbers 6
          font: VERSE_FONTS[2], // Sleek Ethereal (Montserrat)
          alignment: "center",
          textScale: 0.85,
          italics: false,
          backgroundArtwork: BACKGROUND_ARTWORKS[7], // Olive Botanical Sprig
        };
        break;
      case "modern-covenant":
        updatedFields = {
          material: FRAME_MATERIALS[4], // Matte Obsidian Ebony
          size: FRAME_SIZES[1], // 11" x 14"
          mat: MAT_BOARDS[2], // Charcoal Slate Linen
          glass: GLASS_TYPES[1], // Liquid Glass
          verse: BIBLE_VERSES[6], // Joshua 1:9
          font: VERSE_FONTS[1], // Imperial Word (Cinzel)
          alignment: "center",
          textScale: 0.9,
          italics: false,
          backgroundArtwork: BACKGROUND_ARTWORKS[4], // Declaring Heavens Starry Night
        };
        break;
    }

    updatedFields.totalPrice = 129;
    handleUpdateOrder(updatedFields);
    handleScrollToSection("customizer-section");
  };

  return (
    <div 
      className="min-h-screen text-stone-300 font-sans-lux antialiased overflow-x-hidden relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1800')`,
        backgroundSize: "cover",
        backgroundPosition: "center 60%",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Absolute dark overlay for pristine contrast and sophisticated visual depth */}
      <div className="fixed inset-0 bg-neutral-950/70 pointer-events-none z-0" />

      {/* Floating Ambient Glowing Light-Spheres / Orbs to make the transparent UI Glassmorphism stand out */}
      <div className="absolute top-[3%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#7ea18b]/5 filter blur-[140px] animate-pulse pointer-events-none z-0" />
      <div className="absolute top-[22%] left-[-15%] w-[650px] h-[650px] rounded-full bg-cyan-500/5 filter blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-[52%] right-[-12%] w-[600px] h-[600px] rounded-full bg-[#7ea18b]/5 filter blur-[140px] animate-pulse pointer-events-none z-0" />
      <div className="absolute bottom-[8%] left-[2%] w-[550px] h-[550px] rounded-full bg-[#7ea18b]/3 filter blur-[130px] pointer-events-none z-0" />

      {/* Translucent Global Header & Navigation */}
      <Navigation 
        order={activeOrder} 
        onOpenCart={() => setIsCartOpen(true)} 
        onScrollToSection={handleScrollToSection} 
      />

      {/* 1. CINEMATIC HERO SECTION */}
      <div 
        ref={heroRef}
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
                onClick={() => handleScrollToSection("customizer-section")}
                className="w-full sm:w-auto px-8 py-4 bg-[#7ea18b] hover:bg-[#6ba080] text-[#0c0d12] rounded-full text-xs uppercase tracking-widest font-extrabold shadow-xl transition-all hover:translate-y-[-2px] duration-350 cursor-pointer"
              >
                Launch Design Studio
              </button>
              
              <button
                id="hero-go-inspirations-btn"
                onClick={() => handleScrollToSection("inspirations-section")}
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
              onUpdateOrder={handleUpdateOrder} 
            />
          </div>

        </div>

        {/* Decorative architectural layout line */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* 2. CURATED INSPIRATIONS DESIGNER KITS */}
      <div 
        ref={inspirationsRef}
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
                animate={{ x: `-${safeCarouselIndex * (100 / itemsPerView)}%` }}
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
                            onClick={() => loadPresetKit(preset.id)}
                            className="text-[10px] uppercase tracking-wider font-extrabold text-[#7ea18b] hover:text-[#9fc2ab] flex items-center gap-1.5 transition-all bg-white/5 hover:bg-[#7ea18b]/10 px-3 py-1.5 rounded-lg border border-white/10 cursor-pointer"
                          >
                            Load Design <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
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
                  onClick={() => setCarouselIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    safeCarouselIndex === i 
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

      {/* MAIN INTERACTIVE DESIGN STUDIO */}
      <div 
        ref={customizerRef}
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
                onUpdateOrder={handleUpdateOrder} 
              />
            </div>

            {/* Right option panel */}
            <div className="lg:col-span-7">
              <CustomizerPanel 
                order={activeOrder} 
                onUpdateOrder={handleUpdateOrder} 
              />
              
              <div className="mt-6 p-5 rounded-2xl glass-panel-light flex flex-col sm:flex-row gap-4 items-center justify-between border-white/10 shadow-2xl !bg-white/5">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs font-bold text-white">Satisfied with your design?</span>
                  <p className="text-[11px] text-stone-400 leading-relaxed">Our handcrafting backlog is currently processing orders on same-day schedules.</p>
                </div>
                
                <button
                  id="checkout-trigger-under-customizer-btn"
                  onClick={() => setIsCartOpen(true)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#7ea18b] hover:bg-[#6ba080] text-[#0c0d12] rounded-xl text-xs uppercase tracking-widest font-extrabold shadow-lg transition-all cursor-pointer"
                >
                  Configure & Checkout — ${activeOrder.totalPrice}
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 6. LUXURY BRUTALIST/MINIMALIST BRAND FOOTER */}
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
              <li><button onClick={() => handleScrollToSection("inspirations-section")} className="hover:text-white transition-colors cursor-pointer text-stone-400">Curated Presets</button></li>
              <li><button onClick={() => handleScrollToSection("customizer-section")} className="hover:text-white transition-colors cursor-pointer text-stone-400">Customizer Studio</button></li>
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

      {/* 7. CART DRAWER MECHANISM */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            order={activeOrder} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
