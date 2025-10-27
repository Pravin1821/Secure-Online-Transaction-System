import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password', '');

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength < 2) return 'weak';
    if (strength < 4) return 'medium';
    return 'strong';
  };

  const getPasswordStrengthText = (strength) => {
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Medium';
    return 'Strong';
  };

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      navigate('/verify-otp');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="text-center">
              <div className="text-8xl mb-6 animate-bounce-gentle">🚀</div>
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Join Secure Transaction
              </h2>
              <p className="text-gray-600 text-lg">
                Create your account and start making secure transactions in minutes
              </p>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="card bg-base-100 shadow-xl"
          >
            <div className="card-body">
              <h1 className="card-title text-2xl mb-6">Create Account</h1>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className={`input input-bordered w-full ${errors.fullName ? 'input-error' : ''}`}
                      {...register('fullName', { required: 'Full name is required' })}
                    />
                    {errors.fullName && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.fullName.message}
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Username</span>
                    </label>
                    <input
                      type="text"
                      placeholder="johndoe"
                      className={`input input-bordered w-full ${errors.username ? 'input-error' : ''}`}
                      {...register('username', { 
                        required: 'Username is required',
                        minLength: { value: 3, message: 'Username must be at least 3 characters' }
                      })}
                    />
                    {errors.username && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.username.message}
                        </span>
                      </label>
                    )}
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.email.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Mobile Number</span>
                  </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className={`input input-bordered w-full ${errors.mobile ? 'input-error' : ''}`}
                      {...register('mobile', { 
                        required: 'Mobile number is required',
                        pattern: {
                          value: /^[\+]?91[6-9]\d{9}$/,
                          message: 'Invalid Indian mobile number'
                        }
                      })}
                    />
                  {errors.mobile && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.mobile.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      className={`input input-bordered w-full pr-10 ${errors.password ? 'input-error' : ''}`}
                      {...register('password', { 
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' }
                      })}
                      onChange={(e) => {
                        const strength = calculatePasswordStrength(e.target.value);
                        setPasswordStrength(strength);
                      }}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  
                  {password && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <div className="password-strength bg-gray-200 rounded-full h-2">
                            <div
                              className={`password-strength ${getPasswordStrengthColor(passwordStrength)} h-2 rounded-full transition-all duration-300`}
                              style={{ width: `${(passwordStrength / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium">
                          {getPasswordStrengthText(passwordStrength)}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {errors.password && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.password.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm password"
                      className={`input input-bordered w-full pr-10 ${errors.confirmPassword ? 'input-error' : ''}`}
                      {...register('confirmPassword', { 
                        required: 'Please confirm your password',
                        validate: value => value === password || 'Passwords do not match'
                      })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.confirmPassword.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Address</span>
                  </label>
                  <textarea
                    placeholder="Enter your address"
                    className={`textarea textarea-bordered w-full ${errors.address ? 'input-error' : ''}`}
                    {...register('address', { required: 'Address is required' })}
                  />
                  {errors.address && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.address.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Security Question</span>
                  </label>
                  <select
                    className={`select select-bordered w-full ${errors.securityQuestion ? 'input-error' : ''}`}
                    {...register('securityQuestion', { required: 'Security question is required' })}
                  >
                    <option value="">Select a security question</option>
                    <option value="What was the name of your first pet?">What was the name of your first pet?</option>
                    <option value="What was the name of the street you grew up on?">What was the name of the street you grew up on?</option>
                    <option value="What was your mother's maiden name?">What was your mother's maiden name?</option>
                    <option value="What was the name of your first school?">What was the name of your first school?</option>
                  </select>
                  {errors.securityQuestion && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.securityQuestion.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="link link-primary">
                      Login here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
