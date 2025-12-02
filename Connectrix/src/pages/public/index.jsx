import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Connectrix
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your network management solution.
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/login">
            <Button size="lg" className="w-full">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
