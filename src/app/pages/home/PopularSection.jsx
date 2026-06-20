import React from 'react';


async function getPopularRecipes() {
 
  return [
    { id: 1, name: "Pasta Alfredo", likes: 89, author: "Fahim" },
    { id: 2, name: "Butter Chicken", likes: 185, author: "Nusrat" },
    { id: 3, name: "Beef Tehari", likes: 312, author: "Tanvir" },
    { id: 4, name: "Chicken Biryani", likes: 240, author: "Jannat" },
    { id: 5, name: "Grilled Salmon", likes: 150, author: "Alex" },
    { id: 6, name: "Vegetable Stir Fry", likes: 95, author: "Mei" },
  ];
}

export const PopularSection = async () => {
  const recipes = await getPopularRecipes();
  
  // Sort dynamic data by likes
  const popularRecipes = recipes.sort((a, b) => b.likes - a.likes).slice(0, 4);

  return (
    <section className="w-full py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {popularRecipes.map((recipe) => (
          <div key={recipe.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:border-green-500 transition-colors">
            <h3 className="font-semibold text-gray-800 mb-2">{recipe.name}</h3>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">by {recipe.author}</span>
              <div className="flex items-center text-green-600 font-bold">
                <span className="mr-1">♥</span>
                {recipe.likes}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};