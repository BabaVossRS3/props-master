
import React, { useContext } from 'react';
import { CategoriesList } from '@/Shared/Data';
import { Link, useNavigate } from 'react-router-dom';
import { CategoryContext } from './CategoriesContext';

const Category = () => {
  const navigate = useNavigate();
  const { setSelectedCategory } = useContext(CategoryContext); // Use context to manage selected category

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName); // Update the selected category
    navigate('/aggelies'); // Navigate to the /aggelies page
  };

  return (
    <div className="mt-3">
      <h2 className="font-light text-3xl text-center mb-10 text-[#B6A28E]">
        Αναζήτηση Ανά Κατηγορίες
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 px-40">
        {CategoriesList.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category.name)}
            className="border rounded-md p-3 items-center flex flex-col justify-around text-center cursor-pointer hover:shadow-md hover:scale-105 transition-all h-[120px]"
          >
            <img
              src={category.icon}
              width={35}
              height={30}
              className="category-images"
            />
            <h2 className="mt-4 text-sm text-[#493628]">{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;

