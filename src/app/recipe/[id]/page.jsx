"use client";
import React, { use, useEffect, useState } from 'react';
import { LuHeart, LuFlag, LuShoppingBag, LuBookmark, LuCheck } from 'react-icons/lu';
import Link from 'next/link';

export default function RecipeDetailsPage({ params }) {
  // Unwrap the params promise using React.use()
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // This simulates fetching data for the specific ID
    setRecipe({
      id: id,
      title: `Recipe Title ${id}`, 
      category: "Fast Food",
      cuisine: "Mexican",
      difficulty: "Easy",
      time: "20 min",
      author: "Mehedi Hasan",
      image: `/assets/food_${id}.png`,
      description: "A delicious and authentic recipe with fresh ingredients.",
      ingredients: ["Tortilla", "Beef", "Lettuce", "Salsa", "Cheese"]
    });
  }, [id]);

  if (!recipe) return <div className="p-20 text-center">Loading recipe...</div>;

  return (
    <main className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/browse" className="text-gray-500 hover:text-black mb-8 block">
          ← Back to Gallery
        </Link>

        {/* Dynamic Image */}
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-96 object-cover rounded-3xl mb-8"
        />

        {/* Title and Metadata */}
        <h1 className="text-5xl font-bold text-gray-900 mb-6">{recipe.title}</h1>
        
        <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-600">
          <span className="bg-gray-100 px-4 py-1 rounded-full">{recipe.category}</span>
          <span className="bg-gray-100 px-4 py-1 rounded-full">{recipe.cuisine}</span>
          <span className="bg-gray-100 px-4 py-1 rounded-full">{recipe.difficulty}</span>
          <span className="bg-gray-100 px-4 py-1 rounded-full">{recipe.time}</span>
        </div>

        {/* Author Section */}
        <div className="flex items-center gap-4 py-6 border-y border-gray-100 mb-8">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold">
            {recipe.author[0]}
          </div>
          <div>
            <p className="font-bold">{recipe.author}</p>
            <p className="text-sm text-gray-500">Author</p>
          </div>
        </div>

        {/* Ingredients Section */}
        <h2 className="text-2xl font-bold mb-6">Ingredients</h2>
        <div className="space-y-4 mb-12">
          {recipe.ingredients.map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-gray-700">
           <LuCheck className="text-green-600" />
           {item}
</div>
          ))}
        </div>

        {/* Actions Section */}
        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm mt-12">
          <h3 className="text-sm font-bold text-black uppercase tracking-widest mb-6">Actions</h3>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 py-3 border text-black border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <LuHeart /> Like (119)
            </button>
            
            <button className="w-full flex items-center justify-center gap-2 py-3 text-black border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <LuBookmark /> Save to Favorites
            </button>
            
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition font-semibold">
              <LuShoppingBag /> Purchase Details
            </button>
            
            <button className="w-full flex items-center justify-center gap-2 py-3 text-black hover:text-red-600 transition text-sm">
              <LuFlag size={16} /> Report Issue
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}