'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  subcategories: string[];
  projects: {
    title: string;
    description: string;
    image: string;
    features: string[];
    technologies: string[];
  }[];
}

const categories: Category[] = [
  {
    id: 'business',
    title: 'Business Websites',
    description: 'Professional business solutions including corporate websites, CRM systems, and enterprise applications.',
    icon: '🏢',
    subcategories: ['Corporate', 'Agencies', 'Local Shops', 'Consultants'],
    projects: [
      {
        title: 'Corporate Website',
        description: 'Professional corporate website with modern design',
        image: '/api/placeholder/400/300',
        features: ['Responsive Design', 'SEO Optimized', 'Contact Forms', 'Analytics'],
        technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript']
      },
      {
        title: 'Agency Portfolio',
        description: 'Creative agency portfolio showcasing services',
        image: '/api/placeholder/400/300',
        features: ['Portfolio Gallery', 'Team Profiles', 'Service Pages', 'Blog'],
        technologies: ['React', 'Next.js', 'Framer Motion', 'Sanity CMS']
      }
    ]
  },
  {
    id: 'industry',
    title: 'Industry Websites',
    description: 'Specialized industry solutions for manufacturing, healthcare, education, and professional services.',
    icon: '🏭',
    subcategories: ['Hotels', 'Restaurants', 'Healthcare', 'Real Estate', 'Schools'],
    projects: [
      {
        title: 'Hotel Booking System',
        description: 'Complete hotel management and booking platform',
        image: '/api/placeholder/400/300',
        features: ['Room Booking', 'Payment Integration', 'Guest Management', 'Reviews'],
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
      },
      {
        title: 'Restaurant Website',
        description: 'Modern restaurant website with online ordering',
        image: '/api/placeholder/400/300',
        features: ['Menu Display', 'Online Ordering', 'Reservations', 'Reviews'],
        technologies: ['React', 'Next.js', 'Tailwind CSS', 'Clerk Auth']
      }
    ]
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Websites',
    description: 'Complete online store solutions with payment processing, inventory management, and analytics.',
    icon: '🛒',
    subcategories: ['Online Stores', 'Dropshipping', 'Multi-vendor Marketplaces'],
    projects: [
      {
        title: 'Fashion E-commerce',
        description: 'Modern fashion store with advanced filtering',
        image: '/api/placeholder/400/300',
        features: ['Product Catalog', 'Shopping Cart', 'Payment Gateway', 'Order Tracking'],
        technologies: ['React', 'Next.js', 'Stripe', 'PostgreSQL']
      },
      {
        title: 'Multi-vendor Marketplace',
        description: 'Platform for multiple vendors to sell products',
        image: '/api/placeholder/400/300',
        features: ['Vendor Dashboard', 'Commission System', 'Product Management', 'Analytics'],
        technologies: ['React', 'Node.js', 'MongoDB', 'Redis']
      }
    ]
  },
  {
    id: 'creative',
    title: 'Creative Platforms',
    description: 'Creative digital solutions including portfolio websites, design services, and multimedia applications.',
    icon: '🎨',
    subcategories: ['Portfolios', 'Blogs', 'Personal Brands', 'Communities', 'Memberships'],
    projects: [
      {
        title: 'Artist Portfolio',
        description: 'Stunning portfolio website for creative professionals',
        image: '/api/placeholder/400/300',
        features: ['Gallery Display', 'Project Showcase', 'Contact Forms', 'Social Integration'],
        technologies: ['React', 'Next.js', 'Framer Motion', 'Sanity CMS']
      },
      {
        title: 'Creative Blog',
        description: 'Modern blog platform for content creators',
        image: '/api/placeholder/400/300',
        features: ['Content Management', 'SEO Optimization', 'Social Sharing', 'Newsletter'],
        technologies: ['React', 'Next.js', 'MDX', 'Tailwind CSS']
      }
    ]
  }
];

const CategorySelectionPage = () => {
  const router = useRouter();
  const { isSignedIn, user, isLoaded } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [userDescription, setUserDescription] = useState<string>('');
  const [showSubcategories, setShowSubcategories] = useState<boolean>(false);
  const [showProjects, setShowProjects] = useState<boolean>(false);
  const [showFullPage, setShowFullPage] = useState<boolean>(false);

  // Check authentication status
  useEffect(() => {
    if (!isLoaded) return; // Still loading
    
    if (!isSignedIn) {
      // Redirect to login with return URL
      const currentUrl = window.location.pathname + window.location.search;
      router.push(`/login?callbackUrl=${encodeURIComponent(currentUrl)}`);
      return;
    }
  }, [isSignedIn, isLoaded, router]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowSubcategories(true);
  };

  const handleProceedToCheckout = () => {
    if (selectedCategory && selectedSubcategory && userDescription.trim()) {
      // Store all selection data for checkout page
      const selectionData = {
        category: selectedCategory,
        subcategory: selectedSubcategory,
        description: userDescription,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('selectedCategoryData', JSON.stringify(selectionData));
      router.push('/checkout');
    } else {
      alert('Please select a subcategory and provide a description before proceeding.');
    }
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  // Show loading screen while checking authentication
  if (!isLoaded) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#bcf6e4'}}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-lg">Checking authentication...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Don't render anything if redirecting to login
  if (!isSignedIn) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-primary-blue via-blue-800 to-purple-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-lg">Redirecting to login...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-12" style={{backgroundColor: '#bcf6e4'}}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Select Your Service Category</h1>
            <p className="text-blue-100 text-lg">Choose the category that best fits your project needs</p>
          </div>

          {!selectedCategory ? (
            /* Category Selection */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transition-all hover:bg-white/15 hover:scale-105"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">{category.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">{category.title}</h3>
                    <p className="text-blue-100 mb-6">{category.description}</p>
                    <div className="btn-primary text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block">
                      Select Category
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Selected Category Details */
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="text-4xl mr-4">{selectedCategoryData?.icon}</div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{selectedCategoryData?.title}</h2>
                    <p className="text-blue-100">{selectedCategoryData?.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setShowSubcategories(false);
                    setShowProjects(false);
                  }}
                  className="text-white/70 hover:text-white text-2xl"
                >
                  ←
                </button>
              </div>

              {/* Information Collection */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Tell us about your project</h3>
                <textarea
                  value={userDescription}
                  onChange={(e) => setUserDescription(e.target.value)}
                  placeholder="Describe your business needs, goals, and any specific requirements..."
                  className="w-full h-32 p-4 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:border-primary-green focus:outline-none resize-none"
                  required
                />
              </div>

              {/* Subcategory Selection */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Select Subcategory</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {selectedCategoryData?.subcategories.map((subcategory, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSubcategory(subcategory)}
                      className={`p-4 rounded-lg text-center transition-all ${
                        selectedSubcategory === subcategory
                          ? 'bg-primary-green text-white'
                          : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                      }`}
                    >
                      {subcategory}
                    </button>
                  ))}
                  <button
                    onClick={() => setSelectedSubcategory('Other')}
                    className={`p-4 rounded-lg text-center transition-all ${
                      selectedSubcategory === 'Other'
                        ? 'bg-primary-green text-white'
                        : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                    }`}
                  >
                    Other
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => setShowProjects(!showProjects)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {showProjects ? 'Hide' : 'View'} Example Projects
                </button>
                <button
                  onClick={() => setShowFullPage(!showFullPage)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {showFullPage ? 'Hide' : 'View'} Full Category Page
                </button>
                <button
                  onClick={handleProceedToCheckout}
                  disabled={!selectedSubcategory || !userDescription.trim()}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    selectedSubcategory && userDescription.trim()
                      ? 'bg-orange-600 hover:bg-orange-700 text-white'
                      : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  Proceed to Checkout
                </button>
              </div>



              {/* Example Projects */}
              {showProjects && selectedCategoryData && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Example Projects</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedCategoryData.projects.map((project, index) => (
                      <div
                        key={index}
                        className="bg-white/20 backdrop-blur-sm rounded-lg p-6"
                      >
                        <div className="bg-gray-300 rounded-lg h-48 mb-4 flex items-center justify-center">
                          <span className="text-gray-600">Project Image</span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
                        <p className="text-blue-100 mb-4">{project.description}</p>
                        
                        <div className="mb-4">
                          <h5 className="text-white font-medium mb-2">Features:</h5>
                          <div className="flex flex-wrap gap-2">
                            {project.features.map((feature, idx) => (
                              <span
                                key={idx}
                                className="bg-primary-green text-white text-xs px-2 py-1 rounded"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-white font-medium mb-2">Technologies:</h5>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="bg-purple-600 text-white text-xs px-2 py-1 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Category Page Display */}
              {showFullPage && selectedCategoryData && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Complete {selectedCategoryData.title} Overview</h3>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                    <CategoryPageContent categoryId={selectedCategory} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

// Component to display full category page content
const CategoryPageContent = ({ categoryId }: { categoryId: string }) => {
  const categoryContent = {
    business: {
      title: "Business Websites",
      description: "Professional business solutions designed to establish your online presence and drive growth.",
      features: [
        "Corporate Website Development",
        "CRM Integration",
        "Lead Generation Systems",
        "Professional Email Setup",
        "SEO Optimization",
        "Analytics & Reporting"
      ],
      industries: [
        { name: "Corporate", description: "Large enterprise solutions with advanced features" },
        { name: "Agencies", description: "Creative agency portfolios and client management" },
        { name: "Local Shops", description: "Small business websites with local SEO" },
        { name: "Consultants", description: "Professional service websites with booking systems" }
      ]
    },
    industry: {
      title: "Industry Websites",
      description: "Specialized solutions tailored for specific industry requirements and regulations.",
      features: [
        "Industry-Specific Design",
        "Compliance Management",
        "Booking & Reservation Systems",
        "Customer Management",
        "Payment Processing",
        "Mobile Optimization"
      ],
      industries: [
        { name: "Hotels", description: "Complete hotel management and booking systems" },
        { name: "Restaurants", description: "Online ordering and reservation platforms" },
        { name: "Healthcare", description: "HIPAA-compliant medical practice websites" },
        { name: "Real Estate", description: "Property listings and virtual tour platforms" },
        { name: "Schools", description: "Educational institution management systems" }
      ]
    },
    ecommerce: {
      title: "E-commerce Websites",
      description: "Complete online store solutions with advanced e-commerce functionality.",
      features: [
        "Product Catalog Management",
        "Shopping Cart & Checkout",
        "Payment Gateway Integration",
        "Inventory Management",
        "Order Tracking",
        "Customer Reviews & Ratings"
      ],
      industries: [
        { name: "Online Stores", description: "Full-featured e-commerce platforms" },
        { name: "Dropshipping", description: "Automated dropshipping store solutions" },
        { name: "Multi-vendor Marketplaces", description: "Platforms for multiple sellers" }
      ]
    },
    creative: {
      title: "Creative Platforms",
      description: "Artistic and creative digital solutions for showcasing talent and building communities.",
      features: [
        "Portfolio Galleries",
        "Content Management",
        "Social Media Integration",
        "Community Features",
        "Membership Systems",
        "Creative Tools Integration"
      ],
      industries: [
        { name: "Portfolios", description: "Professional artist and designer showcases" },
        { name: "Blogs", description: "Content-focused platforms with CMS" },
        { name: "Personal Brands", description: "Individual branding and marketing sites" },
        { name: "Communities", description: "Social platforms for creative collaboration" },
        { name: "Memberships", description: "Subscription-based creative platforms" }
      ]
    }
  };

  const content = categoryContent[categoryId as keyof typeof categoryContent];
  if (!content) return null;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h4 className="text-3xl font-bold text-white mb-4">{content.title}</h4>
        <p className="text-blue-100 text-lg">{content.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Features */}
        <div>
          <h5 className="text-2xl font-bold text-white mb-4">Key Features</h5>
          <div className="space-y-3">
            {content.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-primary-green rounded-full mr-3"></div>
                <span className="text-blue-100">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Industries */}
        <div>
          <h5 className="text-2xl font-bold text-white mb-4">Specializations</h5>
          <div className="space-y-4">
            {content.industries.map((industry, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4">
                <h6 className="text-white font-semibold mb-2">{industry.name}</h6>
                <p className="text-blue-100 text-sm">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-primary-green/20 rounded-lg p-6 text-center">
        <h5 className="text-xl font-bold text-white mb-2">Ready to Get Started?</h5>
        <p className="text-blue-100 mb-4">Let's discuss your specific requirements and create the perfect solution for your business.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <span className="text-blue-100 text-sm">✓ Free Consultation</span>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <span className="text-blue-100 text-sm">✓ Custom Solutions</span>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <span className="text-blue-100 text-sm">✓ Ongoing Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySelectionPage;