import React from 'react'
import { useUser } from '@clerk/clerk-react'

const MyProfile = ({ productDetail }) => {
    const { user, isLoaded } = useUser(); // Clerk's user hook

    if (!isLoaded) {
        return <div>Loading...</div>; // Show loading state while user data is being loaded
    }

    return (
        <div className="flex items-center">
            {/* Left side - User image */}
            <div className="mr-4">
                <img 
                    src={productDetail.userImageUrl || user.profileImageUrl} // Fallback to Clerk user image if productDetail doesn't have it
                    className='w-[70px] h-[70px] rounded-full' 
                    alt="User profile"
                />
            </div>

            {/* Right side - User info */}
            <div>
                <p className="font-semibold">{user.firstName} {user.lastName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
            </div>
        </div>
    )
}

export default MyProfile
