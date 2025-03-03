import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";

interface ThreeSixtyViewerProps {
  images: string[];
  width?: number | string;
  height?: number | string;
  autoRotate?: boolean;
  autoRotateSpeed?: number; // seconds per full rotation
  className?: string;
}

const ThreeSixtyViewer = ({
  images = [],
  width = "100%",
  height = 400,
  autoRotate = false,
  autoRotateSpeed = 30,
  className = "",
}: ThreeSixtyViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotate);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Ensure we have images to display
  if (!images.length) {
    return (
      <div
        style={{ width, height }}
        className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
      >
        <p className="text-gray-500">No images available for 360° view</p>
      </div>
    );
  }

  // Handle auto-rotation
  useEffect(() => {
    if (isAutoRotating) {
      const intervalTime = (autoRotateSpeed * 1000) / images.length;
      autoRotateIntervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, intervalTime);
    } else if (autoRotateIntervalRef.current) {
      clearInterval(autoRotateIntervalRef.current);
    }

    return () => {
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
      }
    };
  }, [isAutoRotating, images.length, autoRotateSpeed]);

  // Stop auto-rotation when user interacts
  useEffect(() => {
    if (isDragging && isAutoRotating) {
      setIsAutoRotating(false);
    }
  }, [isDragging, isAutoRotating]);

  const nextImage = () => {
    setIsAutoRotating(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setIsAutoRotating(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const toggleAutoRotate = () => {
    setIsAutoRotating(!isAutoRotating);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    handleDrag(deltaX);
    setStartX(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - startX;
    handleDrag(deltaX);
    setStartX(e.touches[0].clientX);
  };

  const handleDrag = (deltaX: number) => {
    // Determine how many images to move based on drag distance
    // Adjust sensitivity as needed
    const sensitivity = 10; // pixels per image change
    if (Math.abs(deltaX) > sensitivity) {
      const imagesToMove = Math.floor(Math.abs(deltaX) / sensitivity);
      if (deltaX > 0) {
        // Dragging right (counter-clockwise)
        setCurrentIndex((prevIndex) => {
          let newIndex = prevIndex - imagesToMove;
          while (newIndex < 0) newIndex += images.length;
          return newIndex;
        });
      } else {
        // Dragging left (clockwise)
        setCurrentIndex(
          (prevIndex) => (prevIndex + imagesToMove) % images.length,
        );
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`relative rounded-lg overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Main image container */}
      <div
        ref={containerRef}
        className="w-full h-full bg-gray-100 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <img
          src={images[currentIndex]}
          alt={`360 view - frame ${currentIndex + 1}`}
          className="w-full h-full object-contain"
          draggable="false"
        />
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/80 hover:bg-white"
          onClick={prevImage}
          aria-label="Previous view"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button
          variant={isAutoRotating ? "default" : "outline"}
          size="icon"
          className={
            isAutoRotating ? "bg-blue-600" : "bg-white/80 hover:bg-white"
          }
          onClick={toggleAutoRotate}
          aria-label={isAutoRotating ? "Stop rotation" : "Auto rotate"}
        >
          <RotateCcw className="h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="bg-white/80 hover:bg-white"
          onClick={nextImage}
          aria-label="Next view"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Frame indicator */}
      <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Drag instruction overlay - shown briefly on load */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-black/60 text-white px-4 py-2 rounded-md text-sm animate-fade-out">
          Drag to rotate
        </div>
      </div>
    </div>
  );
};

export default ThreeSixtyViewer;
