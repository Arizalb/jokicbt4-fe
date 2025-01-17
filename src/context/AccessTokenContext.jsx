// AccessTokenContext.js
import React, { createContext, useContext, useState } from "react";

const AccessTokenContext = createContext();

export const AccessTokenProvider = ({ children }) => {
  const [hasAccessToken, setHasAccessToken] = useState(false);

  return (
    <AccessTokenContext.Provider value={{ hasAccessToken, setHasAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export const useAccessToken = () => {
  return useContext(AccessTokenContext);
};
