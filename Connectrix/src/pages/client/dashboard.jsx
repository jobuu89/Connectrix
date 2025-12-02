import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const ClientDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Client Dashboard</h1>
        <Button onClick={logout} variant="outline">Logout</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-2">Connection Status</h3>
          <p className="text-2xl font-bold text-green-600">Online</p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-2">Data Usage</h3>
          <p className="text-2xl font-bold text-blue-600">2.4 GB</p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-2">Current Plan</h3>
          <p className="text-2xl font-bold text-purple-600">Premium</p>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
          <p className="text-sm text-gray-500 mt-2">Manage your internet connection and view your usage statistics here.</p>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
