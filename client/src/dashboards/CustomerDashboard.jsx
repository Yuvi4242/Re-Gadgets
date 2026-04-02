import React from 'react';
import { useAuth } from '../context/AuthContext';

const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="p-8 text-white min-h-screen bg-[#0d1117]">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between border-b border-slate-700 pb-4 mb-8">
          <h1 className="text-3xl font-bold">Customer Dashboard</h1>
          <button onClick={() => logout()} className="px-4 py-2 bg-red-600/20 text-red-400 hover:bg-red-600/40 rounded-lg transition-colors">Logout</button>
        </div>
        <p className="text-slate-400">Welcome to your dashboard, {user?.email}!</p>
      </div>
    </div>
  );
};
export default CustomerDashboard;
