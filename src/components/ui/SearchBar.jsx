
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * A searchbar component with different styling variants
 * @param {Object} props - Component props
 * @param {Function} props.onSearch - Function to call when search is submitted
 * @param {string} props.placeholder - Placeholder text for the search input
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.variant - Style variant ('default' or 'expanded')
 */
const SearchBar = ({ 
  onSearch, 
  placeholder = "Search for books, authors, or genres...",
  className,
  variant = "default"
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query);
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        "relative flex w-full items-center transition-all duration-300",
        variant === "expanded" && "max-w-lg mx-auto",
        isFocused && variant === "expanded" && "scale-105",
        className
      )}
    >
      <div className="relative flex-1">
        <Search 
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-all",
            isFocused && "text-primary"
          )} 
        />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "pl-10 py-6 transition-shadow duration-300",
            variant === "expanded" && "rounded-full pr-32 bg-secondary border-transparent",
            isFocused && variant === "expanded" && "shadow-lg border-muted"
          )}
        />
      </div>
      {variant === "expanded" ? (
        <Button 
          type="submit" 
          className={cn(
            "absolute right-1.5 rounded-full transition-transform duration-300",
            isFocused && "scale-105"
          )}
        >
          Search
        </Button>
      ) : (
        <Button type="submit" className="ml-2">
          Search
        </Button>
      )}
    </form>
  );
};

export default SearchBar;
