
import React, { useState, useEffect } from 'react';
import { AuthContextType } from './AuthContextOnly';
import { createContext } from 'react';


export const AuthContext = createContext<AuthContextType | undefined>(undefined);
const LOCAL_STORAGE_KEY = 'biogas_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedUser) setUser(storedUser);
  }, []);


  const login = async (email: string, password: string) => {
    // Check if user exists in localStorage and password matches
    const users = JSON.parse(localStorage.getItem('biogas_users') || '{}');
    const userInfo = users[email];
    if (userInfo && userInfo.password === password) {
      setUser(email);
      localStorage.setItem(LOCAL_STORAGE_KEY, email);
      return true;
    }
    return false;
  };

  const signup = async (
    email: string,
    password: string,
    info?: { name: string; birthdate: string; gender: string; phone?: string; profilePic?: string }
  ) => {
    // Save all info in localStorage
    const users = JSON.parse(localStorage.getItem('biogas_users') || '{}');
    if (users[email]) return false; // already exists
    users[email] = {
      name: info?.name || '',
      birthdate: info?.birthdate || '',
      gender: info?.gender || '',
      phone: info?.phone || '',
      profilePic: info?.profilePic || '',
      email,
      password
    };
    localStorage.setItem('biogas_users', JSON.stringify(users));
    // Do not log in after signup
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


