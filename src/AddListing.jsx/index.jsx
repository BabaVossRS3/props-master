import Header from '@/components/Header'
import React, { useState } from 'react'
import productDetails from '@/Shared/productDetails.json'
import InputField from './components/InputField'
import DropdownField from './components/DropdownField'
import TextAreaField from './components/TextAreaField'
import { Button } from '@/components/ui/button'
import { db } from './../../configs'
import { ProductListing } from './../../configs/schema'
import IconField from './components/IconField'
import UploadImages from './components/UploadImages'
import { Separator } from '@radix-ui/react-select'
import { BiLoaderAlt } from "react-icons/bi";




const AddListing = () => {

  const [formData,setFormData] = useState([])
  const [triggerUploadImages,setTriggerUploadImages] = useState();
  const [loader,setLoader]=useState(false);


  const handleInputChange=(name,value)=>{
    setFormData((prevData)=>({
      ...prevData,
      [name]:value
    }))

    console.log(formData)
  }

  const onSubmit= async(e)=>{
    setLoader(true);
    e.preventDefault();
    
    try{
      const result= await db.insert(ProductListing).values(formData).returning({id:ProductListing.id});

        if(result){
          console.log("Data Saved")
          setTriggerUploadImages(result[0]?.id);
          setLoader(false);
        }
    }catch(e){
      console.log("Error",e)
    }
  }



  return (
    <div>
      <Header/>
      <div className="px-10 md:px-20 my-10">
        <h2 className='font-bold text-4xl'>Νέα Αγγελία</h2>
        <form className="p-10 border rounded-xl mt-10 ">
            {/* {Στοιχεία Προΐοντος} */}
            <div className="">
                <h2 className='font-md text-xl mb-6 '>Περιγραφή Προΐοντος</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {productDetails.productDetail.map((item,index)=>(
                    <div key={index} className="">
                        <label className='text-sm flex items-center gap-2 mb-2'>
                         <IconField icon={item?.icon}/> {item?.label} {item.required&&<span className='text-red-500'>*</span>}</label>
                        {item.fieldType=='text'|| item.fieldType=='number'?<InputField item={item} handleInputChange={handleInputChange}/>
                        :item.fieldType=='dropdown'?<DropdownField item={item}
                        handleInputChange={handleInputChange}/>
                        :item.fieldType=='textarea'?<TextAreaField item={item}
                        handleInputChange={handleInputChange}/>
                        :item.fieldType=='tel'?<InputField item={item} handleInputChange={handleInputChange}/>
                        :null}
                    </div>
                  ))}
                </div>
            </div>
            {/* Eikones */}
            <Separator className='my-6'/>
            <UploadImages triggerUploadImages={triggerUploadImages}
            // setLoader={(v)=setLoader(v)}
            />
            <div className="mt-10 flex justify-end">
              <Button type='button' disabled={loader} onClick={(e)=> onSubmit(e)} > {!loader?'Ανάρτηση':<BiLoaderAlt className='text-[#fff] animate-spin text-lg' />
              }</Button>
            </div>
        </form>
        
      </div>
    </div>
  )
}

export default AddListing
