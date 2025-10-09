import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | DaliWeb Agency',
  description: 'Terms and Conditions for DaliWeb Agency - Website usage terms, customer responsibilities, and payment terms.',
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using the DaliWeb Agency website and services, you accept and agree to be bound by 
                the terms and provision of this agreement. If you do not agree to abide by the above, please do not 
                use this service.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Website Usage</h2>
              <p className="text-gray-700 mb-4">
                You may use our website for lawful purposes only. You agree not to use the website:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                <li>To impersonate or attempt to impersonate the company, a company employee, another user, or any other person or entity</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Responsibilities</h2>
              <p className="text-gray-700 mb-4">
                As a customer of DaliWeb Agency, you are responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Providing accurate and complete information for your project requirements</li>
                <li>Timely communication and feedback during the project development process</li>
                <li>Providing necessary content, images, and materials required for your project</li>
                <li>Making payments according to the agreed schedule and terms</li>
                <li>Reviewing and approving project milestones within reasonable timeframes</li>
                <li>Ensuring you have the rights to any content you provide for use in your project</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Terms</h2>
              <p className="text-gray-700 mb-4">
                Payment terms for our services are as follows:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Demo Bookings:</strong> $20 payment required upfront, non-refundable</li>
                <li><strong>Project Packages:</strong> Payment required before project commencement</li>
                <li><strong>Payment Methods:</strong> We accept payments through PayFast and other approved payment gateways</li>
                <li><strong>Currency:</strong> All prices are in USD unless otherwise specified</li>
                <li><strong>Late Payments:</strong> Late payments may result in project delays or suspension</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Service Delivery</h2>
              <p className="text-gray-700 mb-4">
                We strive to deliver all projects within the agreed timeframes. However, delivery dates are estimates 
                and may be subject to change based on:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Complexity of project requirements</li>
                <li>Timely provision of required materials by the customer</li>
                <li>Scope changes or additional requirements</li>
                <li>Technical challenges or third-party dependencies</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                Upon full payment, customers receive ownership of the final delivered website and its custom code. 
                However, DaliWeb Agency retains the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Use the project as a portfolio piece for marketing purposes</li>
                <li>Retain ownership of any proprietary tools, frameworks, or methodologies used</li>
                <li>Reuse general concepts and non-proprietary techniques in future projects</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                DaliWeb Agency shall not be liable for any indirect, incidental, special, consequential, or punitive 
                damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Governing Law and Jurisdiction</h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <p className="text-blue-700 font-semibold">
                  These Terms and Conditions are governed by and construed in accordance with the laws of Pakistan. 
                  Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction 
                  of the courts of Pakistan.
                </p>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon 
                posting on this website. Your continued use of our services after any changes constitutes acceptance 
                of the new terms.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
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