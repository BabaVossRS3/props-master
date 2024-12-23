
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

    const GetProductList=async()=>{
        const result = await db.select().from(ProductListing).innerJoin(ProductImages,eq(ProductListing.id,ProductImages.ProductListingId))
        .where(category!=undefined&&eq(ProductListing.category,category))
        .where(typeoflist!=undefined&&eq(ProductListing.typeoflist,typeoflist))
        // .where(price!=undefined&&eq(ProductListing.sellingPrice,price))

        const resp = Service.FormatResult(result);
        console.log(resp);
        setProductList(resp);
    }

  return (
    <div>
      <Header/>

      <div className="p-16 bg-[#e38434] flex justify-center">
        <Search/>
      </div>
      <div className="p-10 md:pt-20">
      <h2 className="font-light text-4xl pb-6">
        {category && category.trim() ? category : 'Αποτελεσματα'}
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

