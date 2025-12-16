/*const SupplierDashboard = ({ userData }: { userData: any }) => {
  const stats = [
    { label: 'Total Products', value: userData.products, change: '+12%' },
    { label: 'Completed Orders', value: userData.completedOrders, change: '+8%' },
    { label: 'Supplier Rating', value: userData.rating, change: '+0.2' },
    { label: 'Pending Orders', value: 8, change: '-2' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {userData.name}!</h2>
        <p className="text-gray-600">Here's your business overview</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-red-50 to-white p-6 rounded-xl border border-red-100">
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <div className="flex items-baseline mt-2">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <span className="ml-2 text-sm font-medium text-green-600">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((order) => (
              <div key={order} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Order #WES{1000 + order}</p>
                  <p className="text-sm text-gray-600">KSh 45,200 • 5 items</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  Processing
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
          <div className="space-y-4">
            {['Science Lab Kits', 'Sports Equipment', 'ICT Devices'].map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-medium">{product}</span>
                <span className="text-red-600 font-semibold">24 sales</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;*/

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const SupplierDashboard = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const [userData, setUserData] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(true);

  // 🔐 Guard: wait for auth
  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role !== 'supplier') {
      router.push('/unauthorized');
      return;
    }

    fetchSupplierData();
  }, [user, isLoading]);

  const fetchSupplierData = async () => {
    try {
      const res = await fetch('/api/suppliers', {
        credentials: 'include', // 🔥 VERY IMPORTANT
      });

      if (res.status === 401) {
        router.push('/login');
        return;
      }

      const data = await res.json();

      if (data.hasSupplierData) {
        setUserData(data.supplier);
      } else {
        setUserData(null);
      }
    } catch (err) {
      console.error('Failed to load supplier data', err);
    } finally {
      setLoadingData(false);
    }
  };

  if (isLoading || loadingData) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (!userData) {
    return (
      <div className="p-6">
        <p className="mb-4">You haven’t completed your supplier profile yet.</p>
        <button
          onClick={() => router.push('/supplier/profile/update')}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Complete Profile
        </button>
      </div>
    );
  }

  const stats = [
    { label: 'Total Products', value: userData.products || 0, change: '+12%' },
    { label: 'Completed Orders', value: userData.completedOrders || 0, change: '+8%' },
    { label: 'Supplier Rating', value: userData.rating || 'N/A', change: '+0.2' },
    { label: 'Pending Orders', value: 8, change: '-2' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome back, {user?.email} 👋
            </h2>
            {/*<p className="text-gray-600">
              Business: {user.businessName || userData.businessName}
            </p>*/}
          </div>

          <button
            onClick={() => router.push('/supplier/profile/update')}
            className="bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            Update Business Profile
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-red-50 to-white p-6 rounded-xl border"
            >
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
              <span className="text-sm text-green-600">{stat.change}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
