"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react'; // Added useEffect
import { LuHeart, LuClock, LuChefHat } from 'react-icons/lu';

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Beverages", "Pasta", "Pizza", "Seafood", "Noodles", "Fast Food", "Salad"];

export default function BrowseRecipesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [recipes, setRecipes] = useState([]); // State to hold recipes

  // Generate recipes only once on the client side
  useEffect(() => {
    const generatedRecipes = Array.from({ length: 32 }, (_, i) => ({
      id: i + 1,
      title: `Recipe Title ${i + 1}`,
      category: categories[(i % (categories.length - 1)) + 1],
      image: `/assets/food_${i + 1}.png`,
      price: (Math.random() * (20 - 5) + 5).toFixed(2),
      time: "30 min"
    }));
    setRecipes(generatedRecipes);
  }, []);

  const filteredRecipes = selectedCategory === "All" 
    ? recipes 
    : recipes.filter(recipe => recipe.category === selectedCategory);

  if (recipes.length === 0) return null; // Avoid rendering until data is ready

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-20">
       <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">The Gallery</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Explore the complete collection of documented recipes.</p>

        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition-all ${
                selectedCategory === cat 
                  ? "bg-gray-900 text-white border-gray-900" 
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredRecipes.map((recipe) => (
            <Link href={`/recipe/${recipe.id}`} key={recipe.id} className="block group">
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                  <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-black/50 backdrop-blur rounded-full text-gray-600 dark:text-white hover:text-red-500 transition-colors">
                    <LuHeart size={20} />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-md">
                      {recipe.category}
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">${recipe.price}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{recipe.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-1"><LuClock size={16} /> {recipe.time}</div>
                    <div className="flex items-center gap-1"><LuChefHat size={16} /> Easy</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}