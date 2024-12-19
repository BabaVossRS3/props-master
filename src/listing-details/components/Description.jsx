import React from 'react'

const Description = ({productDetail}) => {
  return (
    <div className='p-5 rounded-xl bg-white shadow-md'>
      <p>{productDetail.listingdescription}</p>
    </div>
  )
}

export default Description
