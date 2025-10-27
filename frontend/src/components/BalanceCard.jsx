import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { transactionAPI } from '../utils/api';
import { formatIndianCurrency, formatToIndianSystem } from '../utils/currency';
import { toast } from 'react-toastify';

const BalanceCard = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await transactionAPI.getBalance();
        setBalance(response);
      } catch (error) {
        toast.error('Failed to fetch balance');
        console.error('Balance fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  if (loading) {
    return (
      <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="card-body">
          <div className="flex items-center justify-center">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-xl"
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="card-title text-white">Account Balance</h2>
            <p className="text-2xl font-bold">
              {formatIndianCurrency(balance?.amount || 0)}
            </p>
            <p className="text-sm opacity-80">
              Last updated: {new Date(balance?.lastUpdated || Date.now()).toLocaleDateString()}
            </p>
          </div>
          <div className="text-6xl opacity-20">
            💰
          </div>
        </div>
        
        <div className="card-actions justify-end mt-4">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title text-white opacity-80">Available</div>
              <div className="stat-value text-white">
                {formatIndianCurrency(balance?.available || 0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BalanceCard;
