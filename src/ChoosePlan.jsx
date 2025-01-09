
// import React, { useEffect, useState, useRef } from 'react';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import { useNavigate } from 'react-router-dom';
// import { Separator } from '@radix-ui/react-select';
// import { useUserPlan } from './../src/context/UserPlanContext';
// import { useClerk } from '@clerk/clerk-react';
// import { useToast } from "@/hooks/use-toast";
// import { updateUserPlan } from './../configs/planManagment'; // Import the new function
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import { db } from './../configs'
// import { ProductImages, ProductListing} from './../configs/schema'
// import { eq, desc } from 'drizzle-orm';
// import Service from './Shared/Service'





// const ChoosePlan = () => {
//   const navigate = useNavigate();
//   const { setUserPlan } = useUserPlan();
//   const { user, isLoaded } = useClerk();
//   const { toast } = useToast();
//   const [productList, setProductList] = useState([]);
//   // const stripePromise = loadStripe(VITE_STRIPE_PUBLISHABLE_TEST_KEY);
//   const [currentPlanIndex, setCurrentPlanIndex] = useState(1);
//   const touchStartX = useRef(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const [loading, setLoading] = useState(true); // Loading state
  

//   const plans = [
//     {
//       name: 'Basic',
//       price: 0,
//       features: [
//         'Δωρεάν λογαριασμός.',
//         'Ανέβασμα έως 5 αγγελιών ανά προφίλ.',
//         'Ανέβασμα έως 3 φωτογραφιών ανά αγγελία.',
//         'Τυπική ορατότητα στις αναζητήσεις.',
//         'Περιορισμένη διάρκεια καταχώρησης (30 ημέρες).',
//         'Βασικά στατιστικά (προβολές).',
//       ],
//     },
//     {
//       name: 'Boost',
//       price: 5,
//       features: [
//         'Ανέβασμα έως 20 αγγελιών ανά προφίλ.',
//         'Βελτιωμένα χαρακτηριστικά Καταχώρησης.',
//         'Προτεραιότητα στις αναζητήσεις.',
//         'Επεκτεταμένη διάρκεια καταχώρησης (έως 45 ημέρες).',
//         'Στατιστικά υψηλής ανάλυσης.',
//         'Προτεραιότητα στην εξυπηρέτηση πελατών.',
//       ],
//     },
//     {
//       name: 'Boost+',
//       price: 7,
//       features: [
//         'Απεριόριστα ανεβάσματα αγγελιών.',
//         'Αποκλειστικά χαρακτηριστικά καταχώρησης.',
//         'Κορυφαία ορατότητα στις αναζητήσεις.',
//         'Απεριόριστη διάρκεια καταχώρησης.',
//         'Αποκλειστική επικοινωνία με αγοραστές και πωλητές.',
//       ],
//     },
//   ];
//   const GetUserProductListing = async () => {
//     try {
//       const result = await db
//         .select()
//         .from(ProductListing)
//         .leftJoin(ProductImages, eq(ProductListing.id, ProductImages.ProductListingId))
//         .where(eq(ProductListing.createdBy, user?.primaryEmailAddress?.emailAddress))
//         .orderBy(desc(ProductListing.id)); // Drizzle supports chained methods

//       const resp = Service.FormatResult(result);
//       setProductList(resp);

//       // Update totalListings in the parent component
//       setTotalListings(resp.length);
//     } catch (error) {
//       console.error('Error fetching user listings:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handlePlanClick = async (planName) => {
//     if (!user) {
//       toast({
//         variant: 'destructive',
//         title: "Σφάλμα",
//         description: "Παρακαλώ συνδεθείτε για να επιλέξετε συνδρομή.",
//         status: "error",
//         duration: 5000,
//       });
//       return;
//     }

//     try {
//       if (planName === 'Basic') {
//         // Handle free plan
//         const updatedPlan = await updateUserPlan(user.id, planName);
//         if (updatedPlan) {
//           setUserPlan(planName);
//           navigate('/BasicListing');
//         }
//       } else {
//         // Create payment intent
//         const response = await fetch('/api/create-subscription', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             planName,
//             userId: user.id,
//             email: user.emailAddresses[0].emailAddress
//           }),
//         });

//         const { clientSecret, subscriptionId } = await response.json();

//         // Confirm the payment with Stripe
//         const stripe = await stripePromise;
//         const { error } = await stripe.confirmCardPayment(clientSecret, {
//           payment_method: {
//             card: elements.getElement('card'),
//             billing_details: {
//               email: user.emailAddresses[0].emailAddress,
//             },
//           },
//         });

//         if (error) {
//           throw new Error(error.message);
//         }

//         // Update user plan after successful payment
//         const updatedPlan = await updateUserPlan(user.id, planName);
//         if (updatedPlan) {
//           setUserPlan(planName);
//           toast({
//             className: "bg-green-500 text-white",
//             title: "Επιτυχία",
//             description: `Η συνδρομή σας αναβαθμίστηκε σε ${planName}`,
//             status: "success",
//             duration: 5000,
//           });

//           // Navigate based on plan
//           switch (planName) {
//             case 'Boost':
//               navigate('/BoostListing');
//               break;
//             case 'Boost+':
//               navigate('/BoostPlusListing');
//               break;
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Error processing payment:', error);
//       toast({
//         variant:"destructive",
//         title: "Σφάλμα",
//         description: "Υπήρξε πρόβλημα με την πληρωμή.",
//         status: "error",
//         duration: 5000,
//       });
//     }
//   };
//   // Mobile touch handlers
//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = (e) => {
//     const touchEndX = e.changedTouches[0].clientX;
//     const deltaX = touchStartX.current - touchEndX;

//     if (Math.abs(deltaX) > 50) {
//       if (deltaX > 0) {
//         setCurrentPlanIndex((prevIndex) => (prevIndex + 1) % plans.length);
//       } else {
//         setCurrentPlanIndex((prevIndex) => (prevIndex - 1 + plans.length) % plans.length);
//       }
//     }
//   };
// useEffect(() => {
//     if (user) {
//       GetUserProductListing(); // Fetch the product listings
//     }
//   }, [user]);
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   // if (!isLoaded) {
//   //   return <div className="w-full h-[200px] rounded-xl bg-orange-100 animate-pulse">Φορτώνει...</div>;
//   // }

//   return (
//     <div>
//       <Header />
//       <div className="choosePlan-container">
//         <div
//           className="choosePlan-carousel"
//           style={isMobile ? { transform: `translateX(-${currentPlanIndex * 100}%)` } : {}}
//           onTouchStart={handleTouchStart}
//           onTouchEnd={handleTouchEnd}
//         >
//           {/* {plans.map((plan, index) => (
//             <div
//               className={`choosePlan-${plan.name}Plan choosePlan-slide`}
//               key={index}
//               onClick={() => handlePlanClick(plan.name)}
//             >
//               <h2 className="choosePlan-title">
//                 Πακέτο
//                 <span
//                   className={`choosePlan-highlight choosePlan-${plan.name}Highlight ${
//                     plan.name === 'Basic'
//                       ? 'text-gray-500'
//                       : plan.name === 'Boost'
//                       ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 font-inter'
//                       : 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 ml-2 via-orange-500 to-red-600 font-dancing-script'
//                   }`}
//                 >
//                   {plan.name}
//                 </span>
//                 {plan.name === 'Boost' && (
//                   <span className="choosePlan-popular">(Δημοφιλεστερο)</span>
//                 )}
//               </h2>
//               <Separator className="choosePlan-separator" />
//               <p className="choosePlan-sideTitle">
//                 {plan.name === 'Basic'
//                   ? 'Ξεκινήστε με τις βασικές λειτουργίες της πλατφόρμας μας χωρίς κόστος.'
//                   : plan.name === 'Boost'
//                   ? 'Αυξήστε την ορατότητα και τις δυνατότητες για μια πιο επαγγελματική εμπειρία καταχώρησης.'
//                   : 'Ξεκλειδώστε απεριόριστες δυνατότητες για τη μέγιστη ορατότητα και προηγμένα εργαλεία πώλησης.'}
//               </p>
//               <ul className="choosePlan-features">
//                 {plan.features.map((feature, idx) => (
//                   <li key={idx}>{feature}</li>
//                 ))}
//               </ul>
//               <h2 className="choosePlan-price">
//                 {plan.name !== 'Basic' && 'Μόνο '}
//                 <span className="choosePlan-priceAmount">{plan.price} €</span>/Μήνα
//               </h2>
//               <button className="choosePlan-button">
//                 {plan.name === 'Basic'
//                   ? 'Ανεβάστε Δωρεάν'
//                   : `Αναβάθμιση σε ${plan.name}`}
//               </button>
//             </div>
//           ))} */}
//           {plans.map((plan, index) => (
//             <div
//               className={`choosePlan-${plan.name}Plan choosePlan-slide`}
//               key={index}
//               onClick={() => {
//                 if (plan.name === 'Basic' && productList.length >= 5) {
//                   toast({
//                     variant: "destructive",
//                     title: `Υπέρβαση Ορίων Πλάνου Basic.`,
//                     description: `Μπορείτε να Ανεβάσετε έως 5 Αγγελίες. Αναβαθμίστε το Πακέτο σας μέσω της καρτέλας προφίλ.`,
//                   });
//                   navigate('/choosePlan');
//                   return;
//                 }
//                 handlePlanClick(plan.name);
//               }}
//             >
//               <h2 className="choosePlan-title">
//                 Πακέτο
//                 <span
//                   className={`choosePlan-highlight choosePlan-${plan.name}Highlight ${
//                     plan.name === 'Basic'
//                       ? 'text-gray-500'
//                       : plan.name === 'Boost'
//                       ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 font-inter'
//                       : 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 ml-2 via-orange-500 to-red-600 font-dancing-script'
//                   }`}
//                 >
//                   {plan.name}
//                 </span>
//                 {plan.name === 'Boost' && (
//                   <span className="choosePlan-popular">(Δημοφιλεστερο)</span>
//                 )}
//               </h2>
//               <Separator className="choosePlan-separator" />
//               <p className="choosePlan-sideTitle">
//                 {plan.name === 'Basic'
//                   ? 'Ξεκινήστε με τις βασικές λειτουργίες της πλατφόρμας μας χωρίς κόστος.'
//                   : plan.name === 'Boost'
//                   ? 'Αυξήστε την ορατότητα και τις δυνατότητες για μια πιο επαγγελματική εμπειρία καταχώρησης.'
//                   : 'Ξεκλειδώστε απεριόριστες δυνατότητες για τη μέγιστη ορατότητα και προηγμένα εργαλεία πώλησης.'}
//               </p>
//               <ul className="choosePlan-features">
//                 {plan.features.map((feature, idx) => (
//                   <li key={idx}>{feature}</li>
//                 ))}
//               </ul>
//               <h2 className="choosePlan-price">
//                 {plan.name !== 'Basic' && 'Μόνο '}
//                 <span className="choosePlan-priceAmount">{plan.price} €</span>/Μήνα
//               </h2>
//               <button className="choosePlan-button">
//                 {plan.name === 'Basic'
//                   ? 'Ανεβάστε Δωρεάν'
//                   : `Αναβάθμιση σε ${plan.name}`}
//               </button>
//             </div>
//             ))}

//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ChoosePlan;

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

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_TEST_KEY);

const ChoosePlan = () => {
  const navigate = useNavigate();
  const { setUserPlan } = useUserPlan();
  const { user, isLoaded } = useClerk();
  const { toast } = useToast();
  
  const [productList, setProductList] = useState([]);
  const [currentPlanIndex, setCurrentPlanIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const touchStartX = useRef(0);

  const plans = [
    {
      name: 'Basic',
      price: 0,
      priceId: null, // Free plan
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
      priceId: 'price_1QfMjyK00QUEA36eq7WUtJzI', // Replace with your actual Stripe Price ID for Boost
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
      priceId: 'price_1QfMkpK00QUEA36eurhbVFTL', // Replace with your actual Stripe Price ID for Boost+
      features: [
        'Απεριόριστα ανεβάσματα αγγελιών.',
        'Αποκλειστικά χαρακτηριστικά καταχώρησης.',
        'Κορυφαία ορατότητα στις αναζητήσεις.',
        'Απεριόριστη διάρκεια καταχώρησης.',
        'Αποκλειστική επικοινωνία με αγοραστές και πωλητές.',
      ],
    },
  ];

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
  
      const response = await fetch('/api/create-checkout-session', {
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
        const errorText = await response.text();
        console.error('Server error:', response.status, errorText);
        throw new Error(`Request failed with status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Checkout session created:', data);
  
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
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        setCurrentPlanIndex((prevIndex) => (prevIndex + 1) % plans.length);
      } else {
        setCurrentPlanIndex((prevIndex) => (prevIndex - 1 + plans.length) % plans.length);
      }
    }
  };

  useEffect(() => {
    if (user) {
      GetUserProductListing(); // Fetch the product listings
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

  return (
    <div>
      <Header />
      <div className="choosePlan-container">
        <div
          className="choosePlan-carousel"
          style={isMobile ? { transform: `translateX(-${currentPlanIndex * 100}%)` } : {}}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {plans.map((plan, index) => (
            <div
              className={`choosePlan-${plan.name}Plan choosePlan-slide`}
              key={index}
              onClick={() => handlePlanClick(plan.name)}
            >
              <h2 className="choosePlan-title">
                Πακέτο
                <span
                  className={`choosePlan-highlight choosePlan-${plan.name}Highlight ${
                    plan.name === 'Basic'
                      ? 'text-gray-500'
                      : plan.name === 'Boost'
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 font-inter'
                      : 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 ml-2 via-orange-500 to-red-600 font-dancing-script'
                  }`}
                >
                  {plan.name}
                </span>
                {plan.name === 'Boost' && <span className="choosePlan-popular">(Δημοφιλεστερο)</span>}
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
              <button className={`choosePlan-button ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
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
