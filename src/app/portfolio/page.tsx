'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ExternalLink, 
  Filter, 
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import LeadForm from '@/components/forms/LeadForm';
// Metadata removed - not allowed in client components

interface Project {
  id: string;
  title: string;
  description: string;
  industry: string;
  category: string;
  image: string;
  technologies: string[];
  features: string[];
  results: {
    metric: string;
    value: string;
  }[];
  testimonial?: {
    text: string;
    author: string;
    position: string;
  };
  liveUrl?: string;
  completedDate: string;
}

const PortfolioPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  // Sample portfolio projects
  const projects: Project[] = [
    {
      id: '1',
      title: 'Johnson Family Clinic',
      description: 'Modern medical website with online appointment booking and patient portal',
      industry: 'Healthcare',
      category: 'doctors',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'TailwindCSS', 'Clerk Auth', 'Stripe'],
      features: [
        'Online appointment booking',
        'Patient portal',
        'Insurance verification',
        'Telehealth integration',
        'Medical forms'
      ],
      results: [
        { metric: 'New Patients', value: '+300%' },
        { metric: 'Online Bookings', value: '85%' },
        { metric: 'Admin Time Saved', value: '40%' }
      ],
      testimonial: {
        text: 'The new website has transformed our practice. We\'re getting more patients than ever before, and the online booking system has made our lives so much easier.',
        author: 'Dr. Sarah Johnson',
        position: 'Family Medicine Physician'
      },
      liveUrl: 'https://johnsonfamilyclinic.com',
      completedDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Sunset Resort & Spa',
      description: 'Luxury hotel website with booking system and virtual tours',
      industry: 'Hospitality',
      category: 'hotels',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'TailwindCSS', 'Clerk Auth', 'Booking API'],
      features: [
        'Room booking system',
        'Virtual property tours',
        'Spa appointment booking',
        'Guest reviews',
        'Multi-language support'
      ],
      results: [
        { metric: 'Direct Bookings', value: '+40%' },
        { metric: 'Revenue Increase', value: '+25%' },
        { metric: 'Guest Satisfaction', value: '4.8/5' }
      ],
      testimonial: {
        text: 'Our direct bookings have increased significantly since launching the new website. The booking system is intuitive and our guests love the virtual tours.',
        author: 'Maria Rodriguez',
        position: 'Hotel Manager'
      },
      liveUrl: 'https://sunsetresort.com',
      completedDate: '2024-02-20'
    },
    {
      id: '3',
      title: 'TechStyle Boutique',
      description: 'Modern e-commerce store for fashion retailer with inventory management',
      industry: 'Retail',
      category: 'shops',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'TailwindCSS', 'Clerk Auth', 'Stripe', 'Inventory API'],
      features: [
        'Product catalog',
        'Shopping cart',
        'Inventory management',
        'Customer accounts',
        'Order tracking'
      ],
      results: [
        { metric: 'Online Sales', value: '+200%' },
        { metric: 'Customer Base', value: '+150%' },
        { metric: 'Average Order', value: '+35%' }
      ],
      testimonial: {
        text: 'The e-commerce website has opened up a whole new revenue stream for us. Sales have doubled and we\'re reaching customers we never could before.',
        author: 'Jennifer Chen',
        position: 'Store Owner'
      },
      liveUrl: 'https://techstyleboutique.com',
      completedDate: '2024-03-10'
    },
    {
      id: '4',
      title: 'Bright Future Academy',
      description: 'Educational website with student portal and online admissions',
      industry: 'Education',
      category: 'schools',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'TailwindCSS', 'Clerk Auth', 'Payment Gateway'],
      features: [
        'Student portal',
        'Online admissions',
        'Fee payment system',
        'Parent communication',
        'Academic calendar'
      ],
      results: [
        { metric: 'Admission Inquiries', value: '+180%' },
        { metric: 'Paperwork Reduction', value: '70%' },
        { metric: 'Parent Satisfaction', value: '95%' }
      ],
      testimonial: {
        text: 'The online admission system has streamlined our entire enrollment process. Parents love the convenience and we\'ve saved countless hours on paperwork.',
        author: 'Principal Williams',
        position: 'School Principal'
      },
      liveUrl: 'https://brightfutureacademy.edu',
      completedDate: '2024-01-30'
    },
    {
      id: '5',
      title: 'Premier Properties',
      description: 'Real estate website with advanced property search and lead generation',
      industry: 'Real Estate',
      category: 'real-estate',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'TailwindCSS', 'Clerk Auth', 'Maps API'],
      features: [
        'Property listings',
        'Advanced search filters',
        'Virtual tours',
        'Lead capture forms',
        'Mortgage calculator'
      ],
      results: [
        { metric: 'Qualified Leads', value: '+200%' },
        { metric: 'Property Views', value: '+300%' },
        { metric: 'Conversion Rate', value: '+45%' }
      ],
      testimonial: {
        text: 'The website has become our best lead generation tool. The quality of inquiries has improved dramatically and we\'re closing more deals.',
        author: 'Robert Martinez',
        position: 'Real Estate Agent'
      },
      liveUrl: 'https://premierproperties.com',
      completedDate: '2024-02-05'
    },
    {
      id: '6',
      title: 'Bella Vista Restaurant',
      description: 'Restaurant website with online ordering and table reservations',
      industry: 'Food & Beverage',
      category: 'restaurants',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'TailwindCSS', 'Clerk Auth', 'Payment Processing'],
      features: [
        'Online menu',
        'Order system',
        'Table reservations',
        'Customer reviews',
        'Loyalty program'
      ],
      results: [
        { metric: 'Online Orders', value: '+60%' },
        { metric: 'Table Bookings', value: '+40%' },
        { metric: 'Customer Retention', value: '+30%' }
      ],
      testimonial: {
        text: 'The online ordering system has been a game-changer for our business. We\'ve seen a significant increase in orders and customer satisfaction.',
        author: 'Chef Antonio',
        position: 'Restaurant Owner'
      },
      liveUrl: 'https://bellavistarestaurant.com',
      completedDate: '2024-03-01'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Projects' },
    { value: 'doctors', label: 'Healthcare' },
    { value: 'hotels', label: 'Hospitality' },
    { value: 'shops', label: 'Retail' },
    { value: 'schools', label: 'Education' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'restaurants', label: 'Restaurants' }
  ];

  useEffect(() => {
    if (selectedFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedFilter));
    }
  }, [selectedFilter]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-primary-blue">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover how we've helped businesses across various industries achieve 
              their online goals with custom web solutions that drive real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/category-selection"
                className="btn-primary text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Get Started
              </Link>
              <Link
                href="/category-selection"
                className="btn-secondary px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Get Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '6', label: 'Industries Served' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div key={index} className="text-center hover-card-effect transition-all duration-300 hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold text-primary-blue mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center text-gray-600 mr-4">
              <Filter className="h-5 w-5 mr-2" />
              <span className="font-medium">Filter by Industry:</span>
            </div>
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedFilter(option.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === option.value
                    ? 'bg-primary-blue text-white'
                : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-primary-blue'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover-card-effect transition-all duration-300 hover:scale-105">
                {/* Project Image */}
                <div className="relative h-64 bg-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-green to-primary-green flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-6xl mb-4">🌐</div>
                      <div className="text-xl font-semibold">{project.title}</div>
                      <div className="text-green-100">{project.industry}</div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white text-primary-blue px-3 py-1 rounded-full text-sm font-medium">
                      {project.industry}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  {/* Project Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-primary-green mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Results Achieved:</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {project.results.map((result, index) => (
                        <div key={index} className="text-center">
                          <div className="text-lg font-bold text-primary-green">{result.value}</div>
                          <div className="text-xs text-gray-600">{result.metric}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  {project.testimonial && (
                    <div className="mb-6 bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Star className="h-4 w-4 text-primary-green mr-1" />
                        <Star className="h-4 w-4 text-primary-green mr-1" />
                        <Star className="h-4 w-4 text-primary-green mr-1" />
                        <Star className="h-4 w-4 text-primary-green mr-1" />
                        <Star className="h-4 w-4 text-primary-green mr-2" />
                        <span className="text-sm font-medium text-gray-900">Client Testimonial</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2 italic">"{project.testimonial.text}"</p>
                      <div className="text-xs text-gray-600">
                        <strong>{project.testimonial.author}</strong>, {project.testimonial.position}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center btn-primary text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      >
                        View Live Site
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    )}
                    <Link
                      href="/checkout"
                      className="flex items-center justify-center btn-secondary px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      Start Similar Project
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 green-section-header">
              Our Proven Development Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every successful project follows our time-tested process that ensures 
              quality results and client satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Discovery & Planning',
                description: 'We analyze your business, goals, and requirements to create a detailed project plan.',
                icon: '🔍'
              },
              {
                step: '2',
                title: 'Design & Prototype',
                description: 'Create wireframes and designs that align with your brand and user experience goals.',
                icon: '🎨'
              },
              {
                step: '3',
                title: 'Development & Testing',
                description: 'Build your website using modern technologies and thoroughly test all functionality.',
                icon: '⚡'
              },
              {
                step: '4',
                title: 'Launch & Support',
                description: 'Deploy your website and provide ongoing support to ensure continued success.',
                icon: '🚀'
              }
            ].map((process, index) => (
              <div key={index} className="text-center relative">
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-green-200 z-0" />
                )}
                <div className="relative z-10">
                  <div className="bg-primary-green text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {process.step}
                  </div>
                  <div className="text-4xl mb-4">{process.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{process.title}</h3>
                  <p className="text-gray-600">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Join Our Success Stories?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Let's create a website that delivers the same impressive results for your business. 
                Get started with a free consultation and see how we can help you succeed online.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-green mr-2" />
                  <span className="text-gray-600">Proven Results</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-green mr-2" />
                  <span className="text-gray-600">Expert Team</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-green mr-2" />
                  <span className="text-gray-600">Fast Delivery</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Start Your Success Story</h3>
              <LeadForm source="contact" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PortfolioPage;