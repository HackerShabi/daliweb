'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Globe, 
  Smartphone, 
  Users, 
  Zap,
  Star,
  ChevronDown,
  Play,
  Award,
  TrendingUp
} from 'lucide-react';
import Layout from '../layout/Layout';
import LeadForm from '../forms/LeadForm';
import DemoBookingForm from '../forms/DemoBookingForm';

// Animated Counter Hook
const useAnimatedCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return { count, ref };
};

const HomePage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const projectsCounter = useAnimatedCounter(150);
  const clientsCounter = useAnimatedCounter(500);
  const satisfactionCounter = useAnimatedCounter(99);
  const yearsCounter = useAnimatedCounter(8);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section overflow-hidden">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/images/web-dev-bg.svg)',
              transform: `translateY(${scrollY * 0.3}px)`
            }}
          />
        </div>
        
        <div className="relative w-full px-4 sm:px-6 lg:px-8 section-padding">
          <div className="text-center">
            <h1 className="hero-title">
              YOUR BUSINESS
              <br />
              <span className="text-gradient">ONLINE</span>
            </h1>
            <p className="hero-subtitle stagger-1 max-w-2xl mx-auto">
              We help local businesses grow online with modern, fast, and mobile-friendly websites. 
              From doctors to hotels, shops to schools - we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12 stagger-2">
              <Link
                href="/category-selection"
                className="btn-primary flex items-center justify-center"
              >
                <Play className="h-5 w-5 mr-2" />
                Book Demo
              </Link>
              <Link
                href="/category-selection"
                className="btn-secondary flex items-center justify-center"
              >
                Get Free Quote
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-12 stagger-3">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <CheckCircle className="h-5 w-5 text-primary-green mr-2" />
                <span className="text-text-body font-medium">7-Day Delivery</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <CheckCircle className="h-5 w-5 text-primary-green mr-2" />
                <span className="text-text-body font-medium">Mobile-Friendly</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <CheckCircle className="h-5 w-5 text-primary-green mr-2" />
                <span className="text-text-body font-medium">SEO Optimized</span>
              </div>
            </div>
           </div>
         </div>
       </section>

      {/* Stats Section */}
      <section className="section-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div ref={projectsCounter.ref} className="text-center fade-in-up">
              <div className="text-4xl md:text-5xl font-bold text-heading mb-2">
                {projectsCounter.count}+
              </div>
              <div className="text-muted font-medium">Projects Completed</div>
            </div>
            <div ref={clientsCounter.ref} className="text-center fade-in-up">
              <div className="text-4xl md:text-5xl font-bold text-heading mb-2">
                {clientsCounter.count}+
              </div>
              <div className="text-muted font-medium">Happy Clients</div>
            </div>
            <div ref={satisfactionCounter.ref} className="text-center fade-in-up">
              <div className="text-4xl md:text-5xl font-bold text-heading mb-2">
                {satisfactionCounter.count}%
              </div>
              <div className="text-muted font-medium">Client Satisfaction</div>
            </div>
            <div ref={yearsCounter.ref} className="text-center fade-in-up">
              <div className="text-4xl md:text-5xl font-bold text-heading mb-2">
                {yearsCounter.count}+
              </div>
              <div className="text-muted font-medium">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 green-section-header">
              Why Choose DaliWeb?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand local businesses and deliver websites that actually help you grow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center hover-card-effect">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Zap className="h-8 w-8 text-primary-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your website live in just 7 days, not weeks or months.</p>
            </div>
            <div className="text-center hover-card-effect">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <DollarSign className="h-8 w-8 text-primary-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Affordable Pricing</h3>
              <p className="text-gray-600">Professional websites starting from just $499. No hidden fees.</p>
            </div>
            <div className="text-center hover-card-effect">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Smartphone className="h-8 w-8 text-primary-blue" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile-Friendly</h3>
              <p className="text-gray-600">All websites work perfectly on phones, tablets, and desktops.</p>
            </div>
            <div className="text-center hover-card-effect">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Users className="h-8 w-8 text-primary-blue" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ongoing Support</h3>
              <p className="text-gray-600">Free support and updates for the first 3 months after launch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 green-section-header">
              Our Service Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our specialized service categories designed to meet your unique business needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                id: 'business',
                title: 'Business',
                description: 'Professional business solutions including corporate websites, CRM systems, and enterprise applications.',
                icon: '🏢'
              },
              {
                id: 'industry',
                title: 'Industry',
                description: 'Specialized industry solutions for manufacturing, healthcare, education, and professional services.',
                icon: '⚙️'
              },
              {
                id: 'ecommerce',
                title: 'E-commerce',
                description: 'Complete online store solutions with payment processing, inventory management, and analytics.',
                icon: '🛒'
              },
              {
                id: 'creative',
                title: 'Creative',
                description: 'Creative digital solutions including portfolio websites, design services, and multimedia applications.',
                icon: '🎨'
              }
            ].map((service, index) => (
              <Link key={index} href={`/services/${service.id}`} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105 transform hover-card-effect aspect-square flex flex-col justify-center items-center text-center">
                  <div className="text-4xl mb-4 text-center">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-green transition-colors text-center">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-center flex-grow">{service.description}</p>
                  <div className="mt-4 text-primary-blue font-medium flex items-center justify-center">
                    Learn More <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 green-section-header">
              Our Recent Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we've helped businesses like yours succeed online.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Modern Medical Practice',
                category: 'Healthcare',
                description: 'Complete website redesign with online appointment booking system for a family clinic.',
                image: '🏥',
                results: ['300% increase in online bookings', '50% reduction in phone calls', '24/7 appointment availability'],
                tech: ['Next.js', 'Tailwind CSS', 'Clerk Auth'],
                link: '/portfolio/medical-practice'
              },
              {
                title: 'Luxury Hotel Website',
                category: 'Hospitality',
                description: 'Elegant website with room showcase, booking system, and guest portal for a boutique hotel.',
                image: '🏨',
                results: ['40% increase in direct bookings', '60% faster check-in process', 'Improved guest satisfaction'],
                tech: ['React', 'Node.js', 'Stripe API'],
                link: '/portfolio/luxury-hotel'
              },
              {
                title: 'E-commerce Fashion Store',
                category: 'Retail',
                description: 'Full e-commerce solution with inventory management and payment processing.',
                image: '👗',
                results: ['200% increase in online sales', '35% higher conversion rate', 'Mobile-first design'],
                tech: ['Shopify', 'Custom CSS', 'PayPal Integration'],
                link: '/portfolio/fashion-store'
              },
              {
                title: 'Real Estate Agency',
                category: 'Real Estate',
                description: 'Property listing website with virtual tours and lead generation forms.',
                image: '🏠',
                results: ['150% more qualified leads', 'Virtual tour integration', 'SEO optimization'],
                tech: ['WordPress', 'Custom PHP', 'Google Maps API'],
                link: '/portfolio/real-estate'
              },
              {
                title: 'Restaurant Chain',
                category: 'Food & Beverage',
                description: 'Multi-location website with online ordering and delivery integration.',
                image: '🍽️',
                results: ['80% increase in online orders', 'Streamlined operations', 'Customer loyalty program'],
                tech: ['Vue.js', 'Laravel', 'DoorDash API'],
                link: '/portfolio/restaurant-chain'
              },
              {
                title: 'Educational Institute',
                category: 'Education',
                description: 'Student portal with course management, online payments, and progress tracking.',
                image: '🎓',
                results: ['90% paperless enrollment', 'Automated fee collection', 'Parent-teacher communication'],
                tech: ['Django', 'PostgreSQL', 'Zoom API'],
                link: '/portfolio/educational-institute'
              }
            ].map((project, index) => (
              <div key={index} className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="text-6xl mb-4 text-center">{project.image}</div>
                  <div className="mb-2">
                    <span className="inline-block bg-green-100 text-primary-green text-xs font-semibold px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-green transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  {/* Results */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Results:</h4>
                    <ul className="space-y-1">
                      {project.results.map((result, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-primary-green mr-2 flex-shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Tech Stack */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Link
                    href={project.link}
                    className="inline-flex items-center text-primary-blue hover:text-primary-green font-medium transition-colors"
                  >
                    View Case Study
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA to Portfolio Page */}
          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="btn-primary inline-flex items-center px-8 py-4 text-lg"
            >
              View All Projects
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 green-section-header">
              Our Simple 4-Step Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From consultation to launch, we make it easy for you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Book Demo',
                description: 'Schedule a free 30-minute consultation to discuss your needs.',
                icon: '📅'
              },
              {
                step: '2',
                title: 'Choose Package',
                description: 'Select the perfect package that fits your business and budget.',
                icon: '📋'
              },
              {
                step: '3',
                title: 'Build Website',
                description: 'We design and develop your website with regular updates.',
                icon: '🛠️'
              },
              {
                step: '4',
                title: 'Launch & Support',
                description: 'Go live with your new website and get ongoing support.',
                icon: '🚀'
              }
            ].map((process, index) => (
              <div key={index} className="text-center relative hover-card-effect">
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-green-200 z-0" />
                )}
                <div className="relative z-10">
                  <div className="bg-primary-green text-text-heading w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold transition-all duration-300 hover:scale-110 hover:shadow-lg">
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 green-section-header">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from businesses we've helped grow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Sarah Johnson',
                business: 'Johnson Family Clinic',
                rating: 5,
                comment: 'DaliWeb created a beautiful website for our clinic. Online appointments increased by 300% in the first month!',
                image: '👩‍⚕️'
              },
              {
                name: 'Mike Rodriguez',
                business: 'Rodriguez Auto Shop',
                rating: 5,
                comment: 'Professional, fast, and affordable. Our new website brings in 5-10 new customers every week.',
                image: '👨‍🔧'
              },
              {
                name: 'Lisa Chen',
                business: 'Sunset Hotel',
                rating: 5,
                comment: 'The booking system they built has streamlined our operations. Highly recommend DaliWeb!',
                image: '👩‍💼'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current transition-transform duration-200 group-hover:scale-110" style={{ animationDelay: `${i * 100}ms` }} />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <div className="text-3xl mr-3 transition-transform duration-300 group-hover:scale-110">{testimonial.image}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.business}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 green-section-header">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the package that's right for your business. No hidden fees, no surprises.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '$99',
                description: 'Perfect for small businesses getting started online',
                features: [
                  '5-page website',
                  'Mobile responsive',
                  'Contact form',
                  'Basic SEO',
                  '1 month support'
                ],
                popular: false
              },
              {
                name: 'Business',
                price: '$499',
                description: 'Most popular choice for growing businesses',
                features: [
                  '10-page website',
                  'Mobile responsive',
                  'Contact & booking forms',
                  'Advanced SEO',
                  'Google Analytics',
                  '3 months support'
                ],
                popular: true
              },
              {
                name: 'Premium',
                price: '$999',
                description: 'Complete solution for established businesses',
                features: [
                  'Unlimited pages',
                  'E-commerce ready',
                  'Custom features',
                  'Premium SEO',
                  'Analytics & reporting',
                  '6 months support'
                ],
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} className={`relative rounded-xl p-8 ${plan.popular ? 'bg-green-50 border-2 border-primary-green' : 'bg-gray-50 border border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-green text-text-heading px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-primary-green mb-2">{plan.price}</div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary-green mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/category-selection"
                    className={`block w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                      plan.popular
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

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 green-section-header">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                question: 'How much does a website cost?',
                answer: 'Our websites start from $99 for a basic 5-page site. The final cost depends on your specific needs, features, and complexity. We offer three main packages: Starter ($99), Business ($499), and Premium ($999).'
              },
              {
                question: 'How long does it take to build a website?',
                answer: 'We deliver most websites within 7 days. Complex projects with custom features may take 10-14 days. We\'ll give you a clear timeline during our initial consultation.'
              },
              {
                question: 'Do you provide hosting and domain services?',
                answer: 'Yes! We can help you with domain registration and recommend reliable hosting providers. We also offer managed hosting services for an additional monthly fee.'
              },
              {
                question: 'Will my website work on mobile phones?',
                answer: 'Absolutely! All our websites are fully responsive and optimized for mobile devices, tablets, and desktops. Mobile-friendly design is included in all our packages.'
              },
              {
                question: 'Do you provide ongoing support and updates?',
                answer: 'Yes! All packages include free support for 1-6 months (depending on the package). After that, we offer affordable maintenance plans to keep your website updated and secure.'
              },
              {
                question: 'Can you help with SEO and online marketing?',
                answer: 'Yes! Basic SEO is included in all packages. We also offer advanced SEO services, Google Ads management, and digital marketing strategies to help grow your online presence.'
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <button
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary-green"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`h-5 w-5 text-primary-blue transition-transform duration-200 ${
                      activeFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-primary-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Grow Your Business Online?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join hundreds of local businesses that trust DaliWeb for their online presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/category-selection"
              className="bg-white text-primary-blue hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center transform hover:scale-105 hover:shadow-lg"
            >
              <Play className="h-5 w-5 mr-2" />
              Get Started
            </Link>
            <Link
              href="/category-selection"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-blue px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center transform hover:scale-105"
            >
              Get Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
          <p className="text-green-100 mt-6">
            🚀 Get your website live in just 7 days!
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;