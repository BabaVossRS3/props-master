import IconField from '@/AddListing.jsx/components/IconField'
import ProductSpecification from '@/Shared/ProductSpecification'
import React from 'react'

const Specification = ({productDetail}) => {
    console.log(productDetail)
  return (
    <div className='p-10 rounded-xl border shadow-md mt-7'>
        <h2 className='text-2xl mb-5'>Προδιαγραφές</h2>
        {productDetail? ProductSpecification.map((item,index)=>(
            <div key={index} className="mt-2 flex items-center justify-between">
               
                <h2 className='flex gap-3 m-3 text-[#242424]'><IconField icon={item?.icon}/> {item.label}</h2>
                <h2 className="w-full text-right ">{productDetail?.[item?.name]}</h2>
            </div>
        )):
        <div className="w-full h-[500px] rounded-xl bg-orange-100 animate-pulse"></div>
        }
    </div>
  )
}

export default Specification
