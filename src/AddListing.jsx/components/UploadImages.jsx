import { Content } from '@radix-ui/react-select';
import { storage } from './../../../configs/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { ProductImages, ProductListing } from './../../../configs/schema';
import { db } from './../../../configs';
import { useToast } from "@/hooks/use-toast"
import { eq } from 'drizzle-orm';



// const UploadImages = ({plan,triggerUploadImages,setLoader,productInfo,mode}) => {

//     const [EditProductImageList,setEditProductImageList] = useState([]);
//     const [selectedFileList,setSelectedFileList] = useState([]);

//     useEffect(() =>{
//         if(mode=='edit'){
//             setEditProductImageList
//             productInfo?.images.forEach((image)=>{
//                 setEditProductImageList(prev=>[...prev,image?.imageUrl])
//             })
//         }
//     },[productInfo]);

//     useEffect(()=>{

//         if(triggerUploadImages){
//             UploadImageToServer();
//         }

//     },[triggerUploadImages])

//     const onFileSelected = (event) =>{
//         const files=event.target.files;

//         for(let i=0; i<files?.length;i++){
//             const file=files[i];
//             setSelectedFileList((prev)=>[...prev,file])
//         }
//     }

//     const onImageRemove = (image,index) =>{
//         const result =selectedFileList.filter((item)=>item!=image);
//         setSelectedFileList(result);
//     }

//     const onImageRemoveFromDB = async (image,index)=>{
//         const result = await db.delete(ProductImages).where(eq(ProductImages.id,productInfo?.images[index]?.id)).returning({id:ProductImages.id});

//         const imageList = EditProductImageList.filter(item=>item!=image);
//         setEditProductImageList(imageList);
//     }

//     const UploadImageToServer=async()=>{
//         setLoader(true);
//         await selectedFileList.forEach((file)=>{
//             const fileName=Date.now()+'.jpeg';
//             const storageRef=ref(storage,fileName);
//             const metaData={
//                 contentType:'image/jpeg'
//             }
//             uploadBytes(storageRef,file,metaData).then((snapShot)=>{
//                 console.log('Uploaded File');
//             }).then(resp=>{
//                 getDownloadURL(storageRef).then(async(downloadUrl)=>{
//                     console.log(downloadUrl);
//                     await db.insert(ProductImages).values({
//                         imageUrl:downloadUrl,
//                         ProductListingId:triggerUploadImages
//                     })

//                 })
//             });
//             setLoader(false);
//         })
//     }


//   return (
//     <div>
//        <h2 className='font-medium text-xl my-3'>Εικόνες Προϊόντος</h2> 
//       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">

//         {mode =='edit'&&
//             EditProductImageList.map((image,index)=>(
//                 <div key={index} className="">
//                     <IoMdCloseCircle className='absolute m-2 text-lg cursor-pointer text-orange-500' onClick={()=>onImageRemoveFromDB(image,index)}/>
//                     <img src={image} className='w-full h-[130px] object-cover rounded-xl' alt="" />
//                 </div>
//             ))
//         }

//         {selectedFileList.map((image,index)=>(
//             <div key={index} className="">
//                 <IoMdCloseCircle className='absolute m-2 text-lg cursor-pointer text-orange-500' onClick={()=>onImageRemove(image,index)}/>
//                 <img src={URL.createObjectURL(image)} className='w-full h-[130px] object-cover rounded-xl' alt="" />
//             </div>
//         ))}
//         <label htmlFor="upload-images">
//             <div className="cursor-pointer hover:scale-105 hover:transition-all border rounded-xl border-dotted border-orange-500 bg-orange-100">
//                 <h2 className='text-5xl text-center p-10 opacity-55 text-orange-500'>+</h2>
//             </div>
//         </label>
//         <input type="file" multiple={true} id='upload-images' className='opacity-0' onChange={onFileSelected} />
//       </div>
//     </div>
//   )
// }

// export default UploadImages


const UploadImages = ({ plan, triggerUploadImages, setLoader, productInfo, mode }) => {
    const [EditProductImageList, setEditProductImageList] = useState([]);
    const [selectedFileList, setSelectedFileList] = useState([]);
    const { toast } = useToast();

    useEffect(() => {
        if (mode === 'edit') {
            setEditProductImageList([]);
            productInfo?.images.forEach((image) => {
                setEditProductImageList((prev) => [...prev, image?.imageUrl]);
            });
        }
    }, [productInfo]);

    useEffect(() => {
        if (triggerUploadImages) {
            UploadImageToServer();
        }
    }, [triggerUploadImages]);

    const onFileSelected = async (event) => {
        const files = event.target.files;

        // Handle Basic Plan restrictions
        if (plan === "Basic" && files.length > 3) {
            toast({
                variant: "destructive",
                title: "Υπέρβαση Ορίων Πλάνου Basic.",
                description: "Μπορείτε να Ανεβάσετε εως 3 Φωτογραφίες ανά αγγελία.",
            });
            return;
        }

        // Handle Boost Plan restrictions
        if (plan === "Boost" && files.length > 5) {
            toast({
                variant: "destructive",
                title: "Υπέρβαση Ορίων Πλάνου Boost.",
                description: "Μπορείτε να Ανεβάσετε εως 5 Φωτογραφίες ανά αγγελία.",
            });
            return;
        }

        for (let i = 0; i < files?.length; i++) {
            const file = files[i];
            let maxSize = 5 * 1024 * 1024; // 5MB default for Basic
            let maxResolution = 720; // 720p default for Basic

            if (plan === "Boost") {
                maxSize = 8 * 1024 * 1024; // 8MB for Boost
                maxResolution = 1080; // 1080p for Boost
            }

            if (plan === "Boost+") {
                maxSize = 25 * 1024 * 1024; // 8MB for Boost
                maxResolution = 2160; // 1080p for Boost
            }

            // Check file size for both Basic and Boost plans
            if (file.size > maxSize) {
                toast({
                    variant: "destructive",
                    title: `Υπέρβαση Ορίων Πλάνου ${plan}.`,
                    description: `Μπορείτε να Ανεβάσετε Φωτογραφίες μεγέθους έως ${maxSize / (1024 * 1024)}MB.`,
                });
                return;
            }

            // Resize image based on resolution cap for both plans
            const img = new Image();
            const reader = new FileReader();

            reader.onload = (e) => {
                img.onload = () => {
                    // Resize the image
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    const maxWidth = maxResolution === 720 ? 1280 : 1920;
                    const maxHeight = maxResolution === 720 ? 720 : 1080;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    // Create a new file from the resized image
                    canvas.toBlob((blob) => {
                        const resizedFile = new File([blob], file.name, { type: file.type });
                        setSelectedFileList((prev) => [...prev, resizedFile]);
                    }, file.type);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const onImageRemove = (image, index) => {
        const result = selectedFileList.filter((item) => item !== image);
        setSelectedFileList(result);
    };

    const onImageRemoveFromDB = async (image, index) => {
        const result = await db.delete(ProductImages).where(eq(ProductImages.id, productInfo?.images[index]?.id)).returning({ id: ProductImages.id });

        const imageList = EditProductImageList.filter(item => item !== image);
        setEditProductImageList(imageList);
    };

    const UploadImageToServer = async () => {
        setLoader(true);
        await selectedFileList.forEach((file) => {
            const fileName = Date.now() + '.jpeg';
            const storageRef = ref(storage, fileName);
            const metaData = {
                contentType: 'image/jpeg',
            };
            uploadBytes(storageRef, file, metaData).then((snapShot) => {
                console.log('Uploaded File');
            }).then(() => {
                getDownloadURL(storageRef).then(async (downloadUrl) => {
                    console.log(downloadUrl);
                    await db.insert(ProductImages).values({
                        imageUrl: downloadUrl,
                        ProductListingId: triggerUploadImages,
                    });
                });
            });
            setLoader(false);
        });
    };

    return (
        <div>
            <h2 className="font-medium text-xl my-3">Εικόνες Προϊόντος</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                {mode === 'edit' &&
                    EditProductImageList.map((image, index) => (
                        <div key={index} className="">
                            <IoMdCloseCircle className="absolute m-2 text-lg cursor-pointer text-orange-500" onClick={() => onImageRemoveFromDB(image, index)} />
                            <img src={image} className="w-full h-[130px] object-cover rounded-xl" alt="" />
                        </div>
                    ))}

                {selectedFileList.map((image, index) => (
                    <div key={index} className="">
                        <IoMdCloseCircle className="absolute m-2 text-lg cursor-pointer text-orange-500" onClick={() => onImageRemove(image, index)} />
                        <img src={URL.createObjectURL(image)} className="w-full h-[130px] object-cover rounded-xl" alt="" />
                    </div>
                ))}
                <label htmlFor="upload-images">
                    <div className="cursor-pointer hover:scale-105 hover:transition-all border rounded-xl border-dotted border-orange-500 bg-orange-100">
                        <h2 className="text-5xl text-center p-10 opacity-55 text-orange-500">+</h2>
                    </div>
                </label>
                <input type="file" multiple={true} id="upload-images" className="opacity-0" onChange={onFileSelected} />
            </div>
        </div>
    );
};

export default UploadImages;
