import { NextRequest, NextResponse } from 'next/server';
import { sendMail, emailTemplates } from '@/utils/mailer';
import { connectToDatabase } from '@/lib/mongodb';

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

// POST /api/demo - Handle demo booking submissions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Demo API received request body:', JSON.stringify(body, null, 2));
    const { 
      name, 
      email, 
      phone, 
      company, 
      projectType, 
      budget, 
      timeline,
      preferredDate,
      preferredTime,
      message,
      selectedCategory,
      businessType,
      paymentMethod = 'stripe', // 'stripe', 'paypal', etc.
      // Additional fields from checkout
      categoryInfo,
      submissionType,
      paymentAmount,
      paymentStatus,
      transactionId,
      paymentIntentId,
      cardDetails,
      billingAddress
    } = body;
    
    // Validate required fields
    if (!name || !email || !phone || !preferredDate) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Name, email, phone and preferred date are required'
        },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid email format'
        },
        { status: 400 }
      );
    }
    
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(preferredDate)) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid date format. Use YYYY-MM-DD'
        },
        { status: 400 }
      );
    }
    

    
    // Safely handle preferredTime
    let normalizedTime = null;
    if (preferredTime) {
      try {
        const [hours, minutes] = preferredTime.split(":");
        normalizedTime = `${hours.padStart(2, "0")}:${minutes}`;
      } catch (timeError) {
        console.warn('Invalid preferredTime format:', preferredTime);
        normalizedTime = null;
      }
    }

    // Create demo booking object
    const booking = {
      id: `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      phone,
      company: company || '',
      businessType: businessType || '',
      projectType: projectType || '',
      budget: budget || '',
      timeline: timeline || '',
      preferredDate,
      preferredTime: normalizedTime,
      message: message || '',
      selectedCategory: selectedCategory || '',
      categoryInfo: categoryInfo || (selectedCategory ? {
        category: selectedCategory,
        subcategory: projectType || undefined
      } : undefined),
      paymentMethod,
      amount: paymentAmount || 20, // Use provided amount or default $20 demo fee
      status: paymentStatus === 'completed' ? 'confirmed' : 'pending_payment',
      paymentStatus: paymentStatus || 'pending',
      transactionId: transactionId || null,
      paymentIntentId: paymentIntentId || null,
      cardDetails: cardDetails || null,
      billingAddress: billingAddress || null,
      submissionType: submissionType || 'demo',
      createdAt: new Date().toISOString(),
      source: 'website_demo_form'
    };
    
    // Save to database
    console.log('Attempting to save booking to database:', JSON.stringify(booking, null, 2));
    let db, demosCollection;
    
    try {
      const dbConnection = await connectToDatabase();
      db = dbConnection.db;
      demosCollection = db.collection('demos');
    } catch (dbError) {
      console.error('Database connection failed:', dbError);
      return NextResponse.json(
        { 
          success: false,
          message: 'Database connection error'
        },
        { status: 500 }
      );
    }
    
    try {
      const insertResult = await demosCollection.insertOne(booking);
      console.log('Database insertion successful:', insertResult.insertedId);
    } catch (dbError) {
      console.error('Database insertion failed:', dbError);
      return NextResponse.json(
        { 
          success: false,
          message: 'Failed to save booking data'
        },
        { status: 400 }
      );
    }
    
    console.log('New demo booking saved:', booking);

    // Send email notifications
    try {
      // Send admin notification
      const adminEmail = process.env.ADMIN_EMAIL || 'daliwen05@gmail.com';
      await sendMail(
        adminEmail,
        'New Demo Request - Dali Web Agency',
        emailTemplates.adminNotification('demo', {
          name,
          email,
          phone,
          message: `Company: ${company || 'Not specified'}\nProject Type: ${projectType || 'Not specified'}\nBudget: ${budget || 'Not specified'}\nTimeline: ${timeline || 'Not specified'}\nPreferred Date: ${preferredDate}\nPreferred Time: ${normalizedTime || 'Not specified'}\nMessage: ${message || 'No additional message'}`
        })
      );

      // Send user confirmation
      await sendMail(
        email,
        'Demo Request Received - Dali Web Agency',
        emailTemplates.userConfirmation('demo', name)
      );

      console.log('Email notifications sent successfully');
    } catch (emailError) {
      console.error('Error sending email notifications:', emailError);
      // Don't fail the request if email fails
    }
    
    // Handle payment processing
    if (paymentStatus !== 'completed') {
      // Mock payment processing for direct demo bookings
      // In real app, integrate with Stripe, PayPal, etc.
      const paymentResult = {
        success: true,
        transactionId: `txn_${Date.now()}`,
        amount: booking.amount,
        currency: 'USD'
      };
      
      if (paymentResult.success) {
        booking.paymentStatus = 'completed';
        booking.status = 'confirmed';
        booking.transactionId = paymentResult.transactionId;
        
        console.log(`Demo booking confirmed for ${name} on ${preferredDate} at ${normalizedTime || 'no specific time'}`);
        console.log(`Payment processed: $${paymentResult.amount} - Transaction ID: ${paymentResult.transactionId}`);
      }
    } else {
      // Payment already completed from checkout
      console.log(`Demo booking confirmed for ${name} on ${preferredDate} at ${normalizedTime || 'no specific time'}`);
      console.log(`Payment already completed: $${booking.amount} - Transaction ID: ${booking.transactionId}`);
    }
    
    // Update the booking in database with payment info
    try {
      await demosCollection.updateOne(
        { id: booking.id },
        { $set: booking }
      );
    } catch (updateError) {
      console.error('Database update failed:', updateError);
      // Don't fail the request if update fails, booking was already created
    }
    
    return NextResponse.json(
      { 
        success: true,
        message: 'Demo booking created successfully',
        data: {
          _id: booking.id,
          ...booking
        }
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
  } catch (error) {
    console.error('Error processing demo booking:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET /api/demo - Get demo bookings (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // 'pending_payment', 'confirmed', 'completed', 'cancelled'
    const paymentStatus = searchParams.get('paymentStatus'); // 'pending', 'completed', 'failed', 'refunded'
    const date = searchParams.get('date'); // YYYY-MM-DD format
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Get bookings from database
    const { db } = await connectToDatabase();
    const demosCollection = db.collection('demos');
    
    // Build filter object
    const filter: any = {};
    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;
    if (date) filter.preferredDate = date;
    
    // Get total count
    const total = await demosCollection.countDocuments(filter);
    
    // Get filtered bookings
    const filteredBookings = await demosCollection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .toArray();
    
    return NextResponse.json({
      bookings: filteredBookings,
      total,
      limit,
      offset
    });
  } catch (error) {
    console.error('Error fetching demo bookings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/demo - Update demo booking status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, status, paymentStatus, notes } = body;
    
    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }
    
    // In a real application, you would update the database
    console.log(`Updating demo booking ${bookingId}:`, { status, paymentStatus, notes });
    
    return NextResponse.json({
      message: 'Demo booking updated successfully',
      bookingId,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating demo booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}