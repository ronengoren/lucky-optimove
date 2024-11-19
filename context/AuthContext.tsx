import React, { createContext, useContext, useState } from 'react';



const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

 
  return (
    <AuthContext.Provider value={{ isLoggedIn, isLogout, setIsLoggedIn, setIsLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };


