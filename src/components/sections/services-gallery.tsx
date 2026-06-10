"use client";

import { useState, useEffect } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ServiceGalleryProps {
  images: string[];
  title: string;
  color: string;
}

export function ServiceGallery({ images, title, color }: ServiceGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-card border border-border">
      {/* Main Image Container */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-muted to-muted/50">
        {/* Background blur effect */}
        <div className="absolute inset-0 opacity-50">
          <SafeImage
            src={images[currentIndex]}
            alt={`${title} ${currentIndex + 1}`}
            fill
            loading="lazy"
            className="h-full w-full object-cover blur-xl"
            fallback="/images/default.png"
          />
        </div>

        {/* Main image with animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-full w-full">
            <SafeImage
              src={images[currentIndex]}
              alt={`${title} ${currentIndex + 1}`}
              fill
              loading="lazy"
              className="h-full w-full object-cover transition-all duration-700 ease-out"
              fallback="/images/default.png"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-all hover:bg-background border border-border"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-all hover:bg-background border border-border"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>

        {/* Counter */}
        <div className="absolute bottom-4 left-4 rounded-full bg-background/80 px-3 py-1 backdrop-blur-sm text-xs font-medium text-foreground border border-border">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 bg-card px-4 py-4 backdrop-blur-sm border-t border-border">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? `h-2 w-8 rounded-full bg-gradient-to-r ${color}`
                : "h-2 w-2 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
