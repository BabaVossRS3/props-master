import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { eq, desc } from 'drizzle-orm';
import { Button } from '@/components/ui/button'
import { db } from './../../../configs'
import { ProductImages, ProductListing ,UserPlan } from './../../../configs/schema'
import { useUser } from '@clerk/clerk-react'
import ProductItem from '@/components/ProductItem'
import Service from './../../Shared/Service'
import { IoTrashBin } from "react-icons/io5";
import { AlertDialog } from '@radix-ui/react-alert-dialog';
import DeleteListingButton from '@/AddListing.jsx/components/DeleteListing';
import { useNavigate } from 'react-router-dom';
import { useUserPlan } from '../../context/UserPlanContext'; // Adjust path if necessary
import { useToast } from "@/hooks/use-toast"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleListingNavigation } from './../../../configs/handleListingNavigation';

const MyListings = ({ setTotalListings }) => {
  const { user } = useUser(); // Get the user from Clerk (or your authentication context)
  const [productList, setProductList] = useState([]);
  const [plan, setPlan] = useState(null); // Initialize plan as null
  const [loading, setLoading] = useState(true); // Loading state
  const { toast } = useToast();
  const { userPlan } = useUserPlan();
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  useEffect(() => {
    if (user) {
      fetchUserPlan(); // Fetch the user's plan
      GetUserProductListing(); // Fetch the product listings
    }
  }, [user]);

  const fetchUserPlan = async () => {
    try {
      const result = await db
        .select()
        .from(UserPlan)
        .where(eq(UserPlan.userId, user?.id)); // Querying with Drizzle

      if (result.length > 0) {
        setPlan(result[0].plan); // Set the fetched plan
      } else {
        setPlan('Δεν έχει οριστεί συνδρομή'); // Default plan if not found
      }
    } catch (error) {
      console.error('Error fetching user plan:', error);
      setPlan('Δεν έχει οριστεί συνδρομή'); // Fallback default
    }
  };

  const GetUserProductListing = async () => {
    try {
      const result = await db
        .select()
        .from(ProductListing)
        .leftJoin(ProductImages, eq(ProductListing.id, ProductImages.ProductListingId))
        .where(eq(ProductListing.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(ProductListing.id)); // Drizzle supports chained methods

      const resp = Service.FormatResult(result);
      setProductList(resp);

      // Update totalListings in the parent component
      setTotalListings(resp.length);
    } catch (error) {
      console.error('Error fetching user listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTargetPath = () => {
    if (!plan || plan === 'Δεν έχει οριστεί συνδρομή') {
      return '/choosePlan'; // Default to the choose plan page
    }
    switch (plan) {
      case 'Basic':
        return '/BasicListing';
      case 'Boost':
        return '/BoostListing';
      case 'Boost+':
        return '/BoostPlusListing';
      default:
        return '/choosePlan';
    }
  };

  const handleAddNewListingClick = (e) => {
    // Check if the plan is 'Basic' and user has 5 listings
    if (plan === 'Basic' && productList.length >= 5) {
      toast({
        variant: "destructive",
        title: `Υπέρβαση Ορίων Πλάνου Basic.`,
        description: `Μπορείτε να Ανεβάσετε έως 5 Αγγελίες . Αναβαθμίστε το Πακέτο σας μέσω της καρτέλας προφίλ.`,
      });
      navigate('/choosePlan');
      e.preventDefault(); 
    } else if (plan === 'Boost' && productList.length >= 2) {
      toast({
        variant: "destructive",
        title: `Υπέρβαση Ορίων Πλάνου Boost.`,
        description: `Μπορείτε να Ανεβάσετε έως 20 Αγγελίες . Αναβαθμίστε το Πακέτο σας μέσω της καρτέλας προφίλ.`,
      });
      navigate('/choosePlan');
      e.preventDefault(); // Prevent navigation
    } else {
      // If the limit is not reached, allow navigation
      const targetPath = getTargetPath();
      navigate(targetPath);
    }
  };
  const handleAddListing = () => {
    if (!userPlan) {
        toast({
            title: "Απαιτείται Συνδρομή",
            description: "Παρακαλώ επιλέξτε ένα πακέτο για να προσθέσετε αγγελία.",
            status: "warning",
            duration: 5000,
        });
        navigate('/choosePlan');
        return;
    }

    // Navigate based on current plan
    switch(userPlan) {
        case 'Basic':
            navigate('/BasicListing');
            break;
        case 'Boost':
            navigate('/BoostListing');
            break;
        case 'Boost+':
            navigate('/BoostPlusListing');
            break;
        default:
            navigate('/BasicListing');
    }
};
  if (loading) {
    return <div>Loading...</div>; // Show loading spinner or placeholder
  }

  return (
    <div className="myListings-container">
      <div className="myListings-header">
        <h2 className="myListings-title">Οι Αγγελίες Μου</h2>
        <div className="myListings-button-container">
          <Button
            onClick={handleAddListing}
            className="myListings-newListingButton"
          >
            + Νέα Αγγελία
          </Button>
        </div>
      </div>
  
      <div className="myListings-grid">
        {productList.map((item, index) => (
          <div key={index} className="myListings-item">
            <ProductItem className="myListings-productItem" product={item} />
            <div className="myListings-actions">
              <Link to={`/BasicListing?mode=edit&id=${item.id}`} className="myListings-link">
                <Button className="myListings-editButton">
                  Επεξεργασία
                </Button>
              </Link>
              <DeleteListingButton
                listingId={item.id}
                onDeleted={() => setProductList(productList.filter((p) => p.id !== item.id))}
                className="myListings-deleteButton"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MyListings;  