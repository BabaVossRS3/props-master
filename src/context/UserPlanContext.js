// src/context/UserPlanContext.js
import React, { createContext, useContext, useState } from 'react';

// Create Context for userPlan
const UserPlanContext = createContext();

// Provide the Context to the components
export const UserPlanProvider = ({ children }) => {
  const [userPlan, setUserPlan] = useState('');

  return (
    <UserPlanContext.Provider value={{ userPlan, setUserPlan }}>
      {children}
    </UserPlanContext.Provider>
  );
};

// Custom Hook to use the UserPlan context
export const useUserPlan = () => {
  return useContext(UserPlanContext);
};
