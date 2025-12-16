'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Phone, MapPin, Users, BookOpen, Building, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const AdminSchoolDetail = () => {
  const params = useParams();
  const router = useRouter();
  const [school, setSchool] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [verificationNotes, setVerificationNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchSchoolData();
  }, [params.id]);

  const fetchSchoolData = async () => {
    try {
      const response = await fetch(`/api/admin/users/${params.id}`);
      const data = await response.json();
      
      if (data.success) {
        setSchool(data.school);
        setUser(data.user);
        setVerificationNotes(data.school.verificationNotes || '');
      }
    } catch (error) {
      console.error('Error fetching school data:', error);
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
      const response = await fetch(`/api/schools/${school._id}`, {
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
        alert(`School ${status} successfully`);
        fetchSchoolData(); // Refresh data
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
        fetchSchoolData(); // Refresh data
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
          <p className="mt-4 text-gray-600">Loading school details...</p>
        </div>
      </div>
    );
  }

  if (!school || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">School Not Found</h2>
          <p className="text-gray-600 mb-6">The school you're looking for doesn't exist.</p>
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
                {school.schoolName?.split(' ').map((n: any[]) => n[0]).join('').toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{school.schoolName}</h1>
                <p className="text-gray-600">
                  {school.schoolType} • {school.ownership} • EMIS: {school.emisCode}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    school.verificationStatus === 'verified' 
                      ? 'bg-green-100 text-green-800'
                      : school.verificationStatus === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {school.verificationStatus?.charAt(0).toUpperCase() + school.verificationStatus?.slice(1)}
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
                <div className="text-2xl font-bold text-gray-900">{school.numberOfStudents?.toLocaleString() || 0}</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{school.numberOfTeachers?.toLocaleString() || 0}</div>
                <div className="text-sm text-gray-600">Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{school.totalOrders || 0}</div>
                <div className="text-sm text-gray-600">Orders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  KSh {(school.totalAmountSpent / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-gray-600">Spent</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - School Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* School Identity */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">School Identity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">School Name</label>
                  <p className="font-medium">{school.schoolName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">School Type</label>
                  <p className="font-medium">{school.schoolType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Ownership</label>
                  <p className="font-medium">{school.ownership}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Registration Number</label>
                  <p className="font-medium">{school.registrationNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">EMIS Code</label>
                  <p className="font-medium">{school.emisCode}</p>
                </div>
                {school.yearEstablished && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Year Established</label>
                    <p className="font-medium">{school.yearEstablished}</p>
                  </div>
                )}
                {school.schoolMotto && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">School Motto</label>
                    <p className="italic text-gray-700">"{school.schoolMotto}"</p>
                  </div>
                )}
                {school.missionStatement && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Mission Statement</label>
                    <p className="text-gray-700">{school.missionStatement}</p>
                  </div>
                )}
                {school.visionStatement && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Vision Statement</label>
                    <p className="text-gray-700">{school.visionStatement}</p>
                  </div>
                )}
              </div>
            </div>

            {/* School Size & Demographics */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">School Size & Demographics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <Users size={32} className="text-red-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900">{school.numberOfStudents?.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <BookOpen size={32} className="text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900">{school.numberOfTeachers?.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Teachers</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Building size={32} className="text-green-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900">{school.numberOfNonTeachingStaff?.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Non-teaching Staff</div>
                </div>
              </div>

              {/* Facilities */}
              {school.facilities && school.facilities.length > 0 && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Facilities</label>
                  <div className="flex flex-wrap gap-2">
                    {school.facilities.map((facility: string) => (
                      <span
                        key={facility}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Curriculum */}
              {school.curriculum && school.curriculum.length > 0 && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Curriculum</label>
                  <div className="flex flex-wrap gap-2">
                    {school.curriculum.map((curriculum: string) => (
                      <span
                        key={curriculum}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {curriculum}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Location Details */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Location Details</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-gray-400" />
                  <div>
                    <p className="font-medium">{school.physicalAddress}</p>
                    <p className="text-sm text-gray-600">
                      {school.townVillage}, {school.ward} Ward
                    </p>
                    <p className="text-sm text-gray-600">
                      {school.subCounty} Sub-county, {school.county} County
                    </p>
                  </div>
                </div>
                {school.googleMapsLink && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Google Maps Location</p>
                    <a 
                      href={school.googleMapsLink}
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

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {(school.principalName || school.principalPhone || school.principalEmail) && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Principal</p>
                      {school.principalName && <p className="font-medium">{school.principalName}</p>}
                      {school.principalPhone && (
                        <div className="flex items-center gap-2 mt-1">
                          <Phone size={16} className="text-gray-400" />
                          <span className="text-sm">{school.principalPhone}</span>
                        </div>
                      )}
                      {school.principalEmail && (
                        <div className="flex items-center gap-2 mt-1">
                          <Mail size={16} className="text-gray-400" />
                          <span className="text-sm">{school.principalEmail}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {school.procurementOfficer?.name && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Procurement Officer</p>
                      <p className="font-medium">{school.procurementOfficer.name}</p>
                      {school.procurementOfficer.designation && (
                        <p className="text-sm text-gray-600">{school.procurementOfficer.designation}</p>
                      )}
                      {school.procurementOfficer.phone && (
                        <div className="flex items-center gap-2 mt-1">
                          <Phone size={16} className="text-gray-400" />
                          <span className="text-sm">{school.procurementOfficer.phone}</span>
                        </div>
                      )}
                      {school.procurementOfficer.email && (
                        <div className="flex items-center gap-2 mt-1">
                          <Mail size={16} className="text-gray-400" />
                          <span className="text-sm">{school.procurementOfficer.email}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Daily Consumption */}
                {school.dailyConsumption && Object.values(school.dailyConsumption).some(v => v !== undefined) && (
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-3">Daily Consumption</p>
                    <div className="space-y-2">
                      {school.dailyConsumption.mealsPerDay && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Meals per day:</span>
                          <span className="font-medium">{school.dailyConsumption.mealsPerDay}</span>
                        </div>
                      )}
                      {school.dailyConsumption.booksPerTerm && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Books per term:</span>
                          <span className="font-medium">{school.dailyConsumption.booksPerTerm}</span>
                        </div>
                      )}
                      {school.dailyConsumption.stationeryPerTerm && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Stationery per term:</span>
                          <span className="font-medium">{school.dailyConsumption.stationeryPerTerm}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
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
                    school.verificationStatus === 'verified' 
                      ? 'bg-green-100 text-green-800'
                      : school.verificationStatus === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {school.verificationStatus?.charAt(0).toUpperCase() + school.verificationStatus?.slice(1)}
                  </div>
                  {school.verifiedAt && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar size={14} />
                      {new Date(school.verifiedAt).toLocaleDateString()}
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
                {school.verificationStatus !== 'verified' && (
                  <button
                    onClick={() => handleVerification('verified')}
                    disabled={actionLoading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle size={20} />
                    Verify School
                  </button>
                )}
                
                {school.verificationStatus !== 'rejected' && (
                  <button
                    onClick={() => handleVerification('rejected')}
                    disabled={actionLoading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <XCircle size={20} />
                    Reject School
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

            {/* Bank Details */}
            {school.bankDetails && Object.values(school.bankDetails).some(Boolean) && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Bank Details</h2>
                <div className="space-y-3">
                  {school.bankDetails.bankName && (
                    <div>
                      <p className="text-sm text-gray-600">Bank Name</p>
                      <p className="font-medium">{school.bankDetails.bankName}</p>
                    </div>
                  )}
                  {school.bankDetails.accountName && (
                    <div>
                      <p className="text-sm text-gray-600">Account Name</p>
                      <p className="font-medium">{school.bankDetails.accountName}</p>
                    </div>
                  )}
                  {school.bankDetails.accountNumber && (
                    <div>
                      <p className="text-sm text-gray-600">Account Number</p>
                      <p className="font-medium">{school.bankDetails.accountNumber}</p>
                    </div>
                  )}
                  {school.bankDetails.branch && (
                    <div>
                      <p className="text-sm text-gray-600">Branch</p>
                      <p className="font-medium">{school.bankDetails.branch}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Activity Log */}
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
                      {school.updatedAt ? new Date(school.updatedAt).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>
                {school.totalOrders > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full grid place-items-center">
                      <BookOpen size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{school.totalOrders} Orders Placed</p>
                      <p className="text-xs text-gray-500">Total procurement activity</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSchoolDetail;