
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturedSlider from "@/components/ui/FeaturedSlider";
import { books, Book } from "@/lib/data";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";

interface CartItem {
  book: Book;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { book: books[0], quantity: 1 },
    { book: books[1], quantity: 2 },
  ]);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  
  // Handle scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set recommended books (random selection of featured books)
    const featured = books.filter(book => book.featured);
    const shuffled = [...featured].sort(() => 0.5 - Math.random());
    setRecommendedBooks(shuffled.slice(0, 6));
  }, []);
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.book.id === id 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.book.id !== id));
    
    toast.success("Item removed", {
      description: "Book has been removed from your cart.",
    });
  };
  
  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "NOVEL20") {
      setDiscount(20);
      toast.success("Coupon applied", {
        description: "20% discount has been applied to your order.",
      });
    } else {
      setDiscount(0);
      toast.error("Invalid coupon", {
        description: "The coupon code you entered is invalid or expired.",
      });
    }
  };
  
  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity, 
    0
  );
  const shipping = subtotal > 50 ? 0 : 4.99;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + shipping - discountAmount;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Cart Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-display font-medium mb-8">
            Your Shopping Cart
          </h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border border-border overflow-hidden">
                  {/* Header */}
                  <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-secondary/50 text-sm font-medium">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>
                  
                  {/* Cart Items */}
                  <div className="divide-y divide-border">
                    {cartItems.map(item => (
                      <div 
                        key={item.book.id} 
                        className="py-6 px-4 md:grid md:grid-cols-12 md:gap-4 md:items-center animate-fade-in"
                      >
                        {/* Product */}
                        <div className="md:col-span-6 flex gap-4 items-center">
                          <Link to={`/book/${item.book.id}`} className="shrink-0">
                            <img 
                              src={item.book.coverImage} 
                              alt={item.book.title}
                              className="w-16 md:w-20 h-auto rounded"
                            />
                          </Link>
                          <div>
                            <Link 
                              to={`/book/${item.book.id}`}
                              className="font-medium hover:text-primary transition-colors"
                            >
                              {item.book.title}
                            </Link>
                            <p className="text-sm text-muted-foreground">{item.book.author.name}</p>
                            
                            {/* Mobile only price */}
                            <div className="flex justify-between items-center mt-2 md:hidden">
                              <p className="font-medium">${item.book.price.toFixed(2)}</p>
                              <button 
                                onClick={() => removeItem(item.book.id)}
                                className="text-muted-foreground hover:text-destructive transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Price - Desktop only */}
                        <div className="hidden md:flex md:col-span-2 justify-center">
                          <p className="font-medium">${item.book.price.toFixed(2)}</p>
                        </div>
                        
                        {/* Quantity */}
                        <div className="md:col-span-2 flex justify-center mt-4 md:mt-0">
                          <div className="flex items-center rounded-md border border-border">
                            <button 
                              className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                              onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="h-9 w-10 flex items-center justify-center text-sm">
                              {item.quantity}
                            </span>
                            <button 
                              className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                              onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Total - Desktop */}
                        <div className="hidden md:flex md:col-span-2 justify-end items-center gap-4">
                          <p className="font-medium">
                            ${(item.book.price * item.quantity).toFixed(2)}
                          </p>
                          <button 
                            onClick={() => removeItem(item.book.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        
                        {/* Mobile only total */}
                        <div className="flex justify-end mt-4 md:hidden">
                          <p className="font-medium">
                            Total: ${(item.book.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Cart actions */}
                  <div className="p-4 bg-secondary/50 flex flex-wrap items-center justify-between gap-4">
                    <Button variant="outline" asChild>
                      <Link to="/shop" className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 rotate-180" />
                        Continue Shopping
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => setCartItems([])}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg border border-border overflow-hidden animate-slide-up">
                  <div className="p-4 bg-secondary/50">
                    <h2 className="text-lg font-medium">Order Summary</h2>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({discount}%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg">
                      <span className="font-medium">Total</span>
                      <span className="font-medium">${total.toFixed(2)}</span>
                    </div>
                    
                    {/* Coupon code */}
                    <div className="pt-4">
                      <p className="text-sm mb-2">Apply Coupon Code</p>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Enter code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="flex-1"
                        />
                        <Button 
                          variant="outline"
                          onClick={applyCoupon}
                        >
                          Apply
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Try "NOVEL20" for a 20% discount
                      </p>
                    </div>
                    
                    <Button className="w-full mt-6">
                      Proceed to Checkout
                    </Button>
                    
                    {/* Payment methods */}
                    <div className="pt-4">
                      <p className="text-xs text-center text-muted-foreground">
                        Secure Payments
                      </p>
                      <div className="flex justify-center gap-2 mt-2">
                        <div className="w-10 h-6 bg-muted rounded"></div>
                        <div className="w-10 h-6 bg-muted rounded"></div>
                        <div className="w-10 h-6 bg-muted rounded"></div>
                        <div className="w-10 h-6 bg-muted rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border border-border animate-fade-in">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Looks like you haven't added any books to your cart yet.
                Browse our collection and find your next favorite read.
              </p>
              <Button size="lg" asChild>
                <Link to="/shop">Browse Books</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Recommended Books Section */}
      {cartItems.length > 0 && (
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <FeaturedSlider 
              books={recommendedBooks}
              title="You May Also Like"
              description="Books that complement your current selection"
            />
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
};

export default Cart;
