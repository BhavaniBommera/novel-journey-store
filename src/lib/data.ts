
export interface Author {
  id: string;
  name: string;
}

export interface Book {
  id: string;
  title: string;
  author: Author;
  price: number;
  originalPrice?: number;
  coverImage: string;
  rating: number;
  reviewCount: number;
  description: string;
  category: string;
  tags: string[];
  bestSeller?: boolean;
  newRelease?: boolean;
  inStock: boolean;
  featured?: boolean;
}

// Sample authors
export const authors: Author[] = [
  { id: "auth1", name: "Harper Lee" },
  { id: "auth2", name: "F. Scott Fitzgerald" },
  { id: "auth3", name: "Jane Austen" },
  { id: "auth4", name: "George Orwell" },
  { id: "auth5", name: "J.D. Salinger" },
  { id: "auth6", name: "Ernest Hemingway" },
  { id: "auth7", name: "J.K. Rowling" },
  { id: "auth8", name: "Leo Tolstoy" },
  { id: "auth9", name: "Agatha Christie" },
  { id: "auth10", name: "Margaret Atwood" },
];

// Sample book categories
export const categories = [
  { id: "cat1", name: "Fiction", slug: "fiction" },
  { id: "cat2", name: "Non-Fiction", slug: "non-fiction" },
  { id: "cat3", name: "Mystery", slug: "mystery" },
  { id: "cat4", name: "Science Fiction", slug: "science-fiction" },
  { id: "cat5", name: "Biography", slug: "biography" },
  { id: "cat6", name: "Fantasy", slug: "fantasy" },
  { id: "cat7", name: "History", slug: "history" },
  { id: "cat8", name: "Romance", slug: "romance" },
  { id: "cat9", name: "Self-Help", slug: "self-help" },
  { id: "cat10", name: "Children's", slug: "childrens" },
];

// Sample books data
export const books: Book[] = [
  {
    id: "book1",
    title: "To Kill a Mockingbird",
    author: authors[0],
    price: 15.99,
    originalPrice: 19.99,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 2547,
    description: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. Set in the mid-1930s in the small town of Maycomb, Alabama, the story focuses on the Finch family and the events surrounding their children while their father, a lawyer, defends a black man accused of raping a white woman.",
    category: "Fiction",
    tags: ["Classic", "Literary Fiction", "Coming of Age"],
    bestSeller: true,
    inStock: true,
    featured: true
  },
  {
    id: "book2",
    title: "The Great Gatsby",
    author: authors[1],
    price: 12.99,
    originalPrice: 15.99,
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    reviewCount: 1834,
    description: "The Great Gatsby, F. Scott Fitzgerald's third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers. The story is of the fabulously wealthy Jay Gatsby and his new love for the beautiful Daisy Buchanan.",
    category: "Fiction",
    tags: ["Classic", "Literary Fiction", "Jazz Age"],
    bestSeller: true,
    inStock: true,
    featured: true
  },
  {
    id: "book3",
    title: "Pride and Prejudice",
    author: authors[2],
    price: 9.99,
    originalPrice: 12.99,
    coverImage: "https://images.unsplash.com/photo-1603162617003-64224243b8e2?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 3125,
    description: "Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language. Jane Austen called this brilliant work 'her own darling child' and its vivacious heroine, Elizabeth Bennet, 'as delightful a creature as ever appeared in print.'",
    category: "Fiction",
    tags: ["Classic", "Romance", "Regency"],
    bestSeller: true,
    inStock: true,
    featured: true
  },
  {
    id: "book4",
    title: "1984",
    author: authors[3],
    price: 11.99,
    originalPrice: 14.99,
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    reviewCount: 2189,
    description: "Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real. Published in 1949, the book offers political satirist George Orwell's nightmare vision of a totalitarian, bureaucratic world and one poor stiff's attempt to find individuality.",
    category: "Science Fiction",
    tags: ["Dystopian", "Classic", "Political"],
    bestSeller: false,
    inStock: true,
    featured: false
  },
  {
    id: "book5",
    title: "The Catcher in the Rye",
    author: authors[4],
    price: 10.99,
    originalPrice: 13.99,
    coverImage: "https://images.unsplash.com/photo-1604433203550-76536522152a?q=80&w=800&auto=format&fit=crop",
    rating: 4.3,
    reviewCount: 1756,
    description: "The hero-narrator of The Catcher in the Rye is an ancient child of sixteen, a native New Yorker named Holden Caulfield. Through circumstances that tend to preclude adult, secondhand description, he leaves his prep school in Pennsylvania and goes underground in New York City for three days.",
    category: "Fiction",
    tags: ["Classic", "Coming of Age", "Literary Fiction"],
    bestSeller: false,
    inStock: true,
    featured: false
  },
  {
    id: "book6",
    title: "The Old Man and the Sea",
    author: authors[5],
    price: 8.99,
    originalPrice: 10.99,
    coverImage: "https://images.unsplash.com/photo-1510936723038-00e7e6b4e976?q=80&w=800&auto=format&fit=crop",
    rating: 4.4,
    reviewCount: 1342,
    description: "The Old Man and the Sea is one of Hemingway's most enduring works. Told in language of great simplicity and power, it is the story of an old Cuban fisherman, down on his luck, and his supreme ordeal -- a relentless, agonizing battle with a giant marlin far out in the Gulf Stream.",
    category: "Fiction",
    tags: ["Classic", "Literary Fiction", "Sea Adventure"],
    bestSeller: false,
    inStock: true,
    featured: false
  },
  {
    id: "book7",
    title: "Harry Potter and the Philosopher's Stone",
    author: authors[6],
    price: 14.99,
    originalPrice: 17.99,
    coverImage: "https://images.unsplash.com/photo-1598153346810-860daa814c4b?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 5748,
    description: "Harry Potter has no idea how famous he is. That's because he's being raised by his miserable aunt and uncle who are terrified Harry will learn that he's really a wizard, just as his parents were. But everything changes when Harry is summoned to attend an infamous school for wizards, and he begins to discover some clues about his illustrious birthright.",
    category: "Fantasy",
    tags: ["Young Adult", "Magic", "Adventure"],
    bestSeller: true,
    inStock: true,
    featured: true
  },
  {
    id: "book8",
    title: "War and Peace",
    author: authors[7],
    price: 16.99,
    originalPrice: 19.99,
    coverImage: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    reviewCount: 987,
    description: "Epic in scale, War and Peace delineates in graphic detail events leading up to Napoleon's invasion of Russia, and the impact of the Napoleonic era on Tsarist society, as seen through the eyes of five Russian aristocratic families.",
    category: "Fiction",
    tags: ["Classic", "Historical Fiction", "Epic"],
    bestSeller: false,
    inStock: true,
    featured: false
  },
  {
    id: "book9",
    title: "Murder on the Orient Express",
    author: authors[8],
    price: 9.99,
    originalPrice: 12.99,
    coverImage: "https://images.unsplash.com/photo-1551358603-81b8004cb2f2?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    reviewCount: 2154,
    description: "Just after midnight, the famous Orient Express is stopped in its tracks by a snowdrift. By morning, the millionaire Samuel Edward Ratchett lies dead in his compartment, stabbed a dozen times, his door locked from the inside. Without a shred of doubt, one of his fellow passengers is the murderer.",
    category: "Mystery",
    tags: ["Detective", "Classic", "Crime"],
    bestSeller: false,
    inStock: true,
    featured: false
  },
  {
    id: "book10",
    title: "The Handmaid's Tale",
    author: authors[9],
    price: 13.99,
    originalPrice: 16.99,
    coverImage: "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 1982,
    description: "The Handmaid's Tale is a novel of such power that the reader will be unable to forget its images and its forecast. Set in a near-future New England, in a totalitarian state resembling a fundamentalist theocracy that has overthrown the United States government.",
    category: "Science Fiction",
    tags: ["Dystopian", "Feminist", "Speculative Fiction"],
    bestSeller: true,
    inStock: true,
    featured: true
  }
];

// Cart related functions
export interface CartItem {
  book: Book;
  quantity: number;
}

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
