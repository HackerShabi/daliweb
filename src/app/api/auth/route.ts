import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Handle CORS preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// POST /api/auth - Handle user registration/login data storage
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      uid,
      email, 
      displayName,
      phoneNumber,
      emailVerified,
      photoURL,
      providerData,
      authType, // 'signup', 'login', 'google'
      lastSignInTime
    } = body;
    
    // Validate required fields
    if (!uid || !email || !authType) {
      return NextResponse.json(
        { error: 'UID, email, and authType are required' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    
    const currentTime = new Date().toISOString();
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ uid });
    
    if (existingUser) {
      // Update existing user with latest login info
      const updateData = {
        lastSignInTime: lastSignInTime || currentTime,
        emailVerified: emailVerified ?? existingUser.emailVerified,
        displayName: displayName || existingUser.displayName,
        phoneNumber: phoneNumber || existingUser.phoneNumber,
        photoURL: photoURL || existingUser.photoURL,
        providerData: providerData || existingUser.providerData,
        updatedAt: currentTime,
        status: 'online'
      };
      
      await usersCollection.updateOne(
        { uid },
        { $set: updateData }
      );
      
      console.log(`User ${email} login updated`);
      
      return NextResponse.json(
        { 
          message: 'User updated successfully',
          userId: existingUser._id,
          authType
        },
        { 
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          }
        }
      );
    } else {
      // Create new user
      const newUser = {
        uid,
        email,
        displayName: displayName || '',
        phoneNumber: phoneNumber || '',
        emailVerified: emailVerified || false,
        photoURL: photoURL || '',
        disabled: false,
        creationTime: currentTime,
        lastSignInTime: lastSignInTime || currentTime,
        providerData: providerData || [],
        status: 'online',
        authType,
        createdAt: currentTime,
        updatedAt: currentTime
      };
      
      const result = await usersCollection.insertOne(newUser);
      
      console.log(`New user ${email} registered via ${authType}`);
      
      return NextResponse.json(
        { 
          message: 'User registered successfully',
          userId: result.insertedId,
          authType
        },
        { 
          status: 201,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          }
        }
      );
    }
  } catch (error) {
    console.error('Error processing auth request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/auth - Get user authentication data (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // 'online', 'offline', or null for all
    const provider = searchParams.get('provider'); // 'google', 'email', or null for all
    const verified = searchParams.get('verified'); // 'true', 'false', or null for all
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    
    // Build filter query
    const filter: any = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (verified) {
      filter.emailVerified = verified === 'true';
    }
    
    if (provider) {
      if (provider === 'google') {
        filter['providerData.providerId'] = 'google.com';
      } else if (provider === 'email') {
        filter['providerData.providerId'] = 'password';
      }
    }
    
    // Get total count
    const total = await usersCollection.countDocuments(filter);
    
    // Get paginated users
    const users = await usersCollection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .toArray();
    
    // Transform data for admin panel
    const transformedUsers = users.map(user => ({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
      emailVerified: user.emailVerified,
      disabled: user.disabled,
      creationTime: user.creationTime,
      lastSignInTime: user.lastSignInTime,
      providerData: user.providerData,
      status: user.status,
      authType: user.authType
    }));
    
    return NextResponse.json({
      users: transformedUsers,
      total,
      limit,
      offset
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/auth - Update user status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { uid, status, disabled } = body;
    
    if (!uid) {
      return NextResponse.json(
        { error: 'UID is required' },
        { status: 400 }
      );
    }
    
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    
    const updateData: any = {
      updatedAt: new Date().toISOString()
    };
    
    if (status) {
      updateData.status = status;
    }
    
    if (disabled !== undefined) {
      updateData.disabled = disabled;
    }
    
    const result = await usersCollection.updateOne(
      { uid },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: 'User updated successfully',
      uid,
      updatedAt: updateData.updatedAt
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}