import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();
  

  const handleRegister = () => {
    // Add your register logic here
    register(email, username, password);
    // if (success) {
    //   navigate('/dashboard'); // Redirect to dashboard on successful login
    // } else {
    //   // Handle login failure, e.g., show an error message
    //   alert('Invalid email/username or password');
    // }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-sm font-semi-bold text-center text-gray-400">SIGN UP</h2>
        <h2 className="text-xl font-bold mb-6 text-center text-white">Create an account to continue</h2>
        <div className="mb-4">
          <label className="block text-gray-400">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-400 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-white"
            placeholder="Enter your email"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-400">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-400 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-white"
            placeholder="Choose a preferred username"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-400">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-white"
              placeholder="Choose a strong password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-400"
            >
              👁️
            </span>
          </div>
        </div>
        
        <button
          onClick={handleRegister}
          className="w-full bg-blue-400 text-white py-2 rounded mt-4 hover:bg-blue-600 transition-all duration-400"
        >
          Continue
        </button>
        
        <p className="mt-4 text-left text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 cursor-pointer">
            Login →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
