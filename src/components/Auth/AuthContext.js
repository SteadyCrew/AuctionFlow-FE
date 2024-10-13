import React, {createContext, useState} from 'react';

// AuthContext 생성
export const AuthContext = createContext();

// AuthProvider: 로그인 상태 및 로그인/로그아웃 함수 제공
export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = () => {
    setIsLoggedIn(true);
  };

  const logOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{isLoggedIn, logIn, logOut}}>
      {children}
    </AuthContext.Provider>
  );
};
