import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { transactionAPI } from '../utils/api';
import { formatIndianCurrency } from '../utils/currency';
import BalanceCard from '../components/BalanceCard';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transactionForm, setTransactionForm] = useState({
    receiverAccount: '',
    amount: '',
    description: ''
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [balanceResponse, transactionsResponse] = await Promise.all([
          transactionAPI.getBalance(),
          transactionAPI.getTransactions({ limit: 5 })
        ]);
        
        setBalance(balanceResponse);
        setRecentTransactions(transactionsResponse.data || []);
      } catch (error) {
        toast.error('Failed to load dashboard data');
        console.error('Dashboard data fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleSendMoney = async (e) => {
    e.preventDefault();
    
    if (!transactionForm.receiverAccount || !transactionForm.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const response = await transactionAPI.sendMoney(transactionForm);
      toast.success('Transaction sent successfully!');
      
      // Reset form
      setTransactionForm({
        receiverAccount: '',
        amount: '',
        description: ''
      });
      
      // Refresh balance
      const balanceResponse = await transactionAPI.getBalance();
      setBalance(balanceResponse);
      
    } catch (error) {
      toast.error(error.message || 'Failed to send money');
      console.error('Send money error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-gray-600">
            Here's an overview of your account activity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Balance Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <BalanceCard />
          </motion.div>

          {/* Quick Transaction Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4">Quick Transfer</h2>
                <form onSubmit={handleSendMoney} className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Receiver Account</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter account number or email"
                      className="input input-bordered w-full"
                      value={transactionForm.receiverAccount}
                      onChange={(e) => setTransactionForm({
                        ...transactionForm,
                        receiverAccount: e.target.value
                      })}
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Amount</span>
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="input input-bordered w-full"
                      value={transactionForm.amount}
                      onChange={(e) => setTransactionForm({
                        ...transactionForm,
                        amount: e.target.value
                      })}
                      required
                      min="0.01"
                      step="0.01"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Description (Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="What's this for?"
                      className="input input-bordered w-full"
                      value={transactionForm.description}
                      onChange={(e) => setTransactionForm({
                        ...transactionForm,
                        description: e.target.value
                      })}
                    />
                  </div>

                  <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary w-full">
                      Send Money
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <h2 className="card-title">Recent Transactions</h2>
                <button className="btn btn-outline btn-sm">
                  View All
                </button>
              </div>

              {recentTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-gray-500">No recent transactions</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((transaction, index) => (
                        <motion.tr
                          key={transaction.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <td>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">
                                {transaction.type === 'send' ? '📤' : '📥'}
                              </span>
                              <span className="capitalize">{transaction.type}</span>
                            </div>
                          </td>
                          <td>
                            <div className="font-medium">{transaction.description}</div>
                            <div className="text-sm text-gray-500">
                              ID: {transaction.id}
                            </div>
                          </td>
                          <td>
                            <div className={`font-bold ${
                              transaction.type === 'send' 
                                ? 'text-red-600' 
                                : 'text-green-600'
                            }`}>
                              {transaction.type === 'send' ? '-' : '+'}
                              {formatIndianCurrency(transaction.amount || 0)}
                            </div>
                          </td>
                          <td>
                            <div className={`badge ${
                              transaction.status === 'completed' 
                                ? 'badge-success' 
                                : transaction.status === 'pending'
                                ? 'badge-warning'
                                : 'badge-error'
                            }`}>
                              {transaction.status}
                            </div>
                          </td>
                          <td>
                            <div className="text-sm">
                              {new Date(transaction.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
