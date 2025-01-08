import { Separator } from '@radix-ui/react-select'
import React from 'react'
import { PiHammer } from "react-icons/pi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { SiMaterialformkdocs } from "react-icons/si";
import { IoIosColorFill } from "react-icons/io";






const DetailHeader = ({ productDetail }) => {
    return (
      <div className=''>
        {productDetail?.listingTitle ? (
          <div className="">
            <h2 className="listing-title-detail-header text-4xl font-bold">{productDetail?.listingTitle}</h2>
            <Separator className="flex justify-center h-[1px] w-1/3 mt-3 bg-gradient-to-r from-transparent via-[#e38434] to-transparent" />
  
            <div className="flex gap-2 mt-3 detail-header-container">
              <div className="flex gap-2 items-center p-1 px-3 bg-orange-100 rounded-full mt-3 text-primary">
                <MdOutlineCalendarMonth className="h-7 w-7" />
                <h2 className="text-primary">{productDetail?.year}</h2>
              </div>
              <div className="flex gap-2 items-center p-1 px-3 bg-orange-100 rounded-full mt-3 text-primary">
                <PiHammer className="h-7 w-7" />
                <h2 className="text-primary">{productDetail?.condition}</h2>
              </div>
              <div className="flex gap-2 items-center p-1 px-3 bg-orange-100 rounded-full mt-3 text-primary">
                <SiMaterialformkdocs className="h-7 w-7" />
                <h2 className="text-primary">{productDetail?.material}</h2>
              </div>
              <div className="flex gap-2 items-center p-1 px-3 bg-orange-100 rounded-full mt-3 text-primary">
                <IoIosColorFill className="h-7 w-7" />
                <h2 className="text-primary">{productDetail?.color}</h2>
              </div>
            </div>
          </div>
        ) : (
          // Placeholder for loading state
          <div className="w-full rounded-xl h-[100px] bg-orange-100 animate-pulse"></div>
        )}
      </div>
    );
  };
  
  export default DetailHeader;
