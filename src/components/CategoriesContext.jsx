import React, { createContext, useState } from 'react';

// Create a Context for category management
export const CategoryContext = createContext();

// Create a Provider component
export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
