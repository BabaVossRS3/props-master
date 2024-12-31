import React, { useEffect, useState } from 'react';
import { useUser, useClerk, SignOutButton } from '@clerk/clerk-react';
import { db } from './../../../configs';
import { eq } from 'drizzle-orm';
import { ProductListing, ProductImages } from './../../../configs/schema';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import DeleteListingsButton from './../../AddListing.jsx/components/DeleteAllListings'; // Import the DeleteListingsButton

const MyProfile = ({ totalListings }) => {
    const { user, isLoaded } = useUser();
    const { clerk } = useClerk();
    const [loading, setLoading] = useState(false);
    const [userListings, setUserListings] = useState([]); // State for user listings
    const { toast } = useToast();

    // Guard against undefined `user` or `user.id`
    useEffect(() => {
        if (!isLoaded || !user || !user.id) return; // Ensure user and user.id are defined

        const fetchUserListings = async () => {
            try {
                const listings = await db
                    .select()
                    .from(ProductListing)
                    .where(eq(ProductListing.createdBy, user.id));
                setUserListings(listings);
            } catch (error) {
                console.error('Error fetching user listings:', error);
                toast({ 
                    title: 'Failed to fetch listings', 
                    description: 'There was an error fetching your listings.' 
                });
            }
        };

        fetchUserListings();
    }, [isLoaded, user]);

    // Function to handle deletion of all listings
    const handleListingsDeleted = () => {
        setUserListings([]); // Clear the listings after deletion
        toast({
            title: 'Listings Deleted',
            description: 'All of your listings have been successfully deleted.',
            status: 'success',
        });
    };

    // Render loading UI if user data is not loaded yet
    if (!isLoaded || !user || !user.id) {
        return <div className="w-full h-[200px] rounded-xl bg-orange-100 animate-pulse">Φορτώνει...</div>;
    }

    return (
        <div className="flex flex-col space-y-6 p-10 bg-gray-100 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
                <div className="w-24 h-24">
                    <img
                        src={user.imageUrl}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-gray-500">{user.primaryEmailAddress.emailAddress}</p>
                </div>
            </div>

            <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-700">Σύνολο Αγγελιών</h2>
                    <p className="text-xl font-md text-gray-700">{totalListings}</p> 
                </div>

                <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-700">Συνδρομές</h2>
                    <div className="flex items-center">
                        <p className="user-plan text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-400 font-bold text-2xl mr-2"></p>
                    </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-700">Λήξη Συνδρομής</h2>
                    <p className="text-xl font-md text-gray-700">27 Μέρες</p>
                </div>
            </div>

            <div className="flex w-full items-center justify-between">
                <div className="flex justify-center items-center p-4"> 
                    <DeleteListingsButton
                        userListings={userListings} // Pass the user listings
                        onDeleted={handleListingsDeleted} // Call handleListingsDeleted when deletion is done
                    />
                </div>

                <div className="flex justify-center items-center p-4">
                    <SignOutButton mode="modal">
                        <Button
                            className="hover:scale-105 hover:bg-orange-500 transition-all font-light text-lg"
                        >
                            Αποσύνδεση
                        </Button>
                    </SignOutButton>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
