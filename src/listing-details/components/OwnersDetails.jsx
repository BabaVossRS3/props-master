import { Button } from '@/components/ui/button'
import Service from '@/Shared/Service'
import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { FaMessage } from 'react-icons/fa6'

const OwnersDetails = ({productDetail}) => {

  const {user}=useUser();
  const OnMessageOwnerButtonCLick=async()=>{
    //create user id 
    try{
      const userId=user.primaryEmailAddress.emailAddress.split('@')[0];
      await Service.CreateSendBirdUser(userId,user?.fullName,user?.imageUrl)
      .then(resp=>{
        console.log(resp);
      })
    }catch(e){

    }
    //create owner user id 

    //create a channel between them 
  }

  return (
    <div className='p-10 border rounded-xl shadow-md mt-7'>
        <h2 className="text-2xl mb-5">Πωλητής</h2>
        <div className="flex gap-5">
            <img src={productDetail?.userImageUrl} className='w-[70px] h-[70px] rounded-full' alt="" />
            <div className="">
                <h2 className='mt-2 font-medium text-xl text-[#242424]'>{productDetail?.ownerName}</h2>
                <h2 className="text-gray-400">{productDetail?.createdBy}</h2>
            </div>
        </div>

        <Button onClick={OnMessageOwnerButtonCLick} size="lg" className="hover:scale-105 hover:bg-[#e38434] transition-all font-roboto mt-4 w-full">
                    Στείλε Μήνυμα <FaMessage />
                </Button>
    </div>
  )
}

export default OwnersDetails
