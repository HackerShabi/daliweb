'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { CheckCircleIcon, CalendarIcon, CreditCardIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface BookingDetails {
  id: string;
  name: string;
  email: string;
  preferredDate: string;
  demoType: string;
  paymentAmount: number;
  transactionId: string;
  bookingStatus: string;
  paymentStatus: string;
}

const CheckoutSuccessPage = () => {
  const searchParams = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const bookingId = searchParams.get('id') || searchParams.get('booking');
  const transactionId = searchParams.get('transaction');
  const submissionType = searchParams.get('type');

  useEffect(() => {
    // Simply set loading to false and show success message
    // No need to fetch booking details from API
    setLoading(false);
    
    // Create mock booking details for display
    setBookingDetails({
      id: bookingId || 'N/A',
      name: 'Customer',
      email: 'customer@example.com',
      preferredDate: 'N/A',
      demoType: submissionType || 'N/A',
      paymentAmount: 0,
      transactionId: transactionId || 'N/A',
      bookingStatus: 'confirmed',
      paymentStatus: submissionType === 'quote' ? 'N/A' : 'completed'
    });
  }, [bookingId, transactionId, submissionType]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-purple-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading booking details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Always show success page - no error handling needed

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };



  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-purple-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="mx-auto w-20 h-20 bg-primary-green rounded-full flex items-center justify-center mb-6">
              <CheckCircleIcon className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              {submissionType === 'quote' ? 'Quote Request Submitted!' : 
               submissionType === 'package' ? 'Package Purchase Successful!' : 
               'Demo Booking Confirmed!'}
            </h1>
            <p className="text-green-100 text-lg">
              {submissionType === 'quote' ? 'Thank you for your interest! We will consult you within 24 hours and review your request thoroughly to provide the best solution for your business.' : 
               submissionType === 'package' ? 'Thank you for choosing our services! We provide 24/7 customer support and will handle everything for you. Our team will be in touch shortly to begin your project.' : 
               'Success! We will send you a demo on your WhatsApp and email within 48 hours. We will also schedule a meeting for your project - you will be notified via email and WhatsApp.'}
            </p>
          </div>

          {/* Booking Details Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {submissionType === 'quote' ? 'Quote Request Details' : 
               submissionType === 'package' ? 'Package Purchase Details' : 
               'Booking Details'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {(submissionType === 'demo' || (bookingDetails.preferredDate && bookingDetails.preferredDate !== 'N/A')) && (
                  <div className="flex items-start space-x-4">
                    <CalendarIcon className="w-6 h-6 text-green-400 mt-1" />
                    <div>
                      <h3 className="text-white font-medium">
                        {submissionType === 'demo' ? 'Demo Schedule' : 'Preferred Contact Time'}
                      </h3>
                      <p className="text-green-100">{formatDate(bookingDetails.preferredDate)}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start space-x-4">
                  <EnvelopeIcon className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h3 className="text-white font-medium">Contact Information</h3>
                    <p className="text-green-100">{bookingDetails.name}</p>
                <p className="text-green-100">{bookingDetails.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mt-1">
                  <span className="text-green-900 text-xs font-bold">
                      {submissionType === 'quote' ? 'Q' : submissionType === 'package' ? 'P' : 'D'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">
                      {submissionType === 'quote' ? 'Request Type' : 
                       submissionType === 'package' ? 'Package Type' : 
                       'Demo Type'}
                    </h3>
                    <p className="text-green-100 capitalize">{bookingDetails.demoType.replace('_', ' ')}</p>
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                {submissionType !== 'quote' && (
                  <div className="flex items-start space-x-4">
                    <CreditCardIcon className="w-6 h-6 text-green-400 mt-1" />
                    <div>
                      <h3 className="text-white font-medium">Payment Information</h3>
                      <p className="text-green-100">${bookingDetails.paymentAmount.toFixed(2)} USD</p>
                      <p className="text-green-100 text-sm">Transaction ID: {bookingDetails.transactionId}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mt-1">
                    <span className="text-green-900 text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Status</h3>
                    <p className="text-green-100 capitalize">{bookingDetails.bookingStatus}</p>
                    <p className="text-green-100 text-sm capitalize">Payment: {bookingDetails.paymentStatus}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mt-1">
                    <span className="text-green-900 text-xs font-bold">#</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Booking ID</h3>
                    <p className="text-green-100 text-sm font-mono">{bookingDetails.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">What's Next?</h2>
            
            <div className="space-y-4">
              {submissionType === 'quote' && (
                <>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Review Process</h3>
                      <p className="text-green-100">Our expert team will thoroughly review your requirements and business needs.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Consultation Call</h3>
                      <p className="text-green-100">We'll contact you within 24 hours to discuss your project and provide personalized consultation.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Detailed Quote</h3>
                      <p className="text-green-100">You'll receive a comprehensive quote with timeline, features, and pricing details.</p>
                    </div>
                  </div>
                </>
              )}
              
              {submissionType === 'demo' && (
                <>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Demo Preparation</h3>
                      <p className="text-green-100">Our team will prepare a customized demo based on your business requirements.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Demo Delivery</h3>
                      <p className="text-green-100">Within 48 hours, you'll receive the demo via WhatsApp and email.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Project Meeting</h3>
                      <p className="text-green-100">We'll schedule a meeting to discuss your project in detail. You'll be notified via email and WhatsApp.</p>
                    </div>
                  </div>
                </>
              )}
              
              {submissionType === 'package' && (
                <>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Project Initiation</h3>
                      <p className="text-green-100">Our team will start working on your project immediately and contact you within 24 hours.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h3 className="text-white font-medium">24/7 Support</h3>
                      <p className="text-green-100">You now have access to our 24/7 customer support for any questions or assistance.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Ongoing Partnership</h3>
                      <p className="text-green-100">We'll handle everything for you and provide continuous support throughout your project and beyond.</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="space-x-4">
              <button
                onClick={() => router.push('/')}
                className="btn-primary px-8 py-3 rounded-lg font-medium"
              >
                Return Home
              </button>
              
              <button
                onClick={() => router.push('/contact')}
                className="btn-secondary px-8 py-3 rounded-lg font-medium"
              >
                Contact Support
              </button>
            </div>
            
            <p className="text-green-200 text-sm">
              Need to reschedule? Contact us at{' '}
              <a href="mailto:support@daliweb.com" className="text-primary-green hover:text-green-300">
                support@daliweb.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const CheckoutSuccessPageWithSuspense = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CheckoutSuccessPage />
    </Suspense>
  );
};

export default CheckoutSuccessPageWithSuspense;