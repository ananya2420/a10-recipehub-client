"use client";
import { useState, useRef } from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useRecipes } from "@/app/context/RecipeContext";

export default function AddRecipeForm() {
  const router = useRouter();
  const { addRecipe } = useRecipes();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Breakfast",
    difficulty: "Easy",
    cuisine: "",
    prepTime: "",
    ingredients: "",
    instructions: "",
    image: ""
  });

  const inputStyle = "w-full rounded-xl border border-black bg-white p-3 text-black outline-none transition-colors focus:border-green-600 placeholder-black dark:border-white dark:bg-white dark:text-black";
  
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`, { method: 'POST', body: formData });
      const data = await response.json();
      if (data.success) setFormData(prev => ({...prev, image: data.data.url}));
    } catch (err) { alert("Upload failed"); } finally { setIsUploading(false); }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRecipe(formData);
    alert("Recipe added successfully!");
    router.push("/dashboard/recipes");
  };

  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-black bg-white p-8 dark:border-white dark:bg-white">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-black">Add New Recipe +</h1>
        <p className="text-black">Share your culinary creation with the community</p>
      </header>
      
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-8 bg-white border border-black rounded-2xl">
      <input className={inputStyle} placeholder="Recipe Name*" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
      
      <div className="relative">
        <input className={inputStyle} value={formData.image} placeholder="Image URL" onChange={(e) => setFormData({...formData, image: e.target.value})} />
        <button type="button" onClick={() => fileInputRef.current.click()} className="absolute right-3 top-3 text-green-600 font-bold">
          {isUploading ? "Uploading..." : "Upload"}
        </button>
        <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <select className={inputStyle} value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
          <option>Breakfast</option><option>Lunch</option><option>Dinner</option>
        </select>
        <input className={inputStyle} placeholder="Cuisine" value={formData.cuisine} onChange={(e) => setFormData({...formData, cuisine: e.target.value})} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <select className={inputStyle} value={formData.difficulty} onChange={(e) => setFormData({...formData, difficulty: e.target.value})}>
          <option>Easy</option><option>Medium</option><option>Hard</option>
        </select>
        <input className={inputStyle} placeholder="Prep Time" value={formData.prepTime} onChange={(e) => setFormData({...formData, prepTime: e.target.value})} />
      </div>
      

      <textarea className={inputStyle} rows={4} placeholder="Ingredients" value={formData.ingredients} onChange={(e) => setFormData({...formData, ingredients: e.target.value})} />
      <textarea className={inputStyle} rows={4} placeholder="Instructions" value={formData.instructions} onChange={(e) => setFormData({...formData, instructions: e.target.value})} />

      <Button type="submit" className="w-full bg-green-600 text-white font-bold">Publish Recipe</Button>
    </form>
    </div>
  );
}