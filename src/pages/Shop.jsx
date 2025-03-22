import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { BookCard } from "@/components/ui/BookCard";
import { FeaturedSlider } from "@/components/ui/FeaturedSlider";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { books, categories } from "@/lib/data";

const Shop = () => {
  const { category } = useParams();
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [availableOnly, setAvailableOnly] = useState(false);
  
  useEffect(() => {
    let newFilteredBooks = books;
    
    // Category filter
    if (category) {
      newFilteredBooks = newFilteredBooks.filter(book => 
        book.categories.some(cat => cat.slug === category)
      );
    }
    
    // Search filter
    if (searchQuery) {
      newFilteredBooks = newFilteredBooks.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.categories.some(cat => cat.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Price range filter
    newFilteredBooks = newFilteredBooks.filter(book =>
      book.price >= priceRange[0] && book.price <= priceRange[1]
    );
    
    // Availability filter
    if (availableOnly) {
      newFilteredBooks = newFilteredBooks.filter(book => book.stock > 0);
    }
    
    // Sorting
    if (sortBy === "price-asc") {
      newFilteredBooks = [...newFilteredBooks].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      newFilteredBooks = [...newFilteredBooks].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      newFilteredBooks = [...newFilteredBooks].sort((a, b) => b.rating - a.rating);
    } else {
      // For relevance, we'll keep the original order
    }
    
    setFilteredBooks(newFilteredBooks);
  }, [category, searchQuery, sortBy, priceRange, availableOnly]);
  
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6 capitalize">
        {category ? category : "Shop"}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="md:col-span-1">
          <div className="bg-secondary/30 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            
            {/* Search */}
            <div className="mb-4">
              <Label htmlFor="search">Search</Label>
              <Input
                type="text"
                id="search"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Sort By */}
            <div className="mb-4">
              <Label htmlFor="sort">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Relevance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Price Range */}
            <div className="mb-4">
              <Label>Price Range: ${priceRange[0]} - ${priceRange[1]}</Label>
              <Slider
                defaultValue={priceRange}
                max={100}
                step={1}
                onValueChange={(value) => setPriceRange(value)}
              />
            </div>
            
            {/* Availability */}
            <div className="mb-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="available"
                  checked={availableOnly}
                  onCheckedChange={() => setAvailableOnly(!availableOnly)}
                />
                <Label htmlFor="available">Only Available</Label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Book Grid */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
            {filteredBooks.length === 0 && (
              <div className="col-span-full text-center">
                <p className="text-muted-foreground">No books found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
