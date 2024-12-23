
import Service from '@/Shared/Service';
import { ProductImages, ProductListing } from './../../configs/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { db } from './../../configs';
import Header from '@/components/Header';
import Search from '@/components/Search';
import ProductItem from '@/components/ProductItem';
import { Separator } from '@radix-ui/react-select';
import Footer from '@/components/Footer';
import { sql } from 'drizzle-orm';
// anazhthsh mesw search bar 
const SearchByOptions = () => {

    const [searchParam] = useSearchParams();
    const [productList,setProductList] = useState([]);
    const category = searchParam.get('category');
    const typeoflist = searchParam.get('typeoflist');
    const price = searchParam.get('price');

    useEffect(()=>{
        GetProductList();
    },[category,typeoflist,price])

    // const GetProductList=async()=>{
    //     const result = await db.select().from(ProductListing).innerJoin(ProductImages,eq(ProductListing.id,ProductImages.ProductListingId))
    //     .where(category!=undefined&&eq(ProductListing.category,category))
    //     .where(typeoflist!=undefined&&eq(ProductListing.typeoflist,typeoflist))
    //     // .where(price!=undefined&&eq(ProductListing.sellingPrice,price))

    //     const resp = Service.FormatResult(result);
    //     console.log(resp);
    //     setProductList(resp);
    // }

    const GetProductList = async () => {
      // Start the query with the initial select and join
      let query = db
          .select()
          .from(ProductListing)
          .innerJoin(ProductImages, eq(ProductListing.id, ProductImages.ProductListingId));
  
      // Debugging: Check the query structure before applying filters
      console.log('Initial Query:', query);
  
      // Apply category filter (if present)
      if (category) {
          console.log('Category Filter Applied:', category);
          query = query.where(eq(ProductListing.category, category));  // Apply category filter
      }
  
      // Apply typeoflist filter (if present)
      if (typeoflist) {
          console.log('Type of List Filter Applied:', typeoflist);
          query = query.where(eq(ProductListing.typeoflist, typeoflist));  // Apply typeoflist filter
      }
  
      // Apply price filter (if present)
      if (price) {
          const priceRange = price.split('-');
          const minPrice = priceRange[0] ? parseInt(priceRange[0].trim()) : null;
          const maxPrice = priceRange[1] ? parseInt(priceRange[1].trim().replace('€', '').trim()) : null;
  
          console.log('Price Range:', priceRange);
  
          if (minPrice !== null && maxPrice !== null) {
              query = query.where(sql`CAST(${ProductListing.sellingPrice} AS INTEGER) BETWEEN ${minPrice} AND ${maxPrice}`);
              console.log('Price Filter Applied: Range', minPrice, 'to', maxPrice);
          } else if (minPrice !== null) {
              query = query.where(sql`CAST(${ProductListing.sellingPrice} AS INTEGER) >= ${minPrice}`);
              console.log('Price Filter Applied: Min Price >=', minPrice);
          } else if (maxPrice !== null) {
              query = query.where(sql`CAST(${ProductListing.sellingPrice} AS INTEGER) <= ${maxPrice}`);
              console.log('Price Filter Applied: Max Price <=', maxPrice);
          }
      }
  
      // Debugging: Check the query after applying all filters
      console.log('Final Query:', query);
  
      // Execute the query
      try {
          const result = await query;
  
          // Debugging: Log the query result before filtering invalid prices
          console.log('Query Result:', result);
  
          // Filter out any invalid sellingPrice entries
          const validResult = result.filter(item => {
              const sellingPrice = item?.ProductListing?.sellingPrice;
  
              if (sellingPrice) {
                  const match = sellingPrice.match(/(\d+)/);
  
                  if (match && match[0]) {
                      const parsedPrice = parseInt(match[0]);
                      return !isNaN(parsedPrice);
                  }
              }
  
              return false;
          });
  
          // Debugging: Log the filtered valid result
          console.log('Filtered Result:', validResult);
  
          // Format the result and set the product list
          const resp = Service.FormatResult(validResult);
          setProductList(resp);
      } catch (error) {
          console.error('Error executing query:', error);
      }
  };
  
  return (
    <div>
      <Header/>

      <div className="p-16 bg-[#e38434] flex justify-center">
        <Search/>
      </div>
      <div className="p-10 md:pt-20">
      <h2 className="font-light text-4xl pb-6">
        {category && category.trim() ? category : 'Αποτελέσματα'}
      </h2>

        <Separator className='flex justify-center h-[1px] w-1/3 ml-10 bg-gradient-to-r from-transparent via-[#e38434] to-transparent)' />
        {/* lista kathgoriwn */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10 mt-7">
          {productList?.length>0? productList.map((item,index)=>(
            <div key={`${item.id}-${index}`}>
              <ProductItem product={item}/>
            </div>
          )):
            [1,2,3,4].map((item,index)=>(
              <div key={`${item.id}-${index}`} className="h-[400px] rounded-xl bg-slate-200 animate-pulse">

              </div>
            ))
          }
        </div>
      </div>
      <Footer/>
    </div>

    
  )
}

export default SearchByOptions

