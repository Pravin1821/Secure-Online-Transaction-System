import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TransactionTable from '../components/TransactionTable';
import { transactionAPI } from '../utils/api';
import { toast } from 'react-toastify';

const Transactions = () => {
  const [filters, setFilters] = useState({
    period: 'all',
    status: 'all',
    type: 'all'
  });
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const exportTransactions = async () => {
    try {
      setLoading(true);
      const response = await transactionAPI.getTransactions({ 
        ...filters, 
        export: true 
      });
      
      // Create and download CSV
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Date,Type,Description,Amount,Status\n" +
        response.data.map(t => 
          `${t.createdAt},${t.type},${t.description},${t.amount},${t.status}`
        ).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "transactions.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Transactions exported successfully!');
    } catch (error) {
      toast.error('Failed to export transactions');
      console.error('Export error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Transaction History
          </h1>
          <p className="text-gray-600">
            View and manage your transaction history
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card bg-base-100 shadow-xl mb-6"
        >
          <div className="card-body">
            <h2 className="card-title mb-4">Filters</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Time Period</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={filters.period}
                  onChange={(e) => handleFilterChange('period', e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Type</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="send">Send</option>
                  <option value="receive">Receive</option>
                  <option value="deposit">Deposit</option>
                  <option value="withdrawal">Withdrawal</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Actions</span>
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={exportTransactions}
                    className="btn btn-outline btn-sm flex-1"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      'Export CSV'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transaction Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TransactionTable filters={filters} />
        </motion.div>
      </div>
    </div>
  );
};

export default Transactions;




