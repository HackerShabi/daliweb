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

// POST /api/contact - Handle contact form submissions (Free Quote)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      phone, 
      company, 
      message, 
      projectType, 
      budget, 
      timeline,
      type = 'quote' // 'quote' or 'general'
    } = body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
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
    
    // Create contact submission object
    const submission = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      name,
      email,
      phone: phone || '',
      company: company || '',
      message,
      projectType: projectType || '',
      budget: budget || '',
      timeline: timeline || '',
      status: 'new',
      createdAt: new Date().toISOString(),
      source: 'website_contact_form'
    };
    
    // Save to database
    const { db } = await connectToDatabase();
    const contactsCollection = db.collection('contacts');
    await contactsCollection.insertOne(submission);
    
    console.log('New contact submission saved:', submission);

    // Send email notifications
    try {
      // Send admin notification
      const adminEmail = process.env.ADMIN_EMAIL || 'daliwen05@gmail.com';
      await sendMail(
        adminEmail,
        `New ${type === 'quote' ? 'Quote' : 'Contact'} Request - Dali Web Agency`,
        emailTemplates.adminNotification('quote', {
          name,
          email,
          phone: phone || 'Not provided',
          businessType: `Company: ${company || 'Not specified'}\nProject Type: ${projectType || 'Not specified'}\nBudget: ${budget || 'Not specified'}\nTimeline: ${timeline || 'Not specified'}`,
          message
        })
      );

      // Send user confirmation
      await sendMail(
        email,
        `${type === 'quote' ? 'Quote' : 'Contact'} Request Received - Dali Web Agency`,
        emailTemplates.userConfirmation('quote', name)
      );

      console.log('Email notifications sent successfully');
    } catch (emailError) {
      console.error('Error sending email notifications:', emailError);
      // Don't fail the request if email fails
    }
    
    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully',
        submissionId: submission.id
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
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/contact - Get contact submissions (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'quote', 'general', or null for all
    const status = searchParams.get('status'); // 'new', 'contacted', 'closed'
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // In a real application, you would fetch from database
    // This is a mock response
    const mockSubmissions = [
      {
        id: 'contact_1234567890_abc123',
        type: 'quote',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        company: 'Example Corp',
        message: 'Looking for a new website for our business',
        projectType: 'Website Development',
        budget: '$5,000 - $10,000',
        timeline: '2-3 months',
        status: 'new',
        createdAt: new Date().toISOString(),
        source: 'website_contact_form'
      }
    ];
    
    // Filter by type if specified
    let filteredSubmissions = mockSubmissions;
    if (type) {
      filteredSubmissions = filteredSubmissions.filter(sub => sub.type === type);
    }
    if (status) {
      filteredSubmissions = filteredSubmissions.filter(sub => sub.status === status);
    }
    
    // Apply pagination
    const paginatedSubmissions = filteredSubmissions.slice(offset, offset + limit);
    
    return NextResponse.json({
      submissions: paginatedSubmissions,
      total: filteredSubmissions.length,
      limit,
      offset
    });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}