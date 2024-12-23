import React from 'react';
import { useSearchParams } from 'react-router-dom';  // Import useSearchParams to get the query parameter
import Header from '@/components/Header';
import MyListings from './components/MyListings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MyProfile from './components/MyProfile';

const Profile = () => {
  // Get the tab query parameter from the URL
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'my-listings';  // Default to 'my-listings' if not present

  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <Tabs defaultValue={activeTab} className="w-full">
          <TabsList className="my-4 w-full flex justify-start bg-orange-100 active:outline-none">
            <TabsTrigger className="text-white bg-orange-300 mx-3" value="my-listings">
              Οι Αγγελίες Μου
            </TabsTrigger>
            <TabsTrigger className="text-white bg-orange-300 mx-3" value="my-profile">
              Λογαριασμός
            </TabsTrigger>
          </TabsList>
          <TabsContent value="my-listings" className="mt-10">
            <MyListings />
          </TabsContent>
          <TabsContent value="my-profile">
            <MyProfile />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
