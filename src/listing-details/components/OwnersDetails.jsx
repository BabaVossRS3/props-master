import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/clerk-react'
import { Separator } from '@radix-ui/react-select';
import React from 'react'

const OwnersDetails = ({productDetail}) => {

  const {user}=useUser();

  return (
    <div className='p-10 border rounded-xl shadow-md mt-7'>
        <h2 className="text-2xl mb-5">Πωλητής</h2>
        <div className="flex gap-5">
            <img src={productDetail?.userImageUrl} className='w-[70px] h-[70px] rounded-full' alt="" />
            <div className="">
                <h2 className='mt-2 font-medium text-xl text-[#242424]'>{productDetail?.ownerName}</h2>
                <h2 className="text-gray-400">{productDetail?.createdBy}</h2>
            </div>
        </div>
        <Separator/>
        <div className="flex gap-10 mt-5 items-center">
          <h2 className='text-2xl'>Τηλέφωνο:</h2>
          <h2 className="font-medium text-xl ">
            <a href={`tel:+${productDetail?.ownerTel}`} className="text-[#242424] hover:scale-105 hover:text-[#E78430] transition-all  no-underline">
              {productDetail?.ownerTel}
            </a>
          </h2>
        </div>
    </div>
  )
}

export default OwnersDetails
