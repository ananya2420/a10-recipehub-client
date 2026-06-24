'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Salad', 'Fast Food', 'Pasta'];

const CategoryFilter = () => {
  const pathname = usePathname();
  const activeCategory = pathname.includes('/recips/category/') 
    ? pathname.split('/recips/category/')[1]?.split('/')[0] 
    : null;

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/recips/category/${cat}`}
          className={`px-4 py-2 rounded-full border transition ${
            decodeURIComponent(activeCategory) === cat 
            ? 'bg-blue-600 text-white border-blue-600' 
            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
          }`}
        >
          {cat}
        </Link>
      ))}
      <Link href="/recips" className="px-4 py-2 text-gray-500 underline">Clear</Link>
    </div>
  );
};

export default CategoryFilter;