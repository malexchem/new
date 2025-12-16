import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { School } from '@/models/School';
import { User } from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const cookie = request.cookies.get('user');
    if (!cookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userData = JSON.parse(cookie.value);
    const user = await User.findById(userData.id);

    if (!user || !user.isActive) {
      const res = NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      res.cookies.delete('user');
      return res;
    }

    if (user.role !== 'school') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const school = await School.findOne({ userId: user._id });

    if (!school) {
      return NextResponse.json({
        hasSchoolData: false,
        school: null,
      });
    }

    return NextResponse.json({
      hasSchoolData: true,
      school,
    });
  } catch (error) {
    console.error('School GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch school data' },
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

    if (user.role !== 'school') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await request.json();

    const school = await School.findOneAndUpdate(
      { userId: user._id },
      {
        ...data,
        userId: user._id,
        emisCode: data.emisCode || user.emisCode,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return NextResponse.json({
      message: 'School data saved successfully',
      school,
    });
  } catch (error: any) {
    console.error('School POST error:', error);

    if (error.name === 'ValidationError') {
      const fieldErrors = Object.entries(error.errors).map(
        ([field, err]: any) => ({
          field,
          message: err.message,
        })
      );

      return NextResponse.json(
        { error: 'Validation failed', fieldErrors },
        { status: 400 }
      );
    }

    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'EMIS code already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to save school data' },
      { status: 500 }
    );
  }
}
