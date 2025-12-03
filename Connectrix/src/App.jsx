import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { ProtectedRoute } from './contexts/AuthContext';

// Pages
import HomePage from './pages/public/index';
import LoginPage from './pages/auth/login';
import AdminDashboard from './pages/admin/Dashboard';
import NewClientPage from './pages/admin/clients/new';
import ClientDashboard from './pages/client/dashboard';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import ClientLayout from './layouts/ClientLayout';

function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="clients/new" element={<NewClientPage />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* Client Routes */}
            <Route path="/client" element={
              <ProtectedRoute allowedRoles={['client']}>
                <ClientLayout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<ClientDashboard />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
