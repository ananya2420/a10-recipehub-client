import React from 'react';

// Data with 6 items
const data = [
  { id: 1, name: "Pasta Alfredo", category: "Pasta", cuisine: "Italian", time: 25, difficulty: "Easy", image: "/assets/food_1.png" },
  { id: 2, name: "Butter Chicken", category: "Main Course", cuisine: "Indian", time: 60, difficulty: "Medium", image: "/assets/food_2.png" },
  { id: 3, name: "Beef Tehari", category: "Main Course", cuisine: "Bangladeshi", time: 120, difficulty: "Hard", image: "/assets/food_3.png" },
  { id: 4, name: "Chicken Biryani", category: "Main Course", cuisine: "Bangladeshi", time: 90, difficulty: "Medium", image: "/assets/food_4.png" },
  { id: 5, name: "Grilled Salmon", category: "Main Course", cuisine: "Mediterranean", time: 45, difficulty: "Medium", image: "/assets/food_5.png" },
  { id: 6, name: "Vegetable Stir Fry", category: "Vegan", cuisine: "Chinese", time: 30, difficulty: "Easy", image: "/assets/food_6.png" },
];

const getDifficultyStyle = (difficulty) => {
  const styles = {
    Easy: 'bg-green-100 text-green-700 border-green-200',
    Medium: 'bg-orange-100 text-orange-700 border-orange-200',
    Hard: 'bg-red-100 text-red-700 border-red-200',
  };
  return styles[difficulty] || 'bg-gray-100 text-gray-700 border-gray-200';
};

export const FeaturedSection = () => {
  return (
    <section className="w-full py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((recipe) => (
          <div key={recipe.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300">
            {/* Dynamic Image from public folder */}
            <div className="relative h-48 w-full mb-4 overflow-hidden rounded-xl">
              <img 
                src={recipe.image} 
                alt={recipe.name} 
                className="w-full h-full object-cover"
              />
              {/* Updated Featured tag to Green */}
              <span className="absolute top-2 right-2 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                Featured
              </span>
            </div>

            {/* Updated Category text to Green */}
            <span className="text-[10px] font-semibold uppercase tracking-wider text-green-600">
              {recipe.category}
            </span>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{recipe.name}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {recipe.cuisine} • {recipe.time} mins
            </p>

            <div className="mt-auto">
              <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border ${getDifficultyStyle(recipe.difficulty)}`}>
                {recipe.difficulty}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};