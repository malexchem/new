/*import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { School } from '@/models/School';
import { User } from '@/models/User';
import dbConnect from '@/lib/dbConnect';

// PUT - Admin verification
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Check if admin
    const admin = await User.findOne({ 
      email: session.user.email,
      role: 'admin'
    });
    if (!admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const data = await request.json();
    const { verificationStatus, verificationNotes } = data;

    const school = await School.findByIdAndUpdate(
      params.id,
      {
        verificationStatus,
        verificationNotes,
        isVerified: verificationStatus === 'verified',
        verifiedAt: verificationStatus === 'verified' ? new Date() : null,
        verifiedBy: admin._id
      },
      { new: true }
    ).populate('userId', 'firstName lastName email schoolName emisCode');

    if (!school) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: `School ${verificationStatus} successfully`,
      school
    });

  } catch (error: any) {
    console.error('Error updating school verification:', error);
    return NextResponse.json(
      { error: 'Failed to update school verification' },
      { status: 500 }
    );
  }
}*/

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { School } from '@/models/School';
import { User } from '@/models/User';
import dbConnect from '@/lib/dbConnect';

// PUT - Admin verification
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Check if admin
    const admin = await User.findOne({ 
      email: session.user.email,
      role: 'admin'
    });
    if (!admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const data = await request.json();
    const { verificationStatus, verificationNotes } = data;

    const { id } = await context.params;

    const school = await School.findByIdAndUpdate(
      id,
      {
        verificationStatus,
        verificationNotes,
        isVerified: verificationStatus === 'verified',
        verifiedAt: verificationStatus === 'verified' ? new Date() : null,
        verifiedBy: admin._id
      },
      { new: true }
    ).populate('userId', 'firstName lastName email schoolName emisCode');

    if (!school) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: `School ${verificationStatus} successfully`,
      school
    });

  } catch (error) {
    console.error('Error updating school verification:', error);
    return NextResponse.json(
      { error: 'Failed to update school verification' },
      { status: 500 }
    );
  }
}
