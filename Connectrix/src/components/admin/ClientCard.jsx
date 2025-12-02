import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  WifiIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  EnvelopeIcon,
  ArrowsRightLeftIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import { disconnectClient, limitSpeed, sendReminder, getClients } from '../../../lib/api/clients';
import { useToast } from '../../../hooks/useToast';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedClients, setSelectedClients] = useState([]);
  const { showToast } = useToast();

  // Fetch clients on component mount
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await getClients();
      setClients(data);
    } catch (error) {
      showToast('Failed to fetch clients', 'error');
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter clients based on search and filter
  const filteredClients = clients.filter((client) => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm);
    
    const matchesStatus = 
      filterStatus === 'all' ||
      (filterStatus === 'connected' && client.connected) ||
      (filterStatus === 'disconnected' && !client.connected) ||
      (filterStatus === 'overdue' && client.paymentStatus === 'overdue') ||
      (filterStatus === 'active' && client.subscriptionStatus === 'active');
    
    return matchesSearch && matchesStatus;
  });

  // Handle disconnecting a client
  const handleDisconnect = async (clientId, clientName) => {
    if (!window.confirm(`Disconnect ${clientName} from WiFi?`)) return;

    try {
      await disconnectClient(clientId);
      showToast(`${clientName} has been disconnected`, 'success');
      
      // Update local state
      setClients(clients.map(client =>
        client.id === clientId ? { ...client, connected: false } : client
      ));
    } catch (error) {
      showToast('Failed to disconnect client', 'error');
    }
  };

  // Handle sending payment reminder
  const handleSendReminder = async (clientId, clientName) => {
    try {
      await sendReminder(clientId);
      showToast(`Reminder sent to ${clientName}`, 'success');
    } catch (error) {
      showToast('Failed to send reminder', 'error');
    }
  };

  // Handle speed limiting
  const handleSpeedLimit = async (clientId, clientName, speedMbps) => {
    try {
      await limitSpeed(clientId, speedMbps);
      showToast(`${clientName} limited to ${speedMbps}Mbps`, 'success');
    } catch (error) {
      showToast('Failed to limit speed', 'error');
    }
  };

  // Toggle client selection
  const toggleClientSelection = (clientId) => {
    setSelectedClients(prev =>
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  // Select all clients
  const selectAllClients = () => {
    if (selectedClients.length === filteredClients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(filteredClients.map(client => client.id));
    }
  };

  // Bulk disconnect selected clients
  const handleBulkDisconnect = async () => {
    if (selectedClients.length === 0) {
      showToast('No clients selected', 'warning');
      return;
    }

    if (!window.confirm(`Disconnect ${selectedClients.length} selected clients?`)) return;

    try {
      for (const clientId of selectedClients) {
        await disconnectClient(clientId);
      }
      showToast(`${selectedClients.length} clients disconnected`, 'success');
      fetchClients(); // Refresh the list
      setSelectedClients([]);
    } catch (error) {
      showToast('Failed to disconnect some clients', 'error');
    }
  };

  // Mock data for demonstration
  useEffect(() => {
    if (clients.length === 0) {
      // This would normally come from API
      const mockClients = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          phone: "+254712345678",
          plan: "50Mbps Premium",
          speed: 50,
          paymentStatus: "overdue",
          subscriptionStatus: "active",
          daysRemaining: -3,
          connected: true,
          dataUsed: "45 GB",
          dataLimit: "100 GB",
          lastPayment: "2024-01-01",
          nextPayment: "2024-02-01",
          macAddress: "00:1A:2B:3C:4D:5E",
          joinDate: "2023-12-01"
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+254723456789",
          plan: "100Mbps Business",
          speed: 100,
          paymentStatus: "paid",
          subscriptionStatus: "active",
          daysRemaining: 15,
          connected: true,
          dataUsed: "120 GB",
          dataLimit: "200 GB",
          lastPayment: "2024-01-15",
          nextPayment: "2024-02-15",
          macAddress: "00:2B:3C:4D:5E:6F",
          joinDate: "2023-11-15"
        },
        {
          id: 3,
          name: "Mike Johnson",
          email: "mike@example.com",
          phone: "+254734567890",
          plan: "20Mbps Basic",
          speed: 20,
          paymentStatus: "pending",
          subscriptionStatus: "suspended",
          daysRemaining: 0,
          connected: false,
          dataUsed: "18 GB",
          dataLimit: "50 GB",
          lastPayment: "2023-12-20",
          nextPayment: "2024-01-20",
          macAddress: "00:3C:4D:5E:6F:7A",
          joinDate: "2023-10-20"
        }
      ];
      setClients(mockClients);
      setLoading(false);
    }
  }, [clients.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Client Management</h2>
          <p className="text-gray-600">Manage all your WiFi clients and subscriptions</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/clients/new"
            className="inline-flex items-center px-4 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add New Client
          </Link>
          
          {selectedClients.length > 0 && (
            <button
              onClick={handleBulkDisconnect}
              className="inline-flex items-center px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
            >
              <WifiIcon className="h-5 w-5 mr-2" />
              Disconnect ({selectedClients.length})
            </button>
          )}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <div className="relative">
              <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white appearance-none"
              >
                <option value="all">All Clients</option>
                <option value="connected">Connected</option>
                <option value="disconnected">Disconnected</option>
                <option value="overdue">Payment Overdue</option>
                <option value="active">Active Subscriptions</option>
              </select>
            </div>

            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                  <input
                    type="checkbox"
                    checked={selectedClients.length === filteredClients.length && filteredClients.length > 0}
                    onChange={selectAllClients}
                    className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days Left
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  {/* Checkbox */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedClients.includes(client.id)}
                      onChange={() => toggleClientSelection(client.id)}
                      className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                  </td>

                  {/* Client Info */}
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-primary-600">
                            {client.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.email}</div>
                          <div className="text-xs text-gray-400">{client.phone}</div>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Subscription Info */}
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{client.plan}</div>
                      <div className="flex items-center text-sm text-gray-600">
                        <WifiIcon className="h-4 w-4 mr-1" />
                        {client.speed} Mbps
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {client.dataUsed} / {client.dataLimit}
                      </div>
                    </div>
                  </td>

                  {/* Connection Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {client.connected ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircleIcon className="h-3 w-3 mr-1" />
                        Connected
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <XCircleIcon className="h-3 w-3 mr-1" />
                        Disconnected
                      </span>
                    )}
                  </td>

                  {/* Payment Status */}
                  <td className="px-6 py-4">
                    <div>
                      {client.paymentStatus === 'paid' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Paid
                        </span>
                      ) : client.paymentStatus === 'overdue' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
                          Overdue
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      )}
                      <div className="text-xs text-gray-500 mt-1">
                        Next: {client.nextPayment}
                      </div>
                    </div>
                  </td>

                  {/* Days Remaining */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`font-medium ${client.daysRemaining < 0 ? 'text-red-600' : client.daysRemaining < 7 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {client.daysRemaining} days
                    </div>
                    <div className="text-xs text-gray-500">
                      {client.daysRemaining < 0 ? 'Expired' : 'Remaining'}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {/* View Button */}
                      <Link
                        to={`/admin/clients/${client.id}`}
                        className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Link>

                      {/* Disconnect Button */}
                      <button
                        onClick={() => handleDisconnect(client.id, client.name)}
                        disabled={!client.connected}
                        className={`p-2 rounded-lg transition-colors ${
                          client.connected
                            ? 'text-red-400 hover:text-red-500 hover:bg-red-50'
                            : 'text-gray-300 cursor-not-allowed'
                        }`}
                        title="Disconnect from WiFi"
                      >
                        <WifiIcon className="h-4 w-4" />
                      </button>

                      {/* Speed Limit Button */}
                      <div className="relative group">
                        <button
                          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Limit Speed"
                        >
                          <ArrowsRightLeftIcon className="h-4 w-4" />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                          <div className="py-1">
                            <button
                              onClick={() => handleSpeedLimit(client.id, client.name, 10)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Limit to 10Mbps
                            </button>
                            <button
                              onClick={() => handleSpeedLimit(client.id, client.name, 5)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Limit to 5Mbps
                            </button>
                            <button
                              onClick={() => handleSpeedLimit(client.id, client.name, 1)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Limit to 1Mbps
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Send Reminder Button */}
                      <button
                        onClick={() => handleSendReminder(client.id, client.name)}
                        className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition-colors"
                        title="Send Payment Reminder"
                      >
                        <EnvelopeIcon className="h-4 w-4" />
                      </button>

                      {/* Edit Button */}
                      <button
                        className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Client"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <UserGroupIcon className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Pagination */}
        {filteredClients.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">{filteredClients.length}</span> of{' '}
                <span className="font-medium">{clients.length}</span> clients
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientList;