import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="text-9xl font-bold text-primary mb-4">404</div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4">
          <Link to="/" className="btn btn-primary btn-lg">
            Go Home
          </Link>
          <div className="text-sm text-gray-500">
            <p>Or try one of these pages:</p>
            <div className="flex justify-center gap-4 mt-2">
              <Link to="/login" className="link link-primary">Login</Link>
              <Link to="/register" className="link link-primary">Register</Link>
              <Link to="/dashboard" className="link link-primary">Dashboard</Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;




