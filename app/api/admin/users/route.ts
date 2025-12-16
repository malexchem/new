/*import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { User } from '@/models/User';
import { School } from '@/models/School';
import { Supplier } from '@/models/Supplier';
import dbConnect from '@/lib/dbConnect';

export async function GET(request: NextRequest) {
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

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // Base query for users
    let query: any = { role: { $in: ['supplier', 'school'] } };

    // Apply role filter
    if (role && role !== 'all') {
      query.role = role;
    }

    // Apply status filter
    if (status && status !== 'all') {
      query.isActive = status === 'active' ? true : false;
      // For verification status, we'll handle in aggregation
    }

    // Apply search filter
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { businessName: { $regex: search, $options: 'i' } },
        { schoolName: { $regex: search, $options: 'i' } },
      ];
    }

    // Sorting
    let sortOptions: any = {};
    switch (sort) {
      case 'newest':
        sortOptions.createdAt = -1;
        break;
      case 'oldest':
        sortOptions.createdAt = 1;
        break;
      case 'name':
        sortOptions.firstName = 1;
        break;
      case 'activity':
        // Sort by last login
        sortOptions.lastLogin = -1;
        break;
      default:
        sortOptions.createdAt = -1;
    }

    // Get users with pagination
    const users = await User.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .select('-password')
      .lean();

    // Get total count for pagination
    const total = await User.countDocuments(query);

    // Get detailed data for each user based on role
    const usersWithDetails = await Promise.all(
      users.map(async (user) => {
        let additionalData = {};
        let verificationStatus = 'pending';
        let verificationNotes = '';
        
        if (user.role === 'supplier') {
          const supplier = await Supplier.findOne({ userId: user._id });
          if (supplier) {
            additionalData = {
              companyName: supplier.companyName,
              category: supplier.supplierCategory?.[0] || 'Not specified',
              totalOrders: supplier.completedOrders || 0,
              averageRating: supplier.averageRating || 0,
              yearsInOperation: supplier.yearsInOperation,
              kraPin: supplier.kraPin
            };
            verificationStatus = supplier.verificationStatus;
            verificationNotes = supplier.verificationNotes || '';
          }
        } else if (user.role === 'school') {
          const school = await School.findOne({ userId: user._id });
          if (school) {
            additionalData = {
              schoolName: school.schoolName,
              category: school.schoolType,
              totalOrders: school.totalOrders || 0,
              numberOfStudents: school.numberOfStudents || 0,
              emisCode: school.emisCode,
              schoolType: school.schoolType
            };
            verificationStatus = school.verificationStatus;
            verificationNotes = school.verificationNotes || '';
          }
        }

        // Determine user status
        let status = user.isActive ? 'Active' : 'Inactive';
        if (verificationStatus === 'pending') {
          status = 'Pending';
        } else if (verificationStatus === 'rejected') {
          status = 'Rejected';
        } else if (verificationStatus === 'verified') {
          status = 'Verified';
        }

        // Calculate revenue (placeholder - you'd need actual order data)
        const revenue = user.role === 'supplier' 
          ? Math.floor(Math.random() * 10000000) + 1000000 // Random for demo
          : Math.floor(Math.random() * 5000000) + 500000;

        return {
          id: user._id.toString(),
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          type: user.role === 'supplier' ? 'Supplier' : 'School',
          status,
          joinDate: user.createdAt.toISOString().split('T')[0],
          //orders: additionalData.totalOrders || 0,
          //rating: additionalData.averageRating || (4 + Math.random()).toFixed(1),
          revenue: `KSh ${(revenue / 1000000).toFixed(1)}M`,
          //category: additionalData.category || 'Not specified',
          badge: user.role === 'supplier' ? (Math.random() > 0.7 ? 'Top Rated' : Math.random() > 0.5 ? 'Rising' : null) 
                : (Math.random() > 0.7 ? 'Premium' : Math.random() > 0.5 ? 'New' : null),
          userData: user,
          additionalData,
          verificationStatus,
          verificationNotes,
          isActive: user.isActive,
          lastLogin: user.lastLogin
        };
      })
    );

    // Get statistics
    const totalUsers = await User.countDocuments({ role: { $in: ['supplier', 'school'] } });
    const totalSuppliers = await User.countDocuments({ role: 'supplier' });
    const totalSchools = await User.countDocuments({ role: 'school' });
    const activeNow = await User.countDocuments({ 
      role: { $in: ['supplier', 'school'] },
      lastLogin: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Active in last 24 hours
    });

    return NextResponse.json({
      users: usersWithDetails,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      statistics: {
        totalUsers,
        totalSuppliers,
        totalSchools,
        activeNow
      }
    });

  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}*/

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { User } from '@/models/User';
import { School } from '@/models/School';
import { Supplier } from '@/models/Supplier';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

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
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // ==============================
    // QUERY PARAMS
    // ==============================
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // ==============================
    // BASE QUERY
    // ==============================
    let query: any = { role: { $in: ['supplier', 'school'] } };

    if (role && role !== 'all') {
      query.role = role;
    }

    if (status && status !== 'all') {
      query.isActive = status === 'active';
    }

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { businessName: { $regex: search, $options: 'i' } },
        { schoolName: { $regex: search, $options: 'i' } },
      ];
    }

    // ==============================
    // SORTING
    // ==============================
    const sortOptions: any = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      name: { firstName: 1 },
      activity: { lastLogin: -1 },
    }[sort] || { createdAt: -1 };

    // ==============================
    // FETCH USERS
    // ==============================
    const users = await User.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .select('-password')
      .lean();

    const total = await User.countDocuments(query);

    // ==============================
    // ENRICH USERS
    // ==============================
    const usersWithDetails = await Promise.all(
      users.map(async (user: any) => {
        let additionalData: any = {};
        let verificationStatus = 'pending';
        let verificationNotes = '';

        if (user.role === 'supplier') {
          const supplier = await Supplier.findOne({ userId: user._id });
          if (supplier) {
            additionalData = {
              companyName: supplier.companyName,
              category: supplier.supplierCategory?.[0],
              totalOrders: supplier.completedOrders || 0,
              averageRating: supplier.averageRating || 0,
              kraPin: supplier.kraPin,
            };
            verificationStatus = supplier.verificationStatus;
            verificationNotes = supplier.verificationNotes || '';
          }
        }

        if (user.role === 'school') {
          const school = await School.findOne({ userId: user._id });
          if (school) {
            additionalData = {
              schoolName: school.schoolName,
              emisCode: school.emisCode,
              totalOrders: school.totalOrders || 0,
              numberOfStudents: school.numberOfStudents || 0,
              schoolType: school.schoolType,
            };
            verificationStatus = school.verificationStatus;
            verificationNotes = school.verificationNotes || '';
          }
        }

        let statusLabel = user.isActive ? 'Active' : 'Inactive';
        if (verificationStatus === 'pending') statusLabel = 'Pending';
        if (verificationStatus === 'rejected') statusLabel = 'Rejected';
        if (verificationStatus === 'verified') statusLabel = 'Verified';

        return {
          id: user._id.toString(),
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          type: user.role === 'supplier' ? 'Supplier' : 'School',
          status: statusLabel,
          joinDate: user.createdAt.toISOString().split('T')[0],
          verificationStatus,
          verificationNotes,
          isActive: user.isActive,
          lastLogin: user.lastLogin,
          userData: user,
          additionalData,
        };
      })
    );

    // ==============================
    // STATISTICS
    // ==============================
    const [totalUsers, totalSuppliers, totalSchools, activeNow] = await Promise.all([
      User.countDocuments({ role: { $in: ['supplier', 'school'] } }),
      User.countDocuments({ role: 'supplier' }),
      User.countDocuments({ role: 'school' }),
      User.countDocuments({
        role: { $in: ['supplier', 'school'] },
        lastLogin: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      }),
    ]);

    return NextResponse.json({
      users: usersWithDetails,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      statistics: {
        totalUsers,
        totalSuppliers,
        totalSchools,
        activeNow,
      },
    });
  } catch (error) {
    console.error('Admin users error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
