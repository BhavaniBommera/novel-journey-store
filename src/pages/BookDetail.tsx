
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Truck, RotateCw, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturedSlider from "@/components/ui/FeaturedSlider";
import { books } from "@/lib/data";
import { toast } from "@/components/ui/sonner";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(books.find(b => b.id === id));
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get related books (same category)
  const relatedBooks = books
    .filter(b => b.category === book?.category && b.id !== book?.id)
    .slice(0, 8);
  
  // Handle scroll to top on page load or book change
  useEffect(() => {
    window.scrollTo(0, 0);
    setBook(books.find(b => b.id === id));
    setIsLoading(true);
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleAddToCart = () => {
    toast.success("Added to cart", {
      description: `${book?.title} (${quantity}) has been added to your cart.`,
    });
  };
  
  const handleAddToWishlist = () => {
    toast.success("Added to wishlist", {
      description: `${book?.title} has been added to your wishlist.`,
    });
  };
  
  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-4">Book not found</h1>
            <p className="text-muted-foreground mb-6">
              The book you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/shop">Browse Books</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Calculate discount percentage
  const discountPercentage = book.originalPrice 
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) 
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Book Detail Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Book Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-[2/3] overflow-hidden rounded-lg book-shadow">
                {isLoading ? (
                  <div className="absolute inset-0 bg-muted loading-shimmer" />
                ) : (
                  <img 
                    src={book.coverImage} 
                    alt={book.title}
                    className="w-full h-full object-cover animate-fade-in"
                    onLoad={() => setIsLoading(false)}
                  />
                )}
                {discountPercentage > 0 && (
                  <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-medium animate-scale-in">
                    {discountPercentage}% OFF
                  </div>
                )}
              </div>
            </div>
            
            {/* Book Info */}
            <div className="animate-slide-up">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Link to={`/category/${book.category.toLowerCase()}`} className="hover:text-primary">
                    {book.category}
                  </Link>
                  <span>•</span>
                  <Link to={`/author/${book.author.id}`} className="hover:text-primary">
                    {book.author.name}
                  </Link>
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-medium">{book.title}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star 
                        key={index}
                        className="h-5 w-5"
                        fill={index < Math.floor(book.rating) ? "currentColor" : "none"}
                        color={index < Math.floor(book.rating) ? "#FFB800" : "#E2E8F0"}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{book.rating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">({book.reviewCount} reviews)</span>
                </div>
              </div>
              
              {/* Price */}
              <div className="mt-6 flex items-end gap-2">
                <span className="text-3xl font-medium">${book.price.toFixed(2)}</span>
                {book.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${book.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Short Description */}
              <p className="mt-4 text-muted-foreground">
                {book.description.substring(0, 150)}...
              </p>
              
              {/* Availability */}
              <div className="mt-6 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">
                  {book.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              
              {/* Add to Cart Actions */}
              <div className="mt-6 flex items-stretch gap-2">
                <div className="flex border border-border rounded-lg overflow-hidden">
                  <button 
                    className="px-3 py-2 hover:bg-muted transition-colors"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <div className="px-4 py-2 min-w-[3rem] text-center">{quantity}</div>
                  <button 
                    className="px-3 py-2 hover:bg-muted transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <Button 
                  className="flex-1 flex items-center gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Shipping Info */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Free shipping</p>
                    <p className="text-sm text-muted-foreground">For orders over $50</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCw className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Easy returns</p>
                    <p className="text-sm text-muted-foreground">30-day return policy</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Secure checkout</p>
                    <p className="text-sm text-muted-foreground">SSL encrypted payment</p>
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              <div className="mt-8">
                <p className="text-sm text-muted-foreground mb-2">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {book.tags.map(tag => (
                    <Link 
                      key={tag} 
                      to={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className="px-3 py-1 bg-secondary text-foreground text-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Book Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description" onValueChange={setActiveTab}>
              <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex md:gap-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6 animate-fade-in">
                <div className={`prose max-w-none ${!isExpanded ? 'max-h-56 overflow-hidden' : ''}`}>
                  <p>{book.description}</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
                    Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget 
                    tincidunt nisl nisl eget nisl. Sed euismod, nisl vel ultricies lacinia, 
                    nisl nisl aliquam nisl, eget tincidunt nisl nisl eget nisl.
                  </p>
                  <p>
                    Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget 
                    tincidunt nisl nisl eget nisl. Sed euismod, nisl vel ultricies lacinia, 
                    nisl nisl aliquam nisl, eget tincidunt nisl nisl eget nisl.
                  </p>
                </div>
                
                {/* Read more/less toggle */}
                {activeTab === "description" && (
                  <Button 
                    variant="ghost" 
                    className="mt-4 flex items-center gap-1"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? (
                      <>
                        Read less <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Read more <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </TabsContent>
              
              <TabsContent value="details" className="mt-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Book Details</h3>
                    <dl className="space-y-2">
                      <div className="flex items-center">
                        <dt className="w-32 text-muted-foreground">Title:</dt>
                        <dd>{book.title}</dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-32 text-muted-foreground">Author:</dt>
                        <dd>{book.author.name}</dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-32 text-muted-foreground">Category:</dt>
                        <dd>{book.category}</dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-32 text-muted-foreground">Pages:</dt>
                        <dd>368</dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-32 text-muted-foreground">Language:</dt>
                        <dd>English</dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-32 text-muted-foreground">Publisher:</dt>
                        <dd>NovelJourney Press</dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-32 text-muted-foreground">Publication:</dt>
                        <dd>January 15, 2023</dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-32 text-muted-foreground">ISBN:</dt>
                        <dd>978-3-16-148410-0</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
                    <p className="text-muted-foreground mb-4">
                      We provide several shipping options to ensure your order reaches you in a timely manner.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Standard Shipping (3-5 business days)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Express Shipping (1-2 business days)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>International Shipping available</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Free shipping on orders over $50</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6 animate-fade-in">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="bg-secondary/50 p-6 rounded-lg">
                      <h3 className="text-lg font-medium mb-2">Customer Reviews</h3>
                      <div className="flex items-center gap-4">
                        <div className="text-4xl font-medium">{book.rating.toFixed(1)}</div>
                        <div>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star 
                                key={index}
                                className="h-5 w-5"
                                fill={index < Math.floor(book.rating) ? "currentColor" : "none"}
                                color={index < Math.floor(book.rating) ? "#FFB800" : "#E2E8F0"}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Based on {book.reviewCount} reviews
                          </p>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map(star => (
                          <div key={star} className="flex items-center gap-2">
                            <span className="text-sm w-2">{star}</span>
                            <div className="h-2 bg-secondary flex-1 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary"
                                style={{ 
                                  width: `${Math.random() * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button className="w-full mt-6">Write a Review</Button>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <div className="space-y-6">
                      <ReviewItem 
                        name="James Wilson"
                        rating={5}
                        date="2 months ago"
                        content="This book exceeded all my expectations. The character development is outstanding, and the storyline keeps you engaged from start to finish. I couldn't put it down and finished it in just two days. Highly recommend!"
                      />
                      <ReviewItem 
                        name="Emily Chen"
                        rating={4}
                        date="3 months ago"
                        content="A beautifully written book with intricate details and a captivating plot. The author's descriptive language makes you feel like you're right there in the story. My only critique is that the ending felt a bit rushed."
                      />
                      <ReviewItem 
                        name="David Thompson"
                        rating={5}
                        date="6 months ago"
                        content="One of the best books I've read this year. The themes explored are profound and thought-provoking. The narrative style is unique and refreshing. I've already recommended it to all my friends."
                      />
                      
                      <div className="text-center">
                        <Button variant="outline">Load More Reviews</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Related Books Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <FeaturedSlider 
            books={relatedBooks} 
            title="You May Also Like"
            description="Similar books in the same category that you might enjoy"
          />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// Review Item component
const ReviewItem = ({ 
  name, 
  rating, 
  date, 
  content 
}: { 
  name: string; 
  rating: number; 
  date: string; 
  content: string;
}) => {
  return (
    <div className="p-6 bg-white rounded-lg border border-border animate-fade-in">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star 
              key={index}
              className="h-4 w-4"
              fill={index < rating ? "currentColor" : "none"}
              color={index < rating ? "#FFB800" : "#E2E8F0"}
            />
          ))}
        </div>
      </div>
      <p className="text-foreground/90">{content}</p>
    </div>
  );
};

export default BookDetail;
