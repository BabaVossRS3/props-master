import React, { useEffect, useState } from 'react'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { db } from './../../configs'
import ProductItem from './ProductItem'
import { ProductImages, ProductListing } from './../../configs/schema'
import { eq , desc } from 'drizzle-orm'
import Service from '@/Shared/Service'


const MostSearched = () => {

    const[productList,setProductList] = useState([]);

    useEffect(()=>{
        GetPopularProductList();
    },[])

    const GetPopularProductList= async()=>{
        const result = await db.select().from(ProductListing).leftJoin(ProductImages,eq(ProductListing.id,ProductImages.ProductListingId))
                .orderBy(desc(ProductListing.id)).limit(80);
                //where.boostUser   (vazodas allo ena filtro tote 8a mpainoun mono boost users)
                // exw valei pros to paronn sto apo panw thn lista me ta items tou xrhsth
                // prpeei omws na boune items apo boost 
                const resp=Service.FormatResult(result);
                setProductList(resp);
    }

    return (
        <div className='bg-white z-50 mx-4 sm:mx-24 mb-10 sm:mb-20'>
        <h2 className='font-light text-3xl text-center my-8 sm:my-16 text-[#B6A28E]'>
          Δημοφιλής Αναζητήσεις
        </h2>
  
        <Carousel className='relative mb-10 sm:mb-20'>
          <CarouselContent className='p-4 sm:p-10'>
            {productList.map((item, index) => (
              //  Adjust how many items to show in the carousel based on screen size
              <CarouselItem key={index} className={`w-full 
                sm:basis-full 
                md:basis-1/2 
                lg:basis-1/3`}>
                <ProductItem product={item} key={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Position arrows correctly for mobile */}
          <CarouselPrevious className="absolute top-1/2 left-4 sm:left-8 transform -translate-y-1/2 z-10" />
          <CarouselNext className="absolute top-1/2 right-4 sm:right-8 transform -translate-y-1/2 z-10" />
        </Carousel>
      </div>
    );
};

export default MostSearched;

