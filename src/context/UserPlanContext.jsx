// src/context/UserPlanContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserPlanContext = createContext();

// The provider component that wraps your app
export const UserPlanProvider = ({ children }) => {
  const [userPlan, setUserPlan] = useState(''); // Initialize with an empty plan or default value

  return (
    <UserPlanContext.Provider value={{ userPlan, setUserPlan }}>
      {children}
    </UserPlanContext.Provider>
  );
};

// Custom hook to access the user plan in other components
export const useUserPlan = () => {
  return useContext(UserPlanContext);
};
