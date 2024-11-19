import React, { createContext, useContext, useState } from 'react';

const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  const [totalUserBalance, setTotalUserBalance] = useState(1000);
  const [totalUserWinings, setTotalUserWinnings] = useState(15000);

  return (
    <WalletContext.Provider  value={{
      totalUserBalance, setTotalUserBalance, totalUserWinings, setTotalUserWinnings
    }}>
      {children}
    </WalletContext.Provider>
  );
};

const useWallet = () => {
  return useContext(WalletContext);
};

export { WalletProvider, useWallet };