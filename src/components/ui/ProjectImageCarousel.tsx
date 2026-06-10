"use client";

import React, { useState, useEffect } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectImageCarouselProps {
  images: string[];
  interval?: number;
}

export function ProjectImageCarousel({ images, interval = 5000 }: ProjectImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval, images.length]);

  return (
    <div className="relative group aspect-[21/9] max-h-[500px] w-full overflow-hidden rounded-3xl border border-border">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <SafeImage
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
            fallback="/images/default.png"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

      {/* Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-md text-foreground border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-md text-foreground border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
