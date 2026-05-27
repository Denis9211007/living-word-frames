import { useState, useEffect } from "react";

interface UseCarouselProps {
  totalItems: number;
  itemsPerView: number;
}

export function useCarousel({ totalItems, itemsPerView }: UseCarouselProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const maxIndex = Math.max(0, totalItems - itemsPerView);
  const safeCarouselIndex = Math.min(Math.max(0, carouselIndex), maxIndex);

  // Readjust index if itemsPerView changes and causes index to overshoot
  useEffect(() => {
    if (carouselIndex > maxIndex) {
      setCarouselIndex(maxIndex);
    }
  }, [itemsPerView, maxIndex, carouselIndex]);

  const handleNext = () => {
    setCarouselIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const setIndex = (index: number) => {
    const safeIndex = Math.min(Math.max(0, index), maxIndex);
    setCarouselIndex(safeIndex);
  };

  return {
    carouselIndex: safeCarouselIndex,
    maxIndex,
    handleNext,
    handlePrev,
    setIndex,
  };
}
