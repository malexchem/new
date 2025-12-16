'use client';

import React, { useState } from 'react';

const supplierCategories = [
  'Books', 'Uniforms', 'Stationery', 'Furniture', 
  'ICT Equipment', 'Science Lab', 'Sports Equipment',
  'Cleaning Supplies', 'Food & Catering', 'Transport',
  'Construction', 'Other'
];

const counties = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Uasin Gishu',
  'Kiambu', 'Meru', 'Kakamega', 'Bungoma', 'Kisii', 'Migori',
  'Homa Bay', 'Siaya', 'Busia', 'Vihiga', 'Nandi', 'Kericho',
  'Bomet', 'Narok', 'Kajiado', 'Machakos', 'Makueni', 'Kitui',
  'Embu', 'Tharaka Nithi', 'Muranga', 'Nyandarua', 'Nyeri',
  'Kirinyaga', 'Laikipia', 'Turkana', 'West Pokot', 'Samburu',
  'Marsabit', 'Isiolo', 'Garissa', 'Wajir', 'Mandera', 'Tana River',
  'Lamu', 'Taita Taveta', 'Kilifi', 'Kwale', 'Elgeyo Marakwet',
  'Trans Nzoia', 'Baringo', 'Nyamira'
];

interface SupplierProfileFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
}

const SupplierProfileForm: React.FC<SupplierProfileFormProps> = ({ 
  initialData, 
  onSubmit 
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // A. Company Information
    companyName: initialData?.companyName || '',
    businessType: initialData?.businessType || 'Individual',
    supplierCategory: initialData?.supplierCategory || [],
    registrationNumber: initialData?.registrationNumber || '',
    kraPin: initialData?.kraPin || '',
    yearsInOperation: initialData?.yearsInOperation || 0,
    companyBio: initialData?.companyBio || '',
    
    // B. Primary Contact Person
    contactPersonName: initialData?.contactPersonName || '',
    contactPersonTitle: initialData?.contactPersonTitle || '',
    contactPhone: initialData?.contactPhone || '',
    contactEmail: initialData?.contactEmail || '',
    alternativePhone: initialData?.alternativePhone || '',
    
    // C. Business Location
    county: initialData?.county || '',
    subCounty: initialData?.subCounty || '',
    streetAddress: initialData?.streetAddress || '',
    officeNumber: initialData?.officeNumber || '',
    googleMapsLink: initialData?.googleMapsLink || '',
    
    // Additional
    website: initialData?.website || '',
    socialMedia: initialData?.socialMedia || {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    }
  });

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      supplierCategory: prev.supplierCategory.includes(category)
        ? prev.supplierCategory.filter((c: string) => c !== category)
        : [...prev.supplierCategory, category]
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        return (
          !!formData.companyName &&
          !!formData.businessType &&
          formData.supplierCategory.length > 0 &&
          !!formData.registrationNumber &&
          !!formData.kraPin &&
          formData.yearsInOperation > 0
        );
      case 2:
        return (
          !!formData.contactPersonName &&
          !!formData.contactPersonTitle &&
          !!formData.contactPhone &&
          !!formData.contactEmail
        );
      case 3:
        return (
          !!formData.county &&
          !!formData.subCounty &&
          !!formData.streetAddress
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 4));
    } else {
      alert('Please fill all required fields before proceeding.');
    }
  };

  const handlePrevious = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      onSubmit(formData);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Company Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type *
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                >
                  <option value="Individual">Individual</option>
                  <option value="Company">Company</option>
                  <option value="Partnership">Partnership</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supplier Categories *
                </label>
                <div className="flex flex-wrap gap-2">
                  {supplierCategories.map(category => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategoryToggle(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        formData.supplierCategory.includes(category)
                          ? 'bg-red-100 text-red-700 border border-red-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number *
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  KRA PIN Number *
                </label>
                <input
                  type="text"
                  name="kraPin"
                  value={formData.kraPin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent uppercase"
                  pattern="[A-Z]{1}[0-9]{9}[A-Z]{1}"
                  title="Format: A123456789X"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years in Operation *
                </label>
                <input
                  type="number"
                  name="yearsInOperation"
                  value={formData.yearsInOperation}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Bio
                </label>
                <textarea
                  name="companyBio"
                  value={formData.companyBio}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  maxLength={1000}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.companyBio.length}/1000 characters
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Primary Contact Person</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation / Job Title *
                </label>
                <input
                  type="text"
                  name="contactPersonTitle"
                  value={formData.contactPersonTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alternative Phone Number
                </label>
                <input
                  type="tel"
                  name="alternativePhone"
                  value={formData.alternativePhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Location</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  County *
                </label>
                <select
                  name="county"
                  value={formData.county}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                >
                  <option value="">Select County</option>
                  {counties.map(county => (
                    <option key={county} value={county}>{county}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sub-county / Town *
                </label>
                <input
                  type="text"
                  name="subCounty"
                  value={formData.subCounty}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street / Building Name *
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Office Number (Optional)
                </label>
                <input
                  type="text"
                  name="officeNumber"
                  value={formData.officeNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Maps Link (Optional)
                </label>
                <input
                  type="url"
                  name="googleMapsLink"
                  value={formData.googleMapsLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="https://maps.google.com/..."
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Social Media Links (Optional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['facebook', 'twitter', 'linkedin', 'instagram'].map(platform => (
                    <div key={platform}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                        {platform}
                      </label>
                      <input
                        type="url"
                        value={formData.socialMedia[platform as keyof typeof formData.socialMedia] || ''}
                        onChange={(e) => handleSocialMediaChange(platform, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder={`https://${platform}.com/username`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="text-lg font-medium text-yellow-800 mb-2">Verification Process</h4>
                <p className="text-yellow-700">
                  After submitting this form, our admin team will review your information. 
                  You will be notified via email once your verification is complete. 
                  This process typically takes 1-3 business days.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8">
        {[1, 2, 3, 4].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              stepNumber === step
                ? 'bg-red-600 text-white'
                : stepNumber < step
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}>
              {stepNumber}
            </div>
            {stepNumber < 4 && (
              <div className={`w-24 h-1 ${stepNumber < step ? 'bg-green-500' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="text-center mb-6">
        <span className="text-sm font-medium text-gray-600">
          Step {step} of 4: {
            step === 1 ? 'Company Information' :
            step === 2 ? 'Contact Person' :
            step === 3 ? 'Business Location' :
            'Additional Information'
          }
        </span>
      </div>

      {/* Form Content */}
      {renderStep()}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={step === 1}
          className={`px-6 py-2 rounded-lg ${
            step === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>

        {step < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Submit for Verification
          </button>
        )}
      </div>
    </form>
  );
};

export default SupplierProfileForm;