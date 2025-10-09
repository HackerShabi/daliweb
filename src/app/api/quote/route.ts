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

// POST /api/quote - Handle quote requests
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      phone, 
      businessType,
      message
    } = body;
    
    // Validate required fields
    if (!name || !email || !phone || !businessType || !message) {
      return NextResponse.json(
        { error: 'Name, email, phone, business type, and message are required' },
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
    
    // Create quote request object
    const quoteRequest = {
      id: `quote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      phone,
      businessType,
      message,
      status: 'new',
      createdAt: new Date().toISOString(),
      source: 'website_quote_form'
    };
    
    // Save to database
    const { db } = await connectToDatabase();
    const quotesCollection = db.collection('quotes');
    await quotesCollection.insertOne(quoteRequest);
    
    console.log('New quote request saved:', quoteRequest);
    
    // Send email notifications
    try {
      // Send admin notification
      const adminEmail = process.env.ADMIN_EMAIL || 'daliwen05@gmail.com';
      await sendMail(
        adminEmail,
        'New Quote Request - Dali Web Agency',
        emailTemplates.adminNotification('quote', {
          name,
          email,
          phone,
          businessType,
          message
        })
      );

      // Send user confirmation
      await sendMail(
        email,
        'Quote Request Received - Dali Web Agency',
        emailTemplates.userConfirmation('quote', name)
      );

      console.log('Email notifications sent successfully');
    } catch (emailError) {
      console.error('Error sending email notifications:', emailError);
      // Don't fail the request if email fails
    }
    
    return NextResponse.json(
      { 
        message: 'Quote request submitted successfully',
        requestId: quoteRequest.id
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
    console.error('Error processing quote request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/quote - Get quote requests (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // 'new', 'in_progress', 'completed', 'cancelled'
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // In a real application, you would fetch from database
    // This is a mock response
    const mockQuotes = [
      {
        id: 'quote_1234567890_abc123',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        businessType: 'E-commerce',
        message: 'Need a modern e-commerce website with payment integration',
        status: 'new',
        createdAt: '2024-01-15T10:30:00Z',
        source: 'website_quote_form'
      },
      {
        id: 'quote_0987654321_def456',
        name: 'Jane Smith',
        email: 'jane@business.com',
        phone: '+0987654321',
        businessType: 'Restaurant',
        message: 'Looking for a restaurant website with online ordering',
        status: 'in_progress',
        createdAt: '2024-01-14T14:20:00Z',
        source: 'website_quote_form'
      }
    ];
    
    // Filter by status if provided
    let filteredQuotes = mockQuotes;
    if (status) {
      filteredQuotes = mockQuotes.filter(quote => quote.status === status);
    }
    
    // Apply pagination
    const paginatedQuotes = filteredQuotes.slice(offset, offset + limit);
    
    return NextResponse.json({
      quotes: paginatedQuotes,
      total: filteredQuotes.length,
      limit,
      offset
    });
  } catch (error) {
    console.error('Error fetching quote requests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}