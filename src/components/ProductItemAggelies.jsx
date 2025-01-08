// import { Separator } from '@radix-ui/react-select';
// import React from 'react';
// import { MdOutlineCategory } from "react-icons/md";
// import { MdOutlineSafetyCheck } from "react-icons/md";
// import { IoLocationOutline } from "react-icons/io5";
// import { IoOpenOutline } from "react-icons/io5";
// import { Link } from 'react-router-dom';

// const ProductItemAggelies = ({ product }) => {    

//     return (
//       <Link to={'/listing-details/'+product?.id}>
//           <div className="product-item">  {/* flex-row only for medium and up screens (desktop) */}
          
//           {/* Sale/Rent Badge */}
//           <h2 className='absolute m-4 bg-orange-500 px-2 rounded-full text-sm pb-1 text-white'>
//                   {product?.typeoflist === 'Αγορά' ? 'Πώληση' : 'Ενοικίαση'}
//           </h2>
          
//           {/* Image */}
//           <img src={product?.images[0]?.imageUrl} width={'100%'} height={250} className='rounded-t-xl sm:rounded-t-xl h-[250px] object-cover md:w-[250px] md:h-auto' />
          
//           <div className="p-4 flex-1">
//               {/* Listing Title */}
//               <h2 className='font-bold text-[#242424] text-lg mb-2'>{product?.listingTitle}</h2>
//               <Separator className='border-t-2'/>
              
//               <div className="content grid grid-cols-3 pt-5 pb-5 h-[170px] sm:h-auto sm:grid-cols-1 sm:space-y-4">
//                   {/* Category */}
//                   <div className="flex flex-col items-center">
//                       <MdOutlineCategory className='text-l mb-2' />
//                       <h2 className='text-center'>
//                           <span className='border-b border-solid pb-3'>Κατηγορία</span>
//                           <br/><br/>{product?.category || 'Άγνωστη Κατηγορία'}
//                       </h2>
//                   </div>
//                   {/* Year */}
//                   <div className="flex flex-col items-center">
//                       <MdOutlineSafetyCheck className='text-l mb-2' />
//                       <h2 className='text-center'>
//                           <span className='border-b border-solid pb-3'>Χρονολογία</span>
//                           <br/><br/>{product?.year}
//                       </h2>
//                   </div>
//                   {/* Address */}
//                   <div className="flex flex-col items-center">
//                       <IoLocationOutline className='text-l mb-2' />
//                       <h2 className='text-center'>
//                           <span className='border-b border-solid pb-3'>Περιοχή</span>
//                           <br/><br/>{product?.addressPosted}
//                       </h2>
//                   </div>
//               </div>
//               <Separator className='border-t-2 my-2'/>
              
//               <div className="flex justify-between sm:justify-start m-3 items-center">
//                   {/* Price */}
//                   <h2 className="text-center p-3">
//                       {product?.sellingPrice || 'Τιμή Μη Διαθέσιμη'}
//                       {product?.typeoflist === 'Ενοικίαση' && '€ /μέρα'}
//                       {product?.typeoflist !== 'Ενοικίαση' && '€'}
//                   </h2>
                  
//                   {/* See More Button */}
//                   <h2 className='p-2 bg-orange-500 rounded text-white flex gap-1 items-center text-sm cursor-pointer hover:scale-105 transition-all'>      
//                       Δείτε Περισσότερα <IoOpenOutline className='mx-1'/>
//                   </h2>
//               </div>
//           </div>
//       </div>
//       </Link>
//     );
//   }
  
//   export default ProductItemAggelies;
import { Separator } from '@radix-ui/react-select';
import React from 'react';
import { MdOutlineCategory } from "react-icons/md";
import { MdOutlineSafetyCheck } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const ProductItemAggelies = ({ product }) => {    

    return (
      <Link to={'/listing-details/'+product?.id}>
        <div className="product-item-aggelies"> 
          
          {/* Sale/Rent Badge */}
          <h2 className='polisi-enoikiash absolute m-4 bg-orange-500 px-2 rounded-full text-sm pb-1 text-white'>
                  {product?.typeoflist === 'Αγορά' ? 'Πώληση' : 'Ενοικίαση'}
          </h2>
          
          {/* Image */}
          <img src={product?.images[0]?.imageUrl}/>
          
          <div className="right-side-aggelies">
              {/* Listing Title */}
              <h2 className='title-h2'>{product?.listingTitle}</h2>
              <Separator className='border-t-2'/>
              
              <div className="content">
                  {/* Category */}
                  <div className="content-category">
                      <MdOutlineCategory className='text-l mb-2' />
                      <h2 className='text-center'>
                          <span className='border-b border-solid pb-3'>Κατηγορία</span>
                          <br/><br/>{product?.category || 'Άγνωστη Κατηγορία'}
                      </h2>
                  </div>
                  {/* Year */}
                  <div className="content-category">
                      <MdOutlineSafetyCheck className='text-l mb-2' />
                      <h2 className='text-center'>
                          <span className='border-b border-solid pb-3'>Χρονολογία</span>
                          <br/><br/>{product?.year}
                      </h2>
                  </div>
                  {/* Address */}
                  <div className="content-category">
                      <IoLocationOutline className='text-l mb-2' />
                      <h2 className='text-center'>
                          <span className='border-b border-solid pb-3'>Περιοχή</span>
                          <br/><br/>{product?.addressPosted}
                      </h2>
                  </div>
              </div>
              <Separator className='border-t-2 my-2'/>
              
              <div className="button-div-price-aggelies gap-10">
                  {/* Price */}
                  <h2 className="text-center text-[#242424] p-3">
                      {product?.sellingPrice || 'Τιμή Μη Διαθέσιμη'}
                      {product?.typeoflist === 'Ενοικίαση' && '€ /μέρα'}
                      {product?.typeoflist !== 'Ενοικίαση' && '€'}
                  </h2>
                  
                  {/* See More Button */}
                  <h2 className='p-2 bg-orange-500 rounded text-white flex gap-1 items-center text-sm cursor-pointer hover:scale-105 transition-all'>      
                      Δείτε Περισσότερα <IoOpenOutline className='mx-1'/>
                  </h2>
              </div>
          </div>
      </div>
      </Link>
    );
  }
  
  export default ProductItemAggelies;
  