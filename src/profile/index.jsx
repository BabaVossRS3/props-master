import Header from '@/components/Header'
import React from 'react'
import MyListings from './components/MyListings'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const Profile = () => {
  return (
    <div>
      <Header/>
      <div className="px-10 md:px-20 my-10 ">

        <Tabs defaultValue="my-listings" className="w-full">
          <TabsList className='my-4 w-full flex justify-start bg-orange-100 active:outline-none'>
            <TabsTrigger className= 'text-white bg-orange-300 mx-3'value="my-listing">Οι Αγγελίες Μου</TabsTrigger>
            <TabsTrigger className=' text-white bg-orange-300 mx-3' value="inbox">Μηνύματα</TabsTrigger>
            <TabsTrigger className=' text-white bg-orange-300 mx-3' value="profile">Λογαριασμός</TabsTrigger>
          </TabsList>
          <TabsContent value='my-listing' className='mt-10'>
          <MyListings/></TabsContent>
          <TabsContent value='inbox'>
          Inbox Tab</TabsContent>
          <TabsContent value='profile'>
            Profile Tab
          </TabsContent>

        </Tabs>


      </div>
    </div>
  )
}

export default Profile
