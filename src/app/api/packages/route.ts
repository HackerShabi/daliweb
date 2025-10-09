import { NextRequest, NextResponse } from 'next/server';
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

// Package definitions
const packages = [
  {
    id: 'starter',
    name: 'Starter',
    price: 99,
    subtitle: 'Perfect for small businesses',
    description: 'Essential web presence with modern design and basic functionality.',
    features: [
      'Responsive Website Design',
      'Up to 5 Pages',
      'Contact Form Integration',
      'Basic SEO Setup',
      'Mobile Optimization',
      '30 Days Support'
    ],
    included: [
      'Domain Setup Assistance',
      'SSL Certificate',
      'Google Analytics Setup',
      'Social Media Integration'
    ],
    deliveryTime: '1-2 weeks',
    revisions: 2
  },
  {
    id: 'business',
    name: 'Business',
    price: 499,
    subtitle: 'Ideal for growing companies',
    description: 'Professional website with advanced features and e-commerce capabilities.',
    features: [
      'Everything in Starter',
      'Up to 15 Pages',
      'E-commerce Integration',
      'Advanced SEO',
      'Blog/News Section',
      'Live Chat Integration',
      '90 Days Support'
    ],
    included: [
      'Payment Gateway Setup',
      'Inventory Management',
      'Email Marketing Setup',
      'Performance Optimization',
      'Security Features'
    ],
    deliveryTime: '2-4 weeks',
    revisions: 3
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 999,
    subtitle: 'Complete digital solution',
    description: 'Enterprise-level website with custom features and comprehensive digital strategy.',
    features: [
      'Everything in Business',
      'Unlimited Pages',
      'Custom Functionality',
      'Advanced Analytics',
      'Multi-language Support',
      'API Integrations',
      '6 Months Support'
    ],
    included: [
      'Custom CMS',
      'Advanced Security',
      'Performance Monitoring',
      'Backup Solutions',
      'Priority Support',
      'Digital Strategy Consultation'
    ],
    deliveryTime: '4-8 weeks',
    revisions: 5
  }
];

// GET /api/packages - Get all packages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const packageId = searchParams.get('id');
    
    if (packageId) {
      const package_ = packages.find(pkg => pkg.id === packageId);
      if (!package_) {
        return NextResponse.json(
          { 
            success: false,
            message: 'Package not found'
          },
          { status: 404 }
        );
      }
      return NextResponse.json({ package: package_ });
    }
    
    return NextResponse.json({ packages });
  } catch (error) {
    console.error('Error fetching packages:', error);
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

// POST /api/packages - Create package order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name,
      email,
      phone,
      company,
      businessType,
      message,
      selectedCategory,
      packageType,
      packageName,
      paymentAmount,
      paymentStatus,
      paymentMethod,
      transactionId,
      paymentIntentId,
      cardDetails,
      billingAddress,
      submissionType
    } = body;
    
    // Validate required fields
    if (!name || !email || !phone || !packageType) {
      return NextResponse.json(
        { error: 'Name, email, phone, and package type are required' },
        { status: 400 }
      );
    }
    
    // Create order object
    const order = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      phone,
      company: company || '',
      businessType: businessType || '',
      message: message || '',
      selectedCategory: selectedCategory || '',
      packageType,
      packageName,
      paymentAmount,
      paymentStatus,
      paymentMethod,
      transactionId,
      paymentIntentId,
      cardDetails,
      billingAddress,
      submissionType,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      source: 'website_package_form'
    };
    
    // Save to database
    const { db } = await connectToDatabase();
    const packagesCollection = db.collection('packages');
    await packagesCollection.insertOne(order);
    
    console.log('New package order saved:', order);
    
    return NextResponse.json(
      { 
        success: true,
        message: 'Order created successfully',
        data: {
          _id: order.id,
          ...order
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
    console.error('Error creating package order:', error);
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