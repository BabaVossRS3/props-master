import { Separator } from '@radix-ui/react-select'
import React from 'react'

const Description = ({productDetail}) => {
  return (
    <div className='p-6 mt-6 rounded-xl bg-white shadow-md border-orange-200 border-[1px]'>
      {productDetail?.listingdescription?<div className="">
        <h2 className='text-2xl'>Περιγραφή</h2>
        <Separator className='w-1 p-2'/>
        <p className='text-[#242424] text-[17px]'>{productDetail?.listingdescription}</p>
      </div>:
      <div className="w-full h-[100px] mt-7 bg-orange-100 animate-pulse">

      </div>}
    </div>
  )
}

export default Description
