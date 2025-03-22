
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, RotateCw, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookCard from "@/components/ui/BookCard";
import FeaturedSlider from "@/components/ui/FeaturedSlider";
import SearchBar from "@/components/ui/SearchBar";
import CategoryList from "@/components/ui/CategoryList";
import { books } from "@/lib/data";

const Index = () => {
  // Get featured books
  const featuredBooks = books.filter(book => book.featured);
  
  // Get bestsellers
  const bestSellers = books.filter(book => book.bestSeller);
  
  // Handle scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-secondary/70 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="font-display font-medium text-5xl md:text-6xl lg:text-7xl tracking-tight">
              Discover Your Next 
              <span className="text-primary block">Literary Adventure</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "100ms" }}>
              Explore thousands of books, from classics to the latest bestsellers. 
              Begin your reading journey today.
            </p>
            <div className="mt-10 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <SearchBar variant="expanded" />
            </div>
            <div className="mt-8 flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Button size="lg" asChild>
                <Link to="/shop">Browse Collection</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/category/bestsellers">Bestsellers</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-accent/20 rounded-full filter blur-3xl"></div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-display font-medium">
              Browse by Category
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Explore our extensive collection across various genres
            </p>
          </div>
          
          <CategoryList layout="grid" />
        </div>
      </section>
      
      {/* Featured Books Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <FeaturedSlider 
            books={featuredBooks} 
            title="Featured Books"
            description="Handpicked by our editorial team, these books are sure to captivate and inspire."
          />
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard 
              icon={<BookOpen className="h-8 w-8 text-primary" />}
              title="Extensive Collection"
              description="Thousands of titles across all genres, from classics to the latest releases."
            />
            <BenefitCard 
              icon={<Truck className="h-8 w-8 text-primary" />}
              title="Fast Delivery"
              description="Get your books delivered to your doorstep within 2-3 business days."
            />
            <BenefitCard 
              icon={<RotateCw className="h-8 w-8 text-primary" />}
              title="Easy Returns"
              description="Not satisfied? Return within 30 days for a full refund, no questions asked."
            />
          </div>
        </div>
      </section>
      
      {/* Bestsellers Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-medium">
                Bestsellers
              </h2>
              <p className="mt-2 text-muted-foreground">
                The most popular books loved by our customers
              </p>
            </div>
            <Button variant="ghost" asChild className="mt-4 md:mt-0">
              <Link to="/category/bestsellers" className="flex items-center gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bestSellers.slice(0, 4).map((book, index) => (
              <div 
                key={book.id} 
                className="animate-scale-in" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-medium">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Join thousands of happy readers who have found their perfect books with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial 
              content="NovelJourney has completely transformed how I discover books. Their curation is superb, and I love the personalized recommendations!"
              author="Sarah J."
              role="Book Enthusiast"
            />
            <Testimonial 
              content="As an avid reader, I appreciate the quality of service. Fast delivery, excellent packaging, and the books are always in perfect condition."
              author="Michael T."
              role="Literature Professor"
            />
            <Testimonial 
              content="The variety is what keeps me coming back. I've discovered so many wonderful authors through NovelJourney that I never would have found otherwise."
              author="Emma R."
              role="Fiction Lover"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-medium">
              Ready to Begin Your Reading Journey?
            </h2>
            <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
              Join our community of book lovers and discover your next favorite read.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/shop">Explore All Books</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/register">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// Benefit Card Component
const BenefitCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-xl border border-border animate-fade-in">
      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

// Testimonial Component
const Testimonial = ({ 
  content, 
  author, 
  role 
}: { 
  content: string; 
  author: string; 
  role: string;
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-border shadow-sm animate-fade-in">
      <div className="mb-4 text-primary">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-primary">★</span>
        ))}
      </div>
      <p className="text-foreground/90 mb-4">{content}</p>
      <Separator className="my-4" />
      <div>
        <p className="font-medium">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  );
};

export default Index;
