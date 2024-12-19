import React from 'react'

const ImageGallery = ({productDetail}) => {
  return (
    <div>
      <img src={productDetail?.images[0].imageUrl} className='w-full object-cover h-[500px] rounded-xl' alt="" />
    </div>
  )
}

export default ImageGallery
