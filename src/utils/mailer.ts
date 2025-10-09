import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Send email function
export const sendMail = async (
  to: string,
  subject: string,
  html: string,
  from?: string
): Promise<void> => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: from || process.env.MAIL_FROM || `"Dali Web Agency" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't throw error - email failures shouldn't break the main process
    return;
  }
};

// Email templates
export const emailTemplates = {
  // Admin notification template
  adminNotification: (type: 'quote' | 'demo', data: any) => {
    const title = type === 'quote' ? 'New Quote Request' : 'New Demo Request';
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #555; }
          .value { margin-top: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${title}</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${data.email}</div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${data.phone}</div>
            </div>
            ${type === 'quote' ? `
            <div class="field">
              <div class="label">Business Type:</div>
              <div class="value">${data.businessType || 'Not specified'}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${data.message}</div>
            </div>
            <div class="field">
              <div class="label">Submitted:</div>
              <div class="value">${new Date().toLocaleString()}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  },

  // User confirmation template
  userConfirmation: (type: 'quote' | 'demo', name: string) => {
    const title = type === 'quote' ? 'Quote Request Received' : 'Demo Request Received';
    const message = type === 'quote' 
      ? 'We have received your quote request and will get back to you within 24 hours with a detailed proposal.'
      : 'We have received your demo request and will contact you soon to schedule a personalized demonstration.';
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background: #f9f9f9; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 14px; }
          .cta { background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You, ${name}!</h1>
          </div>
          <div class="content">
            <h2>${title}</h2>
            <p>${message}</p>
            <p>In the meantime, feel free to:</p>
            <ul>
              <li>Browse our <a href="https://daliweb.vercel.app/portfolio">portfolio</a> to see our previous work</li>
              <li>Check out our <a href="https://daliweb.vercel.app/services">services</a> to learn more about what we offer</li>
              <li>Contact us directly at <a href="mailto:daliwen05@gmail.com">daliwen05@gmail.com</a></li>
            </ul>
            <a href="https://daliweb.vercel.app" class="cta">Visit Our Website</a>
          </div>
          <div class="footer">
            <p>Best regards,<br>The Dali Web Agency Team</p>
            <p>Email: daliwen05@gmail.com | Phone: +923290091255</p>
            <p>Street 08 Dijkot, Faisalabad, Pakistan</p>
          </div>
        </div>
      </body>
      </html>
    `;
  },

  // Test email template
  testEmail: () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Test Email</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10b981; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background: #f0fdf4; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Email System Test</h1>
          </div>
          <div class="content">
            <h2>Congratulations!</h2>
            <p>Your email system is working correctly. This test email was sent successfully from your Dali Web Agency application.</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            <p>You can now proceed with confidence that your mailing system is properly configured.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
};