import { FrameMaterial, FrameSize, MatBoard, GlassType, BibleVerse, VerseFont, Testimonial, BackgroundArtwork } from "../types";

export const FRAME_MATERIALS: FrameMaterial[] = [
  {
    id: "smoked-walnut",
    name: "Smoked American Walnut",
    type: "wood",
    description: "Deep charcoal-espresso natural hardwood grain sustainably harvested from Appalachian forests",
    priceMultiplier: 1.25,
    previewClass: "bg-gradient-to-br from-[#2e1f13] via-[#3d2e24] to-[#20150d] border-stone-900",
    innerBezelClass: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border-stone-800",
    hasWoodGrain: true,
  },
  {
    id: "alabaster-birch",
    name: "Alabaster Birch",
    type: "wood",
    description: "Sleek Scandi-minimal ivory white wood frame boasting delicate pale grain accents",
    priceMultiplier: 1.1,
    previewClass: "bg-gradient-to-tr from-[#f5f5f0] via-[#fafaf6] to-[#e8e8e3] border-stone-200",
    innerBezelClass: "shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)] border-stone-300/40",
    hasWoodGrain: true,
  },
  {
    id: "honey-oak",
    name: "Honey Golden Oak",
    type: "wood",
    description: "Warm amber-toned natural solid oak wood showcasing rich, dense growth rings",
    priceMultiplier: 1.15,
    previewClass: "bg-gradient-to-br from-[#d4a373] via-[#e9c46a] to-[#c68a4c] border-amber-800/40",
    innerBezelClass: "shadow-[inset_0_1px_2.5px_rgba(255,255,255,0.5)] border-amber-600/20",
    hasWoodGrain: true,
  },
  {
    id: "royal-cherry",
    name: "Royal Black Cherry",
    type: "wood",
    description: "Satin-finished reddish copper burgundy wood boasting a deep organic grain glow",
    priceMultiplier: 1.2,
    previewClass: "bg-gradient-to-br from-[#5c1c11] via-[#7a2c1d] to-[#45120a] border-amber-950",
    innerBezelClass: "shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.25)] border-stone-900/30",
    hasWoodGrain: true,
  },
  {
    id: "matte-ebony",
    name: "Matte Obsidian Ebony",
    type: "wood",
    description: "Prestige architectural pitch black wood casing displaying subtle silver slate grain overlays",
    priceMultiplier: 1.35,
    previewClass: "bg-gradient-to-b from-[#181819] via-[#2a2a2b] to-[#111112] border-neutral-950",
    innerBezelClass: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] border-neutral-850",
    hasWoodGrain: true,
  },
  {
    id: "rustic-driftwood",
    name: "Rustic Pine Driftwood",
    type: "wood",
    description: "Weathered, wire-brushed ash-grey timber reminiscent of mountain retreats and oceansides",
    priceMultiplier: 1.15,
    previewClass: "bg-gradient-to-tr from-[#9f9c96] via-[#b3b0aa] to-[#8c8983] border-stone-400",
    innerBezelClass: "shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] border-stone-350",
    hasWoodGrain: true,
  },
];

export const FRAME_SIZES: FrameSize[] = [
  { id: "size-s", label: "8\" x 10\"", dimensions: "8x10 in / 20x25 cm", basePrice: 89 },
  { id: "size-m", label: "11\" x 14\"", dimensions: "11x14 in / 28x35 cm", basePrice: 129 },
  { id: "size-l", label: "12\" x 12\"", dimensions: "12x12 in / 30x30 cm", basePrice: 145 },
  { id: "size-xl", label: "16\" x 20\" Gallery Size", dimensions: "16x20 in / 40x50 cm", basePrice: 195 },
];

export const MAT_BOARDS: MatBoard[] = [
  {
    id: "linen-white",
    name: "Linen Warm White",
    colorClass: "bg-[#fdfdf9]",
    innerBorderClass: "ring-1 ring-neutral-200/50 shadow-[inset_0_1px_5px_rgba(0,0,0,0.03)]",
    price: 0,
  },
  {
    id: "oatmeal-coarse",
    name: "Oatmeal Textured Cream",
    colorClass: "bg-[#f4efe3]",
    innerBorderClass: "ring-1 ring-neutral-300/40 shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)]",
    price: 15,
  },
  {
    id: "charcoal-onyx",
    name: "Charcoal Slate Linen",
    colorClass: "bg-[#1f2022]",
    innerBorderClass: "ring-1 ring-neutral-800 shadow-[inset_0_1px_6px_rgba(255,255,255,0.05)]",
    price: 18,
  },
  {
    id: "floating-glass",
    name: "Infinity Floating Float (No Mat)",
    colorClass: "bg-transparent",
    innerBorderClass: "ring-transparent shadow-none",
    price: 35,
  },
];

export const GLASS_TYPES: GlassType[] = [
  {
    id: "museum-optics",
    name: "Anti-Reflection Museum Glass",
    description: "99% UV protection with specialized chemical-vapor light filtration, entirely glare-free",
    effectClass: "bg-gradient-to-tr from-cyan-400/5 via-transparent to-pink-400/5",
    price: 25,
  },
  {
    id: "liquid-gloss",
    name: "Liquid Glass High-Gloss",
    description: "A bright reflective polymer coating offering high depth saturation and dynamic light bounce",
    effectClass: "bg-gradient-to-b from-white/12 via-white/2 to-white/0 shadow-inner",
    price: 0,
  },
  {
    id: "matte-soft",
    name: "Soft Light Frosted Shatterproof",
    description: "Finely etched satin glass delivering a velvet glare diffused layout, highly recommended for natural light rooms",
    effectClass: "bg-white/5 opacity-50 backdrop-blur-[0.5px]",
    price: 15,
  },
];

export const BIBLE_VERSES: BibleVerse[] = [
  {
    id: "v1",
    verse: "For I know the plans I have for you, plans to prosper you and not to harm you, plans to give you hope and a future.",
    reference: "Jeremiah 29:11",
    category: "Hope",
  },
  {
    id: "v2",
    verse: "Do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
    reference: "Isaiah 41:10",
    category: "Strength",
  },
  {
    id: "v3",
    verse: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.",
    reference: "Psalm 23:1-3",
    category: "Peace",
  },
  {
    id: "v4",
    verse: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    category: "Guidance" as any, // Mapped to Grace/Strength in UI categorization filters
  },
  {
    id: "v5",
    verse: "And now these three remain: faith, hope and love. But the greatest of these is love.",
    reference: "1 Corinthians 13:13",
    category: "Love",
  },
  {
    id: "v6",
    verse: "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace.",
    reference: "Numbers 6:24-26",
    category: "Grace",
  },
  {
    id: "v7",
    verse: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    reference: "Joshua 1:9",
    category: "Strength",
  },
  {
    id: "v8",
    verse: "He who dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, 'He is my refuge and my fortress, my God, in whom I trust.'",
    reference: "Psalm 91:1-2",
    category: "Peace",
  },
];

export const VERSE_FONTS: VerseFont[] = [
  {
    id: "cormorant",
    name: "Classical Garamond (Italian Serif)",
    fontFamily: "font-serif-lux font-normal italic",
    letterSpacing: "tracking-wide",
    lineHeight: "leading-relaxed",
  },
  {
    id: "cinzel",
    name: "Imperial Word (Sculpted Display Serif)",
    fontFamily: "font-serif-display font-medium uppercase",
    letterSpacing: "tracking-[0.15em]",
    lineHeight: "leading-loose text-[0.85em]",
  },
  {
    id: "montserrat",
    name: "Sleek Ethereal (Luxury Modern Sans)",
    fontFamily: "font-display-modern font-light uppercase",
    letterSpacing: "tracking-[0.2em]",
    lineHeight: "leading-loose text-[0.80em]",
  },
  {
    id: "playfair",
    name: "Editorial Luxe (Fine Literary Serif)",
    fontFamily: "font-serif-lux font-semibold",
    letterSpacing: "tracking-normal",
    lineHeight: "leading-relaxed",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    author: "Eleanor Vance",
    location: "Savannah, Georgia",
    quote: "The Liquid Gold frame suspended in our master hallway catches the morning sun beautifully. The typography feels so high-end, far surpassing other standard wall art.",
    rating: 5,
    date: "April 2026",
  },
  {
    id: "t2",
    author: "Christopher K.",
    location: "Palo Alto, California",
    quote: "Splendidly Apple-like packaging and product execution. The Museum glass is worth every penny—absolutely invisible reflection even directly facing the bay window.",
    rating: 5,
    date: "May 2026",
  },
  {
    id: "t3",
    author: "Hannah Prescott",
    location: "Austin, Texas",
    quote: "I bought Psalm 23 in Smoked Walnut for our fireplace mantel. It is incredibly luxurious and tactile. The wood has a premium organic depth you can smell.",
    rating: 5,
    date: "March 2026",
  },
];

export const INTERIOR_PREVIEWS = [
  {
    id: "living-room",
    name: "Warm Interior (Limestone)",
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "cozy-bed",
    name: "Minimalist Studio (Oak Wood)",
    url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "executive-office",
    name: "Dark Concrete Executive Study",
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
  },
];

export const BACKGROUND_ARTWORKS: BackgroundArtwork[] = [
  {
    id: "none",
    name: "Parchment Minimalist (Pure)",
    category: "minimalist",
    styleName: "Fine Art Cotton Paper",
    description: "Pure alabaster museum-grade heavy paper, highlighting fine calligraphic engraving alone",
    textColorClass: "text-stone-900",
    overlayClass: "bg-[#fcfdfa]",
  },
  {
    id: "misty-forest",
    name: "Misty Pine Forest (Serene)",
    category: "nature",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1000",
    styleName: "Serenity Woods Wash",
    description: "Vivid woodland pines emerging step-by-step from morning mountain mist",
    textColorClass: "text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)] font-semibold",
    overlayClass: "bg-black/20 bg-gradient-to-t from-black/50 via-transparent to-black/10",
  },
  {
    id: "mountain-sunrise",
    name: "Radiant Ridge Sunset (Hope)",
    category: "nature",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000",
    styleName: "Dawn Golden Hour",
    description: "Glorious alpine peaks illuminated under glowing amber dawn light",
    textColorClass: "text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)] font-semibold",
    overlayClass: "bg-black/20 bg-gradient-to-t from-black/45 via-transparent to-black/15",
  },
  {
    id: "sea-ripples",
    name: "Ocean Ripple Shallows (Peace)",
    category: "nature",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000",
    styleName: "Tranquil Tide Wash",
    description: "Shimmering, translucent ripples of liquid turquoise coral shores",
    textColorClass: "text-white drop-shadow-[0_3px_10px_rgba(13,44,51,0.9)] font-semibold",
    overlayClass: "bg-cyan-950/15 bg-gradient-to-t from-cyan-950/45 via-transparent to-transparent",
  },
  {
    id: "starry-night",
    name: "Declaring Heavens (Celestial)",
    category: "celestial",
    url: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=1000",
    styleName: "Stardust Indigo",
    description: "Deep cosmic nebulae dust lanes and swirling light clusters",
    textColorClass: "text-amber-100 drop-shadow-[0_3px_14px_rgba(0,0,0,0.95)] font-medium",
    overlayClass: "bg-black/15 bg-gradient-to-t from-black/55 via-transparent to-black/25",
  },
  {
    id: "golden-rays",
    name: "Sovereign Sunbeams (Grace)",
    category: "abstract",
    url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=1000",
    styleName: "Symphony of Light",
    description: "Warm golden rays breaking through dynamic leafy woodland glades",
    textColorClass: "text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)] font-semibold",
    overlayClass: "bg-black/15 bg-gradient-to-t from-black/50 via-transparent to-black/15",
  },
  {
    id: "desert-dunes",
    name: "Soft Desert Solitude (Silence)",
    category: "abstract",
    url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1000",
    styleName: "Wanderer's Dunes",
    description: "Shimmering, delicate sand ripples bathed in rich post-meridian sun warmth",
    textColorClass: "text-stone-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]",
    overlayClass: "bg-[#f5ebd9]/35 bg-gradient-to-t from-[#2e1f13]/10 to-transparent",
  },
  {
    id: "eucalyptus-leaves",
    name: "Olive Botanical Sprig (Organic)",
    category: "minimalist",
    url: "https://images.unsplash.com/photo-1474904200416-6b2db87d5dc2?auto=format&fit=crop&q=80&w=1000",
    styleName: "Watercolour Branch",
    description: "Deep green wild eucalyptus sprigs and foliage bordering the art print margins",
    textColorClass: "text-emerald-950 font-medium",
    overlayClass: "bg-[#fafaf6]/35 bg-gradient-to-b from-transparent via-[#fafaf6]/10 to-transparent",
  },
];
