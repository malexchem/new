'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import SchoolProfileForm from '@/components/school/SchoolProfileForm';

const UpdateSchoolProfile = () => {
  const [schoolData, setSchoolData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user?.role !== 'school') {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user?.role === 'school') {
      fetchSchoolData();
    }
  }, [user]);

  const fetchSchoolData = async () => {
    try {
      const response = await fetch('/api/schools');
      const data = await response.json();
      
      if (data.school) {
        setSchoolData(data.school);
      }
    } catch (error) {
      console.error('Error fetching school data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch('/api/schools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('School profile updated successfully!');
        router.push('/school/dashboard');
      } else {
        alert(`Error: ${data.error || 'Failed to update profile'}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Network error. Please try again.');
    }
  };

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (user?.role !== 'school') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Update School Profile</h1>
          <p className="text-gray-600 mt-2">
            Complete your school profile to access full procurement features
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <SchoolProfileForm 
            initialData={schoolData}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateSchoolProfile;