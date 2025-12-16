/*import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { User } from '@/models/User';
import { School } from '@/models/School';
import { Supplier } from '@/models/Supplier';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    // 🔐 Read user cookie (same as /me)
    const cookie = request.cookies.get('user');
    if (!cookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userData = JSON.parse(cookie.value);

    // 🔍 Verify admin
    const admin = await User.findById(userData.id);
    if (!admin || !admin.isActive) {
      const res = NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      res.cookies.delete('user');
      return res;
    }

    if (admin.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // ==============================
    // FIND USER
    // ==============================
    const user = await User.findById(params.id).select('-password');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let additionalData = null;

    if (user.role === 'supplier') {
      additionalData = await Supplier.findOne({ userId: user._id });
    } else if (user.role === 'school') {
      additionalData = await School.findOne({ userId: user._id });
    }

    return NextResponse.json({
      success: true,
      user,
      [user.role === 'supplier' ? 'supplier' : 'school']: additionalData,
    });

  } catch (error: any) {
    console.error('Error fetching user details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user details' },
      { status: 500 }
    );
  }
}*/

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { User } from '@/models/User';
import { School } from '@/models/School';
import { Supplier } from '@/models/Supplier';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params;

    // 🔐 Read user cookie
    const cookie = request.cookies.get('user');
    if (!cookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userData = JSON.parse(cookie.value);

    // 🔍 Verify admin
    const admin = await User.findById(userData.id);
    if (!admin || !admin.isActive) {
      const res = NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      res.cookies.delete('user');
      return res;
    }

    if (admin.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // ==============================
    // FIND USER
    // ==============================
    const user = await User.findById(id).select('-password');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let additionalData = null;

    if (user.role === 'supplier') {
      additionalData = await Supplier.findOne({ userId: user._id });
    } else if (user.role === 'school') {
      additionalData = await School.findOne({ userId: user._id });
    }

    return NextResponse.json({
      success: true,
      user,
      ...(user.role === 'supplier' && { supplier: additionalData }),
      ...(user.role === 'school' && { school: additionalData }),
    });

  } catch (error) {
    console.error('Error fetching user details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user details' },
      { status: 500 }
    );
  }
}

