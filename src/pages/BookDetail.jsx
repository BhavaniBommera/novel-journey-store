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
import { toast } from "sonner";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(books.find(b => b.id === id));
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [isExpanded, setIsExpanded] = useState(false);
  
  const relatedBooks = books
    .filter(b => b.category === book?.category && b.id !== book?.id)
    .slice(0, 8);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    setBook(books.find(b => b.id === id));
    setIsLoading(true);
    
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
  
  const discountPercentage = book.originalPrice 
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) 
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Book Image */}
          <div className="relative">
            <img
              src={book.coverImage}
              alt={book.title}
              className="rounded-lg shadow-md aspect-[9/16] object-cover"
            />
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

          {/* Book Details */}
          <div>
            <h1 className="text-3xl font-semibold mb-2">{book.title}</h1>
            <p className="text-muted-foreground mb-4">By {book.author.name}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 fill-primary text-primary" />
              <span className="text-xl font-medium">{book.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">
                ({book.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-semibold">${book.price.toFixed(2)}</span>
              {book.originalPrice && (
                <span className="text-muted-foreground line-through">
                  ${book.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-6">{book.description}</p>

            {/* Add to Cart Form */}
            <form className="flex flex-col gap-4">
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  type="number"
                  id="quantity"
                  defaultValue="1"
                  min="1"
                  className="w-24"
                />
              </div>
              <Button className="w-full">Add to Cart</Button>
            </form>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Reviews</h2>

          {/* Add Review Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Write a Review</CardTitle>
              <CardDescription>Share your thoughts about this book</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="review">Your Review</Label>
                  <Textarea
                    id="review"
                    placeholder="Write your review here..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                </div>
                <Button type="submit">Submit Review</Button>
              </form>
            </CardContent>
          </Card>

          {/* Display Reviews */}
          <ScrollArea className="h-[300px] w-full rounded-md border">
            <div className="p-4 flex flex-col gap-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={review.user.avatarUrl} alt={review.user.name} />
                        <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-sm font-medium">{review.user.name}</CardTitle>
                        <CardDescription className="text-xs text-muted-foreground">
                          {review.date}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BookDetail;
