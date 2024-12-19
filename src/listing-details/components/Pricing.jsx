import { Button } from '@/components/ui/button'
import React from 'react'
import { FaMessage } from "react-icons/fa6";


const Pricing = ({productDetail}) => {
  return (
    <div className='p-10 rounded-xl border shadow-md '>
        {productDetail ? (
    <>
        <h2 className="text-3xl">Τιμή</h2>
        <h2 className="text-[#242424] text-4xl pt-4 w-full font-bold ">
            {productDetail.sellingPrice} €
        </h2>
        <Button size="lg" className="hover:scale-105 hover:bg-[#e38434] transition-all font-roboto mt-4 w-full">
            Στείλε Μήνυμα <FaMessage />
        </Button>
    </>
) : (
    <div className="w-full h-[200px] rounded-xl bg-orange-100 animate-pulse"></div>
)}

    </div>
  )
}

export default Pricing
