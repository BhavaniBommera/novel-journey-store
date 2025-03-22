
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * A card component that displays a book with its details
 * @param {Object} props - Component props
 * @param {Object} props.book - The book object with title, author, price, etc.
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.showDescription - Whether to show book description
 * @param {boolean} props.showActions - Whether to show action buttons
 */
const BookCard = ({ 
  book, 
  className,
  showDescription = false,
  showActions = true
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Calculate discount percentage
  const discountPercentage = book.originalPrice 
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) 
    : 0;

  return (
    <div 
      className={cn(
        "book-card animate-fade-in group",
        className
      )}
    >
      {/* Book Image */}
      <div className="book-card-image">
        {isLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img 
          src={book.coverImage} 
          alt={book.title}
          className="transition-all duration-700"
          onLoad={() => setIsLoading(false)}
        />
        
        {/* Overlay with Quick Actions */}
        {showActions && (
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button 
              variant="secondary" 
              size="icon"
              className="bg-white/90 hover:bg-white rounded-full shadow-sm h-10 w-10"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button 
              variant="secondary" 
              size="icon"
              className="bg-white/90 hover:bg-white rounded-full shadow-sm h-10 w-10"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        )}
        
        {/* Tags */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {book.bestSeller && (
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
              Bestseller
            </span>
          )}
          {book.newRelease && (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">
              New
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-medium">
              {discountPercentage}% Off
            </span>
          )}
        </div>
      </div>
      
      {/* Book Info */}
      <div className="book-card-content flex flex-col gap-1">
        <Link to={`/book/${book.id}`} className="hover:underline">
          <h3 className="font-medium text-base line-clamp-1">{book.title}</h3>
        </Link>
        <p className="text-muted-foreground text-sm">{book.author.name}</p>
        
        {/* Description (optional) */}
        {showDescription && (
          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
            {book.description}
          </p>
        )}
        
        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="text-sm font-medium">{book.rating.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">({book.reviewCount})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="font-medium">${book.price.toFixed(2)}</span>
          {book.originalPrice && (
            <span className="text-muted-foreground text-sm line-through">
              ${book.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Add to Cart Button */}
        {showActions && (
          <Button 
            className="w-full mt-3 group-hover:bg-primary/90 transition-all"
            size="sm"
          >
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
