import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { transactionAPI } from '../utils/api';
import { formatIndianCurrency } from '../utils/currency';
import { toast } from 'react-toastify';

const TransactionTable = ({ filters = {} }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await transactionAPI.getTransactions({
          page: currentPage,
          ...filters
        });
        setTransactions(response.data || []);
        setTotalPages(response.totalPages || 1);
      } catch (error) {
        toast.error('Failed to fetch transactions');
        console.error('Transactions fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [currentPage, filters]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'badge-success';
      case 'pending':
        return 'badge-warning';
      case 'failed':
        return 'badge-error';
      default:
        return 'badge-neutral';
    }
  };

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'send':
        return '📤';
      case 'receive':
        return '📥';
      case 'deposit':
        return '💰';
      case 'withdrawal':
        return '💸';
      default:
        return '💳';
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="flex items-center justify-center py-8">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div className="card-body">
        <h2 className="card-title">Transaction History</h2>
        
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-gray-500">No transactions found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <motion.tr
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <td>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">
                            {getTypeIcon(transaction.type)}
                          </span>
                          <span className="capitalize">{transaction.type}</span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-gray-500">
                            ID: {transaction.id}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={`font-bold ${
                          transaction.type === 'send' || transaction.type === 'withdrawal' 
                            ? 'text-red-600' 
                            : 'text-green-600'
                        }`}>
                          {transaction.type === 'send' || transaction.type === 'withdrawal' ? '-' : '+'}
                          {formatIndianCurrency(transaction.amount || 0)}
                        </div>
                      </td>
                      <td>
                        <div className={`badge ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </div>
                      </td>
                      <td>
                        <div className="text-sm">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                          <br />
                          <span className="text-gray-500">
                            {new Date(transaction.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                      </td>
                      <td>
                        <button className="btn btn-ghost btn-sm">
                          View Details
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <div className="join">
                  <button
                    className="join-item btn"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    «
                  </button>
                  <button className="join-item btn btn-active">
                    {currentPage}
                  </button>
                  <button
                    className="join-item btn"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    »
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default TransactionTable;
