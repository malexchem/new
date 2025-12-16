'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="mt-2 text-gray-600">Manage your account information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-900">{user.firstName}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-900">{user.lastName}</p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-900 capitalize">{user.role}</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.isVerified 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.isVerified ? 'Verified' : 'Pending Verification'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Role-specific information */}
                {user.role === 'supplier' && user.businessName && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-900">{user.businessName}</p>
                    </div>
                  </div>
                )}

                {user.role === 'school' && user.schoolName && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      School Name
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-900">{user.schoolName}</p>
                    </div>
                  </div>
                )}

                {user.role === 'school' && user.emisCode && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      EMIS Code
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-900">{user.emisCode}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Actions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-4 border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors text-left">
                  <div className="font-semibold">Change Password</div>
                  <div className="text-sm text-red-600">Update your password</div>
                </button>

                <button className="p-4 border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors text-left">
                  <div className="font-semibold">Edit Profile</div>
                  <div className="text-sm text-red-600">Update personal information</div>
                </button>

                <button className="p-4 border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors text-left">
                  <div className="font-semibold">Notification Settings</div>
                  <div className="text-sm text-red-600">Manage email preferences</div>
                </button>

                <button className="p-4 border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors text-left">
                  <div className="font-semibold">Privacy & Security</div>
                  <div className="text-sm text-red-600">Manage data and privacy</div>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl grid place-items-center text-white font-semibold text-2xl mx-auto mb-4">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-gray-600 capitalize">{user.role}</p>
                <p className="text-sm text-gray-500 mt-2">{user.email}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="font-semibold mb-4">Account Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className={user.isVerified ? 'text-green-300' : 'text-yellow-300'}>
                    {user.isVerified ? 'Verified' : 'Pending'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Member Since</span>
                  <span>2024</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Login</span>
                  <span>Today</span>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full p-4 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="font-semibold text-center">
                {isLoading ? 'Signing out...' : 'Sign Out'}
              </div>
            </button>

            {/* Support Card */}
            <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
              <h3 className="font-semibold text-red-900 mb-2">Need Help?</h3>
              <p className="text-red-700 text-sm mb-4">
                Contact our support team for assistance with your account.
              </p>
              <button className="w-full py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}