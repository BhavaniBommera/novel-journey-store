import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Book } from "@/lib/data";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([
    {
      id: "review1",
      user: {
        name: "John Doe",
        avatarUrl: "https://github.com/shadcn.png",
      },
      rating: 5,
      comment:
        "An absolutely captivating read! The characters were so well-developed, and the plot kept me hooked from beginning to end. Highly recommended!",
      date: "2024-01-20",
    },
    {
      id: "review2",
      user: {
        name: "Jane Smith",
        avatarUrl: "https://avatars.githubusercontent.com/u/872844?v=4",
      },
      rating: 4,
      comment:
        "A great book with a unique storyline. I enjoyed the author's writing style and the unexpected twists. Will definitely read more from this author.",
      date: "2024-02-15",
    },
  ]);

  useEffect(() => {
    // Simulate fetching book data
    setTimeout(() => {
      const mockBook = {
        id: "book1",
        title: "The Secret Garden",
        author: {
          name: "Frances Hodgson Burnett",
        },
        coverImage:
          "https://m.media-amazon.com/images/I/51j4JtOxGgL._AC_UF1000,1000_QL80_.jpg",
        description:
          "A young, orphaned girl discovers a hidden garden on her uncle's estate, leading to a journey of healing and self-discovery.",
        price: 9.99,
        originalPrice: 12.99,
        rating: 4.5,
        reviewCount: 120,
        bestSeller: true,
        newRelease: false,
      };

      setBook(mockBook);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!reviewText.trim()) {
      toast.error("Please enter your review");
      return;
    }

    const newReview = {
      id: `review${reviews.length + 1}`,
      user: {
        name: "Current User", // Replace with actual user data
        avatarUrl: "https://github.com/shadcn.png", // Replace with actual user avatar
      },
      rating: 5, // You might want to add a rating system
      comment: reviewText,
      date: new Date().toLocaleDateString(),
    };

    setReviews([newReview, ...reviews]);
    setReviewText("");
    toast.success("Review submitted successfully!");
  };

  if (isLoading) {
    return <div>Loading book details...</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
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
