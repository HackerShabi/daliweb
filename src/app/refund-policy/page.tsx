import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy | DaliWeb Agency',
  description: 'Refund and Return Policy for DaliWeb Agency - Learn about our refund terms for demo bookings and project payments.',
};

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Refund / Return Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Demo Booking Refunds</h2>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <p className="text-red-700 font-semibold">
                  Demo bookings ($20) are non-refundable.
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                Once a demo booking is confirmed and payment is processed, the $20 fee is non-refundable. 
                This fee covers the time and resources allocated for preparing and conducting your personalized demo session.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Project Payment Refunds</h2>
              <p className="text-gray-700 mb-4">
                Our project packages include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Starter Package:</strong> $99</li>
                <li><strong>Business Package:</strong> $499</li>
                <li><strong>Premium Package:</strong> $999</li>
              </ul>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                <h3 className="text-green-800 font-semibold mb-2">Before Work Begins</h3>
                <p className="text-green-700">
                  Project payments are fully refundable if the project work has not yet started. 
                  You can request a full refund within 24 hours of payment if no development work has commenced.
                </p>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <h3 className="text-yellow-800 font-semibold mb-2">After Work Begins</h3>
                <p className="text-yellow-700">
                  Once project development has started, refunds are provided at the company's discretion. 
                  Partial refunds may be considered based on:
                </p>
                <ul className="list-disc pl-6 text-yellow-700 mt-2">
                  <li>Amount of work completed</li>
                  <li>Resources already allocated</li>
                  <li>Specific circumstances of the request</li>
                </ul>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Refund Process</h2>
              <p className="text-gray-700 mb-4">
                To request a refund, please contact us with:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Your order/project reference number</li>
                <li>Reason for the refund request</li>
                <li>Any relevant documentation</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Approved refunds will be processed within 5-10 business days to the original payment method.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                For refund requests or questions about this policy, please contact us:
              </p>
              <div className="text-gray-700">
                <p><strong>Email:</strong> daliweb05@gmail.com</p>
                <p><strong>Phone:</strong> 0329 0091255</p>
                <p><strong>Address:</strong> Street 08 Dijkot Town, Faisalabad, Pakistan</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}