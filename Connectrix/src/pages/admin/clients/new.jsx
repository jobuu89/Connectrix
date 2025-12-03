import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Card from '../../../components/ui/Card';
import { useToast } from '../../../hooks/useToast';
import { createClient } from '../../../lib/api/clients';

const NewClientPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: '',
    speed: '',
    dataLimit: '',
    macAddress: '',
    joinDate: new Date().toISOString().split('T')[0] // Today's date
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.plan) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setLoading(true);

    try {
      const newClient = {
        ...formData,
        speed: parseInt(formData.speed) || 0,
        dataLimit: formData.dataLimit + ' GB',
        paymentStatus: 'pending',
        subscriptionStatus: 'active',
        daysRemaining: 30,
        connected: false,
        dataUsed: '0 GB',
        lastPayment: null,
        nextPayment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };

      await createClient(newClient);

      showToast('Client created successfully!', 'success');
      navigate('/admin/dashboard');
    } catch (error) {
      showToast('Failed to create client. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button
          onClick={() => navigate('/admin/dashboard')}
          variant="ghost"
          className="mr-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Client</h1>
          <p className="text-gray-600">Create a new WiFi client account</p>
        </div>
      </div>

      {/* Form */}
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name *"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter client's full name"
                required
              />

              <Input
                label="Email Address *"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                required
              />

              <Input
                label="Phone Number *"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+254712345678"
                required
              />

              <Input
                label="MAC Address"
                name="macAddress"
                value={formData.macAddress}
                onChange={handleInputChange}
                placeholder="00:1A:2B:3C:4D:5E"
              />
            </div>
          </div>

          {/* Subscription Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plan *
                </label>
                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a plan</option>
                  <option value="20Mbps Basic">20Mbps Basic</option>
                  <option value="50Mbps Premium">50Mbps Premium</option>
                  <option value="100Mbps Business">100Mbps Business</option>
                </select>
              </div>

              <Input
                label="Speed (Mbps)"
                type="number"
                name="speed"
                value={formData.speed}
                onChange={handleInputChange}
                placeholder="50"
                min="1"
              />

              <Input
                label="Data Limit (GB)"
                name="dataLimit"
                value={formData.dataLimit}
                onChange={handleInputChange}
                placeholder="100"
              />

              <Input
                label="Join Date"
                type="date"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/dashboard')}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating Client...' : 'Create Client'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default NewClientPage;
