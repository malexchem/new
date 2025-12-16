import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';;
import { User } from '@/models/User';
import { School } from '@/models/School';
import { Supplier } from '@/models/Supplier';
import dbConnect from '@/lib/dbConnect';

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { userIds, action, notes, role } = body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json({ error: 'No users specified' }, { status: 400 });
    }

    if (!['verify', 'reject', 'activate', 'deactivate'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const results = [];

    for (const userId of userIds) {
      try {
        // Find the user
        const user = await User.findById(userId);
        if (!user) continue;

        if (action === 'activate' || action === 'deactivate') {
          // Toggle user active status
          user.isActive = action === 'activate';
          await user.save();
          results.push({
            userId,
            success: true,
            message: `User ${action === 'activate' ? 'activated' : 'deactivated'} successfully`
          });
        } else if (action === 'verify' || action === 'reject') {
          // Update verification status based on role
          const verificationStatus = action === 'verify' ? 'verified' : 'rejected';
          
          if (user.role === 'supplier') {
            await Supplier.findOneAndUpdate(
              { userId: user._id },
              {
                verificationStatus,
                verificationNotes: notes,
                isVerified: verificationStatus === 'verified',
                verifiedAt: verificationStatus === 'verified' ? new Date() : null,
                verifiedBy: admin._id
              }
            );
          } else if (user.role === 'school') {
            await School.findOneAndUpdate(
              { userId: user._id },
              {
                verificationStatus,
                verificationNotes: notes,
                isVerified: verificationStatus === 'verified',
                verifiedAt: verificationStatus === 'verified' ? new Date() : null,
                verifiedBy: admin._id
              }
            );
          }
          
          results.push({
            userId,
            success: true,
            message: `User ${action}ed successfully`
          });
        }
      } catch (error) {
        results.push({
          userId,
          success: false,
          message: `Failed to ${action} user: `
        });
      }
    }

    return NextResponse.json({
      message: 'Bulk action completed',
      results
    });

  } catch (error: any) {
    console.error('Error performing bulk action:', error);
    return NextResponse.json(
      { error: 'Failed to perform action' },
      { status: 500 }
    );
  }
}