"use client";

import { useState } from 'react';
import Head from 'next/head';
import { useAuth } from '@/contexts/AuthContext';
import SupplierDashboard from '@/components/dashboards/SupplierDashboard';
import SchoolDashboard from '@/components/dashboards/SchoolDashboard';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import ProductsTab from '@/components/tabs/ProductsTab';
import OrdersTab from '@/components/tabs/OrdersTab';
import SupportTab from '@/components/tabs/SupportTab';
import Login from './login/page';
import HomeTab from '@/components/tabs/HomeTab';
import AnalyticsTab from '@/components/tabs/Analytics';
import Link from 'next/link';
import UsersTab from '@/components/tabs/UsersTab';
import PaymentsTab from '@/components/tabs/PaymentsTab';
import SuppliersTab from '@/components/tabs/SuppliersTab';
import SchoolsTab from '@/components/tabs/SchoolsTab';

// Dummy data
const dummyUsers = {
  supplier: {
    name: "EduSupplies Ltd",
    type: "Verified Supplier",
    products: 47,
    completedOrders: 128,
    rating: 4.8
  },
  school: {
    name: "Green Valley High School",
    type: "Secondary School",
    emisCode: "EMIS-234567",
    orders: 23,
    spent: 450000
  },
  admin: {
    name: "WestEd Admin",
    type: "Platform Administrator",
    users: 245,
    transactions: 1200
  }
};

export default function Home() {
  const { user, isLoading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');

const navItems = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'products', label: 'Products', icon: '📦' },
  ...(user?.role === 'school' ? [{ id: 'suppliers', label: 'Suppliers', icon: '🏢' }] : []),
  ...(user?.role === 'supplier' ? [{ id: 'schools', label: 'Schools', icon: '🏫' }] : []),
  { id: 'orders', label: 'Orders', icon: '🛒' },
  { id: 'payments', label: 'Payments', icon: '💳' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
  ...(user?.role === 'admin' ? [{ id: 'users', label: 'Users', icon: '👥' }] : []),
  { id: 'support', label: 'Support', icon: '🛟' },
];
/*userData={dummyUsers.supplier}*/
  const renderDashboard = () => {
    if (!user) return null;
    switch (user.role) {
      case 'supplier': return <SupplierDashboard  />;
      case 'school': return <SchoolDashboard />;
      case 'admin': return <AdminDashboard userData={dummyUsers.admin} />;
      default: return <SupplierDashboard  />;
    }
  };

const renderTabContent = () => {
  if (!user) return null;
  switch (activeTab) {
    case 'home': return <HomeTab user={user} />;
    case 'dashboard': return renderDashboard();
    case 'products': return <ProductsTab role={user.role} />;
    case 'suppliers': return <SuppliersTab />;
    case 'schools': return <SchoolsTab />;
    case 'orders': return <OrdersTab role={user.role} />;
    case 'payments': return <PaymentsTab role={user.role} />;
    case 'analytics': return <AnalyticsTab role={user.role} />;
    case 'support': return <SupportTab role={user.role} />;
    case 'users': return <UsersTab role={user.role} />;
    default: return <HomeTab user={user} />;
  }
};

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red" />
      </div>
    );
  }

  if (!user) return <Login />;

  return (
    <>
      <Head>
        <title>WestEd Systems | Education Procurement Platform</title>
        <meta name="description" content="Modern education procurement and supply chain platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50 flex">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-red-600 pt-5 pb-4 overflow-y-auto shadow-xl">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="w-10 h-10 bg-white rounded-lg grid place-items-center shadow-md">
                <span className="text-red-600 font-bold text-lg font-serif">W</span>
              </div>
              <h1 className="ml-3 text-white text-xl font-bold font-serif">WestEd</h1>
            </div>

            {/* User Info */}
            <div className="px-4 mt-6">
              <div className="bg-red-500 rounded-lg p-4 text-white shadow-md">
                <p className="font-semibold text-sm capitalize">{user.role}</p>
                <p className="text-xs opacity-90 mt-1">
                  {user.role === 'supplier' ? dummyUsers.supplier.name :
                   user.role === 'school' ? dummyUsers.school.name :
                   dummyUsers.admin.name}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="mt-8 flex-1 px-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-white text-red-600 shadow-lg transform scale-105'
                      : 'text-red-100 hover:bg-red-700 hover:text-white hover:shadow-md'
                  }`}
                >
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Support & Logout */}
            <div className="px-4 mt-auto space-y-4">
              <div className="bg-red-700 text-white p-4 rounded-xl shadow-md">
                <p className="text-sm font-medium">Platform Support</p>
                <p className="text-xs mt-1">24/7 dedicated assistance</p>
                <button
                  onClick={() => setActiveTab('support')}
                  className="mt-3 w-full bg-white text-red-600 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get Help
                </button>
              </div>
              <button
                onClick={logout}
                className="w-full text-left text-red-100 hover:text-white text-sm font-medium py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </aside>

        {/* MOBILE SIDEBAR */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-gray-600/75"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
            <aside className="relative max-w-full w-64 h-full bg-red-600 flex flex-col shadow-2xl">
              <div className="flex items-center px-4 pt-5">
                <div className="w-10 h-10 bg-white rounded-lg grid place-items-center">
                  <span className="text-red-600 font-bold text-lg font-serif">W</span>
                </div>
                <h1 className="ml-3 text-white text-xl font-bold font-serif">WestEd</h1>
                <button
                  type="button"
                  className="ml-auto rounded-md p-2 text-red-200 hover:text-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="mt-8 px-4 space-y-2 flex-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                      activeTab === item.id
                        ? 'bg-white text-red-600 shadow-lg'
                        : 'text-red-100 hover:bg-red-700 hover:text-white'
                    }`}
                  >
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </aside>
          </div>
        )}

        {/* MAIN AREA */}
        <div className="lg:pl-64 flex flex-col flex-1 w-full">
          {/* Header */}
          <header className="bg-white shadow-sm sticky top-0 z-10 border-b">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center flex-1">
                  <button
                    className="lg:hidden rounded-md p-2 text-gray-600 hover:text-red-600"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <span className="sr-only">Open sidebar</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>

                  <div className="ml-4 lg:ml-0 w-full lg:max-w-sm">
                    <label htmlFor="search" className="sr-only">Search</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        id="search"
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products, orders, suppliers..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex items-center space-x-4">
                    {/* Add Product/Request */}
                    {(user.role === 'supplier' || user.role === 'school') && (
                      <button
                        type="button"
                        onClick={() => {
                          if (user.role === 'supplier') {
                            // Navigate to add product
                          } else {
                            // Navigate to create request
                          }
                        }}
                        className="bg-red-50 p-2 rounded-lg text-red-600 hover:bg-red-100 transition-colors shadow-sm"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    )}

                    {/* Messages */}
                    <button type="button" className="bg-gray-50 p-2 rounded-lg text-gray-600 hover:text-red-600 transition-colors shadow-sm">
                      <span className="sr-only">Messages</span>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </button>

                    {/* Notifications */}
                    <button type="button" className="bg-gray-50 p-2 rounded-lg text-gray-600 hover:text-red-600 transition-colors shadow-sm relative">
                      <span className="sr-only">Notifications</span>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                        3
                      </span>
                    </button>

                    {/* Avatar */}
                    <Link href="/profile" className="relative cursor-pointer">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl grid place-items-center text-white font-semibold shadow-md">
                        {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                      </div>
                      <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 border-2 border-white" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="px-4 sm:px-6 lg:px-8 py-6">
              {renderTabContent()}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}