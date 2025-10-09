'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, ShoppingCart, Package, Users, TrendingUp } from 'lucide-react';
import Layout from '../../../components/layout/Layout';
import LeadForm from '../../../components/forms/LeadForm';

const EcommercePage = () => {
  const subcategories = [
    {
      id: 'online-stores',
      title: 'Online Stores',
      description: 'Complete e-commerce solutions with product catalogs, shopping carts, and payment processing.',
      icon: '🛒',
      features: ['Product catalogs', 'Shopping cart', 'Payment gateway', 'Inventory management']
    },
    {
      id: 'dropshipping',
      title: 'Dropshipping',
      description: 'Dropshipping platforms with supplier integration and automated order processing.',
      icon: '📦',
      features: ['Supplier integration', 'Automated orders', 'Product imports', 'Profit tracking']
    },
    {
      id: 'multi-vendor',
      title: 'Multi-vendor Marketplaces',
      description: 'Marketplace platforms where multiple vendors can sell their products with commission tracking.',
      icon: '🏪',
      features: ['Vendor management', 'Commission tracking', 'Multi-store setup', 'Vendor dashboards']
    }
  ];

  const projects = [
    {
      title: 'Fashion Forward Store',
      category: 'Online Stores',
      description: 'Modern fashion e-commerce with advanced filtering and wishlist functionality.',
      image: '👗',
      results: ['200% increase in sales', 'Mobile-first design', 'Advanced product filtering'],
      tech: ['Next.js', 'Shopify API', 'Stripe', 'Tailwind CSS'],
      link: '/portfolio/fashion-store'
    },
    {
      title: 'TechGadgets Drop',
      category: 'Dropshipping',
      description: 'Electronics dropshipping store with automated supplier integration.',
      image: '📱',
      results: ['150% profit increase', 'Automated order processing', 'Real-time inventory sync'],
      tech: ['WooCommerce', 'AliExpress API', 'Oberlo', 'PayPal'],
      link: '/portfolio/techgadgets-drop'
    },
    {
      title: 'Local Artisan Market',
      category: 'Multi-vendor Marketplaces',
      description: 'Multi-vendor marketplace for local artisans and craftspeople.',
      image: '🎨',
      results: ['50+ active vendors', 'Commission-based revenue', 'Community building'],
      tech: ['Laravel', 'Multi-vendor System', 'Commission Tracking', 'Vendor Portal'],
      link: '/portfolio/artisan-market'
    },
    {
      title: 'Organic Food Hub',
      category: 'Online Stores',
      description: 'Organic food e-commerce with subscription boxes and local delivery.',
      image: '🥬',
      results: ['300% subscription growth', 'Local delivery integration', 'Recurring revenue model'],
      tech: ['Shopify Plus', 'Subscription API', 'Delivery Tracking', 'Inventory Management'],
      link: '/portfolio/organic-food'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative hero-green-bg text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              E-commerce Websites
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-400">
                Sell Online Successfully
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Complete e-commerce solutions including online stores, dropshipping platforms, and multi-vendor marketplaces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/checkout?category=ecommerce"
                className="btn-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Started Now
                <ArrowRight className="h-5 w-5 ml-2 inline" />
              </Link>
              <Link
                href="/contact"
                className="btn-secondary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Book Free Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 green-section-header">
              E-commerce Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the e-commerce solution that matches your business model and sales strategy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subcategories.map((subcategory, index) => (
              <div key={index} className="group">
                <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105 transform hover-card-effect h-full flex flex-col">
                  <div className="text-4xl mb-4 text-center">{subcategory.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-blue transition-colors text-center">
                    {subcategory.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-4 flex-grow">{subcategory.description}</p>
                  <ul className="space-y-2">
                    {subcategory.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-primary-green mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 green-section-header">
              E-commerce Project Examples
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we've helped businesses build successful online stores and marketplaces.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">{project.image}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-blue transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-sm text-primary-blue font-medium">{project.category}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
                  <ul className="space-y-1">
                    {project.results.map((result, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-primary-green mr-2" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="bg-green-100 text-primary-green px-2 py-1 rounded text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href={project.link}
                  className="inline-flex items-center text-primary-blue hover:text-blue-700 font-medium transition-colors"
                >
                  View Case Study
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 green-section-header">
              E-commerce Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to run a successful online business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-primary-green" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Shopping Cart</h3>
              <p className="text-gray-600">Advanced cart functionality with saved items and quick checkout.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-primary-green" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Inventory Management</h3>
              <p className="text-gray-600">Real-time inventory tracking and automated stock alerts.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-green" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Management</h3>
              <p className="text-gray-600">Customer accounts, order history, and loyalty programs.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary-green" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
              <p className="text-gray-600">Detailed sales reports and customer behavior insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Launch Your Online Store?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of successful online businesses powered by DaliWeb's e-commerce solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/checkout?category=ecommerce"
              className="bg-white text-primary-green px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started Now
              <ArrowRight className="h-5 w-5 ml-2 inline" />
            </Link>
            <Link
              href="/contact"
              className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-green-800"
            >
              Book Free Demo
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EcommercePage;