import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/useAuth';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
      <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AuthProvider>
  );
};

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
