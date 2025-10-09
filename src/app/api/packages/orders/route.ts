import { NextRequest, NextResponse } from 'next/server';
import { getPackageOrders } from '../storage';

// GET /api/packages/orders - Get package orders (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const paymentStatus = searchParams.get('paymentStatus');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Filter orders based on query parameters
    let filteredOrders = getPackageOrders();
    if (status) {
      filteredOrders = filteredOrders.filter(order => order.status === status);
    }
    if (paymentStatus) {
      filteredOrders = filteredOrders.filter(order => order.paymentStatus === paymentStatus);
    }
    
    // Apply pagination
    const paginatedOrders = filteredOrders.slice(offset, offset + limit);
    
    return NextResponse.json({
      orders: paginatedOrders,
      total: filteredOrders.length,
      limit,
      offset
    });
  } catch (error) {
    console.error('Error fetching package orders:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}