import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';

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

  const storedUser = localStorage.getItem('currentuser')

  let username = '';

  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    username = parsedUser.username;
  }

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
          <div className="mb-8 flex justify-between items-center">
            <div className="flex flex-col justify-start">
              <h2 className="text-white text-left text-xl">Hello {username}</h2>
              <p className="text-gray-400 text-left text-md">How are you doing today? Would you like to share something with the community 🤗</p>
            </div>
            <div className="flex">
              <button
                onClick={logout}
                className="bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-300 p-2 px-8"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="bg-gray-800 p-4 mb-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <p className="text-white">Create Post</p>
                </div>
              </div>
    
              <div className="bg-black mt-4 p-4 flex items-center rounded-lg shadow-lg">
                <div className="flex-shrink-0 w-1/10 flex justify-center items-center">
                  <div className="w-9 h-9 bg-gray-500 rounded-full flex items-center justify-center">
                    <div className="text-white text-xl">
                      <span>💬</span>
                    </div>
                  </div>
                </div>
                <div className="flex-grow ml-4 text-white">
                  <input
                    type="text"
                    placeholder="How are you feeling today?"
                    className="w-full bg-black text-white outline-none border-none"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => {}}
                  className="bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600 transition-all duration-300 p-2 px-8"
                >
                  Post
                </button>
              </div>
            </div>
    
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-800 p-4 mb-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <img src={comment.imageUrl} alt="avatar" className="w-10 h-10 rounded-full mr-4" />
                  <div className="ml-1">
                    <p className="text-white">{comment.name}</p>
                    <p className="text-gray-400 text-sm">{formatTime(comment.createdAt)}</p>
                  </div>
                </div>
                <div>
                  <button className="text-gray-400 text-lg">...</button>
                </div>
              </div>
    
              <div className="bg-black mt-4 p-4 flex items-center rounded-lg shadow-lg">
                <div className="flex justify-center items-center">
                  <div className="w-9 h-9 bg-gray-500 rounded-full flex items-center justify-center">
                    <div className="text-white text-xl">
                      <span>{comment.emoji}</span>
                    </div>
                  </div>
                </div>
                <div className="w-9/10 text-white ml-4">
                  <p>{comment.comment}</p>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <div className="flex justify-center items-center">
                  <div className="w-9 h-9 bg-gray-500 rounded-full flex items-center justify-center">
                    <div className="text-white text-xl">
                      <span>💬</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-left text-md ml-2">{comment.replies}</p>
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
    </div>
  );
};

export default Dashboard;
