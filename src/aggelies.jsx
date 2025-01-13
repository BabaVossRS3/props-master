

// import React, { useState, useEffect, useContext } from 'react';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import { CategoriesList } from './Shared/Data'; // Assuming CategoriesList exists
// import { db } from './../configs'; // Assuming db is configured
// import Service from '@/Shared/Service'; // Assuming Service has FormatResult method
// import { ProductListing, ProductImages } from './../configs/schema'; // Assuming ProductListing exists
// import { eq } from 'drizzle-orm';
// import ProductItemAggelies from './components/ProductItemAggelies';
// import { CategoryContext } from './components/CategoriesContext'; // Assuming you have context for the category


// const Aggelies = () => {
//   const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
//   const [productList, setProductList] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Set the default category to the first category in the list
//   useEffect(() => {
//     if (!selectedCategory && CategoriesList.length > 0) {
//       setSelectedCategory(CategoriesList[0].name); // Default to the first category
//     }
//   }, [selectedCategory, setSelectedCategory]);

//   // Fetch products whenever the selected category changes
//   useEffect(() => {
//     if (selectedCategory) {
//       fetchProducts(selectedCategory);
//     }
//   }, [selectedCategory]);

//   const fetchProducts = async (category) => {
//     const result = await db
//       .select()
//       .from(ProductListing)
//       .innerJoin(ProductImages, eq(ProductListing.id, ProductImages.ProductListingId))
//       .where(eq(ProductListing.category, category));

//     const formattedResult = Service.FormatResult(result);
//     setProductList(formattedResult);
//   };

//   // Close the sidebar when a category is clicked
//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category.name);
//     setSidebarOpen(false); // Close sidebar
//   };

//   return (
//     <div className="aggelies-container">
//       <Header />
//       <div className="aggelies-main-content">
//         {/* Mobile Sidebar Toggle Button */}
//         <button
//           className="mobile-sidebar-toggle"
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//         >
//           ☰ Κατηγορίες
//         </button>

//         {/* Sidebar */}
//         <div className={`aggelies-sidebar ${sidebarOpen ? 'open' : ''}`}>
//           <h2 className="aggelies-sidebar-title">Κατηγορίες</h2>
//           <div className="aggelies-categories-list">
//             {CategoriesList.map((category, index) => (
//               <div
//                 key={index}
//                 className={`aggelies-category-item ${
//                   selectedCategory === category.name ? 'aggelies-selected-category active-category' : ''
//                 }`}
//                 onClick={() => handleCategoryClick(category)} // Call the new handler
//               >
//                 <img
//                   className={`category-images aggelies-category-image ${
//                     selectedCategory === category.name ? 'active-category' : 'text-[#fcc178]'
//                   }`}
//                   src={category.icon}
//                   alt={category.name}
//                 />
//                 <h2 className="aggelies-category-name">{category.name}</h2>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Product Display */}
//         <div className="aggelies-product-display">
//           <h2 className="aggelies-category-title">{selectedCategory}</h2>
//           <div className="aggelies-product-grid">
//             {productList?.length > 0 ? (
//               productList.map((item, index) => (
//                 <div key={index}>
//                   <ProductItemAggelies product={item} />
//                 </div>
//               ))
//             ) : (
//               [1, 2, 3, 4].map((item, index) => (
//                 <div key={index} className="aggelies-placeholder"></div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Aggelies;

import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { CategoriesList } from './Shared/Data';
import { db } from './../configs';
import Service from '@/Shared/Service';
import { ProductListing, ProductImages } from './../configs/schema';
import { eq, and, sql } from 'drizzle-orm';
import ProductItemAggelies from './components/ProductItemAggelies';
import { CategoryContext } from './components/CategoriesContext';

const Aggelies = () => {
  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
  const [searchParams] = useSearchParams();
  const [productList, setProductList] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get filters from URL
  const categoryFromUrl = searchParams.get('category');
  const typeoflist = searchParams.get('typeoflist');
  const price = searchParams.get('price');

  useEffect(() => {
    // Set category from URL parameters if available, otherwise use context
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else if (!selectedCategory && CategoriesList.length > 0) {
      setSelectedCategory(CategoriesList[0].name);
    }
  }, [categoryFromUrl, selectedCategory, setSelectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      fetchProducts();
    }
  }, [selectedCategory, typeoflist, price]);

  const fetchProducts = async () => {
    try {
      let conditions = [eq(ProductListing.category, selectedCategory)];

      // Add typeoflist filter
      if (typeoflist) {
        conditions.push(eq(ProductListing.typeoflist, typeoflist));
      }

      // Add price filter
      if (price) {
        const priceRange = price.split('-');
        const minPrice = priceRange[0] ? parseInt(priceRange[0].trim()) : null;
        const maxPrice = priceRange[1] ? parseInt(priceRange[1].trim().replace('€', '').trim()) : null;

        if (minPrice !== null && maxPrice !== null) {
          conditions.push(sql`CAST(${ProductListing.sellingPrice} AS INTEGER) BETWEEN ${minPrice} AND ${maxPrice}`);
        } else if (minPrice !== null) {
          conditions.push(sql`CAST(${ProductListing.sellingPrice} AS INTEGER) >= ${minPrice}`);
        } else if (maxPrice !== null) {
          conditions.push(sql`CAST(${ProductListing.sellingPrice} AS INTEGER) <= ${maxPrice}`);
        }
      }

      const result = await db
        .select()
        .from(ProductListing)
        .innerJoin(ProductImages, eq(ProductListing.id, ProductImages.ProductListingId))
        .where(and(...conditions));

      const formattedResult = Service.FormatResult(result);
      setProductList(formattedResult);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    setSidebarOpen(false);
  };

  return (
    <div className="aggelies-container">
      <Header />
      <div className="aggelies-main-content">
        <button
          className="mobile-sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰ Κατηγορίες
        </button>

        <div className={`aggelies-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <h2 className="aggelies-sidebar-title">Κατηγορίες</h2>
          <div className="aggelies-categories-list">
            {CategoriesList.map((category, index) => (
              <div
                key={index}
                className={`aggelies-category-item ${
                  selectedCategory === category.name ? 'aggelies-selected-category active-category' : ''
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <img
                  className={`category-images aggelies-category-image ${
                    selectedCategory === category.name ? 'active-category' : 'text-[#fcc178]'
                  }`}
                  src={category.icon}
                  alt={category.name}
                />
                <h2 className="aggelies-category-name">{category.name}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="aggelies-product-display">
          <h2 className="aggelies-category-title">
            {selectedCategory}
            {(typeoflist || price) && ' - Φιλτραρισμένα αποτελέσματα'}
          </h2>
          <div className="aggelies-product-grid">
            {productList?.length > 0 ? (
              productList.map((item, index) => (
                <div key={index}>
                  <ProductItemAggelies product={item} />
                </div>
              ))
            ) : (
              [1, 2, 3, 4].map((item, index) => (
                <div key={index} className="aggelies-placeholder"></div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Aggelies;