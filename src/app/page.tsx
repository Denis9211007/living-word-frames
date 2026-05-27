"use client";

import React, { useState } from "react";
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
import CartDrawer from "../components/layout/CartDrawer";
import HeroSection from "../components/sections/HeroSection";
import PresetInspirations from "../components/sections/PresetInspirations";
import DesignStudio from "../components/sections/DesignStudio";
import Footer from "../components/sections/Footer";
import { useScrollToSection } from "../hooks/useScrollToSection";
import { AnimatePresence } from "motion/react";

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

  // Invoke Decoupled Section Smooth-Scrolling Hook
  const {
    heroRef,
    inspirationsRef,
    customizerRef,
    handleScrollToSection,
  } = useScrollToSection();

  const handleUpdateOrder = (fields: Partial<CustomizedOrder>) => {
    setActiveOrder((prev) => {
      const updated = { ...prev, ...fields };
      // All customized orders here carry our fixed handcrafted price of 129
      updated.totalPrice = 129;
      return updated;
    });
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
      className="min-h-screen text-stone-300 font-sans-lux antialiased overflow-x-hidden relative animate-fade-in"
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
      <HeroSection 
        sectionRef={heroRef}
        activeOrder={activeOrder}
        onUpdateOrder={handleUpdateOrder}
        onScrollToSection={handleScrollToSection}
      />

      {/* 2. CURATED INSPIRATIONS DESIGNER KITS */}
      <PresetInspirations 
        sectionRef={inspirationsRef}
        onLoadPresetKit={loadPresetKit}
      />

      {/* 3. MAIN INTERACTIVE DESIGN STUDIO */}
      <DesignStudio 
        sectionRef={customizerRef}
        activeOrder={activeOrder}
        onUpdateOrder={handleUpdateOrder}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 4. LUXURY BRUTALIST/MINIMALIST BRAND FOOTER */}
      <Footer 
        onScrollToSection={handleScrollToSection}
      />

      {/* 5. CART DRAWER MECHANISM */}
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
