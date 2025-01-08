
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

//   return (
//     <div className='mb-10'>
//       <Header />
//       <div className="flex">
//               {/* Sidebar */}
//         <div className="">
//                 <h2 className="font-light text-4xl mt-10 mb-10">Κατηγορίες</h2>
//           <div className="w-full p-6 border-r h-screen overflow-y-auto">
//             {CategoriesList.map((category, index) => (
//               <div
//                 key={index}
//                 className={`border flex gap-3 rounded p-3 mb-4 cursor-pointer hover:bg-orange-200 hover:text-black hover:scale-110 transition-all ${
//                   selectedCategory === category.name ? 'bg-orange-200 text-[#242424]' : ''
//                 }`}
//                 onClick={() => setSelectedCategory(category.name)}
//               >
//                 <img className="category-images" src={category.icon} width={35} height={30} alt={category.name} />
//                 <h2 className="mt-2 text-sm">{category.name}</h2>
//               </div>
//             ))}
//           </div>
//         </div>
        


//         {/* Product Display */}
//         <div className="p-10 w-3/4">
//           <h2 className="font-light text-4xl pb-6">
//             {selectedCategory}
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-7">
//             {productList?.length > 0 ? (
//               productList.map((item, index) => (
//                 <div key={index}>
//                   <ProductItemAggelies product={item} />
//                 </div>
//               ))
//             ) : (
//               [1, 2, 3, 4].map((item, index) => (
//                 <div
//                   key={index}
//                   className="h-[400px] lg:grid-cols-4 rounded-xl bg-slate-200 animate-pulse w-[300px]"
//                 ></div>
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
import Header from './components/Header';
import Footer from './components/Footer';
import { CategoriesList } from './Shared/Data'; // Assuming CategoriesList exists
import { db } from './../configs'; // Assuming db is configured
import Service from '@/Shared/Service'; // Assuming Service has FormatResult method
import { ProductListing, ProductImages } from './../configs/schema'; // Assuming ProductListing exists
import { eq } from 'drizzle-orm';
import ProductItemAggelies from './components/ProductItemAggelies';
import { CategoryContext } from './components/CategoriesContext'; // Assuming you have context for the category


const Aggelies = () => {
  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
  const [productList, setProductList] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Set the default category to the first category in the list
  useEffect(() => {
    if (!selectedCategory && CategoriesList.length > 0) {
      setSelectedCategory(CategoriesList[0].name); // Default to the first category
    }
  }, [selectedCategory, setSelectedCategory]);

  // Fetch products whenever the selected category changes
  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchProducts = async (category) => {
    const result = await db
      .select()
      .from(ProductListing)
      .innerJoin(ProductImages, eq(ProductListing.id, ProductImages.ProductListingId))
      .where(eq(ProductListing.category, category));

    const formattedResult = Service.FormatResult(result);
    setProductList(formattedResult);
  };

  // Close the sidebar when a category is clicked
  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    setSidebarOpen(false); // Close sidebar
  };

  return (
    <div className="aggelies-container">
      <Header />
      <div className="aggelies-main-content">
        {/* Mobile Sidebar Toggle Button */}
        <button
          className="mobile-sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰ Κατηγορίες
        </button>

        {/* Sidebar */}
        <div className={`aggelies-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <h2 className="aggelies-sidebar-title">Κατηγορίες</h2>
          <div className="aggelies-categories-list">
            {CategoriesList.map((category, index) => (
              <div
                key={index}
                className={`aggelies-category-item ${
                  selectedCategory === category.name ? 'aggelies-selected-category active-category' : ''
                }`}
                onClick={() => handleCategoryClick(category)} // Call the new handler
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

        {/* Product Display */}
        <div className="aggelies-product-display">
          <h2 className="aggelies-category-title">{selectedCategory}</h2>
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
