import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import DetailHeader from '../components/detailHeader'
import { useParams } from 'react-router-dom'
import { ProductImages, ProductListing } from './../../../configs/schema'
import { eq } from 'drizzle-orm'
import Service from '@/Shared/Service'
import { db } from './../../../configs'
import ImageGallery from '../components/ImageGallery'
import  Description  from '../components/Description'

const ListingDetail = () => {
// kartela proiontos
    const {id}=useParams();
    console.log(id);
    const [productDetail,setProductDetail] = useState();

    useEffect(()=>{
        GetProductDetail();
    },[]);

    const GetProductDetail= async()=>{
        const result = await db.select().from(ProductListing).innerJoin(ProductImages,eq(ProductListing.id,ProductImages.ProductListingId)).where(eq(ProductListing.id,id));
    
        const resp = Service.FormatResult(result)
        setProductDetail(resp[0])
    }

  return (
    <div>
      <Header/>

      <div className="p-20 md:px-20 text-[#e38434] font-light">
        <DetailHeader productDetail={productDetail}/>

        <div className="grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5">

            {/* left */}
            <div className="md:col-span-2 ">
                {/* image */}
                <ImageGallery productDetail={productDetail}/>
                {/* description */}
                <Description productDetail={productDetail}/>
            </div>
            {/* right */}
            <div className="md:grid-cols-1">
                {/* pricing */}

                {/* properties */}

                {/* stoixeia idiwth */}
            </div>
        </div>

      </div>
      {/* Header Detail Component */}

    </div>
  )
}

export default ListingDetail
