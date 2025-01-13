// import Service from '@/Shared/Service';
// import { ProductImages, ProductListing } from './../../configs/schema';
// import { eq, and } from 'drizzle-orm';
// import React, { useEffect, useState } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import { db } from './../../configs';
// import Header from '@/components/Header';
// import Search from '@/components/Search';
// import ProductItem from '@/components/ProductItem';
// import { Separator } from '@radix-ui/react-select';
// import Footer from '@/components/Footer';
// import { sql } from 'drizzle-orm';

// const SearchByOptions = () => {
//     const [searchParam] = useSearchParams();
//     const [productList, setProductList] = useState([]);
//     const category = searchParam.get('category');
//     const typeoflist = searchParam.get('typeoflist');
//     const price = searchParam.get('price');

//     useEffect(() => {
//         GetProductList();
//     }, [category, typeoflist, price])

//     const GetProductList = async () => {
//         try {
//             // Start with base conditions
//             let conditions = [];

//             // Add category filter
//             if (category) {
//                 conditions.push(eq(ProductListing.category, category));
//             }

//             // Add typeoflist filter
//             if (typeoflist) {
//                 conditions.push(eq(ProductListing.typeoflist, typeoflist));
//             }

//             // Add price filter
//             if (price) {
//                 const priceRange = price.split('-');
//                 const minPrice = priceRange[0] ? parseInt(priceRange[0].trim()) : null;
//                 const maxPrice = priceRange[1] ? parseInt(priceRange[1].trim().replace('€', '').trim()) : null;

//                 if (minPrice !== null && maxPrice !== null) {
//                     conditions.push(sql`CAST(${ProductListing.sellingPrice} AS INTEGER) BETWEEN ${minPrice} AND ${maxPrice}`);
//                 } else if (minPrice !== null) {
//                     conditions.push(sql`CAST(${ProductListing.sellingPrice} AS INTEGER) >= ${minPrice}`);
//                 } else if (maxPrice !== null) {
//                     conditions.push(sql`CAST(${ProductListing.sellingPrice} AS INTEGER) <= ${maxPrice}`);
//                 }
//             }

//             // Build and execute query with all conditions
//             const query = db
//                 .select()
//                 .from(ProductListing)
//                 .innerJoin(ProductImages, eq(ProductListing.id, ProductImages.ProductListingId))
//                 .where(conditions.length > 0 ? and(...conditions) : undefined);

//             const result = await query;

//             // Filter out invalid sellingPrice entries
//             const validResult = result.filter(item => {
//                 const sellingPrice = item?.ProductListing?.sellingPrice;
//                 if (sellingPrice) {
//                     const match = sellingPrice.match(/(\d+)/);
//                     if (match && match[0]) {
//                         const parsedPrice = parseInt(match[0]);
//                         return !isNaN(parsedPrice);
//                     }
//                 }
//                 return false;
//             });

//             // Format the result and set the product list
//             const formattedResult = Service.FormatResult(validResult);
//             setProductList(formattedResult);
//         } catch (error) {
//             console.error('Error executing query:', error);
//         }
//     };

//     return (
//         <div>
//             <Header />
//             <div className="p-16 search-options flex justify-center">
//                 <Search />
//             </div>
//             <div className="p-10 md:pt-20">
//                 <h2 className="font-light text-4xl pb-6">
//                     {category && category.trim() ? category : 'Αποτελέσματα'}
//                 </h2>
//                 <Separator className='flex justify-center h-[1px] w-1/3 ml-10 bg-gradient-to-r from-transparent via-[#e38434] to-transparent)' />
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10 mt-7">
//                     {productList?.length > 0 ? productList.map((item, index) => (
//                         <div key={`${item.id}-${index}`}>
//                             <ProductItem product={item} />
//                         </div>
//                     )) :
//                         [1, 2, 3, 4].map((item, index) => (
//                             <div key={`${item.id}-${index}`} className="h-[400px] rounded-xl bg-slate-200 animate-pulse">
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     )
// }

// export default SearchByOptions
import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Header from '@/components/Header';
import Search from '@/components/Search';
import Footer from '@/components/Footer';

const SearchByOptions = () => {
    const [searchParam] = useSearchParams();
    const navigate = useNavigate();
    const category = searchParam.get('category');
    const typeoflist = searchParam.get('typeoflist');
    const price = searchParam.get('price');

    useEffect(() => {
        redirectToAggelies();
    }, [category, typeoflist, price])

    const redirectToAggelies = () => {
        // Construct the base URL
        let url = '/aggelies';

        // Create an object to store the query parameters
        const queryParams = new URLSearchParams();

        // Add filters to query parameters if they exist
        if (category) {
            queryParams.append('category', category);
        }
        if (typeoflist) {
            queryParams.append('typeoflist', typeoflist);
        }
        if (price) {
            queryParams.append('price', price);
        }

        // Add query parameters to URL if any exist
        const queryString = queryParams.toString();
        if (queryString) {
            url += `?${queryString}`;
        }

        // Navigate to the Aggelies page with the filters
        navigate(url);
    };

    return (
        <div>
            <Header />
            <div className="p-16 search-options flex justify-center">
                <Search />
            </div>
            <Footer />
        </div>
    )
}

export default SearchByOptions