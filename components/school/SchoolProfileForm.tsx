'use client';

import React, { useState } from 'react';

const schoolTypes = ['Primary', 'Secondary', 'University', 'Kindergarten', 'TVET', 'Other'];
const ownershipTypes = ['Public', 'Private', 'Religious', 'Community'];
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
const facilitiesOptions = [
  'Library', 'Laboratory', 'Computer Lab', 'Sports Field',
  'Dining Hall', 'Kitchen', 'Boarding Facilities',
  'Transport', 'Medical Room', 'Playground', 'Dormitories'
];
const curriculumOptions = ['CBC', '8-4-4', 'IGCSE', 'IB', 'American', 'Other'];

interface SchoolProfileFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
}

const SchoolProfileForm: React.FC<SchoolProfileFormProps> = ({ 
  initialData, 
  onSubmit 
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // A. School Identity
    schoolName: initialData?.schoolName || '',
    schoolType: initialData?.schoolType || 'Primary',
    ownership: initialData?.ownership || 'Public',
    registrationNumber: initialData?.registrationNumber || '',
    emisCode: initialData?.emisCode || '',
    yearEstablished: initialData?.yearEstablished || '',
    schoolMotto: initialData?.schoolMotto || '',
    missionStatement: initialData?.missionStatement || '',
    visionStatement: initialData?.visionStatement || '',
    
    // B. Location Details
    county: initialData?.county || '',
    subCounty: initialData?.subCounty || '',
    ward: initialData?.ward || '',
    townVillage: initialData?.townVillage || '',
    physicalAddress: initialData?.physicalAddress || '',
    googleMapsLink: initialData?.googleMapsLink || '',
    
    // C. School Size & Demographics
    numberOfStudents: initialData?.numberOfStudents || '',
    numberOfTeachers: initialData?.numberOfTeachers || '',
    numberOfNonTeachingStaff: initialData?.numberOfNonTeachingStaff || '',
    
    // Consumption Data
    dailyConsumption: initialData?.dailyConsumption || {
      mealsPerDay: '',
      booksPerTerm: '',
      stationeryPerTerm: ''
    },
    
    // Facilities and Curriculum
    facilities: initialData?.facilities || [],
    curriculum: initialData?.curriculum || [],
    
    // Additional Contact Information
    principalName: initialData?.principalName || '',
    principalPhone: initialData?.principalPhone || '',
    principalEmail: initialData?.principalEmail || '',
    
    procurementOfficer: initialData?.procurementOfficer || {
      name: '',
      phone: '',
      email: '',
      designation: ''
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDailyConsumptionChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      dailyConsumption: {
        ...prev.dailyConsumption,
        [field]: value
      }
    }));
  };

  const handleProcurementOfficerChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      procurementOfficer: {
        ...prev.procurementOfficer,
        [field]: value
      }
    }));
  };

  const handleFacilityToggle = (facility: string) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f: string) => f !== facility)
        : [...prev.facilities, facility]
    }));
  };

  const handleCurriculumToggle = (curriculumItem: string) => {
    setFormData(prev => ({
      ...prev,
      curriculum: prev.curriculum.includes(curriculumItem)
        ? prev.curriculum.filter((c: string) => c !== curriculumItem)
        : [...prev.curriculum, curriculumItem]
    }));
  };

  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        return (
          !!formData.schoolName &&
          !!formData.schoolType &&
          !!formData.ownership &&
          !!formData.registrationNumber &&
          !!formData.emisCode
        );
      case 2:
        return (
          !!formData.county &&
          !!formData.subCounty &&
          !!formData.ward &&
          !!formData.townVillage &&
          !!formData.physicalAddress
        );
      case 3:
        return (
          !!formData.numberOfStudents &&
          !!formData.numberOfTeachers &&
          !!formData.numberOfNonTeachingStaff
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
      // Clean up data before submitting
      const submitData = {
        ...formData,
        numberOfStudents: parseInt(formData.numberOfStudents),
        numberOfTeachers: parseInt(formData.numberOfTeachers),
        numberOfNonTeachingStaff: parseInt(formData.numberOfNonTeachingStaff),
        yearEstablished: formData.yearEstablished ? parseInt(formData.yearEstablished) : undefined,
        dailyConsumption: {
          mealsPerDay: formData.dailyConsumption.mealsPerDay ? parseInt(formData.dailyConsumption.mealsPerDay) : undefined,
          booksPerTerm: formData.dailyConsumption.booksPerTerm ? parseInt(formData.dailyConsumption.booksPerTerm) : undefined,
          stationeryPerTerm: formData.dailyConsumption.stationeryPerTerm ? parseInt(formData.dailyConsumption.stationeryPerTerm) : undefined
        }
      };
      onSubmit(submitData);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">School Identity</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Name *
                </label>
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Type *
                </label>
                <select
                  name="schoolType"
                  value={formData.schoolType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                >
                  {schoolTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ownership *
                </label>
                <select
                  name="ownership"
                  value={formData.ownership}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                >
                  {ownershipTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number (MOE) *
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent uppercase"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  EMIS Code *
                </label>
                <input
                  type="text"
                  name="emisCode"
                  value={formData.emisCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent uppercase"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year Established
                </label>
                <input
                  type="number"
                  name="yearEstablished"
                  value={formData.yearEstablished}
                  onChange={handleInputChange}
                  min="1800"
                  max={new Date().getFullYear()}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Motto
                </label>
                <input
                  type="text"
                  name="schoolMotto"
                  value={formData.schoolMotto}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  maxLength={200}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.schoolMotto.length}/200 characters
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mission Statement
                </label>
                <textarea
                  name="missionStatement"
                  value={formData.missionStatement}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  maxLength={500}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.missionStatement.length}/500 characters
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vision Statement
                </label>
                <textarea
                  name="visionStatement"
                  value={formData.visionStatement}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  maxLength={500}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.visionStatement.length}/500 characters
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Location Details</h3>
            
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
                  Sub-county *
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ward *
                </label>
                <input
                  type="text"
                  name="ward"
                  value={formData.ward}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Town/Village *
                </label>
                <input
                  type="text"
                  name="townVillage"
                  value={formData.townVillage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Physical Address *
                </label>
                <input
                  type="text"
                  name="physicalAddress"
                  value={formData.physicalAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="md:col-span-2">
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

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">School Size & Demographics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Students *
                </label>
                <input
                  type="number"
                  name="numberOfStudents"
                  value={formData.numberOfStudents}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Teaching Staff *
                </label>
                <input
                  type="number"
                  name="numberOfTeachers"
                  value={formData.numberOfTeachers}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Non-teaching Staff *
                </label>
                <input
                  type="number"
                  name="numberOfNonTeachingStaff"
                  value={formData.numberOfNonTeachingStaff}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meals per Day (Optional)
                </label>
                <input
                  type="number"
                  value={formData.dailyConsumption.mealsPerDay}
                  onChange={(e) => handleDailyConsumptionChange('mealsPerDay', e.target.value)}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Books per Term (Optional)
                </label>
                <input
                  type="number"
                  value={formData.dailyConsumption.booksPerTerm}
                  onChange={(e) => handleDailyConsumptionChange('booksPerTerm', e.target.value)}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stationery per Term (Optional)
                </label>
                <input
                  type="number"
                  value={formData.dailyConsumption.stationeryPerTerm}
                  onChange={(e) => handleDailyConsumptionChange('stationeryPerTerm', e.target.value)}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facilities Available
                </label>
                <div className="flex flex-wrap gap-2">
                  {facilitiesOptions.map(facility => (
                    <button
                      key={facility}
                      type="button"
                      onClick={() => handleFacilityToggle(facility)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        formData.facilities.includes(facility)
                          ? 'bg-red-100 text-red-700 border border-red-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {facility}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Curriculum
                </label>
                <div className="flex flex-wrap gap-2">
                  {curriculumOptions.map(curriculum => (
                    <button
                      key={curriculum}
                      type="button"
                      onClick={() => handleCurriculumToggle(curriculum)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        formData.curriculum.includes(curriculum)
                          ? 'bg-blue-100 text-blue-700 border border-blue-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {curriculum}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Principal Name
                  </label>
                  <input
                    type="text"
                    name="principalName"
                    value={formData.principalName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Principal Phone
                  </label>
                  <input
                    type="tel"
                    name="principalPhone"
                    value={formData.principalPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Principal Email
                  </label>
                  <input
                    type="email"
                    name="principalEmail"
                    value={formData.principalEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Procurement Officer</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.procurementOfficer.name}
                      onChange={(e) => handleProcurementOfficerChange('name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Designation
                    </label>
                    <input
                      type="text"
                      value={formData.procurementOfficer.designation}
                      onChange={(e) => handleProcurementOfficerChange('designation', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.procurementOfficer.phone}
                      onChange={(e) => handleProcurementOfficerChange('phone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.procurementOfficer.email}
                      onChange={(e) => handleProcurementOfficerChange('email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="text-lg font-medium text-yellow-800 mb-2">Verification Process</h4>
                <p className="text-yellow-700">
                  After submitting this form, our admin team will review your information. 
                  You will be notified via email once your verification is complete. 
                  Verified schools get access to exclusive suppliers and better pricing.
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
            step === 1 ? 'School Identity' :
            step === 2 ? 'Location Details' :
            step === 3 ? 'Size & Demographics' :
            'Contact Information'
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

export default SchoolProfileForm;