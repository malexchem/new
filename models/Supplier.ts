import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './User';

export interface ISupplier extends Document {
  userId: mongoose.Types.ObjectId | IUser;
  
  // A. Company Information
  companyName: string;
  businessType: 'Individual' | 'Company' | 'Partnership';
  supplierCategory: string[]; // Array of categories
  registrationNumber: string;
  kraPin: string;
  yearsInOperation: number;
  companyBio?: string;
  
  // B. Primary Contact Person
  contactPersonName: string;
  contactPersonTitle: string;
  contactPhone: string;
  contactEmail: string;
  alternativePhone?: string;
  
  // C. Business Location
  county: string;
  subCounty: string;
  streetAddress: string;
  officeNumber?: string;
  googleMapsLink?: string;
  
  // Additional fields
  website?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  
  // Verification & Status
  isVerified: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verificationNotes?: string;
  verifiedAt?: Date;
  verifiedBy?: mongoose.Types.ObjectId;
  
  // Statistics (will be updated by orders/products)
  totalProducts?: number;
  completedOrders?: number;
  averageRating?: number;
  
  createdAt: Date;
  updatedAt: Date;
}

const supplierSchema = new Schema<ISupplier>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  // A. Company Information
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  businessType: {
    type: String,
    required: [true, 'Business type is required'],
    enum: ['Individual', 'Company', 'Partnership'],
    default: 'Individual'
  },
  supplierCategory: [{
    type: String,
    required: [true, 'At least one category is required'],
    enum: [
      'Books', 'Uniforms', 'Stationery', 'Furniture', 
      'ICT Equipment', 'Science Lab', 'Sports Equipment',
      'Cleaning Supplies', 'Food & Catering', 'Transport',
      'Construction', 'Other'
    ]
  }],
  registrationNumber: {
    type: String,
    required: [true, 'Registration number is required'],
    trim: true,
    uppercase: true
  },
  kraPin: {
    type: String,
    required: [true, 'KRA PIN is required'],
    trim: true,
    uppercase: true,
    match: [/^[A-Z]{1}[0-9]{9}[A-Z]{1}$/, 'Please enter a valid KRA PIN']
  },
  yearsInOperation: {
    type: Number,
    required: [true, 'Years in operation is required'],
    min: [0, 'Years cannot be negative']
  },
  companyBio: {
    type: String,
    maxlength: [1000, 'Company bio cannot exceed 1000 characters']
  },
  
  // B. Primary Contact Person
  contactPersonName: {
    type: String,
    required: [true, 'Contact person name is required'],
    trim: true
  },
  contactPersonTitle: {
    type: String,
    required: [true, 'Contact person title is required'],
    trim: true
  },
  contactPhone: {
    type: String,
    required: [true, 'Contact phone is required'],
    trim: true,
    match: [/^\+?[\d\s-]+$/, 'Please enter a valid phone number']
  },
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  alternativePhone: {
    type: String,
    trim: true
  },
  
  // C. Business Location
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
  streetAddress: {
    type: String,
    required: [true, 'Street address is required'],
    trim: true
  },
  officeNumber: {
    type: String,
    trim: true
  },
  googleMapsLink: {
    type: String,
    trim: true,
    match: [/^https?:\/\/(www\.)?google\.[a-z]+\/maps/, 'Please enter a valid Google Maps link']
  },
  
  // Additional fields
  website: {
    type: String,
    trim: true
  },
  socialMedia: {
    facebook: String,
    twitter: String,
    linkedin: String,
    instagram: String
  },
  
  // Verification & Status
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
  
  // Statistics
  totalProducts: {
    type: Number,
    default: 0
  },
  completedOrders: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  }
}, {
  timestamps: true
});

// Indexes for better query performance
supplierSchema.index({ userId: 1 });
supplierSchema.index({ companyName: 1 });
supplierSchema.index({ county: 1 });
supplierSchema.index({ supplierCategory: 1 });
supplierSchema.index({ verificationStatus: 1 });
supplierSchema.index({ isVerified: 1 });

export const Supplier: Model<ISupplier> = mongoose.models.Supplier || mongoose.model<ISupplier>('Supplier', supplierSchema);