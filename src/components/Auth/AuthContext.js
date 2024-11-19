import React, { createContext, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null); // JWT 토큰을 저장할 상태

  // 로그인 함수
  const logIn = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('로그인 성공:', response.data);
        setIsLoggedIn(true);
        setToken(response.data.token);
        
        // 토큰을 콘솔에 출력
        console.log('JWT 토큰:', response.data.token);
      } else {
        console.error('로그인 실패:', response.data);
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
    }
  };

  // 회원가입 함수
  const signUp = async (email, nickname, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/register`, {
        email,
        nickname,
        password,
      });

      if (response.status === 201) {
        console.log('회원가입 성공:', response.data);
        setToken(response.data.token); // 서버가 토큰을 반환하는 경우 저장
        console.log('JWT 토큰:', response.data.token); // 회원가입 시 반환된 토큰 출력
        return true;
      } else {
        console.error('회원가입 실패:', response.data);
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
    }
    return false;
  };

  // 로그아웃 함수
  const logOut = () => {
    setIsLoggedIn(false);
    setToken(null); // 로그아웃 시 토큰 초기화
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut, signUp, token }}>
      {children}
    </AuthContext.Provider>
  );
};
