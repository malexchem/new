/*import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/dbConnect';
import { Supplier } from '@/models/Supplier';
import { User } from '@/models/User';

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

    const supplier = await Supplier.findByIdAndUpdate(
      params.id,
      {
        verificationStatus,
        verificationNotes,
        isVerified: verificationStatus === 'verified',
        verifiedAt: verificationStatus === 'verified' ? new Date() : null,
        verifiedBy: admin._id
      },
      { new: true }
    ).populate('userId', 'firstName lastName email businessName');

    if (!supplier) {
      return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: `Supplier ${verificationStatus} successfully`,
      supplier
    });

  } catch (error: any) {
    console.error('Error updating supplier verification:', error);
    return NextResponse.json(
      { error: 'Failed to update supplier verification' },
      { status: 500 }
    );
  }
}*/

/*import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Supplier } from '@/models/Supplier';
import { User } from '@/models/User';

// PUT - Admin verification (cookie-based)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    // 🔐 Get admin from cookie
    const cookie = request.cookies.get('user');
    if (!cookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminData = JSON.parse(cookie.value);

    const admin = await User.findById(adminData.id);
    if (!admin || admin.role !== 'admin' || !admin.isActive) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { verificationStatus, verificationNotes } = await request.json();

    const supplier = await Supplier.findByIdAndUpdate(
      params.id,
      {
        verificationStatus,
        verificationNotes,
        isVerified: verificationStatus === 'verified',
        verifiedAt: verificationStatus === 'verified' ? new Date() : null,
        verifiedBy: admin._id
      },
      { new: true }
    ).populate('userId', 'firstName lastName email businessName');

    if (!supplier) {
      return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: `Supplier ${verificationStatus} successfully`,
      supplier
    });

  } catch (error) {
    console.error('Error updating supplier verification:', error);
    return NextResponse.json(
      { error: 'Failed to update supplier verification' },
      { status: 500 }
    );
  }
}
*/
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Supplier } from '@/models/Supplier';
import { User } from '@/models/User';

// PUT - Admin verification (cookie-based)
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    // 🔐 Get admin from cookie
    const cookie = request.cookies.get('user');
    if (!cookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminData = JSON.parse(cookie.value);

    const admin = await User.findById(adminData.id);
    if (!admin || admin.role !== 'admin' || !admin.isActive) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { verificationStatus, verificationNotes } = await request.json();

    const { id } = await context.params;

    const supplier = await Supplier.findByIdAndUpdate(
      id,
      {
        verificationStatus,
        verificationNotes,
        isVerified: verificationStatus === 'verified',
        verifiedAt: verificationStatus === 'verified' ? new Date() : null,
        verifiedBy: admin._id
      },
      { new: true }
    ).populate('userId', 'firstName lastName email businessName');

    if (!supplier) {
      return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: `Supplier ${verificationStatus} successfully`,
      supplier
    });

  } catch (error) {
    console.error('Error updating supplier verification:', error);
    return NextResponse.json(
      { error: 'Failed to update supplier verification' },
      { status: 500 }
    );
  }
}
