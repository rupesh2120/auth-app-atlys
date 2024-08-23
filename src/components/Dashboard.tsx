import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import LoginModal from './LoginModal'; // Adjust the path to your LoginModal component

const Dashboard: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  return (
    <div className={`relative min-h-screen`}>
      {/* Dashboard content */}
      <div className={`p-4 ${showLoginModal ? 'blur-sm' : ''}`}>
        {isLoggedIn ? (
          <div className="text-white">
            <h1 className="text-xl font-bold">Hello {localStorage.getItem('username')}</h1>
            {/* Other dashboard content */}
            <button onClick={logout} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
              Logout
            </button>
          </div>
        ) : (
          <div className="text-white">
            <p>Log in to write post</p>
            <button onClick={handleLoginClick} className="text-blue-500 cursor-pointer">
              Log In
            </button>
          </div>
        )}

      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default Dashboard;
