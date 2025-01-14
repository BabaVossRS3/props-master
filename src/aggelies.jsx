import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { CategoriesList } from './Shared/Data';
import { db } from './../configs';
import Service from '@/Shared/Service';
import { ProductListing, ProductImages } from './../configs/schema';
import { eq, and, sql } from 'drizzle-orm';
import ProductItemAggelies from './components/ProductItemAggelies';
import { CategoryContext } from './components/CategoriesContext';
import { IoMenuOutline, IoCloseOutline, IoFilterOutline } from "react-icons/io5";

const Aggelies = () => {
  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Add navigate hook
  const [productList, setProductList] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Get filters from URL and setup state
  const categoryFromUrl = searchParams.get('category');
  const typeoflist = searchParams.get('typeoflist');
  const price = searchParams.get('price');

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else if (!selectedCategory && CategoriesList.length > 0) {
      setSelectedCategory(CategoriesList[0].name);
    }
  }, [categoryFromUrl, selectedCategory, setSelectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      fetchProducts().finally(() => setLoading(false));
    }
  }, [selectedCategory, typeoflist, price]);

  const getPlanPriority = (plan) => {
    const priorities = { 'Boost+': 3, 'Boost': 2, 'Basic': 1 };
    return priorities[plan] || 1;
  };

  const fetchProducts = async () => {
    try {
      let conditions = [eq(ProductListing.category, selectedCategory)];

      if (typeoflist) {
        conditions.push(eq(ProductListing.typeoflist, typeoflist));
      }

      if (price) {
        const [minPrice, maxPrice] = price.split('-').map(p => 
          p ? parseInt(p.replace('€', '').trim()) : null
        );

        if (minPrice && maxPrice) {
          conditions.push(sql`CAST(${ProductListing.sellingPrice} AS INTEGER) BETWEEN ${minPrice} AND ${maxPrice}`);
        } else if (minPrice) {
          conditions.push(sql`CAST(${ProductListing.sellingPrice} AS INTEGER) >= ${minPrice}`);
        } else if (maxPrice) {
          conditions.push(sql`CAST(${ProductListing.sellingPrice} AS INTEGER) <= ${maxPrice}`);
        }
      }

      const result = await db
        .select()
        .from(ProductListing)
        .innerJoin(ProductImages, eq(ProductListing.id, ProductImages.ProductListingId))
        .where(and(...conditions));

      const formattedResult = Service.FormatResult(result);
      const sortedProducts = formattedResult.sort((a, b) => 
        getPlanPriority(b.userPlan) - getPlanPriority(a.userPlan)
      );

      setProductList(sortedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const renderBadges = (product) => {
    const planBadgeStyles = {
      'Boost+': 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 font-dancing-script font-bold',
      'Boost': 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 font-inter',
      'Basic': 'hidden'
    };

    return (
      <>
        <h2 className="bg-orange-500 px-3 py-1 rounded-full text-sm font-medium text-white shadow-sm">
          {product?.typeoflist === 'Αγορά' ? 'Πώληση' : 'Ενοικίαση'}
        </h2>
        
        {product?.userPlan && product.userPlan !== 'Basic' && (
          <h2 className={`${planBadgeStyles[product.userPlan]} px-3 py-1 rounded-full text-sm font-medium text-white shadow-sm`}>
            {product.userPlan}
          </h2>
        )}
      </>
    );
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    setSidebarOpen(false);

    // Create a new URLSearchParams with current parameters
    const newSearchParams = new URLSearchParams(searchParams);
    // Update the category parameter
    newSearchParams.set('category', category.name);
    
    // Navigate to the new URL while preserving other parameters
    navigate(`/aggelies?${newSearchParams.toString()}`);
  };

  return (
    <div className="aggelies-container">
      <Header />
      
      <button
        className="mobile-sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <IoCloseOutline size={20} /> : <IoMenuOutline size={20} />}
        <span>Κατηγορίες</span>
      </button>

      <div className="aggelies-main-content">
        {/* Sidebar */}
        <aside className={`aggelies-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <h2 className="aggelies-sidebar-title">
            <IoFilterOutline className="inline-block mr-2" />
            Κατηγορίες
          </h2>
          <div className="aggelies-categories-list">
            {CategoriesList.map((category, index) => (
              <div
                key={index}
                className={`aggelies-category-item ${
                  selectedCategory === category.name ? 'aggelies-selected-category' : ''
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <img
                  className={`aggelies-category-image ${
                    selectedCategory === category.name ? 'active-category' : ''
                  }`}
                  src={category.icon}
                  alt={category.name}
                />
                <h2 className="aggelies-category-name">{category.name}</h2>
              </div>
            ))}
          </div>
        </aside>

        {/* Product Display */}
        <main className="aggelies-product-display">
          <h2 className="aggelies-category-title">
            {selectedCategory}
            {(typeoflist || price) && 
              <span className="text-sm font-normal text-gray-500 ml-2">
                (Φιλτραρισμένα αποτελέσματα)
              </span>
            }
          </h2>

          <div className="aggelies-product-grid">
            {loading ? (
              Array(8).fill(null).map((_, index) => (
                <div key={index} className="aggelies-placeholder animate-pulse" />
              ))
            ) : productList?.length > 0 ? (
              productList.map((item, index) => (
                <div key={index} className="transform transition-transform duration-200 hover:translate-y-[-4px]">
                  <ProductItemAggelies product={item} badges={renderBadges(item)} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                Δεν βρέθηκαν προϊόντα σε αυτήν την κατηγορία
              </div>
            )}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Aggelies;