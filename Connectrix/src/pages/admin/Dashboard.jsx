import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={logout} variant="outline">Logout</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-2">Total Clients</h3>
          <p className="text-2xl font-bold text-blue-600">42</p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-2">Active Connections</h3>
          <p className="text-2xl font-bold text-green-600">38</p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-2">Revenue</h3>
          <p className="text-2xl font-bold text-purple-600">$12,450</p>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600">Welcome to the Admin Dashboard, {user?.name}!</p>
          <p className="text-sm text-gray-500 mt-2">This is where you can manage clients, monitor connections, and view analytics.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
