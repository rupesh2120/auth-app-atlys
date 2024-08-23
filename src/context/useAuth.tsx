import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (emailOrUsername: string, password: string) => boolean;
  register: (email: string, username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const lastActivity = parseInt(localStorage.getItem('lastActivity') || '0');
    const currentTime = new Date().getTime();

    if (loggedIn && currentTime - lastActivity < 4 * 60 * 60 * 1000) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('lastActivity', JSON.stringify(new Date().getTime()));
    }
  }, [isLoggedIn]);

  const login = (emailOrUsername: string, password: string): boolean => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.email === emailOrUsername && user.password === password) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('lastActivity', JSON.stringify(new Date().getTime()));
      navigate('/dashboard');
      return true;
    }
    return false;
  };

  const register = (email: string, username: string, password: string) => {
    const user = { email, username, password };
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/login');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
