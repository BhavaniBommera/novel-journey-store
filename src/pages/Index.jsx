import { Link } from 'react-router-dom';
import FeaturedSlider from "@/components/ui/FeaturedSlider";
import CategoryList from "@/components/ui/CategoryList";
import { books } from "@/lib/data";

const Index = () => {
  const featuredBooks = books.filter(book => book.featured);

  return (
    <div>
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <FeaturedSlider books={featuredBooks} />
        </div>
      </section>

      <section className="py-12 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-medium">
              Shop by Category
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Explore our wide range of books by category. Find your next read today!
            </p>
          </div>
          <CategoryList layout="grid" />
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-medium">
              Why Choose NovelJourney?
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              We offer a curated selection of books, fast shipping, and excellent customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-medium mb-2">Wide Selection</h3>
              <p className="text-muted-foreground">
                Explore thousands of titles across various genres.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium mb-2">Fast Shipping</h3>
              <p className="text-muted-foreground">
                Get your books delivered quickly and reliably.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium mb-2">Excellent Support</h3>
              <p className="text-muted-foreground">
                Our team is here to help with any questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-display font-medium">
              Ready to Start Your Journey?
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto mb-8">
              Browse our collection and discover your next favorite book today!
            </p>
            <Link
              to="/shop"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Explore the Shop
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
