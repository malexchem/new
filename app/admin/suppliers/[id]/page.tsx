'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Phone, MapPin, Globe, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const AdminSupplierDetail = () => {
  const params = useParams();
  const router = useRouter();
  const [supplier, setSupplier] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [verificationNotes, setVerificationNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchSupplierData();
  }, [params.id]);

  const fetchSupplierData = async () => {
    try {
      const response = await fetch(`/api/admin/users/${params.id}`);
      const data = await response.json();
      
      if (data.success) {
        setSupplier(data.supplier);
        setUser(data.user);
        setVerificationNotes(data.supplier.verificationNotes || '');
      }
    } catch (error) {
      console.error('Error fetching supplier data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (status: 'verified' | 'rejected') => {
    if (!verificationNotes && status === 'rejected') {
      alert('Please provide verification notes for rejection');
      return;
    }

    setActionLoading(true);
    try {
      const response = await fetch(`/api/suppliers/${supplier._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verificationStatus: status,
          verificationNotes
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        alert(`Supplier ${status} successfully`);
        fetchSupplierData(); // Refresh data
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error updating verification:', error);
      alert('Failed to update verification');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUserStatus = async (status: boolean) => {
    setActionLoading(true);
    try {
      const response = await fetch(`/api/admin/users/${user._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: status
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        alert(`User ${status ? 'activated' : 'deactivated'} successfully`);
        fetchSupplierData(); // Refresh data
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Failed to update user status');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Loading supplier details...</p>
        </div>
      </div>
    );
  }

  if (!supplier || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Supplier Not Found</h2>
          <p className="text-gray-600 mb-6">The supplier you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/admin/users')}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => router.push('/admin/users')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Users
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl grid place-items-center text-white font-bold text-2xl">
                {user.businessName?.split(' ').map((n: any[]) => n[0]).join('').toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.businessName}</h1>
                <p className="text-gray-600">
                  {supplier.businessType} • {supplier.supplierCategory?.join(', ')}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    supplier.verificationStatus === 'verified' 
                      ? 'bg-green-100 text-green-800'
                      : supplier.verificationStatus === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {supplier.verificationStatus?.charAt(0).toUpperCase() + supplier.verificationStatus?.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.isActive
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{supplier.totalProducts || 0}</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{supplier.completedOrders || 0}</div>
                <div className="text-sm text-gray-600">Orders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{supplier.averageRating?.toFixed(1) || 'N/A'}</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{supplier.yearsInOperation || 0}</div>
                <div className="text-sm text-gray-600">Years</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Company Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Company Name</label>
                  <p className="font-medium">{supplier.companyName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Business Type</label>
                  <p className="font-medium">{supplier.businessType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Registration Number</label>
                  <p className="font-medium">{supplier.registrationNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">KRA PIN</label>
                  <p className="font-medium">{supplier.kraPin}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Supplier Categories</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {supplier.supplierCategory?.map((category: string) => (
                      <span
                        key={category}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                {supplier.companyBio && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Company Bio</label>
                    <p className="text-gray-700 mt-2">{supplier.companyBio}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{supplier.contactEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={20} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{supplier.contactPhone}</p>
                    </div>
                  </div>
                  {supplier.alternativePhone && (
                    <div className="flex items-center gap-3">
                      <Phone size={20} className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Alternative Phone</p>
                        <p className="font-medium">{supplier.alternativePhone}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Contact Person</p>
                    <p className="font-medium">{supplier.contactPersonName}</p>
                    <p className="text-sm text-gray-600">{supplier.contactPersonTitle}</p>
                  </div>
                  {supplier.website && (
                    <div className="flex items-center gap-3">
                      <Globe size={20} className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Website</p>
                        <a 
                          href={supplier.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-red-600 hover:text-red-700"
                        >
                          {supplier.website}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Business Location */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Business Location</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-gray-400" />
                  <div>
                    <p className="font-medium">{supplier.streetAddress}</p>
                    <p className="text-sm text-gray-600">
                      {supplier.townVillage}, {supplier.county} County
                    </p>
                    <p className="text-sm text-gray-600">{supplier.subCounty} Sub-county</p>
                  </div>
                </div>
                {supplier.googleMapsLink && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Google Maps Location</p>
                    <a 
                      href={supplier.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      View on Google Maps
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Social Media */}
            {supplier.socialMedia && Object.values(supplier.socialMedia).some(Boolean) && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Social Media</h2>
                <div className="flex flex-wrap gap-4">
                  {supplier.socialMedia.facebook && (
                    <a 
                      href={supplier.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      <span className="text-lg">📘</span>
                      <span>Facebook</span>
                    </a>
                  )}
                  {supplier.socialMedia.twitter && (
                    <a 
                      href={supplier.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-500"
                    >
                      <span className="text-lg">🐦</span>
                      <span>Twitter</span>
                    </a>
                  )}
                  {supplier.socialMedia.linkedin && (
                    <a 
                      href={supplier.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-700 hover:text-blue-800"
                    >
                      <span className="text-lg">💼</span>
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {supplier.socialMedia.instagram && (
                    <a 
                      href={supplier.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-pink-600 hover:text-pink-700"
                    >
                      <span className="text-lg">📸</span>
                      <span>Instagram</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Admin Actions */}
          <div className="space-y-6">
            {/* Admin Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Admin Actions</h2>
              
              {/* Verification Status */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Status
                </label>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    supplier.verificationStatus === 'verified' 
                      ? 'bg-green-100 text-green-800'
                      : supplier.verificationStatus === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {supplier.verificationStatus?.charAt(0).toUpperCase() + supplier.verificationStatus?.slice(1)}
                  </div>
                  {supplier.verifiedAt && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar size={14} />
                      {new Date(supplier.verifiedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Notes
                </label>
                <textarea
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Add verification notes..."
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {supplier.verificationStatus !== 'verified' && (
                  <button
                    onClick={() => handleVerification('verified')}
                    disabled={actionLoading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle size={20} />
                    Verify Supplier
                  </button>
                )}
                
                {supplier.verificationStatus !== 'rejected' && (
                  <button
                    onClick={() => handleVerification('rejected')}
                    disabled={actionLoading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <XCircle size={20} />
                    Reject Supplier
                  </button>
                )}

                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    User Status
                  </label>
                  <div className="flex gap-2">
                    {user.isActive ? (
                      <button
                        onClick={() => handleUserStatus(false)}
                        disabled={actionLoading}
                        className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Deactivate User
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUserStatus(true)}
                        disabled={actionLoading}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Activate User
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* User Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">User Account</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-medium">{user.firstName} {user.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Created</p>
                  <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                {user.lastLogin && (
                  <div>
                    <p className="text-sm text-gray-600">Last Login</p>
                    <p className="font-medium">{new Date(user.lastLogin).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Activity Log (Placeholder) */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full grid place-items-center">
                    <Clock size={16} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Profile Updated</p>
                    <p className="text-xs text-gray-500">
                      {supplier.updatedAt ? new Date(supplier.updatedAt).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>
                {/* Add more activity items as needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSupplierDetail;