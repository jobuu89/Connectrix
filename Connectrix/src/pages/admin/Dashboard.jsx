import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ClientList from '../../components/admin/ClientCard';

const AdminDashboard = () => {
  const { logout } = useAuth();

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
        <ClientList />
      </div>
    </div>
  );
};

export default AdminDashboard;
