import React, { useState } from "react";
import { CustomizedOrder } from "../types";
import { X, CreditCard, ShoppingBag, Truck, Gift, CheckCircle2, ShieldCheck, MapPin, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import PresetFrameMiniature from "./PresetFrameMiniature";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  order: CustomizedOrder;
}

export default function CartDrawer({ isOpen, onClose, order }: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "shipping" | "success">("cart");
  
  // Checkout Form states
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [giftNote, setGiftNote] = useState("");
  const [includeGiftWrap, setIncludeGiftWrap] = useState(false);
  
  // Card form states
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  
  // Validation indicator
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateTotal = () => {
    return order.totalPrice + (includeGiftWrap ? 12 : 0);
  };

  const handleNextToShipping = () => {
    setCheckoutStep("shipping");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!email || !fullName || !address || !city || !zip) {
      setFormError("Kindly complete all requested delivery fields to proceed.");
      return;
    }
    if (!cardNumber || !cardExpiry || !cardCVV) {
      setFormError("Kindly complete credit certificate fields safely.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate real high-end banking authorization
    setTimeout(() => {
      setIsSubmitting(false);
      setCheckoutStep("success");
    }, 1800);
  };

  const getEstDeliveryDate = () => {
    const date = new Date("2026-05-24");
    return date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-50 overflow-hidden flex justify-end"
    >
      {/* Backdrop */}
      <motion.div 
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#07080a]/80 backdrop-blur-md"
      />

      {/* Main Drawer Container */}
      <motion.div 
        variants={{
          initial: { x: "100%" },
          animate: { x: 0 },
          exit: { x: "100%" }
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full max-w-lg h-full glass-panel-light !bg-[#0c0d12]/95 shadow-2xl flex flex-col z-10 border-l border-white/10 backdrop-blur-3xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/2">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#7ea18b]" />
            <h2 className="text-sm font-display-modern font-bold uppercase tracking-wider text-white">Your Created Piece</h2>
          </div>
          <button 
            id="close-cart-drawer-btn"
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-white/5 text-stone-400 hover:text-white transition-all border border-transparent hover:border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Area based on Step */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {checkoutStep === "cart" && (
            <div className="space-y-6">
              {/* Product Card summary */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-lg space-y-4">
                <div className="flex items-center gap-4">
                  {/* Miniature design preview */}
                  <div className="w-16 sm:w-20 aspect-[11/14] flex-shrink-0 relative overflow-hidden bg-black/40 rounded-lg p-1.5 flex items-center justify-center border border-white/5">
                    <PresetFrameMiniature 
                      size="sm"
                      material={order.material}
                      mat={order.mat}
                      backgroundArtwork={order.backgroundArtwork}
                      verse={order.verse}
                      font={order.font}
                      italics={order.italics}
                      customText={order.customText}
                      customReference={order.customReference}
                      alignment={order.alignment}
                      textScale={order.textScale}
                    />
                  </div>

                  {/* Summary lists */}
                  <div className="flex-1 space-y-1">
                    <span className="text-[9px] uppercase tracking-widest bg-[#7ea18b]/20 border border-[#7ea18b]/25 px-2 py-0.5 rounded text-[#7ea18b] font-bold font-sans">
                      11" x 14" Masterpiece
                    </span>
                    <h3 className="text-xs font-bold text-white mt-1">
                      Bible Verse Hand-Mitered Walnut Frame
                    </h3>
                    <p className="text-[11px] text-stone-400">
                      Handcrafted Solid Wood • Archival Pure Cotton Mat • Glare-Free Filter Glass
                    </p>
                    <p className="text-[10.5px] text-[#7ea18b] font-semibold">
                      Backdrop Art: {order.backgroundArtwork ? order.backgroundArtwork.name : "Pure Parchment"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-3 flex justify-between items-center text-xs">
                  <span className="text-stone-300 font-medium font-sans">Configuration Base Price ({order.size.dimensions})</span>
                  <span className="font-bold text-white">${order.totalPrice}</span>
                </div>
              </div>

              {/* Gift Service Upgrade Option */}
              <div className="p-4 rounded-2xl bg-[#7ea18b]/5 border border-[#7ea18b]/15 space-y-3.5 shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2.5">
                    <Gift className="w-4 h-4 text-[#7ea18b] mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Premium Gift Wrap Service</h4>
                      <p className="text-[11px] text-stone-300 mt-0.5 leading-relaxed">
                        Features beautiful white linen textured paper wrap, a hand-tied dark velvet ribbon, and an elegant card with calligraphed envelope. Add a customized blessing below.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#7ea18b] font-sans">+$12</span>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <input
                    id="include-gift-wrap-checkbox"
                    type="checkbox"
                    checked={includeGiftWrap}
                    onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                    className="rounded border-white/10 text-[#7ea18b] bg-stone-950 focus:ring-emerald-500 w-4 h-4 accent-[#7ea18b]"
                  />
                  <label htmlFor="include-gift-wrap-checkbox" className="text-xs font-semibold text-stone-200 cursor-pointer select-none">
                    Include Gift Presentation Wrap (+ $12.00)
                  </label>
                </div>

                {includeGiftWrap && (
                  <div className="pt-2 animate-fade-in">
                    <textarea
                      id="gift-note-textarea"
                      rows={2}
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Enter details: E.g., 'Dear Emily, May this serve as a beautiful daily reminder of His perfect grace. Happy Birthday! Love, Aunt Sarah'"
                      className="w-full text-xs font-serif-lux bg-stone-950/70 border border-white/10 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#7ea18b] focus:border-[#7ea18b] shadow-inner text-white leading-relaxed"
                    />
                  </div>
                )}
              </div>

              {/* Shipping Badges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                  <Truck className="w-5 h-5 text-[#7ea18b]" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Free Courier Shipping</p>
                    <p className="text-[11px] text-stone-200 font-semibold mt-0.5">Complimentary Worldwide</p>
                  </div>
                </div>
                
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Solid Transit Shield</p>
                    <p className="text-[11px] text-stone-200 font-semibold mt-0.5">100% Damage Protection</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {checkoutStep === "shipping" && (
            <form onSubmit={handlePlaceOrder} id="checkout-form" className="space-y-6">
              
              {/* Delivery info block */}
              <div className="space-y-3.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#7ea18b]" /> 1. Delivery destination info
                </h3>
                
                <div className="space-y-3 p-4 rounded-2xl bg-black/35 border border-white/5 shadow-inner">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Enter Email Address</label>
                    <input
                      id="shipping-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. blessings@mail.com"
                      className="w-full text-xs bg-stone-950 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-[#7ea18b]"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Recipient Full Name</label>
                    <input
                      id="shipping-fullname"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Mary Magdalene"
                      className="w-full text-xs bg-stone-950 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-[#7ea18b]"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Shipping Address</label>
                    <input
                      id="shipping-address"
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 777 Grace Avenue, Apt 4C"
                      className="w-full text-xs bg-stone-950 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-[#7ea18b]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">City</label>
                      <input
                        id="shipping-city"
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Jerusalem"
                        className="w-full text-xs bg-stone-950 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-[#7ea18b]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Postal Zip Code</label>
                      <input
                        id="shipping-zip"
                        type="text"
                        required
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        placeholder="e.g. 10001"
                        className="w-full text-xs bg-stone-950 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-[#7ea18b]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Secure Payment details */}
              <div className="space-y-3.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-[#7ea18b]" /> 2. Secure Escrow payment
                </h3>

                <div className="p-4 rounded-2xl bg-black/35 border border-white/5 shadow-inner space-y-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Card certificate number</label>
                    <input
                      id="billing-card"
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4000 1234 5678 9010"
                      className="w-full text-xs bg-stone-950 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-[#7ea18b]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Expiration Date</label>
                      <input
                        id="billing-expiry"
                        type="text"
                        required
                        value={cardExpiry}
                        placeholder="MM / YY"
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full text-xs bg-stone-950 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-[#7ea18b]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Security Code CVV</label>
                      <input
                        id="billing-cvv"
                        type="password"
                        required
                        maxLength={4}
                        value={cardCVV}
                        placeholder="•••"
                        onChange={(e) => setCardCVV(e.target.value)}
                        className="w-full text-xs bg-stone-950 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-[#7ea18b]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {formError && (
                <p className="text-xs text-red-400 font-semibold bg-red-950/20 border border-red-500/20 p-3 rounded-xl">
                  ⚠️ {formError}
                </p>
              )}

              {/* Loading indicator or Place order button */}
              <button
                id="submit-checkout-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-xs font-extrabold uppercase tracking-widest text-[#0c0d12] bg-[#7ea18b] hover:bg-[#6ba080] shadow-2xl disabled:opacity-50 transition-all rounded-2xl flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-stone-950" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Authorizing Ledger Order...
                  </>
                ) : (
                  `Safely Authorize Trade of $${calculateTotal()}`
                )}
              </button>
            </form>
          )}

          {checkoutStep === "success" && (
            <div className="space-y-6 pt-4 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-950/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-sans font-extrabold uppercase tracking-widest text-white">Casing Order Confirmed</h3>
                <p className="text-[12.5px] text-stone-300 leading-relaxed max-w-sm">
                  Praise God! Your order has been placed successfully. Our master artisans are preparing your custom solid casing frames right away.
                </p>
              </div>

              {/* Order receipt blueprint card */}
              <div className="w-full p-5 rounded-2xl bg-black/55 border border-white/10 shadow-2xl text-left text-xs font-mono select-none space-y-4">
                <div className="flex justify-between pb-3 border-b border-white/5 dot-matrix-header">
                  <div>
                    <p className="font-bold text-stone-200 text-[10px] sm:text-xs">SCRIPTURE FRAMES CO.</p>
                    <p className="text-[9px] text-stone-500 mt-0.5">Est. 2026 • Premium Artistry</p>
                  </div>
                  <div className="text-right">
                    <p className="text-stone-200 font-bold text-[10px] sm:text-xs">RECEIPT #77194</p>
                    <p className="text-[9px] text-stone-500 mt-0.5">Date: 2026-05-20</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Frame Casing:</span>
                    <span className="text-[#7ea18b] font-bold">11" x 14" Mitered Walnut</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Passage Option:</span>
                    <span className="text-stone-200 font-bold">{order.verse.reference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Backdrop Print:</span>
                    <span className="text-[#7ea18b] font-bold">{order.backgroundArtwork ? order.backgroundArtwork.name : "Pure"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Glass Protected:</span>
                    <span className="text-stone-200 font-bold">Museum Care Glass</span>
                  </div>
                  {includeGiftWrap && (
                    <div className="flex justify-between">
                      <span className="text-stone-400">Gift Wrap Ribbon:</span>
                      <span className="text-stone-200 font-bold">Included</span>
                    </div>
                  )}
                  <div className="border-t border-white/10 pt-2.5 flex justify-between font-bold text-white text-sm">
                    <span>Total Amount Charged:</span>
                    <span className="text-[#7ea18b]">${calculateTotal()}.00</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-[10.5px] italic text-[#7ea18b] font-sans leading-relaxed">
                  <Truck className="w-4 h-4 flex-shrink-0" />
                  <span>Ships globally with premium tracking. Your tracking ID will be sent to <strong>{email || "your address"}</strong>.</span>
                </div>
              </div>

              {/* Delivery ETA info box */}
              <div className="p-4 rounded-xl bg-emerald-950/10 border border-emerald-500/15 flex items-start gap-3 w-full text-left">
                <Gift className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Estimated Delivery Date</h4>
                  <p className="text-xs text-[#7ea18b] font-bold mt-1">{getEstDeliveryDate()}</p>
                  <p className="text-[11px] text-stone-300 leading-relaxed mt-0.5">
                    Your shipment features double-walled shock-absorb insulation. Safely delivered to <strong>{fullName}</strong>, at {address}.
                  </p>
                </div>
              </div>

              <button
                id="checkout-success-close-btn"
                onClick={() => {
                  setCheckoutStep("cart");
                  onClose();
                }}
                className="w-full py-4 text-xs font-bold bg-[#121318] border border-white/5 hover:bg-black text-white rounded-2xl shadow-md uppercase tracking-wider cursor-pointer"
              >
                Discover More Frames
              </button>
            </div>
          )}

        </div>

        {/* Footer Subtotal bar (Only show if not success and in cart step) */}
        {checkoutStep === "cart" && (
          <div className="p-6 border-t border-white/15 bg-black/55 space-y-4">
            <div className="space-y-1.5 text-xs font-sans">
              <div className="flex justify-between">
                <span className="text-stone-400 font-semibold uppercase tracking-wider text-[10px]">Frame Cost</span>
                <span className="font-bold text-stone-200">${order.totalPrice}.00</span>
              </div>
              {includeGiftWrap && (
                <div className="flex justify-between">
                  <span className="text-stone-400 font-semibold uppercase tracking-wider text-[10px]">Gift Service Wrap</span>
                  <span className="font-bold text-stone-200">+$12.00</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-stone-400 font-semibold uppercase tracking-wider text-[10px]">Global Priority Courier</span>
                <span className="font-bold text-emerald-400 font-mono uppercase text-[10.5px]">Free Included</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between items-baseline">
                <span className="text-[11px] uppercase tracking-wider font-bold text-stone-300">Consolidated Subtotal</span>
                <span className="text-2xl font-extrabold text-[#7ea18b] font-display-modern">${calculateTotal()}.00</span>
              </div>
            </div>

            <button
              id="goto-shipping-btn"
              onClick={handleNextToShipping}
              className="w-full py-4 text-xs font-extrabold uppercase tracking-widest text-stone-950 bg-[#7ea18b] hover:bg-[#6ba080] transition-all shadow-xl rounded-2xl flex items-center justify-center gap-2 cursor-pointer"
            >
              Secure Order Checkout <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </motion.div>
    </motion.div>
  );
}
