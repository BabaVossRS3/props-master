
import React, { useEffect, useState, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Header from './components/Header';
import Footer from './components/Footer';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@radix-ui/react-select';
import { useUserPlan } from './../src/context/UserPlanContext';
import { useClerk } from '@clerk/clerk-react';
import { useToast } from "@/hooks/use-toast";
import { updateUserPlan } from './../configs/planManagment'; // Import the new function
import { db } from './../configs';
import { ProductImages, ProductListing } from './../configs/schema';
import { eq, desc } from 'drizzle-orm';
import Service from './Shared/Service';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_TEST_KEY);

const ChoosePlan = () => {
  const navigate = useNavigate();
  const { setUserPlan } = useUserPlan();
  const { user, isLoaded } = useClerk();
  const { toast } = useToast();
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const [productList, setProductList] = useState([]);
  const [currentPlanIndex, setCurrentPlanIndex] = useState(1); // Start with Boost (index 1)
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const touchStartX = useRef(0);
  const carouselRef = useRef(null);

  const plans = [
    {
      name: 'Basic',
      price: 0,
      priceId: null,
      features: [
        'Δωρεάν λογαριασμός.',
        'Ανέβασμα έως 5 αγγελιών ανά προφίλ.',
        'Ανέβασμα έως 3 φωτογραφιών ανά αγγελία.',
        'Τυπική ορατότητα στις αναζητήσεις.',
        'Περιορισμένη διάρκεια καταχώρησης (30 ημέρες).',
        'Βασικά στατιστικά (προβολές).',
      ],
    },
    {
      name: 'Boost',
      price: 5,
      priceId: 'price_1QfMjyK00QUEA36eq7WUtJzI',
      features: [
        'Ανέβασμα έως 20 αγγελιών ανά προφίλ.',
        'Βελτιωμένα χαρακτηριστικά Καταχώρησης.',
        'Προτεραιότητα στις αναζητήσεις.',
        'Επεκτεταμένη διάρκεια καταχώρησης (έως 45 ημέρες).',
        'Στατιστικά υψηλής ανάλυσης.',
        'Προτεραιότητα στην εξυπηρέτηση πελατών.',
      ],
    },
    {
      name: 'Boost+',
      price: 7,
      priceId: 'price_1QfMkpK00QUEA36eurhbVFTL',
      features: [
        'Απεριόριστα ανεβάσματα αγγελιών.',
        'Αποκλειστικά χαρακτηριστικά καταχώρησης.',
        'Κορυφαία ορατότητα στις αναζητήσεις.',
        'Απεριόριστη διάρκεια καταχώρησης.',
        'Αποκλειστική επικοινωνία με αγοραστές και πωλητές.',
      ],
    },
  ];

  const handlePlanClick = async (planName) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: "Σφάλμα",
        description: "Παρακαλώ συνδεθείτε για να επιλέξετε συνδρομή.",
        duration: 5000,
      });
      return;
    }
  
    setLoading(true);
  
    try {
      const plan = plans.find(p => p.name === planName);
      if (plan.name === 'Basic') {
        const updatedPlan = await updateUserPlan(user.id, planName);
        if (updatedPlan) {
          setUserPlan(planName);
          navigate('/BasicListing');
        }
        return;
      }
  
      const response = await fetch('http://localhost:3001/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: plan.priceId,
          userId: user.id,
          userEmail: user.emailAddresses[0].emailAddress,
          planName: planName
        })
      });
  
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
  
      const data = await response.json();
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
  
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: 'destructive',
        title: "Σφάλμα",
        description: error.message,
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Mobile touch handlers
  // Replace just these handler functions in your code

  useEffect(() => {
    if (isMobile) {
      setCurrentPlanIndex(1); // Center the "Boost" plan
    }
  }, [isMobile]);
  
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
    e.preventDefault();
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
  
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
  
    if (Math.abs(distance) > minSwipeDistance) {
      setCurrentPlanIndex((prevIndex) =>
        distance > 0
          ? Math.min(prevIndex + 1, plans.length - 1)
          : Math.max(prevIndex - 1, 0)
      );
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    if (user) {
      GetUserProductListing();
    }
  }, [user]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Center the Boost plan (index 1) on mobile when component mounts
  useEffect(() => {
    if (isMobile) {
      setCurrentPlanIndex(1); // Set to Boost plan
    }
  }, [isMobile]);
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
    } catch (error) {
      console.error('Error fetching user listings:', error);
    }
  };
  return (
    <div>
      <Header />
      <div className="choosePlan-container">
      <div
        ref={carouselRef}
        className="choosePlan-carousel"
        style={isMobile ? {
          transform: `translateX(-${currentPlanIndex * 100}%)`,
          transition: 'transform 0.3s ease-out',
          touchAction: 'none' // Prevent default touch behavior
        } : {}}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
          {plans.map((plan, index) => (
            <div
              className={`choosePlan-${plan.name.toLowerCase()}Plan choosePlan-slide`}
              key={index}
              onClick={() => handlePlanClick(plan.name)}
            >
                <h2 className="choosePlan-title">
                Πακέτο
                <span className={`choosePlan-highlight ${
                  plan.name === 'Basic' 
                    ? 'choosePlan-basicHighlight' 
                    : plan.name === 'Boost'
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 font-inter font-bold'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 font-dancing-script font-bold'
                }`}>
                  {plan.name}
                </span>
                {plan.name === 'Boost' && <span className="choosePlan-popular">(Δημοφιλέστερο)</span>}
              </h2>
              <Separator className="choosePlan-separator" />
              <p className="choosePlan-sideTitle">
                {plan.name === 'Basic'
                  ? 'Ξεκινήστε με τις βασικές λειτουργίες της πλατφόρμας μας χωρίς κόστος.'
                  : plan.name === 'Boost'
                  ? 'Αυξήστε την ορατότητα και τις δυνατότητες για μια πιο επαγγελματική εμπειρία καταχώρησης.'
                  : 'Ξεκλειδώστε απεριόριστες δυνατότητες για τη μέγιστη ορατότητα και προηγμένα εργαλεία πώλησης.'}
              </p>
              <ul className="choosePlan-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <h2 className="choosePlan-price">
                {plan.name !== 'Basic' && 'Μόνο '}
                <span className="choosePlan-priceAmount">{plan.price} €</span>/Μήνα
              </h2>
              <button 
                className={`choosePlan-button ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                disabled={loading}
              >
                {loading ? 'Επεξεργασία...' : plan.name === 'Basic' ? 'Ανεβάστε Δωρεάν' : `Αναβάθμιση σε ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChoosePlan;