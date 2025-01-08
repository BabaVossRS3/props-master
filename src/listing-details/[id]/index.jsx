// import Header from '@/components/Header'
// import React, { useEffect, useState } from 'react'
// import DetailHeader from '../components/detailHeader'
// import { useParams } from 'react-router-dom'
// import { ProductImages, ProductListing } from './../../../configs/schema'
// import { eq } from 'drizzle-orm'
// import Service from '@/Shared/Service'
// import { db } from './../../../configs'
// import ImageGallery from '../components/ImageGallery'
// import  Description  from '../components/Description'
// import Pricing from '../components/Pricing'
// import Specification from '../components/Specification'
// import OwnersDetails from '../components/OwnersDetails'
// import Footer from '@/components/Footer'
// import MostSearched from '@/components/MostSearched'
// const ListingDetail = () => {
// // kartela proiontos
//     const {id}=useParams();
//     const [productDetail,setProductDetail] = useState();

//     useEffect(()=>{
//         GetProductDetail();
//         window.scrollTo(0, 0);  // Scrolls to the top of the page when the component loads
//     },[]);

//     const GetProductDetail= async()=>{
//         const result = await db.select().from(ProductListing).innerJoin(ProductImages,eq(ProductListing.id,ProductImages.ProductListingId)).where(eq(ProductListing.id,id));
    
//         const resp = Service.FormatResult(result)
//         setProductDetail(resp[0])
//     }

//   return (
//     <div>
//       <Header/>

//       <div className="p-20 md:px-20 text-[#e38434] font-light">
//         <DetailHeader productDetail={productDetail}/>

//         <div className="grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5">

//             {/* left */}
//             <div className="md:col-span-2 ">
//                 {/* image */}
//                 <ImageGallery productDetail={productDetail}/>
//                 {/* description */}
//                 <Description productDetail={productDetail}/>
//             </div>
//             {/* right */}
//             <div className="md:grid-cols-1">
//                 {/* pricing */}
//                 <Pricing productDetail={productDetail}/>
//                 {/* properties */}
//                 <Specification productDetail={productDetail}/>
//                 {/* stoixeia idiwth */}
//                 <OwnersDetails productDetail={productDetail}/>
//             </div>
//         </div>
//       <MostSearched/>
//       </div>
//       {/* Header Detail Component */}
//       <Footer/>
//     </div>
//   )
// }

// export default ListingDetail
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import DetailHeader from '../components/detailHeader';
import { useParams } from 'react-router-dom';
import { ProductImages, ProductListing } from './../../../configs/schema';
import { eq } from 'drizzle-orm';
import Service from '@/Shared/Service';
import { db } from './../../../configs';
import ImageGallery from '../components/ImageGallery';
import Description from '../components/Description';
import Pricing from '../components/Pricing';
import Specification from '../components/Specification';
import OwnersDetails from '../components/OwnersDetails';
import Footer from '@/components/Footer';
import MostSearched from '@/components/MostSearched';


const ListingDetail = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState();

  useEffect(() => {
    GetProductDetail();
    window.scrollTo(0, 0);
  }, [id]);

  const GetProductDetail = async () => {
    const result = await db
      .select()
      .from(ProductListing)
      .innerJoin(ProductImages, eq(ProductListing.id, ProductImages.ProductListingId))
      .where(eq(ProductListing.id, id));

    const resp = Service.FormatResult(result);
    setProductDetail(resp[0]);
  };

  return (
    <>
    <Header />
    <div className="listingDetails-container">
      
      <div className="listingDetails-content">
        <DetailHeader productDetail={productDetail} />
        <div className="listingDetails-grid">
          {/* Left Section */}
          <div className="listingDetails-left">
            <ImageGallery productDetail={productDetail} />
            <Description productDetail={productDetail} />
          </div>
          {/* Right Section */}
          <div className="listingDetails-right">
            <Pricing productDetail={productDetail} />
            <Specification productDetail={productDetail} />
            <OwnersDetails productDetail={productDetail} />
          </div>
        </div>
        <MostSearched />
      </div>
      
    </div>
    <Footer />
    </>
    
  );
};

export default ListingDetail;