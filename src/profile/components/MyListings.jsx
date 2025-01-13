import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { eq, desc } from 'drizzle-orm';
import { Button } from '@/components/ui/button'
import { db } from './../../../configs'
import { ProductImages, ProductListing, UserPlan } from './../../../configs/schema'
import { useUser } from '@clerk/clerk-react'
import ProductItem from '@/components/ProductItem'
import Service from './../../Shared/Service'
import DeleteListingButton from '@/AddListing.jsx/components/DeleteListing';
import { useNavigate } from 'react-router-dom';
import { useUserPlan } from '../../context/UserPlanContext';
import { useToast } from "@/hooks/use-toast"

const MyListings = ({ setTotalListings }) => {
  const { user } = useUser();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { userPlan, setUserPlan } = useUserPlan(); // Make sure we get setUserPlan too
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUserPlan();
      GetUserProductListing();
    }
  }, [user]);

  const fetchUserPlan = async () => {
    try {
      const result = await db
        .select()
        .from(UserPlan)
        .where(eq(UserPlan.userId, user?.id));

      if (result.length > 0) {
        const fetchedPlan = result[0].plan;
        // Update both local state and context
        setUserPlan(fetchedPlan); // Update the context
      }
    } catch (error) {
      console.error('Error fetching user plan:', error);
    }
  };

  const GetUserProductListing = async () => {
    try {
      const result = await db
        .select()
        .from(ProductListing)
        .leftJoin(ProductImages, eq(ProductListing.id, ProductImages.ProductListingId))
        .where(eq(ProductListing.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(ProductListing.id));

      const resp = Service.FormatResult(result);
      setProductList(resp);
      setTotalListings(resp.length);
    } catch (error) {
      console.error('Error fetching user listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddListing = () => {

    // Check if user has a plan
    if (!userPlan) {
      toast({
        title: "Απαιτείται Συνδρομή",
        description: "Παρακαλώ επιλέξτε ένα πακέτο για να προσθέσετε αγγελία.",
        variant: "destructive",
      });
      navigate('/choosePlan');
      return;
    }

    // Check listing limits based on plan
    if (userPlan === 'Basic' && productList.length >= 5) {
      toast({
        variant: "destructive",
        title: `Υπέρβαση Ορίων Πλάνου Basic`,
        description: `Μπορείτε να Ανεβάσετε έως 5 Αγγελίες. Αναβαθμίστε το Πακέτο σας μέσω της καρτέλας προφίλ.`,
      });
      navigate('/choosePlan');
      return;
    }

    if (userPlan === 'Boost' && productList.length >= 15) {
      toast({
        variant: "destructive",
        title: `Υπέρβαση Ορίων Πλάνου Boost`,
        description: `Μπορείτε να Ανεβάσετε έως 15 Αγγελίες. Αναβαθμίστε το Πακέτο σας μέσω της καρτέλας προφίλ.`,
      });
      navigate('/choosePlan');
      return;
    }

    // Navigate based on plan
    switch (userPlan) {
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
    return <div>Loading...</div>;
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