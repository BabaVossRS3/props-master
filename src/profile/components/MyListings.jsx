import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { eq, desc } from 'drizzle-orm';
import { Button } from '@/components/ui/button'
import { db } from './../../../configs'
import { ProductImages, ProductListing } from './../../../configs/schema'
import { useUser } from '@clerk/clerk-react'
import ProductItem from '@/components/ProductItem'
import Service from './../../Shared/Service'
import { IoTrashBin } from "react-icons/io5";
import { AlertDialog } from '@radix-ui/react-alert-dialog';
import DeleteListingButton from '@/AddListing.jsx/components/DeleteListing';


const MyListings = () => {

    const {user} = useUser();
    const [productList,setProductList]=useState([]);
    useEffect(()=>{
        user&&GetUSerProductListing();
    },[user])
    const GetUSerProductListing= async()=>{
        const result = await db.select().from(ProductListing).leftJoin(ProductImages,eq(ProductListing.id,ProductImages.ProductListingId))
        .where(eq(ProductListing.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(ProductListing.id));


        const resp=Service.FormatResult(result);
        console.log(resp)
        setProductList(resp);    
    }

    const handleListingDeleted = (deletedId) => {
        setProductList(productList.filter((item) => item.id !== deletedId)); // Remove deleted listing from state
      };

  return (
    <div>
      <div className="flex justify-between items-center">
            <h2 className='font-bold text-4xl'>Οι Αγγελίες Μου</h2>
            <Link to={'/addListing'}>
                <Button className='px-14 py-7 text-lg hover:bg-[#f5945c]'>+ Νέα Αγγελία</Button>
            </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-7 gap-5 ">
            {productList.map((item,index)=>(
                <div key={index} className="">
                    <ProductItem className='' product={item}/>
                    <div className="p-2 mt-3 rounded-lg flex justify-between gap-3">
                        <Link to={'/addListing?mode=edit&id='+item.id} className='w-full'>
                            <Button  className='bg-[#f6731b] text-white font-light w-full'>
                                Επεξεργασία
                            </Button>
                        </Link>
                        {/* <Button variant="destructive" className=' text-white font-light'>
                            <IoTrashBin /> 
                        </Button> */}
                        <DeleteListingButton
                            listingId={item.id}
                            onDeleted={handleListingDeleted} // Pass the callback to update UI after deletion
                        />
                        
                    </div>
                </div>  
            ))}
        </div>
    </div>
  )
}

export default MyListings
