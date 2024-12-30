import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Separator } from '@radix-ui/react-select';
const ChoosePlan = () => {
  
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div>
      <Header />

      <div className="choose-plan-container" >
        {/* Basic Plan */}
        <div className="basic-plan" onClick={() => navigate('/BasicListing')} style={{ cursor: 'pointer' }}
        >
            <h2 className='plan-h2'>Βασικό Πακέτο (Δωρεάν)</h2>
                <Separator className='border-t-2 p-2 w-full items-center'/>
            <p className='side-title'>Ξεκινήστε με τις βασικές λειτουργίες της πλατφόρμας μας χωρίς κόστος.</p>
            <ul className='ul-plan-page'>
              <li>Δωρεάν λογαριασμός</li>
              <li>Ανέβασμα έως 5 αντικειμένων</li>
              <li>Βασικά χαρακτηριστικά καταχώρησης (ανέβασμα φωτογραφιών, περιγραφή αντικειμένου και τιμή)</li>
              <li>Τυπική ορατότητα στις αναζητήσεις</li>
            </ul>
            <ul className='ul-plan-page'>
              <li>Περιορισμένη διάρκεια καταχώρησης (30 ημέρες)</li>
              <li>Βασικά στατιστικά (προβολές)</li>
            </ul>
            <Separator className='border-t-2 p-2 w-full items-center'/>
            <h2 className='plan-h2-price'><span className='plan-h2-price-span mr-2'>0€</span>/Μήνα</h2>
            <button className="btn-signup">Ανεβάστε Δωρεάν</button>
          </div>        

        {/* Boost Plan */}
        <div className="boost-plan" onClick={() => navigate('/BoostListing')} style={{ cursor: 'pointer' }}>
          <h2 className='plan-h2'>Πακέτο <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 font-bold text-2xl mr-2 ml-2 font-inter'>Boost</span></h2>
          <Separator className='border-t-2 p-2 w-full items-center'/>
          <p className='side-title'>Αυξήστε την ορατότητα και τις δυνατότητες για μια πιο επαγγελματική εμπειρία καταχώρησης.</p>
          <ul className='ul-plan-page'>
            <li>Ανέβασμα έως 20 αντικειμένων</li>
            <li>Βελτιωμένα χαρακτηριστικά καταχώρησης (περισσότερες φωτογραφίες, αναλυτικές περιγραφές και ετικέτες)</li>
            <li>Προτεραιότητα στις αναζητήσεις</li>
          </ul>
          <ul className='ul-plan-page'>
            <li>Επεκτεταμένη διάρκεια καταχώρησης (έως 60 ημέρες)</li>
            <li>Στατιστικά υψηλής ανάλυσης (λεπτομερή στατιστικά προβολών)</li>
            <li>Προτεραιότητα στην εξυπηρέτηση πελατών</li>
          </ul>
          <Separator className='border-t-2 p-2 w-full items-center'/>
          <h2 className='plan-h2-price'><span className='plan-h2-price-span mr-2'>5€</span>/Μήνα</h2>
          <button className="btn-signup">Αναβάθμιση σε Boost</button>
        </div>

        {/* Boost+ Plan */}
        <div className="boost-plus-plan" onClick={() => navigate('/BoostPlusListing')} style={{ cursor: 'pointer' }}>
          <h2 className='plan-h2'>Πακέτο <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 ml-2 via-orange-500 to-red-600 font-bold text-4xl font-dancing-script'>Boost+</span></h2>
          <Separator className='border-t-2 p-2 w-full items-center'/>
          <p className='side-title'>Ξεκλειδώστε απεριόριστες δυνατότητες για τη μέγιστη ορατότητα και προηγμένα εργαλεία πώλησης.</p>
          <ul className='ul-plan-page'>
            <li>Απεριόριστα ανεβάσματα αντικειμένων</li>
            <li>Αποκλειστικά χαρακτηριστικά καταχώρησης (φωτογραφίες HD, βίντεο, λεπτομερής περιγραφή κατάστασης)</li>
            <li>Κορυφαία ορατότητα στις αναζητήσεις</li>
          </ul>
          <ul className='ul-plan-page'>
            <li>Απεριόριστη διάρκεια καταχώρησης</li>
            <li>Αποκλειστική επικοινωνία με αγοραστές και πωλητές</li>
          </ul>
          <Separator className='border-t-2 p-2 w-full items-center'/>
          <h2 className='plan-h2-price'><span className='plan-h2-price-span mr-2'>7€</span>/Μήνα</h2>
          <button className="btn-signup">Αναβάθμιση σε Boost+</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChoosePlan;

