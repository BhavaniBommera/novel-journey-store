
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Search, ShoppingCart, User, Menu, X, Book, Heart, 
  ChevronDown, LogIn 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const location = useLocation();
  
  // Track scrolling for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "py-2 bg-white/90 backdrop-blur-lg shadow-sm" 
          : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Book className="h-8 w-8 text-primary" />
            <span className="text-xl font-display font-medium">NovelJourney</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                  Categories
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48 animate-scale-in">
                <DropdownMenuItem>
                  <Link to="/category/fiction" className="w-full">Fiction</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/category/non-fiction" className="w-full">Non-Fiction</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/category/mystery" className="w-full">Mystery</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/category/science-fiction" className="w-full">Science Fiction</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/category/fantasy" className="w-full">Fantasy</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
          
          {/* Search and Action Buttons */}
          <div className="hidden md:flex items-center gap-1">
            <div 
              className={cn(
                "flex items-center relative transition-all duration-300 ease-elastic overflow-hidden", 
                searchExpanded ? "w-56" : "w-10"
              )}
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-0"
                onClick={() => setSearchExpanded(!searchExpanded)}
              >
                <Search className="h-[1.2rem] w-[1.2rem]" />
              </Button>
              <Input 
                className={cn(
                  "pl-10 h-9 transition-all duration-300 ease-elastic",
                  !searchExpanded && "opacity-0"
                )}
                placeholder="Search books..." 
                onBlur={() => setSearchExpanded(false)}
              />
            </div>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/wishlist">
                <Heart className="h-[1.2rem] w-[1.2rem]" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/login">
                <User className="h-[1.2rem] w-[1.2rem]" />
              </Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div 
          className={cn(
            "fixed inset-0 top-16 bg-white z-40 transition-transform duration-300 ease-elastic",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="w-full pl-10"
                  placeholder="Search books..." 
                />
              </div>
              
              <nav className="flex flex-col gap-2 mt-4">
                <MobileNavLink to="/">Home</MobileNavLink>
                <MobileNavLink to="/shop">Shop</MobileNavLink>
                <MobileNavLink to="/category/fiction">Fiction</MobileNavLink>
                <MobileNavLink to="/category/non-fiction">Non-Fiction</MobileNavLink>
                <MobileNavLink to="/category/mystery">Mystery</MobileNavLink>
                <MobileNavLink to="/category/science-fiction">Science Fiction</MobileNavLink>
                <MobileNavLink to="/category/fantasy">Fantasy</MobileNavLink>
                <MobileNavLink to="/about">About</MobileNavLink>
                <MobileNavLink to="/contact">Contact</MobileNavLink>
              </nav>
              
              <div className="flex flex-col gap-2 mt-4">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/wishlist" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span>Wishlist</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/cart" className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    <span>Cart</span>
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start mt-4">
                  <Link to="/login" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    <span>Login / Register</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={cn(
        "px-3 py-2 text-sm font-medium transition-colors",
        isActive 
          ? "text-foreground" 
          : "text-foreground/80 hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={cn(
        "px-3 py-4 text-lg font-medium border-b border-border transition-colors",
        isActive 
          ? "text-primary border-primary" 
          : "text-foreground/80 hover:text-foreground hover:bg-secondary/50"
      )}
    >
      {children}
    </Link>
  );
};

export default Navbar;
