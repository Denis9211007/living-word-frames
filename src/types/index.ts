export interface FrameMaterial {
  id: string;
  name: string;
  type: "wood" | "metal" | "acrylic";
  description: string;
  priceMultiplier: number;
  previewClass: string; // Tailwind class representing the bezel/frame color/gradient
  innerBezelClass: string; // Inner accent light line
  hasWoodGrain?: boolean;
}

export interface FrameSize {
  id: string;
  label: string;
  dimensions: string;
  basePrice: number;
}

export interface MatBoard {
  id: string;
  name: string;
  colorClass: string; // Mat background color
  innerBorderClass: string; // Core cut outline
  price: number;
}

export interface GlassType {
  id: string;
  name: string;
  description: string;
  effectClass: string; // Shine overlay styling
  price: number;
}

export interface BibleVerse {
  id: string;
  verse: string;
  reference: string;
  category: "Strength" | "Peace" | "Love" | "Hope" | "Grace";
}

export interface VerseFont {
  id: string;
  name: string;
  fontFamily: string; // CSS style or custom tailwind class
  letterSpacing: string;
  lineHeight: string;
}

export interface BackgroundArtwork {
  id: string;
  name: string;
  category: "nature" | "abstract" | "minimalist" | "celestial";
  url?: string;
  styleName: string;
  description: string;
  textColorClass: string;
  overlayClass: string;
}

export interface CustomizedOrder {
  id: string;
  material: FrameMaterial;
  size: FrameSize;
  mat: MatBoard;
  glass: GlassType;
  verse: BibleVerse;
  customText?: string;
  customReference?: string;
  font: VerseFont;
  alignment: "left" | "center" | "right";
  textScale: number; // multiplier for size
  italics: boolean;
  backgroundArtwork: BackgroundArtwork;
  totalPrice: number;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  quote: string;
  rating: number;
  date: string;
}
