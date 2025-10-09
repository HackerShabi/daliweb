import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Policy | DaliWeb Agency',
  description: 'Service and Shipping Policy for DaliWeb Agency - Learn about our digital service delivery methods.',
};

export default function ServicePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 green-section-header">Service / Shipping Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 green-section-header">Digital Services Only</h2>
              <div className="bg-green-50 border-l-4 border-primary-green p-4 mb-4">
                <p className="text-green-700 font-semibold">
                  DaliWeb Agency provides exclusively digital services. We do not ship any physical products.
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                All our services are delivered digitally through electronic means. There are no physical items 
                to ship, package, or deliver to your physical address.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 green-section-header">Our Digital Services</h2>
              <p className="text-gray-700 mb-4">
                We specialize in providing the following digital services:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Web Development:</strong> Custom website design and development</li>
                <li><strong>Demo Sessions:</strong> Live online demonstrations of our capabilities</li>
                <li><strong>SEO Services:</strong> Search engine optimization and digital marketing</li>
                <li><strong>E-commerce Solutions:</strong> Online store development and management</li>
                <li><strong>Digital Consulting:</strong> Strategy and technical consultation</li>
                <li><strong>Website Maintenance:</strong> Ongoing support and updates</li>
                <li><strong>Digital Marketing:</strong> Online advertising and promotion services</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 green-section-header">Service Delivery Methods</h2>
              <p className="text-gray-700 mb-4">
                Our digital deliverables are provided through the following methods:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 p-4 rounded-lg hover-card-effect transition-all duration-300 hover:scale-105">
                  <h3 className="text-green-800 font-semibold mb-2">Email Delivery</h3>
                  <ul className="list-disc pl-4 text-green-700 text-sm">
                    <li>Project files and assets</li>
                    <li>Documentation and guides</li>
                    <li>Login credentials</li>
                    <li>Progress reports</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg hover-card-effect transition-all duration-300 hover:scale-105">
                  <h3 className="text-green-800 font-semibold mb-2">Hosting Environment</h3>
                  <ul className="list-disc pl-4 text-green-700 text-sm">
                    <li>Live website deployment</li>
                    <li>Staging environments</li>
                    <li>Content management systems</li>
                    <li>Database access</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg hover-card-effect transition-all duration-300 hover:scale-105">
                  <h3 className="text-green-800 font-semibold mb-2">Cloud Platforms</h3>
                  <ul className="list-disc pl-4 text-green-700 text-sm">
                    <li>File sharing services</li>
                    <li>Collaborative workspaces</li>
                    <li>Version control systems</li>
                    <li>Project management tools</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg hover-card-effect transition-all duration-300 hover:scale-105">
                  <h3 className="text-green-800 font-semibold mb-2">Direct Access</h3>
                  <ul className="list-disc pl-4 text-green-700 text-sm">
                    <li>Admin panel access</li>
                    <li>FTP/SFTP credentials</li>
                    <li>API keys and integrations</li>
                    <li>Training sessions</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 green-section-header">Delivery Timeframes</h2>
              <p className="text-gray-700 mb-4">
                Service delivery times vary based on the complexity and scope of your project:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Demo Sessions:</strong> Scheduled within 24-48 hours of booking</li>
                <li><strong>Starter Package:</strong> 3-5 business days</li>
                <li><strong>Business Package:</strong> 7-10 business days</li>
                <li><strong>Premium Package:</strong> 14-21 business days</li>
                <li><strong>Custom Projects:</strong> Timeline discussed during consultation</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 green-section-header">Service Support</h2>
              <p className="text-gray-700 mb-4">
                We provide ongoing support for all our digital services:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Technical Support:</strong> Help with implementation and troubleshooting</li>
                <li><strong>Documentation:</strong> Comprehensive guides and tutorials</li>
                <li><strong>Training:</strong> User training sessions for complex systems</li>
                <li><strong>Maintenance:</strong> Ongoing updates and security patches</li>
                <li><strong>Consultation:</strong> Strategic advice and optimization recommendations</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 green-section-header">Geographic Coverage</h2>
              <p className="text-gray-700 mb-4">
                Since all our services are digital, we can serve clients globally. There are no geographic 
                restrictions or shipping limitations. Our services are available worldwide through internet connectivity.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 green-section-header">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                For questions about our service delivery or to discuss your project requirements:
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