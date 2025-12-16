import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import { User } from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { firstName, lastName, email, password, role, businessName, schoolName, emisCode, kraPin, county, phone } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !role) {
      return NextResponse.json(
        { message: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Validate role-specific fields
    if (role === 'supplier' && !businessName) {
      return NextResponse.json(
        { message: 'Business name is required for suppliers' },
        { status: 400 }
      );
    }

    if (role === 'school' && (!schoolName || !emisCode)) {
      return NextResponse.json(
        { message: 'School name and EMIS code are required for schools' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      businessName: role === 'supplier' ? businessName : undefined,
      schoolName: role === 'school' ? schoolName : undefined,
      emisCode: role === 'school' ? emisCode : undefined,
      kraPin: role === 'supplier' ? kraPin : undefined,
      county,
      phone,
      isVerified: role === 'admin' // Auto-verify admins
    });

    // Return user without password
    const userResponse = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      businessName: user.businessName,
      schoolName: user.schoolName,
      emisCode: user.emisCode,
      isVerified: user.isVerified
    };

    return NextResponse.json(
      { message: 'User registered successfully', user: userResponse },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}