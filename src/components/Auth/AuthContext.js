import React, {createContext, useState} from 'react';

// AuthContext 생성
export const AuthContext = createContext();

// AuthProvider: 로그인 상태 및 로그인/로그아웃 함수 제공
export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = async () => {
    setIsLoggedIn(true);
  };
  // try {
  // if (await InAppBrowser.isAvailable()) {
  //   const result = await InAppBrowser.open(
  //     'http://3.35.1.149:8080/oauth2/authorization/kakao',
  //     {
  //       // InAppBrowser 설정
  //       dismissButtonStyle: 'cancel',
  //       preferredBarTintColor: '#FEE500',
  //       preferredControlTintColor: 'white',
  //       readerMode: false,
  //       showTitle: true,
  //       toolbarColor: '#FEE500',
  //       secondaryToolbarColor: 'black',
  //       enableUrlBarHiding: true,
  //       enableDefaultShare: false,
  //       forceCloseOnRedirection: false,
  //     },
  //   );
  //
  //   console.log(result);
  //
  //   // 로그인 성공 시 처리
  //   if (result.type === 'success' && result.url.includes('success')) {
  //     setIsLoggedIn(true);
  // 추가적인 로직 처라
  //     }
  //   } else {
  //     console.error('InAppBrowser 사용 불가');
  //   }
  // } catch (error) {
  //   console.error('로그인 오류:', error);
  // }
  // };

  const logOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{isLoggedIn, logIn, logOut}}>
      {children}
    </AuthContext.Provider>
  );
};
