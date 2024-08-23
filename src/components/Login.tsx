import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

interface LoginModalProps {
  onClose?: () => void;
}

const Login: React.FC<LoginModalProps> = ({onClose}) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();


  const handleLogin = () => {
    const success = login(emailOrUsername, password);
    if (success) {
      navigate('/dashboard'); // Redirect to dashboard on successful login
    } else {
      // Handle login failure, e.g., show an error message
      alert('Invalid email/username or password');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col relative">
        <h2 className="text-sm font-semi-bold text-center text-gray-400">Welcome, Back</h2>
        <h2 className="text-xl font-bold mb-6 text-center text-white">Log into your account</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-6 text-white text-xl"
        >
          &times;
        </button>
        <div className="mb-4">
          <label className="block text-gray-300">Email or Username</label>
          <input
            type="text"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            className="w-full p-3 border border-gray-400 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
            placeholder="Enter your email or username"
          />
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <div className="flex-1">
              <label htmlFor="password" className="block text-gray-300">Password</label>
            </div>
            <div className="flex-none">
              <label className="text-gray-300 text-sm">Forgot Password?</label>
            </div>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
              placeholder="Enter your password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              👁️
            </span>
          </div>
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600 transition-all duration-300"
        >
          Login Now
        </button>
        <p className="mt-4 text-left text-gray-400">
          Not registered yet?{' '}
          <Link to="/register" className="text-blue-500 cursor-pointer">
            Register →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
