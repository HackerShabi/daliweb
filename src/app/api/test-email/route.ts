import { NextRequest, NextResponse } from 'next/server';
import { sendMail, emailTemplates } from '@/utils/mailer';

// GET /api/test-email - Send a test email
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const to = searchParams.get('to');
    
    // Validate email parameter
    if (!to) {
      return NextResponse.json(
        { error: 'Email address is required. Use ?to=email@example.com' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Send test email
    try {
      await sendMail(
        to,
        'Test Email - Dali Web Agency Mail System',
        emailTemplates.testEmail()
      );
      
      console.log(`Test email sent successfully to: ${to}`);
      
      return NextResponse.json(
        { 
          message: 'Test email sent successfully',
          recipient: to,
          timestamp: new Date().toISOString()
        },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('Error sending test email:', emailError);
      return NextResponse.json(
        { 
          error: 'Failed to send test email',
          details: emailError instanceof Error ? emailError.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in test email endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/test-email - Send a custom test email
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, message } = body;
    
    // Validate required fields
    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: 'Email address, subject, and message are required' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Create custom email HTML
    const customEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background: #f9f9f9; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Custom Test Email</h1>
          </div>
          <div class="content">
            <h2>${subject}</h2>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <div class="footer">
            <p>This is a custom test email from Dali Web Agency</p>
            <p>Email: daliwen05@gmail.com | Phone: +923290091255</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Send custom test email
    try {
      await sendMail(to, subject, customEmailHtml);
      
      console.log(`Custom test email sent successfully to: ${to}`);
      
      return NextResponse.json(
        { 
          message: 'Custom test email sent successfully',
          recipient: to,
          subject,
          timestamp: new Date().toISOString()
        },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('Error sending custom test email:', emailError);
      return NextResponse.json(
        { 
          error: 'Failed to send custom test email',
          details: emailError instanceof Error ? emailError.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in custom test email endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}