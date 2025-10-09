import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | DaliWeb Agency',
  description: 'Privacy Policy for DaliWeb Agency - Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                At DaliWeb Agency, we collect only the necessary information required to provide our services effectively. 
                The information we collect includes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Business type and requirements</li>
                <li>Project details and messages</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the collected information solely for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Delivering our web development and digital marketing services</li>
                <li>Communicating with you about your project requirements</li>
                <li>Providing customer support and project updates</li>
                <li>Processing payments and managing your account</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information Sharing</h2>
              <p className="text-gray-700 mb-4">
                We do not share, sell, or distribute your personal information to third parties, except:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>With payment gateways (such as PayFast) for processing transactions</li>
                <li>When required by law or legal proceedings</li>
                <li>With your explicit consent</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
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