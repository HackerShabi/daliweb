'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useUser, SignInButton, UserButton } from '@clerk/nextjs';
import { Menu, X, Phone, Mail, MapPin, User, LogOut, ChevronDown } from 'lucide-react';
import WhatsAppButton from '../ui/WhatsAppButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  const serviceCategories = [
    { name: 'Business Websites', href: '/services/business', icon: '🏢' },
    { name: 'Industry Websites', href: '/services/industry', icon: '🏭' },
    { name: 'E-commerce Websites', href: '/services/ecommerce', icon: '🛒' },
    { name: 'Creative Platforms', href: '/services/creative', icon: '🎨' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-primary-blue hover:text-primary-blue">
                DaliWeb
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="nav-link text-text-body hover:text-primary-blue font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Services Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="nav-link flex items-center text-text-body hover:text-primary-blue font-medium transition-colors"
                >
                  Category
                  <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isServicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {serviceCategories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="flex items-center px-4 py-3 text-text-body hover:text-primary-green hover:bg-gray-50 transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <span className="text-xl mr-3">{category.icon}</span>
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Auth & CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {!isLoaded ? (
                <div className="w-8 h-8 animate-spin rounded-full border-2 border-primary-blue border-t-transparent"></div>
              ) : isSignedIn ? (
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                      userButtonPopoverCard: "shadow-lg border border-gray-200",
                      userButtonPopoverActionButton: "hover:bg-gray-50"
                    }
                  }}
                />
              ) : (
                <SignInButton mode="modal">
                  <button className="nav-link text-text-body hover:text-primary-blue font-medium transition-colors">
                    Login
                  </button>
                </SignInButton>
              )}
              <Link
                href="/category-selection"
                className="btn-primary"
              >
                Get Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="nav-link text-text-body hover:text-primary-blue font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Services Section */}
                <div>
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="nav-link flex items-center justify-between w-full text-text-body hover:text-primary-blue font-medium transition-colors"
                  >
                    Category
                    <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isServicesOpen && (
                    <div className="mt-2 ml-4 space-y-2">
                      {serviceCategories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          className="flex items-center text-muted hover:text-primary-green transition-colors py-2"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsServicesOpen(false);
                          }}
                        >
                          <span className="text-lg mr-2">{category.icon}</span>
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Mobile Auth Section */}
                {!isLoaded ? (
                  <div className="flex justify-center py-2">
                    <div className="w-6 h-6 animate-spin rounded-full border-2 border-primary-blue border-t-transparent"></div>
                  </div>
                ) : isSignedIn ? (
                  <div className="py-2">
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8",
                          userButtonPopoverCard: "shadow-lg border border-gray-200",
                          userButtonPopoverActionButton: "hover:bg-gray-50"
                        }
                      }}
                    />
                  </div>
                ) : (
                  <SignInButton mode="modal">
                    <button
                      className="nav-link text-text-body hover:text-primary-blue font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </button>
                  </SignInButton>
                )}
                
                <Link
                  href="/category-selection"
                  className="btn-primary text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Now
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="text-2xl font-bold text-primary-blue hover:text-primary-blue">
                DaliWeb
              </div>
              <p className="text-gray-300 mb-4">
                Professional web development agency helping local businesses grow online with modern, fast, and mobile-friendly websites.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-primary-green transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-primary-green transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-primary-green transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link href="/services#web-design" className="text-gray-300 hover:text-primary-green transition-colors">Web Design</Link></li>
                <li><Link href="/services#web-development" className="text-gray-300 hover:text-primary-green transition-colors">Web Development</Link></li>
                <li><Link href="/services#ecommerce" className="text-gray-300 hover:text-primary-green transition-colors">E-commerce</Link></li>
                <li><Link href="/services#seo" className="text-gray-300 hover:text-primary-green transition-colors">SEO Services</Link></li>
                <li><Link href="/services#maintenance" className="text-gray-300 hover:text-primary-green transition-colors">Website Maintenance</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy-policy" className="text-gray-300 hover:text-primary-blue transition-colors">Privacy Policy</Link></li>
                <li><Link href="/refund-policy" className="text-gray-300 hover:text-primary-blue transition-colors">Refund Policy</Link></li>
                <li><Link href="/terms-and-conditions" className="text-gray-300 hover:text-primary-blue transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/service-policy" className="text-gray-300 hover:text-primary-blue transition-colors">Service Policy</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-primary-blue transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary-blue mr-3" />
                  <span className="text-gray-300">0329 0091255</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary-blue mr-3" />
                  <span className="text-gray-300">contact@daliweb.agency</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary-blue mr-3" />
                  <span className="text-gray-300">Faisalabad main</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-primary-green mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z"/>
                  </svg>
                  <a href="https://wa.me/923290091255" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-green transition-colors">WhatsApp: 0329 0091255</a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 DaliWeb. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-gray-300 hover:text-primary-blue text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/refund-policy" className="text-gray-300 hover:text-primary-blue text-sm transition-colors">
                Refund Policy
              </Link>
              <Link href="/terms-and-conditions" className="text-gray-300 hover:text-primary-blue text-sm transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/service-policy" className="text-gray-300 hover:text-primary-blue text-sm transition-colors">
                Service Policy
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-primary-blue text-sm transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
};

export default Layout;