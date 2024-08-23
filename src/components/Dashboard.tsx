import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import LoginModal from './LoginModal'; // Adjust the path to your LoginModal component

export interface Comment {
  id: string;
  name: string;
  comment: string;
  emoji: string;
  createdAt: string; // ISO 8601 date string
  replies: number;
  imageUrl: string;
}

interface IDashboard {
  comments: Comment[];
}

const Dashboard: React.FC<IDashboard> = ({comments}) => {
  const { isLoggedIn, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);


  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  function formatTime(createdAt: string): string {
    const createdTime = new Date(createdAt);
    const currentTime = new Date();
    const diff = (currentTime.getTime() - createdTime.getTime()) / 1000;
  
    if (diff >= 86400) {
      // More than 24 hours
      return createdTime.toLocaleDateString('en-GB'); // Format as "DD-MM-YYYY"
    } else if (diff >= 3600) {
      // More than 1 hour
      const hours = Math.floor(diff / 3600);
      return `${hours} hours ago`;
    } else if (diff >= 60) {
      // More than 1 minute
      const minutes = Math.floor(diff / 60);
      return `${minutes} minutes ago`;
    } else {
      return 'Just now';
    }
  }

  return (
    <div className={`relative min-h-screen`}>
      <div className={`p-4 ${showLoginModal ? 'blur-sm' : ''}`}>
        {isLoggedIn ? (
          <div className="w-3/5 mx-auto p-4">
          <div className="mb-8">
            <h2 className="text-white text-left text-xl">Hello Rupesh</h2>
            <p className="text-gray-400 text-left text-md">How are you doing today?</p>
          </div>
    
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-800 p-4 mb-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <img src={comment.imageUrl} alt="avatar" className="w-10 h-10 rounded-full mr-4" />
                  <div className="ml-4">
                    <p className="text-white">{comment.name}</p>
                    <p className="text-gray-400 text-sm">{formatTime(comment.createdAt)}</p>
                  </div>
                </div>
                <div>
                  <button className="text-gray-400 text-lg">...</button>
                </div>
              </div>
    
              <div className="bg-black mt-4 p-4 flex">
                <div className="w-1/10">
                  <span>{comment.emoji}</span>
                </div>
                <div className="w-9/10 text-white">
                  <p>{comment.comment}</p>
                </div>
              </div>
              <div className="mb-8">
                <h2 className="text-white text-left text-xl">Replies</h2>
                <p className="text-gray-400 text-left text-md">{comment.replies}</p>
              </div>
            </div>
          ))}
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

      {showLoginModal && (
        <div className="flex justify-center items-center">
          <div className="bg-red-800 relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-2 right-2 text-white text-xl"
            >
              &times;
            </button>
            <LoginModal onClose={() => setShowLoginModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
