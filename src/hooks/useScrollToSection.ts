import { useRef, RefObject } from "react";

export function useScrollToSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const inspirationsRef = useRef<HTMLDivElement>(null);
  const customizerRef = useRef<HTMLDivElement>(null);

  const handleScrollToSection = (sectionId: string) => {
    let targetRef: RefObject<HTMLDivElement | null> | null = null;
    switch (sectionId) {
      case "hero-section":
        targetRef = heroRef;
        break;
      case "inspirations-section":
        targetRef = inspirationsRef;
        break;
      case "customizer-section":
        targetRef = customizerRef;
        break;
    }

    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return {
    heroRef,
    inspirationsRef,
    customizerRef,
    handleScrollToSection,
  };
}
