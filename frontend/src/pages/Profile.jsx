import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../utils/api';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      fullName: user?.fullName || '',
      mobile: user?.mobile || '',
      address: user?.address || '',
      securityQuestion: user?.securityQuestion || ''
    }
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await userAPI.updateProfile(data);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await userAPI.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      
      toast.success('Password changed successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowChangePassword(false);
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
      console.error('Password change error:', error);
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
            Profile Settings
          </h1>
          <p className="text-gray-600">
            Manage your personal information and account settings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="avatar mb-4">
                  <div className="w-24 rounded-full bg-primary text-primary-content flex items-center justify-center text-2xl font-bold">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <h2 className="card-title justify-center">{user?.username}</h2>
                <p className="text-gray-500">{user?.email}</p>
                <div className="card-actions justify-center mt-4">
                  <button className="btn btn-outline btn-sm">
                    Change Photo
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4">Personal Information</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Full Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
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
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        value={user?.email}
                        className="input input-bordered w-full bg-base-200"
                        disabled
                      />
                      <label className="label">
                        <span className="label-text-alt text-gray-500">
                          Email cannot be changed
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Mobile Number</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      className={`input input-bordered w-full ${errors.mobile ? 'input-error' : ''}`}
                      {...register('mobile', { 
                        required: 'Mobile number is required',
                        pattern: {
                          value: /^[\+]?[1-9][\d]{0,15}$/,
                          message: 'Invalid mobile number'
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
                          Updating...
                        </>
                      ) : (
                        'Update Profile'
                      )}
                    </button>
                  </div>
                </form>

                {/* Change Password Section */}
                <div className="divider">Security</div>
                
                <div className="form-control">
                  <button
                    onClick={() => setShowChangePassword(!showChangePassword)}
                    className="btn btn-outline w-full"
                  >
                    {showChangePassword ? 'Cancel' : 'Change Password'}
                  </button>
                </div>

                {showChangePassword && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 p-4 bg-base-200 rounded-lg"
                  >
                    <h3 className="font-bold mb-4">Change Password</h3>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Current Password</span>
                        </label>
                        <input
                          type="password"
                          placeholder="Enter current password"
                          className="input input-bordered w-full"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({
                            ...passwordForm,
                            currentPassword: e.target.value
                          })}
                          required
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">New Password</span>
                        </label>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          className="input input-bordered w-full"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({
                            ...passwordForm,
                            newPassword: e.target.value
                          })}
                          required
                          minLength="8"
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Confirm New Password</span>
                        </label>
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          className="input input-bordered w-full"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({
                            ...passwordForm,
                            confirmPassword: e.target.value
                          })}
                          required
                          minLength="8"
                        />
                      </div>

                      <div className="form-control mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary w-full"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="loading loading-spinner loading-sm"></span>
                              Changing...
                            </>
                          ) : (
                            'Change Password'
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;




