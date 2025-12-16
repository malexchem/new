import mongoose, { Document, Model } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'supplier' | 'school' | 'admin';
  businessName?: string; // For suppliers
  schoolName?: string; // For schools
  emisCode?: string; // For schools
  kraPin?: string; // For suppliers
  certificationDocuments?: string[]; // For suppliers
  county?: string;
  phone?: string;
  isVerified: boolean;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot be more than 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['supplier', 'school', 'admin'],
    default: 'school'
  },
  businessName: {
    type: String,
    required: function(this: IUser) {
      return this.role === 'supplier';
    },
    trim: true
  },
  schoolName: {
    type: String,
    required: function(this: IUser) {
      return this.role === 'school';
    },
    trim: true
  },
  emisCode: {
    type: String,
    required: function(this: IUser) {
      return this.role === 'school';
    },
    trim: true,
    uppercase: true
  },
  kraPin: {
    type: String,
    required: function(this: IUser) {
      return this.role === 'supplier';
    },
    trim: true,
    uppercase: true
  },
  certificationDocuments: [{
    type: String // URLs to uploaded documents
  }],
  county: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[\d\s-]+$/, 'Please enter a valid phone number']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isVerified: 1 });

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);