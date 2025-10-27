import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Hero Section */}
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold text-gradient mb-6">
                Secure Transaction
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                India's Most Trusted Digital Payment Platform - Fast, Secure and Easy
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="card glass-card shadow-soft"
            >
              <div className="card-body">
                <h2 className="card-title justify-center mb-6">
                  Get Started Today
                </h2>
                
                <div className="flex flex-col gap-4">
                  <Link to="/login" className="btn btn-primary btn-lg">
                    Login to Your Account
                  </Link>
                  <Link to="/register" className="btn btn-outline btn-lg">
                    Create New Account
                  </Link>
                </div>

                <div className="divider">or</div>

                <div className="text-sm text-gray-500">
                  <p>Already have an account?</p>
                  <Link to="/login" className="link link-primary">
                    Sign in here
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center">
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="card-title justify-center">Secure</h3>
                  <p>Bank-level encryption and security protocols</p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="card-title justify-center">Fast</h3>
                  <p>Instant transactions with real-time processing</p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center">
                  <div className="text-4xl mb-4">🇮🇳</div>
                  <h3 className="card-title justify-center">Indian</h3>
                  <p>Send and receive money across India</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed top-20 left-10 animate-float">
        <div className="w-20 h-20 bg-primary-200 rounded-full opacity-20"></div>
      </div>
      <div className="fixed top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-16 h-16 bg-secondary-200 rounded-full opacity-20"></div>
      </div>
      <div className="fixed bottom-20 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-24 h-24 bg-accent-200 rounded-full opacity-20"></div>
      </div>
    </div>
  );
};

export default Home;
