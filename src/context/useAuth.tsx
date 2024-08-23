import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (emailOrUsername: string, password: string) => boolean;
  register: (email: string, username: string, password: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  email: string;
  username: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const lastActivity = parseInt(localStorage.getItem('lastActivity') || '0', 10);
    const currentTime = new Date().getTime();
  
    console.log("Logged in:", loggedIn);
    console.log("Current Path:", window.location.pathname);
  
    if (!loggedIn || currentTime - lastActivity >= 4 * 60 * 60 * 1000) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('lastActivity');
      setIsLoggedIn(false);
      if (window.location.pathname !== '/register') {
        console.log("Redirecting to login");
        navigate('/login');
      }
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('lastActivity', new Date().getTime().toString());
    }
  }, [isLoggedIn]);

  const login = (emailOrUsername: string, password: string): boolean => {
    const user: User = JSON.parse(localStorage.getItem('currentuser') || '{}');
    if ((user.email === emailOrUsername || user.username === emailOrUsername) && user.password === password) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('lastActivity', new Date().getTime().toString());
      navigate('/dashboard');
      return true;
    }
    return false;
  };

  const register = (email: string, username: string, password: string) => {
    const user: User = { email, username, password };
    localStorage.setItem('currentuser', JSON.stringify(user));
    navigate('/login');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('lastActivity'); // Also remove lastActivity on logout
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
