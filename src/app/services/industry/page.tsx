'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Building, MapPin, Heart, Home, GraduationCap } from 'lucide-react';
import Layout from '../../../components/layout/Layout';
import LeadForm from '../../../components/forms/LeadForm';

const IndustryPage = () => {
  const subcategories = [
    {
      id: 'hotels',
      title: 'Hotels',
      description: 'Hospitality websites with booking systems, room showcases, and guest management.',
      icon: '🏨',
      features: ['Online booking', 'Room galleries', 'Guest reviews', 'Amenities showcase']
    },
    {
      id: 'restaurants',
      title: 'Restaurants',
      description: 'Restaurant websites with online menus, reservations, and food ordering systems.',
      icon: '🍽️',
      features: ['Digital menus', 'Table reservations', 'Online ordering', 'Chef profiles']
    },
    {
      id: 'healthcare',
      title: 'Healthcare',
      description: 'Medical websites with appointment booking, patient portals, and service information.',
      icon: '🏥',
      features: ['Appointment booking', 'Patient portals', 'Service listings', 'Doctor profiles']
    },
    {
      id: 'real-estate',
      title: 'Real Estate',
      description: 'Property websites with listings, virtual tours, and agent management systems.',
      icon: '🏠',
      features: ['Property listings', 'Virtual tours', 'Agent profiles', 'Search filters']
    },
    {
      id: 'schools',
      title: 'Schools',
      description: 'Educational websites with course catalogs, student portals, and learning management.',
      icon: '🎓',
      features: ['Course catalogs', 'Student portals', 'Event calendars', 'Faculty profiles']
    }
  ];

  const projects = [
    {
      title: 'Grand Hotel Resort',
      category: 'Hotels',
      description: 'Luxury hotel website with integrated booking system and virtual room tours.',
      image: '🏨',
      results: ['70% increase in direct bookings', 'Reduced booking platform fees', 'Enhanced guest experience'],
      tech: ['Next.js', 'Booking API', 'Stripe', 'Virtual Tours'],
      link: '/portfolio/grand-hotel'
    },
    {
      title: 'Bella Vista Restaurant',
      category: 'Restaurants',
      description: 'Fine dining restaurant with online reservations and digital menu showcase.',
      image: '🍽️',
      results: ['50% more reservations', 'Streamlined ordering process', 'Mobile-optimized menu'],
      tech: ['React', 'OpenTable API', 'Digital Menu', 'Payment Gateway'],
      link: '/portfolio/bella-vista'
    },
    {
      title: 'HealthCare Plus Clinic',
      category: 'Healthcare',
      description: 'Medical clinic website with patient portal and appointment scheduling.',
      image: '🏥',
      results: ['40% reduction in phone calls', 'Improved patient satisfaction', 'HIPAA compliant'],
      tech: ['Next.js', 'Patient Portal', 'Scheduling API', 'Secure Forms'],
      link: '/portfolio/healthcare-plus'
    },
    {
      title: 'Prime Properties',
      category: 'Real Estate',
      description: 'Real estate agency website with property listings and virtual tours.',
      image: '🏠',
      results: ['60% more property inquiries', 'Virtual tour integration', 'Lead generation boost'],
      tech: ['React', 'MLS Integration', '360° Tours', 'CRM System'],
      link: '/portfolio/prime-properties'
    },
    {
      title: 'Bright Future Academy',
      category: 'Schools',
      description: 'Private school website with student portal and course management system.',
      image: '🎓',
      results: ['Improved parent communication', 'Streamlined enrollment', 'Digital grade books'],
      tech: ['Next.js', 'LMS Integration', 'Parent Portal', 'Grade Management'],
      link: '/portfolio/bright-future'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-6">🏭</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Industry-Specific <span className="text-primary-blue">Web Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Industry-specific solutions for hotels, restaurants, healthcare, real estate, and educational institutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/checkout?category=industry"
                className="btn-primary text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Get Started Now
                <ArrowRight className="h-5 w-5 ml-2 inline" />
              </Link>
              <Link
                href="/contact"
                className="btn-secondary px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
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
              Industry Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized solutions tailored to your industry's unique requirements and regulations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
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
              Industry Project Examples
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how we've transformed businesses across various industries with our specialized solutions.
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
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
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
      <section className="py-20 bg-primary-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Industry Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join industry leaders who trust DaliWeb for their specialized online solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/checkout?category=industry"
              className="bg-white text-primary-blue px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started Now
              <ArrowRight className="h-5 w-5 ml-2 inline" />
            </Link>
            <Link
              href="/contact"
              className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-blue-800"
            >
              Book Free Demo
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndustryPage;