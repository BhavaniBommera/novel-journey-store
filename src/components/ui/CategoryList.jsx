
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/data";

/**
 * A list of categories displayed either as a grid or as flexible items
 * @param {Object} props - Component props
 * @param {string} props.layout - Layout style ('grid' or 'flex')
 * @param {string} props.className - Additional CSS classes
 */
const CategoryList = ({ layout = "grid", className }) => {
  return (
    <div
      className={cn(
        layout === "grid"
          ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
          : "flex flex-wrap gap-2",
        className
      )}
    >
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/category/${category.slug}`}
          className={cn(
            "transition-all duration-300 animate-fade-in",
            layout === "grid"
              ? "relative overflow-hidden rounded-lg aspect-square flex items-center justify-center group"
              : "px-4 py-2 rounded-full border border-border bg-white hover:bg-primary hover:text-primary-foreground hover:border-primary"
          )}
          style={
            layout === "grid"
              ? {
                  animationDelay: `${parseInt(category.id.replace("cat", "")) * 50}ms`,
                }
              : undefined
          }
        >
          {layout === "grid" ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/0 group-hover:from-black/60 transition-all duration-300" />
              <div className="relative z-10 text-center">
                <h3 className="text-white font-display text-xl md:text-2xl drop-shadow-md">
                  {category.name}
                </h3>
              </div>
            </>
          ) : (
            <span className="text-sm font-medium">{category.name}</span>
          )}
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
