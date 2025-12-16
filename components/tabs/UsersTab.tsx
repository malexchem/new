/*const UsersTab = ({ role }: { role: string }) => {
  // Dummy users data
  const users = [
    {
      id: 1,
      name: "EduLab Kenya",
      email: "contact@edulab.co.ke",
      type: "Supplier",
      status: "Verified",
      joinDate: "2023-05-15",
      orders: 142,
      rating: 4.8,
      revenue: "KSh 24.5M",
      category: "Lab Equipment",
      badge: "Top Rated"
    },
    {
      id: 2,
      name: "Green Valley High School",
      email: "procurement@greenvalley.sc.ke",
      type: "School",
      status: "Active",
      joinDate: "2023-08-22",
      orders: 34,
      rating: 4.9,
      revenue: "KSh 8.7M",
      category: "Secondary",
      badge: "Premium"
    },
    {
      id: 3,
      name: "SportPro Kenya",
      email: "sales@sportpro.co.ke",
      type: "Supplier",
      status: "Verified",
      joinDate: "2023-11-30",
      orders: 89,
      rating: 4.6,
      revenue: "KSh 12.3M",
      category: "Sports",
      badge: "Rising"
    },
    {
      id: 4,
      name: "Sunrise Primary School",
      email: "info@sunriseprimary.sc.ke",
      type: "School",
      status: "Active",
      joinDate: "2024-01-08",
      orders: 12,
      rating: 4.7,
      revenue: "KSh 2.1M",
      category: "Primary",
      badge: "New"
    },
    {
      id: 5,
      name: "TechEdu Solutions",
      email: "hello@techedu.co.ke",
      type: "Supplier",
      status: "Pending",
      joinDate: "2024-01-12",
      orders: 5,
      rating: 4.5,
      revenue: "KSh 980K",
      category: "Technology",
      badge: null
    },
    {
      id: 6,
      name: "Curriculum Masters",
      email: "info@curriculum.co.ke",
      type: "Supplier",
      status: "Suspended",
      joinDate: "2023-09-10",
      orders: 23,
      rating: 3.8,
      revenue: "KSh 3.4M",
      category: "Curriculum",
      badge: null
    }
  ];

  const userStats = [
    { label: "Total Users", value: "1,247", change: "+18%" },
    { label: "Suppliers", value: "245", change: "+12%" },
    { label: "Schools", value: "892", change: "+23%" },
    { label: "Active Now", value: "156", change: "+8%" }
  ];

  const statusColors = {
    Verified: "bg-green-100 text-green-800",
    Active: "bg-blue-100 text-blue-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Suspended: "bg-red-100 text-red-800"
  };

  const badgeColors = {
    "Top Rated": "bg-purple-100 text-purple-800",
    "Premium": "bg-yellow-100 text-yellow-800",
    "Rising": "bg-green-100 text-green-800",
    "New": "bg-blue-100 text-blue-800"
  };

  return (
    <div className="space-y-6">
      {/* User Statistics *
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm p-6 border border-red-50">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search *
      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold text-sm">
              All Users
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50">
              Suppliers
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50">
              Schools
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50">
              Pending
            </button>
          </div>
          
          <div className="flex gap-3 flex-1 lg:flex-initial max-w-md">
            <input
              type="text"
              placeholder="Search users..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500">
              <option>Sort by: Newest</option>
              <option>Sort by: Activity</option>
              <option>Sort by: Revenue</option>
              <option>Sort by: Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Grid *
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden group">
            <div className="p-6">
              {/* Header *
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl grid place-items-center text-white font-semibold text-lg">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                      {user.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{user.email}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  statusColors[user.status as keyof typeof statusColors]
                }`}>
                  {user.status}
                </span>
              </div>

              {/* Badge *
              {user.badge && (
                <div className="mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    badgeColors[user.badge as keyof typeof badgeColors]
                  }`}>
                    {user.badge}
                  </span>
                </div>
              )}

              {/* Details *
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium text-gray-900">{user.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium text-gray-900">{user.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Join Date:</span>
                  <span className="font-medium text-gray-900">{user.joinDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Orders:</span>
                  <span className="font-medium text-gray-900">{user.orders}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-medium text-gray-900">{user.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Revenue:</span>
                  <span className="font-bold text-red-600">{user.revenue}</span>
                </div>
              </div>

              {/* Actions *
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button className="flex-1 px-3 py-2 border border-red-600 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                  View Profile
                </button>
                <button className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                  Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Platform Growth *
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-xl p-8 text-white">
        <h3 className="text-xl font-bold mb-6">Platform Growth Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold">1.2K</div>
            <div className="text-red-200 text-sm">Total Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">247</div>
            <div className="text-red-200 text-sm">Suppliers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">892</div>
            <div className="text-red-200 text-sm">Schools</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">98%</div>
            <div className="text-red-200 text-sm">Active Rate</div>
          </div>
        </div>
      </div>

      {/* Quick Actions *
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 border text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-red-600">👥</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">User Management</h3>
          <p className="text-gray-600 text-sm">Approve and manage user accounts</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 border text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-red-600">📊</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
          <p className="text-gray-600 text-sm">View detailed user analytics</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 border text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-red-600">🛡️</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Verification</h3>
          <p className="text-gray-600 text-sm">Manage user verification status</p>
        </div>
      </div>
    </div>
  );
};

export default UsersTab;*/

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'Supplier' | 'School';
  status: string;
  joinDate: string;
  orders: number;
  rating: string;
  revenue: string;
  category: string;
  badge: string | null;
  userData: any;
  additionalData: any;
  verificationStatus: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface Statistics {
  totalUsers: number;
  totalSuppliers: number;
  totalSchools: number;
  activeNow: number;
}

const UsersTab = ({ role }: { role: string }) => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1
  });
  const [statistics, setStatistics] = useState<Statistics>({
    totalUsers: 0,
    totalSuppliers: 0,
    totalSchools: 0,
    activeNow: 0
  });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    role: 'all',
    status: 'all',
    search: '',
    sort: 'newest'
  });
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState('');

  const statusColors: Record<string, string> = {
    Verified: "bg-green-100 text-green-800",
    Active: "bg-blue-100 text-blue-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Rejected: "bg-red-100 text-red-800",
    Inactive: "bg-gray-100 text-gray-800"
  };

  const badgeColors: Record<string, string> = {
    "Top Rated": "bg-purple-100 text-purple-800",
    "Premium": "bg-yellow-100 text-yellow-800",
    "Rising": "bg-green-100 text-green-800",
    "New": "bg-blue-100 text-blue-800"
  };

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        ...filters,
        page: page.toString(),
        limit: pagination.limit.toString()
      }).toString();

      const response = await fetch(`/api/admin/users?${queryParams}`);
      const data = await response.json();

      if (response.ok) {
        setUsers(data.users);
        setPagination(data.pagination);
        setStatistics(data.statistics);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('search', e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleFilterChange('sort', e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchUsers(newPage);
    }
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user.id));
    }
  };

  const performBulkAction = async () => {
    if (!bulkAction || selectedUsers.length === 0) return;

    try {
      const response = await fetch('/api/admin/verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userIds: selectedUsers,
          action: bulkAction,
          notes: `Bulk ${bulkAction} action performed by admin`
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        alert(data.message);
        setSelectedUsers([]);
        setBulkAction('');
        fetchUsers(pagination.page); // Refresh data
      }
    } catch (error) {
      console.error('Error performing bulk action:', error);
      alert('Failed to perform bulk action');
    }
  };

  const handleViewProfile = (user: User) => {
    if (user.type === 'Supplier') {
      router.push(`/admin/suppliers/${user.id}`);
    } else {
      router.push(`/admin/schools/${user.id}`);
    }
  };

  const userStats = [
    { label: "Total Users", value: statistics.totalUsers.toLocaleString(), change: "+18%" },
    { label: "Suppliers", value: statistics.totalSuppliers.toLocaleString(), change: "+12%" },
    { label: "Schools", value: statistics.totalSchools.toLocaleString(), change: "+23%" },
    { label: "Active Now", value: statistics.activeNow.toLocaleString(), change: "+8%" }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-6 border border-red-50 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm p-6 border border-red-50">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-yellow-800 font-medium">
                {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex gap-3 flex-wrap">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Select Action</option>
                <option value="verify">Verify Selected</option>
                <option value="reject">Reject Selected</option>
                <option value="activate">Activate Selected</option>
                <option value="deactivate">Deactivate Selected</option>
              </select>
              <button
                onClick={performBulkAction}
                disabled={!bulkAction}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium text-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply Action
              </button>
              <button
                onClick={() => setSelectedUsers([])}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleFilterChange('role', 'all')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filters.role === 'all'
                  ? 'bg-red-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Users
            </button>
            <button
              onClick={() => handleFilterChange('role', 'supplier')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filters.role === 'supplier'
                  ? 'bg-red-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Suppliers
            </button>
            <button
              onClick={() => handleFilterChange('role', 'school')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filters.role === 'school'
                  ? 'bg-red-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Schools
            </button>
            <button
              onClick={() => handleFilterChange('status', 'pending')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filters.status === 'pending'
                  ? 'bg-red-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Pending
            </button>
          </div>
          
          <div className="flex gap-3 flex-1 lg:flex-initial max-w-md">
            <input
              type="text"
              placeholder="Search users..."
              value={filters.search}
              onChange={handleSearch}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <select
              value={filters.sort}
              onChange={handleSortChange}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="newest">Sort by: Newest</option>
              <option value="oldest">Sort by: Oldest</option>
              <option value="name">Sort by: Name</option>
              <option value="activity">Sort by: Activity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden group">
            <div className="p-6">
              {/* Header with checkbox */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleUserSelect(user.id)}
                    className="h-5 w-5 text-red-600 rounded focus:ring-red-500"
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl grid place-items-center text-white font-semibold text-lg">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                        {user.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{user.email}</p>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  statusColors[user.status] || 'bg-gray-100 text-gray-800'
                }`}>
                  {user.status}
                </span>
              </div>

              {/* Badge */}
              {user.badge && (
                <div className="mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    badgeColors[user.badge] || 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.badge}
                  </span>
                </div>
              )}

              {/* Details */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium text-gray-900">{user.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium text-gray-900">{user.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Join Date:</span>
                  <span className="font-medium text-gray-900">{user.joinDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Orders:</span>
                  <span className="font-medium text-gray-900">{user.orders}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-medium text-gray-900">{user.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Revenue:</span>
                  <span className="font-bold text-red-600">{user.revenue}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleViewProfile(user)}
                  className="flex-1 px-3 py-2 border border-red-600 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                >
                  View Profile
                </button>
                <button
                  onClick={() => {
                    // Handle message (you can implement this later)
                    console.log('Message user:', user.email);
                  }}
                  className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 py-6">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              let pageNum;
              if (pagination.totalPages <= 5) {
                pageNum = i + 1;
              } else if (pagination.page <= 3) {
                pageNum = i + 1;
              } else if (pagination.page >= pagination.totalPages - 2) {
                pageNum = pagination.totalPages - 4 + i;
              } else {
                pageNum = pagination.page - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium ${
                    pagination.page === pageNum
                      ? 'bg-red-600 text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Platform Growth */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-xl p-8 text-white">
        <h3 className="text-xl font-bold mb-6">Platform Growth Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold">{statistics.totalUsers.toLocaleString()}</div>
            <div className="text-red-200 text-sm">Total Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{statistics.totalSuppliers.toLocaleString()}</div>
            <div className="text-red-200 text-sm">Suppliers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{statistics.totalSchools.toLocaleString()}</div>
            <div className="text-red-200 text-sm">Schools</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">
              {statistics.totalUsers > 0 
                ? Math.round((statistics.activeNow / statistics.totalUsers) * 100) 
                : 0}%
            </div>
            <div className="text-red-200 text-sm">Active Rate</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => router.push('/admin/verification')}
          className="bg-white rounded-2xl shadow-sm p-6 border text-center hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-red-600">🛡️</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Verification</h3>
          <p className="text-gray-600 text-sm">Manage user verification status</p>
        </div>
        
        <div 
          onClick={() => router.push('/admin/analytics')}
          className="bg-white rounded-2xl shadow-sm p-6 border text-center hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-red-600">📊</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
          <p className="text-gray-600 text-sm">View detailed user analytics</p>
        </div>
        
        <div 
          onClick={() => router.push('/admin/reports')}
          className="bg-white rounded-2xl shadow-sm p-6 border text-center hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-red-600">📋</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Reports</h3>
          <p className="text-gray-600 text-sm">Generate and view reports</p>
        </div>
      </div>
    </div>
  );
};

export default UsersTab;