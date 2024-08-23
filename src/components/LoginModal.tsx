import React from 'react';
import Login from './Login';
import Register from './Register';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {

  console.log("Window path", window.location.pathname)

  // if (window.location.pathname !== '/register') {
  //   console.log("Redirecting to login");
  //   navigate('/login');
  // }
  
  return (
    <div className="flex flex-col">
      <Login onClose={onClose} />
    </div>
  );
};

export default LoginModal;