import Link from 'next/link';
import { 
  Building2, 
  ShoppingCart, 
  Heart, 
  GraduationCap, 
  Car, 
  Home, 
  Briefcase, 
  Utensils,
  ArrowRight,
  CheckCircle,
  Users,
  TrendingUp
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import LeadForm from '@/components/forms/LeadForm';

const IndustriesPage = () => {
  const industries = [
    {
      id: 'ecommerce',
      name: 'E-commerce & Retail',
      icon: ShoppingCart,
      description: 'Online stores, marketplaces, and retail solutions that drive sales and enhance customer experience.',
      features: ['Product Catalogs', 'Payment Integration', 'Inventory Management', 'Customer Reviews'],
      projects: 45,
      growth: '+127%'
    },
    {
      id: 'healthcare',
      name: 'Healthcare & Medical',
      icon: Heart,
      description: 'HIPAA-compliant websites for medical practices, hospitals, and healthcare providers.',
      features: ['Patient Portals', 'Appointment Booking', 'Telemedicine', 'Medical Records'],
      projects: 32,
      growth: '+89%'
    },
    {
      id: 'education',
      name: 'Education & E-learning',
      icon: GraduationCap,
      description: 'Learning management systems, online courses, and educational institution websites.',
      features: ['Course Management', 'Student Portals', 'Online Testing', 'Progress Tracking'],
      projects: 28,
      growth: '+156%'
    },
    {
      id: 'automotive',
      name: 'Automotive & Transportation',
      icon: Car,
      description: 'Dealership websites, fleet management, and automotive service platforms.',
      features: ['Vehicle Listings', 'Service Booking', 'Fleet Tracking', 'Parts Catalog'],
      projects: 21,
      growth: '+73%'
    },
    {
      id: 'realestate',
      name: 'Real Estate & Property',
      icon: Home,
      description: 'Property listings, real estate agencies, and property management solutions.',
      features: ['Property Search', 'Virtual Tours', 'Lead Management', 'Market Analytics'],
      projects: 38,
      growth: '+94%'
    },
    {
      id: 'professional',
      name: 'Professional Services',
      icon: Briefcase,
      description: 'Law firms, consulting agencies, accounting firms, and other professional services.',
      features: ['Client Portals', 'Case Management', 'Document Sharing', 'Billing Integration'],
      projects: 52,
      growth: '+112%'
    },
    {
      id: 'hospitality',
      name: 'Hospitality & Food',
      icon: Utensils,
      description: 'Restaurants, hotels, catering services, and hospitality management platforms.',
      features: ['Online Reservations', 'Menu Management', 'Delivery Integration', 'Guest Services'],
      projects: 29,
      growth: '+145%'
    },
    {
      id: 'corporate',
      name: 'Corporate & Enterprise',
      icon: Building2,
      description: 'Large-scale enterprise solutions, corporate websites, and business applications.',
      features: ['Employee Portals', 'CRM Integration', 'Analytics Dashboard', 'Multi-site Management'],
      projects: 67,
      growth: '+78%'
    }
  ];

  const stats = [
    { label: 'Industries Served', value: '15+' },
    { label: 'Successful Projects', value: '300+' },
    { label: 'Client Satisfaction', value: '98%' },
    { label: 'Average Growth', value: '+110%' }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative hero-green-bg text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Industry-Specific
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-400">
                Web Solutions
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Tailored digital experiences that understand your industry's unique challenges and opportunities
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover-card-effect transition-all duration-300">
                  <div className="text-2xl font-bold text-green-300">{stat.value}</div>
                  <div className="text-sm text-green-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 green-section-header">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From startups to enterprise, we deliver specialized solutions across diverse industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {industries.map((industry) => {
              const IconComponent = industry.icon;
              return (
                <div key={industry.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group hover-card-effect hover:scale-105">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-600 transition-colors duration-300">
                      <IconComponent className="h-6 w-6 text-green-600 group-hover:text-white" />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{industry.projects} projects</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600 font-medium">{industry.growth}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{industry.name}</h3>
                  <p className="text-gray-600 mb-4">{industry.description}</p>
                  
                  <div className="space-y-2">
                    {industry.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Link 
                      href={`/contact?industry=${industry.id}`}
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium group transition-all duration-300"
                    >
                      Get Industry Solution
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 green-section-header">
                Why Industry Expertise Matters
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Regulatory Compliance</h3>
                    <p className="text-gray-600">We understand industry-specific regulations like HIPAA, PCI-DSS, and GDPR.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Specialized Features</h3>
                    <p className="text-gray-600">Custom functionality tailored to your industry's unique workflows and processes.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Faster Time to Market</h3>
                    <p className="text-gray-600">Pre-built templates and components specific to your industry reduce development time.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Better ROI</h3>
                    <p className="text-gray-600">Solutions designed for your industry typically see 40% higher conversion rates.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover-card-effect transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Get Started?</h3>
              <LeadForm source="contact" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndustriesPage;