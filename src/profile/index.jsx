// import React, { useState } from 'react';
// import { useSearchParams } from 'react-router-dom';  // Import useSearchParams to get the query parameter
// import Header from '@/components/Header';
// import MyListings from './components/MyListings';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import MyProfile from './components/MyProfile';

// const Profile = () => {
//   // Fetch totalListings from MyListings or set state here
//   const [totalListings, setTotalListings] = useState(0);

//   return (
//     <div>
//       <Header />
//       <div className="px-10 md:px-20 my-10">
//         <Tabs defaultValue="my-listings" className="w-full">
//           <TabsList className="my-4 w-full flex justify-start bg-orange-100 active:outline-none">
//             <TabsTrigger className="text-white bg-orange-300 mx-3" value="my-listings">
//               Οι Αγγελίες Μου
//             </TabsTrigger>
//             <TabsTrigger className="text-white bg-orange-300 mx-3" value="my-profile">
//               Λογαριασμός
//             </TabsTrigger>
//           </TabsList>
//           <TabsContent value="my-listings" className="mt-10">
//             <MyListings setTotalListings={setTotalListings} /> {/* Pass setTotalListings to MyListings */}
//           </TabsContent>
//           <TabsContent value="my-profile">
//             <MyProfile totalListings={totalListings} /> {/* Pass totalListings prop */}
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';  // Import useSearchParams to get the query parameter
import Header from '@/components/Header';
import MyListings from './components/MyListings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MyProfile from './components/MyProfile';
import Footer from '@/components/Footer';

const Profile = () => {
  // Fetch totalListings from MyListings or set state here
  const [totalListings, setTotalListings] = useState(0);

  return (
    <div className="neaKataxwrisi-profile-container">
      <Header />
      <div className="neaKataxwrisi-tabs-wrapper">
        <Tabs defaultValue="my-listings" className="neaKataxwrisi-tabs">
          <TabsList className="neaKataxwrisi-tabs-list gap-3">
            <TabsTrigger className="neaKataxwrisi-tabs-trigger" value="my-listings">
              Οι Αγγελίες Μου
            </TabsTrigger>
            <TabsTrigger className="neaKataxwrisi-tabs-trigger" value="my-profile">
              Λογαριασμός
            </TabsTrigger>
          </TabsList>
          <TabsContent value="my-listings" className="neaKataxwrisi-tabs-content">
            <MyListings setTotalListings={setTotalListings} /> {/* Pass setTotalListings to MyListings */}
          </TabsContent>
          <TabsContent value="my-profile" className="neaKataxwrisi-tabs-content">
            <MyProfile totalListings={totalListings} /> {/* Pass totalListings prop */}
          </TabsContent>
        </Tabs>
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;
