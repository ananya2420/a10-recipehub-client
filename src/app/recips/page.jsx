import { getAllRecips } from "@/lib/api/recipe";
import RecipeCard from "../components/RecipeCard";
import SearchRecipe from "../components/SearchRecipe";
import CategoryFilter from "../components/CategoryFilter";

export default async function RecipsPage({ searchParams }) {
  const params = await searchParams;
  const search = params?.search || "";
  const category = params?.category || "";

  const recips = await getAllRecips(search, category);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-green-800 mb-2 text-center">
        The Gallery
      </h1>
      <p className="text-green-600 text-center mb-8 italic">
        Explore the complete collection of documented recipes.
      </p>

      <div className="text-center mb-6">
        <SearchRecipe />
      </div>

      <CategoryFilter />

      {recips && recips.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recips.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-green-200 rounded-lg">
          <p className="text-green-500 text-lg">No recipes found for this filter.</p>
        </div>
      )}
    </div>
  );
}