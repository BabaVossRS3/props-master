
import React, { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@radix-ui/react-select';
import { useUserPlan } from './../src/context/UserPlanContext';
import { useClerk } from '@clerk/clerk-react';
import { useToast } from "@/hooks/use-toast";
import { updateUserPlan } from './../configs/planManagment'; // Import the new function

const ChoosePlan = () => {
  const navigate = useNavigate();
  const { setUserPlan } = useUserPlan();
  const { user, isLoaded } = useClerk();
  const { toast } = useToast();
  
  const [currentPlanIndex, setCurrentPlanIndex] = useState(1);
  const touchStartX = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  const plans = [
    {
      name: 'Basic',
      price: '0€',
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
      price: '5€',
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
      price: '7€',
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
          variant:'destructive',
            title: "Σφάλμα",
            description: "Παρακαλώ συνδεθείτε για να επιλέξετε συνδρομή.",
            status: "error",
            duration: 5000,
        });
        return;
    }

    try {
        const updatedPlan = await updateUserPlan(user.id, planName);
        
        if (updatedPlan) {
            setUserPlan(planName);
            toast({
              className: "bg-green-500 text-white",
                title: "Επιτυχία",
                description: `Η συνδρομή σας αναβαθμίστηκε σε ${planName}`,
                status: "success",
                duration: 5000,
            });

            // Navigate based on the new plan
            switch (planName) {
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
        }
    } catch (error) {
        console.error('Error updating plan:', error);
        toast({
            title: "Σφάλμα",
            description: "Υπήρξε πρόβλημα με την αναβάθμιση της συνδρομής σας.",
            status: "error",
            duration: 5000,
        });
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
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // if (!isLoaded) {
  //   return <div className="w-full h-[200px] rounded-xl bg-orange-100 animate-pulse">Φορτώνει...</div>;
  // }

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
                {plan.name === 'Boost' && (
                  <span className="choosePlan-popular">(Δημοφιλεστερο)</span>
                )}
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
                <span className="choosePlan-priceAmount">{plan.price}</span>/Μήνα
              </h2>
              <button className="choosePlan-button">
                {plan.name === 'Basic'
                  ? 'Ανεβάστε Δωρεάν'
                  : `Αναβάθμιση σε ${plan.name}`}
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