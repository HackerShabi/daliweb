import Link from 'next/link';
import { 
  Check, 
  X, 
  Star, 
  Clock, 
  Users, 
  Zap, 
  Shield, 
  Headphones,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import LeadForm from '@/components/forms/LeadForm';

const PricingPage = () => {
  const packages = [
    {
      name: 'Starter',
      subtitle: 'Perfect for small businesses',
      price: '$99',
      originalPrice: '$199',
      popular: false,
      description: 'Get online quickly with a professional website that covers all the essentials.',
      deliveryTime: '5-7 business days',
      pages: '3-5 pages',
      features: [
        { name: 'Responsive Design', included: true },
        { name: 'Mobile Optimization', included: true },
        { name: 'Basic SEO Setup', included: true },
        { name: 'Contact Form', included: true },
        { name: 'Google Analytics', included: true },
        { name: 'Social Media Links', included: true },
        { name: '1 Month Free Support', included: true },
        { name: 'SSL Certificate', included: true },
        { name: 'E-commerce Functionality', included: false },
        { name: 'Advanced SEO', included: false },
        { name: 'Custom Integrations', included: false },
        { name: 'Priority Support', included: false }
      ],
      includes: [
        'Home Page',
        'About Us Page',
        'Services Page',
        'Contact Page',
        'Basic Logo Design'
      ],
      bestFor: [
        'Small Local Businesses',
        'Service Providers',
        'Consultants',
        'Freelancers'
      ]
    },
    {
      name: 'Business',
      subtitle: 'Most popular choice',
      price: '$499',
      originalPrice: '$699',
      popular: true,
      description: 'Complete business solution with advanced features and integrations.',
      deliveryTime: '7-10 business days',
      pages: '6-10 pages',
      features: [
        { name: 'Responsive Design', included: true },
        { name: 'Mobile Optimization', included: true },
        { name: 'Basic SEO Setup', included: true },
        { name: 'Contact Form', included: true },
        { name: 'Google Analytics', included: true },
        { name: 'Social Media Links', included: true },
        { name: '1 Month Free Support', included: true },
        { name: 'SSL Certificate', included: true },
        { name: 'E-commerce Functionality', included: true },
        { name: 'Advanced SEO', included: true },
        { name: 'Custom Integrations', included: true },
        { name: 'Priority Support', included: false }
      ],
      includes: [
        'Up to 10 Pages',
        'E-commerce Store (up to 50 products)',
        'Booking/Appointment System',
        'Customer Portal',
        'Payment Integration',
        'Inventory Management',
        'Email Marketing Setup',
        'Professional Logo Design'
      ],
      bestFor: [
        'Growing Businesses',
        'E-commerce Stores',
        'Service Businesses',
        'Healthcare Practices',
        'Hotels & Restaurants'
      ]
    },
    {
      name: 'Premium',
      subtitle: 'For established businesses',
      price: '$999',
      originalPrice: '$1,299',
      popular: false,
      description: 'Enterprise-level solution with custom features and dedicated support.',
      deliveryTime: '10-14 business days',
      pages: 'Unlimited',
      features: [
        { name: 'Responsive Design', included: true },
        { name: 'Mobile Optimization', included: true },
        { name: 'Basic SEO Setup', included: true },
        { name: 'Contact Form', included: true },
        { name: 'Google Analytics', included: true },
        { name: 'Social Media Links', included: true },
        { name: '1 Month Free Support', included: true },
        { name: 'SSL Certificate', included: true },
        { name: 'E-commerce Functionality', included: true },
        { name: 'Advanced SEO', included: true },
        { name: 'Custom Integrations', included: true },
        { name: 'Priority Support', included: true }
      ],
      includes: [
        'Unlimited Pages',
        'Advanced E-commerce (unlimited products)',
        'Custom Web Application',
        'Multi-user Dashboard',
        'Advanced Analytics',
        'Third-party Integrations',
        'Custom API Development',
        'Complete Branding Package',
        '3 Months Priority Support',
        'Performance Optimization'
      ],
      bestFor: [
        'Large Businesses',
        'Multi-location Companies',
        'Complex E-commerce',
        'Custom Applications',
        'Enterprise Solutions'
      ]
    }
  ];

  const addOns = [
    {
      name: 'Additional Pages',
      price: '$150',
      description: 'Add extra pages to your website'
    },
    {
      name: 'Blog Setup',
      price: '$300',
      description: 'Complete blog with CMS integration'
    },
    {
      name: 'Advanced SEO Package',
      price: '$500',
      description: 'Comprehensive SEO optimization'
    },
    {
      name: 'Social Media Integration',
      price: '$200',
      description: 'Advanced social media features'
    },
    {
      name: 'Custom Forms',
      price: '$250',
      description: 'Complex forms with automation'
    },
    {
      name: 'Multi-language Support',
      price: '$800',
      description: 'Support for multiple languages'
    }
  ];

  const faqs = [
    {
      question: 'What\'s included in the price?',
      answer: 'Each package includes everything listed in the features section, plus hosting setup, domain connection, and initial content upload. No hidden fees!'
    },
    {
      question: 'How long does it take to build my website?',
      answer: 'Delivery times vary by package: Starter (5-7 days), Business (7-10 days), Premium (10-14 days). Timeline starts after we receive all your content and requirements.'
    },
    {
      question: 'Do you provide hosting?',
      answer: 'We help you set up hosting with reliable providers. Hosting costs are separate and typically range from $10-50/month depending on your needs.'
    },
    {
      question: 'Can I upgrade my package later?',
      answer: 'Absolutely! You can upgrade your package at any time. We\'ll credit what you\'ve already paid toward the higher package.'
    },
    {
      question: 'What if I need revisions?',
      answer: 'All packages include 2 rounds of revisions. Additional revisions are available at $75/hour. We want you to be completely satisfied!'
    },
    {
      question: 'Do you offer ongoing maintenance?',
      answer: 'Yes! We offer maintenance plans starting at $99/month that include updates, backups, security monitoring, and content changes.'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="hero-title mb-6">
              Simple, Transparent <span className="text-primary-blue">Pricing</span>
            </h1>
            <p className="hero-subtitle max-w-3xl mx-auto mb-8">
              Choose the perfect package for your business. All packages include 
              modern design, mobile optimization, and everything you need to succeed online.
            </p>
            <div className="bg-green-100 text-primary-green px-6 py-3 rounded-full inline-block font-semibold">
              🎉 Limited Time: Save up to $1,000 on all packages!
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden hover-card-effect transition-all duration-300 hover:scale-105 ${
                  pkg.popular ? 'ring-2 ring-primary-green scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-primary-green text-white text-center py-2 font-semibold">
                    <Star className="h-4 w-4 inline mr-1" />
                    Most Popular
                  </div>
                )}
                
                <div className={`p-8 ${pkg.popular ? 'pt-16' : ''}`}>
                  {/* Package Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <p className="text-primary-blue font-medium mb-4">{pkg.subtitle}</p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">{pkg.price}</span>
                      <span className="text-lg text-gray-500 line-through ml-2">{pkg.originalPrice}</span>
                    </div>
                    <p className="text-gray-600 mb-6">{pkg.description}</p>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <Clock className="h-5 w-5 text-primary-blue mx-auto mb-1" />
                        <div className="text-sm font-medium text-gray-900">{pkg.deliveryTime}</div>
                        <div className="text-xs text-gray-500">Delivery</div>
                      </div>
                      <div className="text-center">
                        <Users className="h-5 w-5 text-primary-green mx-auto mb-1" />
                        <div className="text-sm font-medium text-gray-900">{pkg.pages}</div>
                        <div className="text-xs text-gray-500">Pages</div>
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4">Features Included:</h4>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          {feature.included ? (
                            <Check className="h-4 w-4 text-primary-green mr-3 flex-shrink-0" />
                          ) : (
                            <X className="h-4 w-4 text-gray-300 mr-3 flex-shrink-0" />
                          )}
                          <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What's Included */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4">What You Get:</h4>
                    <ul className="space-y-2">
                      {pkg.includes.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-primary-green mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best For */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4">Perfect For:</h4>
                    <div className="flex flex-wrap gap-2">
                      {pkg.bestFor.map((type, typeIndex) => (
                        <span
                          key={typeIndex}
                          className="bg-green-100 text-primary-green px-2 py-1 rounded text-xs font-medium"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="/category-selection"
                    className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                      pkg.popular
                        ? 'btn-primary'
                        : 'btn-secondary'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading mb-4">
              Optional Add-ons
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your website with these additional features and services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover-card-effect transition-all duration-300 hover:scale-105">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{addon.name}</h3>
                  <span className="text-primary-green font-bold">{addon.price}</span>
                </div>
                <p className="text-gray-600 text-sm">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading mb-4">
              Package Comparison
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare all features across our packages to find the perfect fit.
            </p>
          </div>
          
          {/* Mobile-friendly comparison */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Starter</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 bg-green-50">Business</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Premium</th>
                </tr>
              </thead>
              <tbody>
                {packages[0].features.map((feature, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-6 text-gray-700">{feature.name}</td>
                    <td className="py-3 px-6 text-center">
                      {packages[0].features[index].included ? (
                        <Check className="h-5 w-5 text-primary-green mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-6 text-center bg-green-50">
                      {packages[1].features[index].included ? (
                        <Check className="h-5 w-5 text-primary-green mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {packages[2].features[index].included ? (
                        <Check className="h-5 w-5 text-primary-green mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers.
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover-card-effect transition-all duration-300 hover:scale-105">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-primary-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join hundreds of satisfied clients who've transformed their business with our websites.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/contact?type=demo"
              className="bg-white text-primary-green hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Book Free Demo
            </Link>
            <Link
              href="/contact?type=quote"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-green px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Get Free Quote
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-green-100">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <span>100% Satisfaction Guarantee</span>
            </div>
            <div className="flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center">
              <Headphones className="h-5 w-5 mr-2" />
              <span>Expert Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Still Have Questions?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Get a personalized quote based on your specific needs. Our team will 
                help you choose the perfect package and add-ons for your business.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-green mr-3" />
                  <span className="text-gray-700">Free consultation and quote</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-green mr-3" />
                  <span className="text-gray-700">No obligation or pressure</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-green mr-3" />
                  <span className="text-gray-700">Expert recommendations</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-green mr-3" />
                  <span className="text-gray-700">Custom package options</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Get Your Custom Quote</h3>
              <LeadForm source="pricing" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PricingPage;