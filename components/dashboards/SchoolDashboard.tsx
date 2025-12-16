/*const SchoolDashboard = ({ userData }: { userData: any }) => {
  const stats = [
    { label: 'Total Orders', value: userData.orders, change: '+15%' },
    { label: 'Amount Spent', value: `KSh ${(userData.spent / 1000).toFixed(0)}K`, change: '+23%' },
    { label: 'Active Suppliers', value: 12, change: '+3' },
    { label: 'Pending Deliveries', value: 3, change: '-1' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {userData.name}!</h2>
        <p className="text-gray-600">EMIS: {userData.emisCode} • Procurement Dashboard</p>
        
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Procurement</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((order) => (
              <div key={order} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Chemistry Lab Equipment</p>
                  <p className="text-sm text-gray-600">Supplier: EduLab Kenya • KSh 87,500</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Delivered
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-red-50 rounded-lg text-red-700 font-medium hover:bg-red-100 transition-colors">
              Request Quotation
            </button>
            <button className="p-4 bg-red-50 rounded-lg text-red-700 font-medium hover:bg-red-100 transition-colors">
              Browse Catalog
            </button>
            <button className="p-4 bg-red-50 rounded-lg text-red-700 font-medium hover:bg-red-100 transition-colors">
              Track Orders
            </button>
            <button className="p-4 bg-red-50 rounded-lg text-red-700 font-medium hover:bg-red-100 transition-colors">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDashboard;*/

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const SchoolDashboard = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const [schoolData, setSchoolData] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role !== 'school') {
      router.push('/unauthorized');
      return;
    }

    fetchSchoolData();
  }, [user, isLoading]);

  const fetchSchoolData = async () => {
    try {
      const res = await fetch('/api/schools', {
        credentials: 'include', // 🔥 required
      });

      if (res.status === 401) {
        router.push('/login');
        return;
      }

      const data = await res.json();

      if (data.hasSchoolData) {
        setSchoolData(data.school);
      } else {
        setSchoolData(null);
      }
    } catch (err) {
      console.error('Failed to load school data', err);
    } finally {
      setLoadingData(false);
    }
  };

  if (isLoading || loadingData) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (!schoolData) {
    return (
      <div className="p-6">
        <p className="mb-4">You haven’t completed your school profile yet.</p>
        <button
          onClick={() => router.push('/school/profile/update')}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Complete School Profile
        </button>
      </div>
    );
  }

  const stats = [
    { label: 'Total Orders', value: schoolData.totalOrders || 0, change: '+15%' },
    {
      label: 'Amount Spent',
      value: `KSh ${
        schoolData.totalAmountSpent
          ? (schoolData.totalAmountSpent / 1000).toFixed(0) + 'K'
          : '0'
      }`,
      change: '+23%',
    },
    { label: 'Active Suppliers', value: schoolData.activeSuppliers || 0, change: '+3' },
    { label: 'Pending Deliveries', value: schoolData.pendingDeliveries || 0, change: '-1' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome, {user?.email} 👋
            </h2>
            {/*<p className="text-gray-600">
              EMIS: {user.emisCode} • {user.schoolName}
            </p>*/}
          </div>

          <button
            onClick={() => router.push('/school/profile/update')}
            className="bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            Update School Profile
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

export default SchoolDashboard;
