"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getAllRecips } from "@/lib/api/recipe";

//import SearchRecipe from "../../components/SearchRecipe";
import RecipeCard from "../components/RecipeCard";
import SearchRecipe from "../components/SearchRecipe";
import CategoryFilter from "../components/CategoryFilter";

export default function RecipsPage() {
  const [recips, setRecips] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Pass the entire query string to the helper
        const data = await getAllRecips("", "", searchParams.toString());
        setRecips(data || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchRecipe />
      <CategoryFilter />
      {loading ? <div>Loading...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recips.map((r) => <RecipeCard key={r._id} recipe={r} />)}
        </div>
      )}
    </div>
  );
}