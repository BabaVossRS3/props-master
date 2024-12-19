import { Content } from '@radix-ui/react-select';
import { storage } from './../../../configs/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { ProductImages, ProductListing } from './../../../configs/schema';
import { db } from './../../../configs';
import { useToast } from "@/hooks/use-toast"
import { eq } from 'drizzle-orm';



const UploadImages = ({triggerUploadImages,setLoader,productInfo,mode}) => {

    const [EditProductImageList,setEditProductImageList] = useState([]);
    const [selectedFileList,setSelectedFileList] = useState([]);

    useEffect(() =>{
        if(mode=='edit'){
            setEditProductImageList
            productInfo?.images.forEach((image)=>{
                setEditProductImageList(prev=>[...prev,image?.imageUrl])
            })
        }
    },[productInfo]);

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

    const onImageRemoveFromDB = async (image,index)=>{
        const result = await db.delete(ProductImages).where(eq(ProductImages.id,productInfo?.images[index]?.id)).returning({id:ProductImages.id});

        const imageList = EditProductImageList.filter(item=>item!=image);
        setEditProductImageList(imageList);
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

        {mode =='edit'&&
            EditProductImageList.map((image,index)=>(
                <div key={index} className="">
                    <IoMdCloseCircle className='absolute m-2 text-lg cursor-pointer text-orange-500' onClick={()=>onImageRemoveFromDB(image,index)}/>
                    <img src={image} className='w-full h-[130px] object-cover rounded-xl' alt="" />
                </div>
            ))
        }

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


// const UploadImages = ({ triggerUploadImages, setLoader }) => {
//   const [selectedFileList, setSelectedFileList] = useState([]);
//   const { toast } = useToast()

//   useEffect(() => {
//     if (triggerUploadImages) {
//       UploadImageToServer();
//     }
//   }, [triggerUploadImages]);

//   const onFileSelected = (event) => {
//     const files = event.target.files;

//     for (let i = 0; i < files?.length; i++) {
//       const file = files[i];

//       // Check if the file size exceeds 5MB (5 * 1024 * 1024 = 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         // If the file size exceeds 5MB, show a toaster notification
//         toast({
//             variant: "destructive",
//             title: "Κάτι Πήγε Στραβά",
//             description: "Μια απο τις εικόνες/α ειναι μεγαλύτερη απο 5mb",
//           })
//       } else {
//         // If the file size is acceptable, add it to the selected file list
//         setSelectedFileList((prev) => [...prev, file]);
//       }
//     }
//   };

//   const onImageRemove = (image, index) => {
//     const result = selectedFileList.filter((item) => item !== image);
//     setSelectedFileList(result);
//   };

//   const UploadImageToServer = async () => {
//     setLoader(true);
//     await selectedFileList.forEach((file) => {
//       const fileName = Date.now() + '.jpeg';
//       const storageRef = ref(storage, fileName);
//       const metaData = {
//         contentType: 'image/jpeg',
//       };
//       uploadBytes(storageRef, file, metaData).then((snapShot) => {
//         console.log('Uploaded File');
//       }).then(() => {
//         getDownloadURL(storageRef).then(async (downloadUrl) => {
//           console.log(downloadUrl);
//           await db.insert(ProductImages).values({
//             imageUrl: downloadUrl,
//             ProductListingId: triggerUploadImages,
//           });
//         });
//       });
//       setLoader(false);
//     });
//   };

//   return (
//     <div>
//       <h2 className='font-medium text-xl my-3'>Εικόνες Προϊόντος</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
//         {selectedFileList.map((image, index) => (
//           <div key={index} className="">
//             <IoMdCloseCircle className='absolute m-2 text-lg cursor-pointer text-orange-500' onClick={() => onImageRemove(image, index)} />
//             <img src={URL.createObjectURL(image)} className='w-full h-[130px] object-cover rounded-xl' alt="" />
//           </div>
//         ))}
//         <label htmlFor="upload-images">
//           <div className="cursor-pointer hover:scale-105 hover:transition-all border rounded-xl border-dotted border-orange-500 bg-orange-100">
//             <h2 className='text-5xl text-center p-10 opacity-55 text-orange-500'>+</h2>
//           </div>
//         </label>
//         <input type="file" multiple={true} id='upload-images' className='opacity-0' onChange={onFileSelected} />
//       </div>
//     </div>
//   );
// };

// export default UploadImages;

