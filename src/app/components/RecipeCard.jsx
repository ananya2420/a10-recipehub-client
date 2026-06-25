"use client";
import { Pagination } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// 1. You receive these as props from the parent
const RecipeCard = ({ recipe,  itemsPerPage = 10, totalPages = 10 }) => {
  
  // 2. REMOVED the local const declarations that were causing the error.
  const [page,setPage]=useState(1);

  // const totalItems=recipe.length;
  // const itemsPerPage=10;
  // const totalPages=Math.ceil(totalItems/itemsPerPage);

  const getPageNumbers=()=>{
    const pages=[1,2,3,4,5,6,7,8];
    return pages;
  }
  const startItem=1;
  const endItem=totalItems;

  
  if (!recipe) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full bg-gray-100">
        {recipe.image ? (
          <Image
            src={recipe.image}
            alt={recipe.title || "Recipe"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>

      <Pagination className="justify-center">
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
              <Pagination.PreviousIcon />
              <span>Previous</span>
            </Pagination.Previous>
          </Pagination.Item>
          {Array.from({length: totalPages || 1}, (_, i) => i + 1).map((p) => (
            <Pagination.Item key={p}>
              <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                {p}
              </Pagination.Link>
            </Pagination.Item>
          ))}
          <Pagination.Item>
            <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
              <span>Next</span>
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {recipe.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {recipe.description}
        </p>
        <div className="flex justify-between items-center mb-3">
          <div className="text-2xl font-bold text-blue-600">${recipe.price}</div>
          <div className="text-sm text-gray-500">Stock: {recipe.quantity}</div>
        </div>
        <Link href={`/recips/${recipe._id}`}>
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;