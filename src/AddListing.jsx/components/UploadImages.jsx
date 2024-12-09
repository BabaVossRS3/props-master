import { Content } from '@radix-ui/react-select';
import { storage } from './../../../configs/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { ProductImages, ProductListing } from './../../../configs/schema';
import { db } from './../../../configs';


const UploadImages = ({triggerUploadImages,setLoader}) => {

    const [selectedFileList,setSelectedFileList] = useState([]);

    useEffect(()=>{

        if(triggerUploadImages){
            UploadImageToServer();
        }

    },[triggerUploadImages])

    const onFileSelected = (event) =>{
        const files=event.target.files;

        for(let i=0; i<files?.length;i++){
            const file=files[i];
            setSelectedFileList((prev)=>[...prev,file])
        }
    }

    const onImageRemove = (image,index) =>{
        const result =selectedFileList.filter((item)=>item!=image);
        setSelectedFileList(result);
    }

    const UploadImageToServer=async()=>{
        setLoader(true);
        await selectedFileList.forEach((file)=>{
            const fileName=Date.now()+'.jpeg';
            const storageRef=ref(storage,fileName);
            const metaData={
                contentType:'image/jpeg'
            }
            uploadBytes(storageRef,file,metaData).then((snapShot)=>{
                console.log('Uploaded File');
            }).then(resp=>{
                getDownloadURL(storageRef).then(async(downloadUrl)=>{
                    console.log(downloadUrl);
                    await db.insert(ProductImages).values({
                        imageUrl:downloadUrl,
                        ProductListingId:triggerUploadImages
                    })

                })
            });
            setLoader(false);
        })
    }


  return (
    <div>
       <h2 className='font-medium text-xl my-3'>Εικόνες Προϊόντος</h2> 
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {selectedFileList.map((image,index)=>(
            <div key={index} className="">
                <IoMdCloseCircle className='absolute m-2 text-lg cursor-pointer text-orange-500' onClick={()=>onImageRemove(image,index)}/>
                <img src={URL.createObjectURL(image)} className='w-full h-[130px] object-cover rounded-xl' alt="" />
            </div>
        ))}
        <label htmlFor="upload-images">
            <div className="cursor-pointer hover:scale-105 hover:transition-all border rounded-xl border-dotted border-orange-500 bg-orange-100">
                <h2 className='text-5xl text-center p-10 opacity-55 text-orange-500'>+</h2>
            </div>
        </label>
        <input type="file" multiple={true} id='upload-images' className='opacity-0' onChange={onFileSelected} />
      </div>
    </div>
  )
}

export default UploadImages
