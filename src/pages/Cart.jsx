import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Book } from "@/lib/data";
import BookCard from "@/components/ui/BookCard";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // type: Book[]
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate fetching cart items from local storage or API
    setIsLoading(true);
    setTimeout(() => {
      const storedCartItems = localStorage.getItem("cart");
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
      setIsLoading(false);
    }, 500);
  }, []);

  const handleRemoveFromCart = (bookId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== bookId);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    toast.success("Book removed from cart!");
  };

  const handleQuantityChange = (bookId, quantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === bookId) {
        return { ...item, quantity: parseInt(quantity, 10) };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  const subtotal = calculateSubtotal();
  const shippingCost = subtotal > 50 ? 0 : 5;
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

          {isLoading ? (
            <p className="text-muted-foreground">Loading cart items...</p>
          ) : cartItems.length === 0 ? (
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Your cart is empty</CardTitle>
                <CardDescription>Add some books to your cart to continue.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button asChild>
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex items-center gap-4 border rounded-md p-4 bg-card text-card-foreground shadow-sm">
                      <div className="w-24 h-32 overflow-hidden rounded-md shadow-md">
                        <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium line-clamp-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">By {item.author.name}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-2">
                            <label htmlFor={`quantity-${item.id}`} className="text-sm font-medium">Qty:</label>
                            <input
                              type="number"
                              id={`quantity-${item.id}`}
                              className="w-20 border rounded-md px-2 py-1 text-sm"
                              defaultValue={item.quantity || 1}
                              min="1"
                              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            />
                          </div>
                          <button
                            className="text-sm text-destructive hover:underline"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order Summary */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <p className="text-sm">Subtotal:</p>
                        <p className="font-medium">${subtotal.toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm">Shipping:</p>
                        <p className="font-medium">${shippingCost.toFixed(2)}</p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between font-medium">
                      <p>Total:</p>
                      <p>${total.toFixed(2)}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Checkout</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;
