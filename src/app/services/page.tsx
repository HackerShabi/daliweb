import Link from 'next/link';
import { 
  Code, 
  Smartphone, 
  ShoppingCart, 
  Search, 
  Palette, 
  Shield, 
  Zap, 
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  TrendingUp,
  Globe,
  Database,
  Settings
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import LeadForm from '@/components/forms/LeadForm';

const ServicesPage = () => {
  const services = [
    {
      id: 'web-development',
      name: 'Web Development',
      icon: Code,
      description: 'Custom websites and web applications built with modern technologies and best practices.',
      features: [
        'Responsive Design',
        'Modern Frameworks (React, Next.js)',
        'Performance Optimization',
        'SEO-Friendly Structure',
        'Cross-browser Compatibility',
        'Progressive Web Apps'
      ],
      pricing: 'From $99',
      timeline: '2-6 weeks',
      popular: true
    },
    {
      id: 'mobile-development',
      name: 'Mobile App Development',
      icon: Smartphone,
      description: 'Native and cross-platform mobile applications for iOS and Android devices.',
      features: [
        'iOS & Android Apps',
        'React Native Development',
        'App Store Optimization',
        'Push Notifications',
        'Offline Functionality',
        'API Integration'
      ],
      pricing: 'From $999',
      timeline: '6-12 weeks',
      popular: false
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Solutions',
      icon: ShoppingCart,
      description: 'Complete online store solutions with payment processing and inventory management.',
      features: [
        'Product Catalog Management',
        'Secure Payment Processing',
        'Inventory Management',
        'Order Tracking',
        'Customer Accounts',
        'Analytics & Reporting'
      ],
      pricing: 'From $499',
      timeline: '4-8 weeks',
      popular: true
    },
    {
      id: 'seo',
      name: 'SEO & Digital Marketing',
      icon: Search,
      description: 'Comprehensive SEO strategies and digital marketing to boost your online presence.',
      features: [
        'Keyword Research & Strategy',
        'On-page SEO Optimization',
        'Technical SEO Audit',
        'Content Marketing',
        'Local SEO',
        'Performance Tracking'
      ],
      pricing: 'From $899/month',
      timeline: 'Ongoing',
      popular: false
    },
    {
      id: 'ui-ux-design',
      name: 'UI/UX Design',
      icon: Palette,
      description: 'User-centered design that creates engaging and intuitive digital experiences.',
      features: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Visual Design',
        'Usability Testing',
        'Design Systems',
        'Accessibility Compliance'
      ],
      pricing: 'From $299',
      timeline: '2-4 weeks',
      popular: false
    },
    {
      id: 'security',
      name: 'Web Security & Maintenance',
      icon: Shield,
      description: 'Comprehensive security solutions and ongoing maintenance for your digital assets.',
      features: [
        'Security Audits',
        'SSL Certificate Setup',
        'Regular Updates',
        'Backup Solutions',
        'Malware Protection',
        '24/7 Monitoring'
      ],
      pricing: 'From $299/month',
      timeline: 'Ongoing',
      popular: false
    },
    {
      id: 'performance',
      name: 'Performance Optimization',
      icon: Zap,
      description: 'Speed up your website and improve user experience with advanced optimization techniques.',
      features: [
        'Page Speed Optimization',
        'Image Compression',
        'Code Minification',
        'CDN Implementation',
        'Database Optimization',
        'Core Web Vitals'
      ],
      pricing: 'From $199',
      timeline: '1-2 weeks',
      popular: false
    },
    {
      id: 'consulting',
      name: 'Digital Strategy Consulting',
      icon: Users,
      description: 'Strategic guidance to help you make informed decisions about your digital presence.',
      features: [
        'Digital Strategy Planning',
        'Technology Consulting',
        'Competitive Analysis',
        'ROI Assessment',
        'Roadmap Development',
        'Team Training'
      ],
      pricing: 'From $199/hour',
      timeline: 'Flexible',
      popular: false
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We start by understanding your business goals, target audience, and project requirements.',
      icon: Search
    },
    {
      step: '02',
      title: 'Design & Prototyping',
      description: 'Create wireframes, mockups, and prototypes to visualize the final product.',
      icon: Palette
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'Build your solution using modern technologies with rigorous testing throughout.',
      icon: Code
    },
    {
      step: '04',
      title: 'Launch & Optimization',
      description: 'Deploy your project and continuously optimize for performance and user experience.',
      icon: Zap
    }
  ];

  const stats = [
    { label: 'Projects Completed', value: '500+', icon: CheckCircle },
    { label: 'Client Satisfaction', value: '98%', icon: Star },
    { label: 'Average Delivery', value: '2-6 weeks', icon: Clock },
    { label: 'Performance Boost', value: '+150%', icon: TrendingUp }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-blue via-blue-800 to-green-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Comprehensive
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-green to-green-400">
                Digital Services
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              From concept to launch, we provide end-to-end digital solutions that drive growth and success
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover-card-effect transition-all duration-300">
                    <IconComponent className="h-8 w-8 text-primary-green mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary-green">{stat.value}</div>
                    <div className="text-sm text-blue-100">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 green-section-header">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div key={service.id} className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group relative hover-card-effect hover:scale-105 ${
                  service.popular ? 'ring-2 ring-primary-green' : ''
                }`}>
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary-green text-white px-3 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-lg group-hover:bg-primary-green transition-colors duration-300">
                      <IconComponent className="h-6 w-6 text-primary-blue group-hover:text-white" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm text-gray-500">{service.timeline}</div>
                      <div className="text-lg font-bold text-primary-blue">{service.pricing}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-primary-green mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-auto">
                    <Link 
                      href="/category-selection"
                      className="inline-flex items-center justify-center w-full btn-primary text-white font-medium py-3 px-4 rounded-lg transition-colors group"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 green-section-header">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary-green transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-primary-green group-hover:text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-primary-green text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 green-section-header">
              Technologies We Use
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge technologies and frameworks for modern web solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL',
              'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'REST API'
            ].map((tech, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="text-lg font-semibold text-gray-900">{tech}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Let's discuss your requirements and create a solution that drives results for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/checkout"
                  className="btn-primary px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Get Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link 
                  href="/portfolio"
                  className="btn-secondary py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  View Our Work
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Started Today</h3>
              <LeadForm source="contact" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;