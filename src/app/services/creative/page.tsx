'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Palette, PenTool, Camera, Users, Star } from 'lucide-react';
import Layout from '../../../components/layout/Layout';
import LeadForm from '../../../components/forms/LeadForm';

const CreativePage = () => {
  const subcategories = [
    {
      id: 'portfolios',
      title: 'Portfolios',
      description: 'Professional portfolio websites for artists, designers, and creative professionals.',
      icon: '🎨',
      features: ['Gallery showcases', 'Project details', 'Client testimonials', 'Contact forms']
    },
    {
      id: 'blogs',
      title: 'Blogs',
      description: 'Content-focused websites with publishing tools and reader engagement features.',
      icon: '📝',
      features: ['Content management', 'SEO optimization', 'Comment systems', 'Newsletter integration']
    },
    {
      id: 'personal-brands',
      title: 'Personal Brands',
      description: 'Personal branding websites for influencers, coaches, and thought leaders.',
      icon: '⭐',
      features: ['Brand storytelling', 'Social media integration', 'Speaking engagements', 'Media kits']
    },
    {
      id: 'communities',
      title: 'Communities',
      description: 'Community platforms with forums, member directories, and event management.',
      icon: '👥',
      features: ['Member forums', 'Event calendars', 'Member directories', 'Discussion boards']
    },
    {
      id: 'memberships',
      title: 'Memberships',
      description: 'Membership sites with exclusive content, subscription management, and member areas.',
      icon: '🔐',
      features: ['Member areas', 'Subscription billing', 'Content gating', 'Member tiers']
    }
  ];

  const projects = [
    {
      title: 'Sarah Chen Photography',
      category: 'Portfolios',
      description: 'Professional photography portfolio with stunning gallery layouts and client booking.',
      image: '📸',
      results: ['300% more client inquiries', 'Professional online presence', 'Streamlined booking process'],
      tech: ['Next.js', 'Lightbox Gallery', 'Booking System', 'Image Optimization'],
      link: '/portfolio/sarah-photography'
    },
    {
      title: 'Tech Insights Blog',
      category: 'Blogs',
      description: 'Technology blog with advanced content management and reader engagement features.',
      image: '💻',
      results: ['50K monthly readers', 'High search rankings', 'Active community engagement'],
      tech: ['WordPress', 'SEO Tools', 'Newsletter', 'Comment System'],
      link: '/portfolio/tech-insights'
    },
    {
      title: 'Life Coach Maria',
      category: 'Personal Brands',
      description: 'Personal brand website for life coach with booking system and course offerings.',
      image: '🌟',
      results: ['200% increase in coaching clients', 'Online course sales', 'Brand recognition'],
      tech: ['React', 'Booking Calendar', 'Course Platform', 'Payment Gateway'],
      link: '/portfolio/life-coach-maria'
    },
    {
      title: 'Creative Designers Hub',
      category: 'Communities',
      description: 'Design community platform with forums, resource sharing, and networking features.',
      image: '🎨',
      results: ['5K+ active members', 'Daily engagement', 'Resource sharing platform'],
      tech: ['Laravel', 'Forum System', 'File Sharing', 'Member Profiles'],
      link: '/portfolio/designers-hub'
    },
    {
      title: 'Fitness Pro Membership',
      category: 'Memberships',
      description: 'Fitness membership site with workout videos, meal plans, and community features.',
      image: '💪',
      results: ['1K+ paying members', 'Recurring revenue growth', 'High member retention'],
      tech: ['Membership Platform', 'Video Streaming', 'Payment Processing', 'Mobile App'],
      link: '/portfolio/fitness-pro'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative hero-green-bg text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-6">🎨</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Creative Platforms
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-400">
                Express Your Creativity
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Creative solutions for portfolios, blogs, personal brands, communities, and membership sites.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/checkout?category=creative"
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
              Creative Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the creative platform that best showcases your talent and engages your audience.
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
              Creative Project Examples
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how we've helped creatives build stunning online presences and engaged communities.
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
              Creative Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to showcase your creativity and build your audience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-primary-green" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Visual Design</h3>
              <p className="text-gray-600">Stunning visual layouts that showcase your creative work beautifully.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <PenTool className="h-8 w-8 text-primary-green" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Creation</h3>
              <p className="text-gray-600">Easy-to-use content management tools for blogs and portfolios.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-primary-green" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Media Management</h3>
              <p className="text-gray-600">Advanced image and video galleries with optimization features.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-green" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Building</h3>
              <p className="text-gray-600">Tools to build and engage with your creative community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Showcase Your Creativity?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of creatives who trust DaliWeb to showcase their work and build their audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/checkout?category=creative"
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

export default CreativePage;