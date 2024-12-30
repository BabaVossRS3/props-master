// DeleteListingButton.js
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { IoTrashBin } from "react-icons/io5";
import { db } from "./../../../configs";
import { ProductImages, ProductListing } from "./../../../configs/schema";
import { eq } from "drizzle-orm";
import { useNavigate } from 'react-router-dom';


const DeleteListingButton = ({ listingId, onDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate(); // Get the navigate function

  const handleDelete = async () => {

    try {
        // Delete related product images first
        await db.delete(ProductImages).where(eq(ProductImages.ProductListingId, listingId));

        // Now delete the product listing
        await db.delete(ProductListing).where(eq(ProductListing.id, listingId));

        // Call the parent callback to update the UI
        onDeleted(listingId);

        // After successful deletion, navigate to the profile tab
        navigate('/profile?tab=my-listings');
        
        // Refresh the page after navigation
        window.location.reload();
    } catch (error) {
        console.error("Failed to delete listing:", error);
    }
};

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="text-white font-light">
          <IoTrashBin />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>Επιβεβαίωση Διαγραφής</AlertDialogTitle>
        <AlertDialogDescription>
            Είστε σίγουροι ότι θέλετε να διαγράψετε αυτήν την αγγελία; Αυτή η ενέργεια δεν μπορεί να αναιρεθεί.
        </AlertDialogDescription>

        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>
              Ακύρωση
            </AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Φορτώνει..." : "Διαγραφή"} 
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteListingButton;
