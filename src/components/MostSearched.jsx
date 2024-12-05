import React from 'react'
import FakeData from '@/Shared/FakeData'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
  

import ProductItem from './ProductItem'


const MostSearched = () => {
    console.log(FakeData.itemList)
    return (
    
    <div className='mx-24'>
        <h2 className='font-bold text-3xl text-center my-16'>Δημοφιλής Αναζητήσεις</h2>

        <Carousel>
                <CarouselContent>                
                    {FakeData.itemList.map((item,index)=>(
                        //  posa item na deixnei to carousel
                         <CarouselItem className='basis-1/4'>    
                             <ProductItem item={item} key={index}/>                
                        </CarouselItem>
                    ))}
                </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>


    </div>
  )
}

export default MostSearched
