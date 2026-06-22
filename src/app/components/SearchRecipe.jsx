"use client";
import { Button, Input } from "@heroui/react";
import { redirect } from "next/navigation";

const SearchRecipe = () => {
  const onSubmit = (e) => {
    e.preventDefault();

    redirect(`/recips?search=${e.target.search.value}`);
  };
  return (
    <div>
     <form onSubmit={onSubmit}>
  <Input name="search" type="search" placeholder="Search recipe" />
  <Button 
    type="submit" 
    size="sm" 
    className="ml-2 bg-green-600 hover:bg-green-700 text-white"
  >
    Search
  </Button>
</form>
    </div>
  );
};

export default SearchRecipe;