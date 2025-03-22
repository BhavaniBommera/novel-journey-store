
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import BookCard from "./BookCard";
import { Button } from "@/components/ui/button";

/**
 * A slider component for featured books
 * @param {Object} props - Component props
 * @param {Array} props.books - Array of book objects to display
 * @param {string} props.title - Title for the featured section
 * @param {string} props.description - Optional description text
 */
const FeaturedSlider = ({ 
  books,
  title = "Featured Books",
  description
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const itemsToShow = useWindowWidth() >= 1024 ? 4 : useWindowWidth() >= 768 ? 3 : useWindowWidth() >= 640 ? 2 : 1;
  const totalItems = books.length;
  const maxIndex = Math.max(0, totalItems - itemsToShow);
  
  // Go to next slide
  const goToNext = useCallback(() => {
    if (currentIndex < maxIndex) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, maxIndex]);
  
  // Go to previous slide
  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);
  
  // Auto advance the slider
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < maxIndex) {
        goToNext();
      } else {
        setCurrentIndex(0);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, goToNext, maxIndex]);
  
  // Handle transition end
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };
  
  return (
    <div className="relative animate-fade-in">
      {/* Heading */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-display font-medium">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
      
      {/* Navigation Buttons */}
      <div className="absolute right-0 top-0 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-full"
          onClick={goToPrev}
          disabled={currentIndex === 0 || isTransitioning}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-full"
          onClick={goToNext}
          disabled={currentIndex >= maxIndex || isTransitioning}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Slider */}
      <div className="overflow-hidden">
        <div 
          ref={containerRef}
          className="flex transition-transform duration-500 ease-elastic"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {books.map((book) => (
            <div 
              key={book.id}
              className={cn(
                "px-2",
                itemsToShow === 1 && "w-full",
                itemsToShow === 2 && "w-1/2",
                itemsToShow === 3 && "w-1/3",
                itemsToShow === 4 && "w-1/4"
              )}
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Dots */}
      <div className="flex justify-center gap-1 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === currentIndex ? "bg-primary w-4" : "bg-secondary hover:bg-primary/30"
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

// Custom hook for responsive design
function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return windowWidth;
}

export default FeaturedSlider;
