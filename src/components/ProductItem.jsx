import { Separator } from '@radix-ui/react-select'
import React from 'react'
import { MdOutlineCategory } from "react-icons/md";
import { MdOutlineSafetyCheck } from "react-icons/md";
import { ImPriceTags } from "react-icons/im";
import { IoLocationOutline } from "react-icons/io5";



const ProductItem = ({item}) => {
  return (
    <div className='hover:scale-105 transition-all shadow-sm'>
        <img src={item?.image} width={300} height={250} className='rounded-t-xl' />
        <div className="p-4">
            <h2 className='font-bold text-#242424 text-lg mb-2'>{item?.name}</h2>
            <Separator className='border-t-2'/>
            <div className="grid grid-cols-3 pt-5 pb-5">
                <div className="flex flex-col items-center">
                    <MdOutlineCategory className='text-l' />
                    <h2 className='text-center'>Κατηγορία</h2>
                </div>
                <div className="flex flex-col items-center">
                    <MdOutlineSafetyCheck className='text-l' />
                    <h2 className='text-center'>Χρονολογία</h2>
                </div>
                <div className="flex flex-col items-center">
                <IoLocationOutline className='text-l' />
                    <h2 className='text-center'>Περιοχή</h2>
                </div>
            </div>
            <Separator className='border-t-2'/>
            <div className="flex justify-around m-3">
                <h2 className='text-center p-3'>{item.price}</h2>
                <h2 className=' p-3 bg-orange-500 rounded text-white'>Δείτε Περισσότερα</h2>
            </div>
        </div>
    </div>
  )
}

export default ProductItem
