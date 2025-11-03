import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import OTPInput from '../components/OTPInput';

const VerifyOtp = () => {
  const { verifyOTP, resendOTP, loading } = useAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleOTPComplete = async (completedOtp) => {
    try {
      await verifyOTP({ otp: completedOtp });
      navigate('/login');
    } catch (error) {
      console.error('OTP verification error:', error);
    }
  };

  const handleResendOTP = async () => {
    try {
      await resendOTP();
      setTimeLeft(60);
      setCanResend(false);
    } catch (error) {
      console.error('Resend OTP error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-6xl mb-4">📱</div>
              <h1 className="card-title text-2xl justify-center mb-2">
                Verify Your Account
              </h1>
              <p className="text-gray-600 mb-6">
                Enter the 6-digit code sent to your email/phone
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <OTPInput
                length={6}
                value={otp}
                onChange={setOtp}
                onComplete={handleOTPComplete}
                disabled={loading}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 space-y-4"
            >
              <button
                onClick={() => handleOTPComplete(otp)}
                className="btn btn-primary w-full"
                disabled={otp.length !== 6 || loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Verifying...
                  </>
                ) : (
                  'Verify OTP'
                )}
              </button>

              <div className="text-center">
                {canResend ? (
                  <button
                    onClick={handleResendOTP}
                    className="btn btn-outline btn-sm"
                    disabled={loading}
                  >
                    Resend OTP
                  </button>
                ) : (
                  <p className="text-sm text-gray-500">
                    Resend OTP in {timeLeft}s
                  </p>
                )}
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Didn't receive the code? Check your spam folder or{' '}
                  <button
                    onClick={handleResendOTP}
                    className="link link-primary"
                    disabled={!canResend || loading}
                  >
                    try again
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;




