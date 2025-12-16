import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Supplier } from '@/models/Supplier';
import { User } from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // 🔐 Read user cookie (same as /me)
    const cookie = request.cookies.get('user');

    if (!cookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userData = JSON.parse(cookie.value);

    // Verify user
    const user = await User.findById(userData.id);
    if (!user || !user.isActive) {
      const res = NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      res.cookies.delete('user');
      return res;
    }

    // Ensure supplier role
    if (user.role !== 'supplier') {
      return NextResponse.json(
        { error: 'User is not a supplier' },
        { status: 403 }
      );
    }

    // Fetch supplier data
    const supplier = await Supplier.findOne({ userId: user._id });

    if (!supplier) {
      return NextResponse.json({
        hasSupplierData: false,
        supplier: null,
      });
    }

    return NextResponse.json({
      hasSupplierData: true,
      supplier,
    });
  } catch (error) {
    console.error('Supplier GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch supplier data' },
      { status: 500 }
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const cookie = request.cookies.get('user');
    if (!cookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userData = JSON.parse(cookie.value);
    const user = await User.findById(userData.id);

    if (!user || !user.isActive) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'supplier') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await request.json();

    const supplier = await Supplier.findOneAndUpdate(
      { userId: user._id },
      {
        ...data,
        userId: user._id,
        contactEmail: data.contactEmail || user.email,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return NextResponse.json({
      message: 'Supplier data saved successfully',
      supplier,
    });
  } catch (error: any) {
    console.error('Supplier POST error:', error);

    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation failed', details: Object.values(error.errors).map((e: any) => e.message) },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to save supplier data' },
      { status: 500 }
    );
  }
}
