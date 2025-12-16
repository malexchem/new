import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { User } from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Get user from cookie (simplified - use proper session management)
    const cookie = request.cookies.get('user');
    
    if (!cookie) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const userData = JSON.parse(cookie.value);
    
    // Verify user still exists and is active
    const user = await User.findById(userData.id).select('-password');
    if (!user || !user.isActive) {
      const response = NextResponse.json({ user: null }, { status: 200 });
      response.cookies.delete('user');
      return response;
    }

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

    return NextResponse.json({ user: userResponse }, { status: 200 });
  } catch (error) {
    console.error('Me endpoint error:', error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}