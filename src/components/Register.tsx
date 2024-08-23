import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    // Add your register logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Create an Account</h2>
        
        <div className="mb-4">
          <label className="block text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
            placeholder="Enter your email"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-300">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
            placeholder="Choose a username"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-300">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
              placeholder="Create a password"
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
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600 transition-all duration-300"
        >
          Register
        </button>
        
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 cursor-pointer">
            Login →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
