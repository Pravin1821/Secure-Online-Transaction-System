import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { securityAPI } from '../utils/api';
import { toast } from 'react-toastify';
import OTPInput from '../components/OTPInput';

const Security = () => {
  const { user } = useAuth();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorType, setTwoFactorType] = useState('email');
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    // Check if 2FA is already enabled
    // This would typically come from the user profile
    setTwoFactorEnabled(user?.twoFactorEnabled || false);
  }, [user]);

  const handleEnable2FA = async (type) => {
    try {
      setLoading(true);
      const response = await securityAPI.enable2FA(type);
      
      if (type === 'authenticator') {
        setQrCode(response.qrCode);
      }
      
      setTwoFactorType(type);
      setShowOTPVerification(true);
      toast.success('2FA setup initiated. Please verify with OTP.');
    } catch (error) {
      toast.error(error.message || 'Failed to enable 2FA');
      console.error('Enable 2FA error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    try {
      setLoading(true);
      await securityAPI.disable2FA();
      setTwoFactorEnabled(false);
      toast.success('2FA disabled successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to disable 2FA');
      console.error('Disable 2FA error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (completedOtp) => {
    try {
      setLoading(true);
      await securityAPI.verify2FA(completedOtp);
      setTwoFactorEnabled(true);
      setShowOTPVerification(false);
      setOtp('');
      toast.success('2FA enabled successfully!');
    } catch (error) {
      toast.error(error.message || 'OTP verification failed');
      console.error('OTP verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Security Settings
          </h1>
          <p className="text-gray-600">
            Manage your account security and authentication settings
          </p>
        </motion.div>

        {/* Two-Factor Authentication */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card bg-base-100 shadow-xl mb-6"
        >
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="card-title">Two-Factor Authentication</h2>
                <p className="text-gray-600">
                  Add an extra layer of security to your account
                </p>
              </div>
              <div className={`badge ${twoFactorEnabled ? 'badge-success' : 'badge-warning'}`}>
                {twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </div>
            </div>

            {!twoFactorEnabled ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Choose your preferred 2FA method:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="card bg-base-200">
                    <div className="card-body">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">📧</div>
                        <div>
                          <h3 className="font-bold">Email OTP</h3>
                          <p className="text-sm text-gray-600">
                            Receive OTP via email
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleEnable2FA('email')}
                        className="btn btn-primary btn-sm mt-2"
                        disabled={loading}
                      >
                        Enable Email OTP
                      </button>
                    </div>
                  </div>

                  <div className="card bg-base-200">
                    <div className="card-body">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">📱</div>
                        <div>
                          <h3 className="font-bold">SMS OTP</h3>
                          <p className="text-sm text-gray-600">
                            Receive OTP via SMS
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleEnable2FA('sms')}
                        className="btn btn-primary btn-sm mt-2"
                        disabled={loading}
                      >
                        Enable SMS OTP
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-200">
                  <div className="card-body">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">🔐</div>
                      <div>
                        <h3 className="font-bold">Authenticator App</h3>
                        <p className="text-sm text-gray-600">
                          Use Google Authenticator or similar app
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEnable2FA('authenticator')}
                      className="btn btn-primary btn-sm mt-2"
                      disabled={loading}
                    >
                      Enable Authenticator
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="alert alert-success">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✅</span>
                    <div>
                      <h3 className="font-bold">2FA is enabled</h3>
                      <p className="text-sm">
                        Your account is protected with two-factor authentication
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleDisable2FA}
                    className="btn btn-error btn-sm"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      'Disable 2FA'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* OTP Verification Modal */}
        {showOTPVerification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <div className="card bg-base-100 shadow-xl max-w-md w-full">
              <div className="card-body text-center">
                <h2 className="card-title justify-center mb-4">
                  Verify OTP
                </h2>
                
                {twoFactorType === 'authenticator' && qrCode && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Scan this QR code with your authenticator app:
                    </p>
                    <div className="flex justify-center">
                      <div className="bg-white p-4 rounded-lg">
                        <img src={qrCode} alt="QR Code" className="w-32 h-32" />
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-gray-600 mb-4">
                  Enter the 6-digit code from your {twoFactorType === 'email' ? 'email' : 
                  twoFactorType === 'sms' ? 'SMS' : 'authenticator app'}
                </p>

                <OTPInput
                  length={6}
                  value={otp}
                  onChange={setOtp}
                  onComplete={handleVerifyOTP}
                  disabled={loading}
                />

                <div className="flex gap-2 mt-6">
                  <button
                    onClick={() => {
                      setShowOTPVerification(false);
                      setOtp('');
                    }}
                    className="btn btn-outline flex-1"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleVerifyOTP(otp)}
                    className="btn btn-primary flex-1"
                    disabled={otp.length !== 6 || loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      'Verify'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Security Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card bg-base-100 shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title mb-4">Security Tips</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🔒</div>
                <div>
                  <h3 className="font-bold">Strong Passwords</h3>
                  <p className="text-sm text-gray-600">
                    Use a combination of letters, numbers, and symbols
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-2xl">🔄</div>
                <div>
                  <h3 className="font-bold">Regular Updates</h3>
                  <p className="text-sm text-gray-600">
                    Change your password regularly and keep your app updated
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-2xl">📱</div>
                <div>
                  <h3 className="font-bold">Secure Devices</h3>
                  <p className="text-sm text-gray-600">
                    Only use trusted devices and networks for transactions
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-2xl">👀</div>
                <div>
                  <h3 className="font-bold">Monitor Activity</h3>
                  <p className="text-sm text-gray-600">
                    Regularly check your transaction history for any suspicious activity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Security;



