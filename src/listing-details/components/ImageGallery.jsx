// import React from 'react'

// const ImageGallery = ({productDetail}) => {
//   return (
//     <div>
//       <img src={productDetail?.images[0].imageUrl} className='w-full object-cover h-[500px] rounded-xl' alt="" />
//     </div>
//   )
// }

// export default ImageGallery
import React, { useState } from 'react';

const ImageGallery = ({ productDetail }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const images = productDetail?.images || [];

  return (
    <div className="image-gallery flex flex-col md:flex-row  md:items-center gap-4">
      {/* Thumbnail navigation */}
      <div className="thumbnail-container h-full  flex  md:flex-col  gap-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.imageUrl}
            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
              selectedImageIndex === index ? 'border-orange-500' : 'border-gray-300'
            }`}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setSelectedImageIndex(index)}
          />
        ))}
      </div>

      {/* Display the selected image */}
      {images.length > 0 && (
        <img
          src={images[selectedImageIndex]?.imageUrl}
          className="w-full object-cover h-[500px] rounded-xl"
          alt={`Product image ${selectedImageIndex + 1}`}
        />
      )}
    </div>
  );
};

export default ImageGallery;
