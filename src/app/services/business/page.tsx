'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Building2, Users, Briefcase, Globe } from 'lucide-react';
import Layout from '../../../components/layout/Layout';
import LeadForm from '../../../components/forms/LeadForm';

const BusinessPage = () => {
  const subcategories = [
    {
      id: 'corporate',
      title: 'Corporate',
      description: 'Professional corporate websites with advanced features and enterprise-level functionality.',
      icon: '🏢',
      features: ['Multi-page websites', 'CMS integration', 'Employee portals', 'Corporate branding']
    },
    {
      id: 'agencies',
      title: 'Agencies',
      description: 'Creative agency websites showcasing portfolios, services, and client testimonials.',
      icon: '🎯',
      features: ['Portfolio showcase', 'Client management', 'Project galleries', 'Team profiles']
    },
    {
      id: 'local-shops',
      title: 'Local Shops',
      description: 'Local business websites with location-based features and customer engagement tools.',
      icon: '🏪',
      features: ['Location mapping', 'Business hours', 'Customer reviews', 'Contact forms']
    },
    {
      id: 'consultants',
      title: 'Consultants',
      description: 'Professional consultant websites with booking systems and expertise showcases.',
      icon: '💼',
      features: ['Appointment booking', 'Service packages', 'Testimonials', 'Blog integration']
    }
  ];

  const projects = [
    {
      title: 'TechCorp Solutions',
      category: 'Corporate',
      description: 'Enterprise website with employee portal and client management system.',
      image: '🏢',
      results: ['40% increase in lead generation', 'Streamlined employee communication', 'Enhanced brand presence'],
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      link: '/portfolio/techcorp-solutions'
    },
    {
      title: 'Creative Design Agency',
      category: 'Agencies',
      description: 'Portfolio website showcasing creative work with interactive galleries.',
      image: '🎨',
      results: ['60% more client inquiries', 'Improved portfolio presentation', 'Mobile-optimized design'],
      tech: ['React', 'Framer Motion', 'Sanity CMS'],
      link: '/portfolio/creative-agency'
    },
    {
      title: 'Local Coffee Shop',
      category: 'Local Shops',
      description: 'Local business website with online ordering and location features.',
      image: '☕',
      results: ['30% increase in online orders', 'Better customer engagement', 'Local SEO optimization'],
      tech: ['WordPress', 'WooCommerce', 'Google Maps API'],
      link: '/portfolio/coffee-shop'
    },
    {
      title: 'Business Consultant',
      category: 'Consultants',
      description: 'Professional consultant website with booking system and service showcase.',
      image: '💼',
      results: ['50% more bookings', 'Automated scheduling', 'Professional online presence'],
      tech: ['Next.js', 'Calendly Integration', 'Stripe'],
      link: '/portfolio/business-consultant'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative hero-green-bg text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-6">🏢</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Business Websites
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300">
                Professional Solutions
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Professional business solutions including corporate websites, CRM systems, and enterprise applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/checkout?category=business"
                className="btn-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Started Now
                <ArrowRight className="h-5 w-5 ml-2 inline" />
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-white/20"
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
              Business Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the business solution that fits your specific needs and industry requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              Business Project Examples
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we've helped businesses like yours succeed online with our professional solutions.
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

      {/* CTA Section */}
      <section className="py-20 bg-primary-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Your Business Website?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join hundreds of businesses that trust DaliWeb for their professional online presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/checkout?category=business"
              className="bg-white text-primary-blue px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
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

export default BusinessPage;