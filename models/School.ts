import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './User';

export interface ISchool extends Document {
  userId: mongoose.Types.ObjectId | IUser;
  
  // A. School Identity
  schoolName: string;
  schoolType: 'Primary' | 'Secondary' | 'University' | 'Kindergarten' | 'TVET' | 'Other';
  ownership: 'Public' | 'Private' | 'Religious' | 'Community';
  registrationNumber: string;
  emisCode: string;
  yearEstablished?: number;
  schoolMotto?: string;
  missionStatement?: string;
  visionStatement?: string;
  
  // B. Location Details
  county: string;
  subCounty: string;
  ward: string;
  townVillage: string;
  physicalAddress: string;
  googleMapsLink?: string;
  
  // C. School Size & Demographics
  numberOfStudents: number;
  numberOfTeachers: number;
  numberOfNonTeachingStaff: number;
  
  // Consumption Data (for procurement planning)
  dailyConsumption?: {
    mealsPerDay?: number;
    booksPerTerm?: number;
    uniformsPerClass?: Record<string, number>; // e.g., { "Class 1": 45, "Class 2": 50 }
    stationeryPerTerm?: number;
  };
  
  // Academic Information
  curriculum?: string[];
  streamsPerClass?: Record<string, number>; // e.g., { "Form 1": 4, "Form 2": 3 }
  facilities?: string[];
  
  // Contact Information (Additional)
  principalName?: string;
  principalPhone?: string;
  principalEmail?: string;
  accountsContact?: {
    name?: string;
    phone?: string;
    email?: string;
  };
  
  // Procurement Information
  procurementOfficer?: {
    name?: string;
    phone?: string;
    email?: string;
    designation?: string;
  };
  
  // Bank Details (optional for payments)
  bankDetails?: {
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
    branch?: string;
  };
  
  // Status & Verification
  isVerified: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verificationNotes?: string;
  verifiedAt?: Date;
  verifiedBy?: mongoose.Types.ObjectId;
  
  // Procurement Statistics
  totalOrders?: number;
  totalAmountSpent?: number;
  activeSuppliers?: number;
  pendingDeliveries?: number;
  
  createdAt: Date;
  updatedAt: Date;
}

const schoolSchema = new Schema<ISchool>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  // A. School Identity
  schoolName: {
    type: String,
    required: [true, 'School name is required'],
    trim: true
  },
  schoolType: {
    type: String,
    required: [true, 'School type is required'],
    enum: ['Primary', 'Secondary', 'University', 'Kindergarten', 'TVET', 'Other'],
    default: 'Primary'
  },
  ownership: {
    type: String,
    required: [true, 'Ownership is required'],
    enum: ['Public', 'Private', 'Religious', 'Community'],
    default: 'Public'
  },
  registrationNumber: {
    type: String,
    required: [true, 'Registration number is required'],
    trim: true,
    uppercase: true
  },
  emisCode: {
    type: String,
    required: [true, 'EMIS code is required'],
    trim: true,
    uppercase: true,
    unique: true
  },
  yearEstablished: {
    type: Number,
    min: [1800, 'Year must be reasonable'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  schoolMotto: {
    type: String,
    maxlength: [200, 'Motto cannot exceed 200 characters']
  },
  missionStatement: {
    type: String,
    maxlength: [500, 'Mission statement cannot exceed 500 characters']
  },
  visionStatement: {
    type: String,
    maxlength: [500, 'Vision statement cannot exceed 500 characters']
  },
  
  // B. Location Details
  county: {
    type: String,
    required: [true, 'County is required'],
    trim: true
  },
  subCounty: {
    type: String,
    required: [true, 'Sub-county is required'],
    trim: true
  },
  ward: {
    type: String,
    required: [true, 'Ward is required'],
    trim: true
  },
  townVillage: {
    type: String,
    required: [true, 'Town/Village is required'],
    trim: true
  },
  physicalAddress: {
    type: String,
    required: [true, 'Physical address is required'],
    trim: true
  },
  googleMapsLink: {
    type: String,
    trim: true,
    match: [/^https?:\/\/(www\.)?google\.[a-z]+\/maps/, 'Please enter a valid Google Maps link']
  },
  
  // C. School Size & Demographics
  numberOfStudents: {
    type: Number,
    required: [true, 'Number of students is required'],
    min: [1, 'Number of students must be at least 1']
  },
  numberOfTeachers: {
    type: Number,
    required: [true, 'Number of teachers is required'],
    min: [0, 'Number of teachers cannot be negative']
  },
  numberOfNonTeachingStaff: {
    type: Number,
    required: [true, 'Number of non-teaching staff is required'],
    min: [0, 'Number of non-teaching staff cannot be negative']
  },
  
  // Consumption Data
  dailyConsumption: {
    mealsPerDay: Number,
    booksPerTerm: Number,
    uniformsPerClass: Schema.Types.Mixed,
    stationeryPerTerm: Number
  },
  
  // Academic Information
  curriculum: [{
    type: String,
    enum: ['CBC', '8-4-4', 'IGCSE', 'IB', 'American', 'Other']
  }],
  streamsPerClass: Schema.Types.Mixed,
  facilities: [{
    type: String,
    enum: [
      'Library', 'Laboratory', 'Computer Lab', 'Sports Field',
      'Dining Hall', 'Kitchen', 'Boarding Facilities',
      'Transport', 'Medical Room', 'Playground', 'Dormitories'
    ]
  }],
  
  // Contact Information
  principalName: {
    type: String,
    trim: true
  },
  principalPhone: {
    type: String,
    trim: true,
    match: [/^\+?[\d\s-]+$/, 'Please enter a valid phone number']
  },
  principalEmail: {
    type: String,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  accountsContact: {
    name: String,
    phone: String,
    email: String
  },
  
  // Procurement Information
  procurementOfficer: {
    name: String,
    phone: String,
    email: String,
    designation: String
  },
  
  // Bank Details
  bankDetails: {
    bankName: String,
    accountName: String,
    accountNumber: String,
    branch: String
  },
  
  // Status & Verification
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verificationNotes: String,
  verifiedAt: Date,
  verifiedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Procurement Statistics
  totalOrders: {
    type: Number,
    default: 0
  },
  totalAmountSpent: {
    type: Number,
    default: 0
  },
  activeSuppliers: {
    type: Number,
    default: 0
  },
  pendingDeliveries: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
schoolSchema.index({ userId: 1 });
schoolSchema.index({ emisCode: 1 }, { unique: true });
schoolSchema.index({ schoolName: 1 });
schoolSchema.index({ county: 1 });
schoolSchema.index({ schoolType: 1 });
schoolSchema.index({ ownership: 1 });
schoolSchema.index({ verificationStatus: 1 });
schoolSchema.index({ isVerified: 1 });

// Compound index for common queries
schoolSchema.index({ county: 1, subCounty: 1 });
schoolSchema.index({ schoolType: 1, ownership: 1 });

export const School: Model<ISchool> = mongoose.models.School || mongoose.model<ISchool>('School', schoolSchema);