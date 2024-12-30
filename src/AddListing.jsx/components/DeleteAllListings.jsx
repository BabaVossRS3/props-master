// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from "@/components/ui/alert-dialog";
// import { db } from "./../../../configs";
// import { ProductImages, ProductListing } from "./../../../configs/schema";
// import { eq } from "drizzle-orm";

// const DeleteListingsButton = ({ userListings, onDeleted }) => {
//   const [isDeleting, setIsDeleting] = useState(false);

//   const handleDelete = async () => {
//     if (userListings.length === 0) {
//       console.log("No listings to delete.");
//       return;
//     }

//     setIsDeleting(true);
//     try {
//       const listingIds = userListings.map(listing => listing.id);  // Get the IDs of the listings

//       // Make sure listingIds is not empty
//       if (listingIds.length === 0) {
//         console.log("No listing IDs found to delete.");
//         return;
//       }

//       // Delete related product images first
//       await db.delete(ProductImages).where(eq(ProductImages.ProductListingId, listingIds));

//       // Now delete the product listings
//       await db.delete(ProductListing).where(eq(ProductListing.id, listingIds));

//       // Call the parent callback to update the UI
//       onDeleted();
//     } catch (error) {
//       console.error("Failed to delete listings:", error);
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <Button variant="destructive" className="hover:scale-105 transition-all text-white font-light text-lg">
//           Διαγραφή Όλων των Αγγελιών
//         </Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Επιβεβαίωση Διαγραφής</AlertDialogTitle>
//           <AlertDialogDescription>
//             Είστε σίγουροι ότι θέλετε να διαγράψετε όλες τις αγγελίες σας; Αυτή η ενέργεια δεν μπορεί να αναιρεθεί.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>
//             Ακύρωση
//           </AlertDialogCancel>
//           <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
//             {isDeleting ? "Φορτώνει..." : "Διαγραφή Όλων"}
//           </Button>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };

// export default DeleteListingsButton;
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { db } from "../../../configs";
import { ProductImages, ProductListing } from "../../../configs/schema";
import { inArray } from "drizzle-orm"; // Ensure you import this for array queries

const DeleteListingButton = ({ userListings, onDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!userListings || userListings.length === 0) {
      console.log("No listings to delete.");
      return;
    }

    setIsDeleting(true);
    try {
      const listingIds = userListings.map(listing => listing.id); // Extract all listing IDs

      // Delete related product images
      await db.delete(ProductImages).where(inArray(ProductImages.ProductListingId, listingIds));

      // Delete the product listings
      await db.delete(ProductListing).where(inArray(ProductListing.id, listingIds));

      // Call the parent callback to update the UI
      if (onDeleted) onDeleted(); // Reset the UI after deletion
    } catch (error) {
      console.error("Failed to delete listings:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="hover:scale-105 transition-all text-white font-light text-lg">
          Διαγραφή Όλων των Αγγελιών
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Επιβεβαίωση Διαγραφής</AlertDialogTitle>
          <AlertDialogDescription>
            Είστε σίγουροι ότι θέλετε να διαγράψετε όλες τις αγγελίες σας; Αυτή η ενέργεια δεν μπορεί να αναιρεθεί.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Ακύρωση</AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Φορτώνει..." : "Διαγραφή Όλων"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteListingButton;
