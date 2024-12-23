  import Header from '@/components/Header'
  import Search from '@/components/Search'
  import { ProductImages, ProductListing } from './../../../configs/schema'
  import { eq } from 'drizzle-orm'
  import React, { useEffect, useState } from 'react'
  import { useParams } from 'react-router-dom'
  import { db } from './../../../configs'
  import Service from '@/Shared/Service'
  import ProductItem from '@/components/ProductItem'
  import Footer from '@/components/Footer'
  import { Separator } from '@radix-ui/react-select'


  const SearchByCategory = () => {

      const {category}=useParams();
      const [productList,setProductList] = useState([]);

      useEffect(()=>{
          GetProductList();
      },[])

      const GetProductList= async()=>{
          const result = await db.select().from(ProductListing).innerJoin(ProductImages,eq(ProductListing.id,ProductImages.ProductListingId)).where(eq(ProductListing.category,category))

          const resp = Service.FormatResult(result);
          setProductList(resp);
      }

    return (
      <div>
        <Header/>

        <div className="p-16 bg-[#e38434] flex justify-center">
          <Search/>
        </div>
        <div className="p-10 md:pt-20">
          <h2 className='font-light text-4xl pb-6 '>{category}</h2>
          <Separator className='flex justify-center h-[1px] w-1/3 ml-10 bg-gradient-to-r from-transparent via-[#e38434] to-transparent)' />
          {/* lista kathgoriwn */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10 mt-7">
            {productList?.length>0? productList.map((item,index)=>(
              <div key={index}>
                <ProductItem product={item}/>
              </div>
            )):
              [1,2,3,4].map((item,index)=>(
                <div className="h-[400px] rounded-xl bg-slate-200 animate-pulse">

                </div>
              ))
            }
          </div>
        </div>

        <Footer/>
      </div>

      
    )
  }

  export default SearchByCategory
