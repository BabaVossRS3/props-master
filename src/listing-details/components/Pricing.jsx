import { Button } from '@/components/ui/button'
import React from 'react'
import { FaMessage } from "react-icons/fa6";


const Pricing = ({productDetail}) => {
    console.log(productDetail?.negotiable); // Add this for debugging

  return (
    <div className='p-10 rounded-xl border shadow-md '>
        {productDetail ? (
    <>
        <h2 className="text-3xl">Τιμή</h2>
        <h2 className="text-[#242424] text-4xl pt-4 w-full font-bold">
            {productDetail.sellingPrice} €
            {productDetail?.typeoflist === 'Ενοικίαση' && (
                <span className="text-gray-500 text-lg font-light"> /μέρα</span>
            )}
        </h2>


        {productDetail.negotiable === "Nαί" && (
            <h2 className="text-xl text-gray-400 pt-4">Συζητήσιμη</h2>
        )}

    </>
) : (
    <div className="w-full h-[200px] rounded-xl bg-orange-100 animate-pulse"></div>
)}

    </div>
  )
}

export default Pricing
