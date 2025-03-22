
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Filter, Grid2X2, Grid3X3, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookCard from "@/components/ui/BookCard";
import CategoryList from "@/components/ui/CategoryList";
import SearchBar from "@/components/ui/SearchBar";
import { books, categories } from "@/lib/data";
import { cn } from "@/lib/utils";

const Shop = () => {
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const location = useLocation();
  
  // Handle scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Handle category from URL
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    if (pathParts[1] === "category" && pathParts[2]) {
      const category = categories.find(c => c.slug === pathParts[2]);
      if (category) {
        setSelectedCategories([category.name]);
      }
    }
  }, [location]);
  
  // Apply filters
  useEffect(() => {
    let result = [...books];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        book => 
          book.title.toLowerCase().includes(query) || 
          book.author.name.toLowerCase().includes(query) ||
          book.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter(book => 
        selectedCategories.includes(book.category)
      );
    }
    
    // Filter by price range
    result = result.filter(
      book => book.price >= priceRange[0] && book.price <= priceRange[1]
    );
    
    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      // For simplicity, we'll just reverse the array
      result.reverse();
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredBooks(result);
  }, [searchQuery, selectedCategories, priceRange, sortBy]);
  
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const handlePriceRangeChange = (
    type: "min" | "max",
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    setPriceRange(prev => 
      type === "min" 
        ? [numValue, prev[1]] 
        : [prev[0], numValue]
    );
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 50]);
    setSearchQuery("");
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-medium mb-6">
            Browse Our Collection
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover thousands of books across all genres, from bestsellers to hidden gems.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar 
              onSearch={(query) => setSearchQuery(query)}
              placeholder="Search by title, author, or tag..."
            />
          </div>
          
          {/* Categories */}
          <div className="mt-8">
            <CategoryList layout="flex" className="justify-center" />
          </div>
        </div>
      </section>
      
      {/* Main Shop Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-32">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={clearFilters}
                    className="h-8 text-sm"
                  >
                    Clear all
                  </Button>
                </div>
                
                {/* Categories Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category.id} className="flex items-center gap-2">
                        <Checkbox 
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.name)}
                          onCheckedChange={() => handleCategoryToggle(category.name)}
                        />
                        <label 
                          htmlFor={`category-${category.id}`}
                          className="text-sm"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Price Range</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground">Min</label>
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input 
                          type="number"
                          className="pl-6"
                          value={priceRange[0]}
                          onChange={(e) => handlePriceRangeChange("min", e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Max</label>
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input 
                          type="number"
                          className="pl-6"
                          value={priceRange[1]}
                          onChange={(e) => handlePriceRangeChange("max", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                {/* Ratings Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Rating</h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center gap-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label 
                          htmlFor={`rating-${rating}`}
                          className="text-sm flex items-center gap-1"
                        >
                          {rating}
                          <span className="text-primary">★</span>
                          & up
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Books Grid */}
            <div className="flex-1">
              {/* Top Bar */}
              <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-2">
                  <Select 
                    value={sortBy} 
                    onValueChange={setSortBy}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{filteredBooks.length}</span> results
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Mobile Filters Button */}
                  <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <DrawerTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="lg:hidden"
                      >
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="max-h-[85vh] overflow-y-auto">
                      <DrawerHeader>
                        <DrawerTitle>Filters</DrawerTitle>
                        <DrawerDescription>
                          Narrow down your book search with these filters.
                        </DrawerDescription>
                      </DrawerHeader>
                      
                      {/* Mobile Filters */}
                      <div className="px-4 py-2">
                        {/* Categories Filter */}
                        <div className="mb-6">
                          <h3 className="text-sm font-medium mb-3">Categories</h3>
                          <div className="grid grid-cols-2 gap-y-2">
                            {categories.map(category => (
                              <div key={category.id} className="flex items-center gap-2">
                                <Checkbox 
                                  id={`mobile-category-${category.id}`}
                                  checked={selectedCategories.includes(category.name)}
                                  onCheckedChange={() => handleCategoryToggle(category.name)}
                                />
                                <label 
                                  htmlFor={`mobile-category-${category.id}`}
                                  className="text-sm"
                                >
                                  {category.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Separator className="my-6" />
                        
                        {/* Price Range Filter */}
                        <div className="mb-6">
                          <h3 className="text-sm font-medium mb-3">Price Range</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs text-muted-foreground">Min</label>
                              <div className="relative">
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                <Input 
                                  type="number"
                                  className="pl-6"
                                  value={priceRange[0]}
                                  onChange={(e) => handlePriceRangeChange("min", e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground">Max</label>
                              <div className="relative">
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                <Input 
                                  type="number"
                                  className="pl-6"
                                  value={priceRange[1]}
                                  onChange={(e) => handlePriceRangeChange("max", e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Separator className="my-6" />
                        
                        {/* Ratings Filter */}
                        <div className="mb-6">
                          <h3 className="text-sm font-medium mb-3">Rating</h3>
                          <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map(rating => (
                              <div key={rating} className="flex items-center gap-2">
                                <Checkbox id={`mobile-rating-${rating}`} />
                                <label 
                                  htmlFor={`mobile-rating-${rating}`}
                                  className="text-sm flex items-center gap-1"
                                >
                                  {rating}
                                  <span className="text-primary">★</span>
                                  & up
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <DrawerFooter>
                        <div className="flex gap-2">
                          <Button className="flex-1" onClick={() => setIsFilterOpen(false)}>
                            Apply Filters
                          </Button>
                          <Button variant="outline" onClick={clearFilters}>
                            Clear All
                          </Button>
                        </div>
                        <DrawerClose asChild>
                          <Button variant="ghost">Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                  
                  {/* Layout Toggles */}
                  <div className="flex border border-border rounded-md overflow-hidden">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className={cn(
                        "h-9 w-9 rounded-none",
                        layout === "grid" && "bg-secondary"
                      )}
                      onClick={() => setLayout("grid")}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className={cn(
                        "h-9 w-9 rounded-none",
                        layout === "list" && "bg-secondary"
                      )}
                      onClick={() => setLayout("list")}
                    >
                      <Grid2X2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Active Filters */}
              {(selectedCategories.length > 0 || searchQuery || priceRange[0] > 0 || priceRange[1] < 50) && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  
                  {selectedCategories.map(category => (
                    <div 
                      key={category}
                      className="px-3 py-1 rounded-full bg-secondary flex items-center gap-1 text-sm"
                    >
                      {category}
                      <button 
                        onClick={() => handleCategoryToggle(category)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  
                  {(priceRange[0] > 0 || priceRange[1] < 50) && (
                    <div className="px-3 py-1 rounded-full bg-secondary flex items-center gap-1 text-sm">
                      ${priceRange[0]} - ${priceRange[1]}
                      <button 
                        onClick={() => setPriceRange([0, 50])}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  
                  {searchQuery && (
                    <div className="px-3 py-1 rounded-full bg-secondary flex items-center gap-1 text-sm">
                      "{searchQuery}"
                      <button 
                        onClick={() => setSearchQuery("")}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={clearFilters}
                    className="h-7 text-xs ml-2"
                  >
                    Clear all
                  </Button>
                </div>
              )}
              
              {/* Books Grid or List */}
              {filteredBooks.length > 0 ? (
                <div className={cn(
                  layout === "grid" 
                    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6" 
                    : "space-y-4"
                )}>
                  {filteredBooks.map((book) => (
                    <div key={book.id} className="animate-fade-in">
                      {layout === "grid" ? (
                        <BookCard book={book} />
                      ) : (
                        <div className="flex gap-6 p-4 border border-border rounded-lg hover:shadow-sm transition-shadow">
                          <div className="w-24 shrink-0">
                            <img 
                              src={book.coverImage} 
                              alt={book.title}
                              className="w-full h-auto rounded"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{book.title}</h3>
                            <p className="text-sm text-muted-foreground">{book.author.name}</p>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                              {book.description}
                            </p>
                            <div className="mt-2 flex items-center gap-1">
                              <span className="text-primary">★</span>
                              <span className="text-sm font-medium">{book.rating.toFixed(1)}</span>
                              <span className="text-xs text-muted-foreground">({book.reviewCount})</span>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="font-medium">${book.price.toFixed(2)}</span>
                              {book.originalPrice && (
                                <span className="text-muted-foreground text-sm line-through">
                                  ${book.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 justify-end">
                            <Button>Add to Cart</Button>
                            <Button variant="outline">View Details</Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <SlidersHorizontal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No matches found</h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your filters or search query
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
              
              {/* Pagination */}
              {filteredBooks.length > 0 && (
                <div className="flex justify-center mt-16">
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      1
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      2
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      3
                    </Button>
                    <span className="mx-1">...</span>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      12
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Shop;
