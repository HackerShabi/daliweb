'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser, useAuth } from '@clerk/nextjs';
import Layout from '@/components/layout/Layout';
import QuoteForm from '@/components/forms/QuoteForm';
import {
  processPayment,
  validateCardNumber,
  validateExpiryDate,
  formatCardNumber,
  formatExpiryDate,
  getCardType,
  getTotalWithFees,
  type PaymentData,
  type CreditCardData,
  type BillingAddress
} from '@/lib/payment';

type CheckoutOption = 'demo' | 'package' | 'quote';
type PackageType = 'starter' | 'business' | 'premium';

interface FormData {
  // Personal Information
  name: string;
  email: string;
  phone: string;
  
  // Demo Booking Information
  preferredDate: string;
  businessType: string;
  
  // Payment Information (for demo and packages)
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
  
  // Billing Address (for demo and packages)
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

const packages = {
  starter: { name: 'Starter', price: 99, features: ['Basic Website', '5 Pages', 'Mobile Responsive', 'Basic SEO'] },
  business: { name: 'Business', price: 499, features: ['Professional Website', '10 Pages', 'E-commerce Ready', 'Advanced SEO', 'Analytics'] },
  premium: { name: 'Premium', price: 999, features: ['Enterprise Website', 'Unlimited Pages', 'Custom Features', 'Premium SEO', 'Priority Support'] }
};

const CheckoutPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isSignedIn, user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<CheckoutOption>('demo');
  const [selectedPackage, setSelectedPackage] = useState<PackageType>('starter');
  const [currentStep, setCurrentStep] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    businessType: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    }
  });

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

  // Initialize from URL params
  useEffect(() => {
    const option = searchParams.get('option') as CheckoutOption;
    const packageType = searchParams.get('package') as PackageType;
    
    if (option && ['demo', 'package'].includes(option)) {
      setSelectedOption(option);
    }
    
    if (packageType && ['starter', 'business', 'premium'].includes(packageType)) {
      setSelectedPackage(packageType);
      if (option === 'package') {
        setSelectedOption('package');
      }
    }
  }, [searchParams]);

  // Load demo booking data from sessionStorage
  useEffect(() => {
    const demoData = sessionStorage.getItem('demoBookingData');
    if (demoData) {
      try {
        const parsedData = JSON.parse(demoData);
        setFormData(prev => ({
          ...prev,
          name: parsedData.name || '',
          email: parsedData.email || '',
          phone: parsedData.phone || '',
          preferredDate: parsedData.preferredDate || ''
        }));
        setSelectedOption('demo');
        // Clear the sessionStorage after loading
        sessionStorage.removeItem('demoBookingData');
      } catch (error) {
        console.error('Error parsing demo booking data:', error);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('billing.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle card number formatting
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };

  // Handle expiry date formatting
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    const [month, year] = formatted.split('/');
    setFormData(prev => ({
      ...prev,
      expiryMonth: month || '',
      expiryYear: year || ''
    }));
  };

  // Handle CVV input (numbers only)
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substr(0, 4);
    setFormData(prev => ({
      ...prev,
      cvv: value
    }));
  };

  const getPrice = () => {
    switch (selectedOption) {
      case 'demo':
        return 20;
      case 'package':
        return packages[selectedPackage].price;
      case 'quote':
        return 0;
      default:
        return 0;
    }
  };

  const getTitle = () => {
    switch (selectedOption) {
      case 'demo':
        return 'Book Demo';
      case 'package':
        return `Get ${packages[selectedPackage].name} Package`;
      case 'quote':
        return 'Get Free Quote';
      default:
        return 'Checkout';
    }
  };

  const getDescription = () => {
    switch (selectedOption) {
      case 'demo':
        return 'Book a personalized demo session with our team.';
      case 'package':
        return `Purchase the ${packages[selectedPackage].name} package and get started immediately.`;
      case 'quote':
        return 'Get a personalized quote for your project with no obligation.';
      default:
        return '';
    }
  };

  const requiresPayment = () => {
    return selectedOption !== 'quote'; // Only demo and package require payment, not quotes
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];

    // Step 1: Personal information and billing address validation
    if (currentStep === 1) {
      if (!formData.name.trim()) errors.push('Name is required');
      if (!formData.email.trim()) errors.push('Email is required');
      if (!formData.phone.trim()) errors.push('Phone is required');

      // Demo booking validation
      if (selectedOption === 'demo') {
        if (!formData.preferredDate.trim()) errors.push('Preferred date is required for demo booking');
        if (!formData.businessType.trim()) errors.push('Business type is required for demo booking');
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailRegex.test(formData.email)) {
        errors.push('Please enter a valid email address');
      }

      // Billing address validation
      if (!formData.billingAddress.street.trim()) errors.push('Billing address is required');
      if (!formData.billingAddress.city.trim()) errors.push('City is required');
      if (!formData.billingAddress.state.trim()) errors.push('State is required');
      if (!formData.billingAddress.zipCode.trim()) errors.push('ZIP code is required');
    }

    // Step 2: Payment validation (only for demo and packages)
    if (currentStep === 2 && requiresPayment()) {
      if (!formData.cardNumber || !validateCardNumber(formData.cardNumber)) {
        errors.push('Please enter a valid card number');
      }
      if (!formData.expiryMonth || !formData.expiryYear || !validateExpiryDate(formData.expiryMonth, formData.expiryYear)) {
        errors.push('Please enter a valid expiry date');
      }
      if (!formData.cvv || formData.cvv.length < 3) {
        errors.push('Please enter a valid CVV');
      }
      if (!formData.cardholderName.trim()) {
        errors.push('Cardholder name is required');
      }
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      
      // Get Clerk auth token for authenticated requests
      let authHeaders = {};
      if (isSignedIn) {
        try {
          const token = await getToken();
          authHeaders = { Authorization: `Bearer ${token}` };
        } catch (error) {
          console.error('Error getting Clerk token:', error);
        }
      }
      
      // Get category data from localStorage (set from category selection page)
      const selectedCategoryData = localStorage.getItem('selectedCategoryData');
      const categoryInfo = selectedCategoryData ? JSON.parse(selectedCategoryData) : null;

       // Handle demo booking or package purchase with payment
        const baseAmount = getPrice();
        const { total } = getTotalWithFees(baseAmount);

        // Prepare payment data
        const paymentData: PaymentData = {
          amount: total,
          currency: 'usd',
          customerEmail: formData.email,
          customerName: formData.name,
          description: selectedOption === 'demo' 
            ? `Demo booking for ${categoryInfo?.category || 'business'}`
            : `${packages[selectedPackage].name} package for ${categoryInfo?.category || 'business'}`
        };

        const cardData: CreditCardData = {
          cardNumber: formData.cardNumber,
          expiryMonth: formData.expiryMonth,
          expiryYear: formData.expiryYear,
          cvv: formData.cvv,
          cardholderName: formData.cardholderName
        };

        const billingAddress: BillingAddress = formData.billingAddress;

        // Process payment
        const paymentResult = await processPayment(paymentData, cardData, billingAddress);

        if (!paymentResult.success) {
          throw new Error(paymentResult.error || 'Payment failed');
        }

        // Create booking/purchase record
        const endpoint = selectedOption === 'demo' ? '/api/demo' : '/api/packages';
        const requestBody = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          categoryInfo: categoryInfo || null,
          submissionType: selectedOption,
          paymentAmount: total,
          paymentStatus: 'completed',
          paymentMethod: 'card',
          transactionId: paymentResult.transactionId,
          paymentIntentId: paymentResult.paymentIntentId,
          cardDetails: {
            last4: formData.cardNumber.slice(-4),
            brand: getCardType(formData.cardNumber).toLowerCase(),
            expiryMonth: formData.expiryMonth,
            expiryYear: formData.expiryYear
          },
          billingAddress: formData.billingAddress,
          ...(selectedOption === 'demo' && { 
            preferredDate: formData.preferredDate,
            businessType: formData.businessType
          }),
          ...(selectedOption === 'package' && { packageType: selectedPackage, packageName: packages[selectedPackage].name })
        };

        console.log('Sending checkout data to:', endpoint);
        console.log('Request payload:', JSON.stringify(requestBody, null, 2));

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...authHeaders,
          },
          body: JSON.stringify(requestBody),
        });

        let data;
        try {
          data = await response.json();
        } catch (jsonError) {
          console.error('Invalid JSON response:', jsonError);
          console.error('Response status:', response.status);
          throw new Error(`Invalid JSON response from server. Status: ${response.status}`);
        }

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to create booking/purchase');
        }

        // Redirect to success page
        router.push(`/checkout/success?type=${selectedOption}&id=${data.data._id}&transaction=${paymentResult.transactionId}`);
    } catch (error) {
      console.error('Checkout error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during checkout';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < (requiresPayment() ? 2 : 1)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        const basicFieldsValid = formData.name.trim() && formData.email.trim() && formData.phone.trim() && 
               formData.billingAddress.street.trim() && formData.billingAddress.city.trim() && 
               formData.billingAddress.state.trim() && formData.billingAddress.zipCode.trim() && 
               formData.billingAddress.country.trim();
        
        // For demo bookings, also check preferred date and business type
        if (selectedOption === 'demo') {
          return basicFieldsValid && formData.preferredDate.trim() && formData.businessType.trim();
        }
        
        return basicFieldsValid;
      case 2:
        return requiresPayment() ? (
          formData.cardNumber && 
          formData.expiryMonth && 
          formData.expiryYear && 
          formData.cvv && 
          formData.cardholderName &&
          validateCardNumber(formData.cardNumber) &&
          validateExpiryDate(formData.expiryMonth + '/' + formData.expiryYear)
        ) : true;
      default:
        return false;
    }
  };

  const getValidationErrors = () => {
    const errors: string[] = [];
    
    if (currentStep === 1) {
      if (!formData.name.trim()) errors.push('Name is required');
      if (!formData.email.trim()) errors.push('Email is required');
      if (!formData.phone.trim()) errors.push('Phone is required');
      if (!formData.billingAddress.street.trim()) errors.push('Street address is required');
      if (!formData.billingAddress.city.trim()) errors.push('City is required');
      if (!formData.billingAddress.state.trim()) errors.push('State is required');
      if (!formData.billingAddress.zipCode.trim()) errors.push('ZIP code is required');
      if (!formData.billingAddress.country.trim()) errors.push('Country is required');
      if (selectedOption === 'demo') {
        if (!formData.preferredDate.trim()) errors.push('Preferred date is required');

        if (!formData.businessType.trim()) errors.push('Business type is required');
      }
      
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailRegex.test(formData.email)) {
        errors.push('Please enter a valid email address');
      }
    }
    
    if (currentStep === 2 && requiresPayment()) {
      if (!formData.cardNumber || !validateCardNumber(formData.cardNumber)) {
        errors.push('Please enter a valid card number');
      }
      if (!formData.expiryMonth || !formData.expiryYear || !validateExpiryDate(formData.expiryMonth, formData.expiryYear)) {
        errors.push('Please enter a valid expiry date');
      }
      if (!formData.cvv || formData.cvv.length < 3) {
        errors.push('Please enter a valid CVV');
      }
      if (!formData.cardholderName.trim()) {
        errors.push('Cardholder name is required');
      }
    }
    
    return errors;
  };

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
  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-purple-900 flex items-center justify-center">
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
            <h1 className="text-4xl font-bold text-white mb-4">Choose Your Option</h1>
            <p className="text-green-100 text-lg">Select the option that best fits your needs</p>
            
            {/* Free Demo Button */}
            <div className="mt-6">
              <button 
                onClick={() => window.open('/contact', '_blank')}
                className="btn-primary px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.524A11.956 11.956 0 0100 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                </svg>
                Free Demo
              </button>
            </div>
          </div>

          {/* Option Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
            {/* Get Free Quote */}
            <div 
              className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 cursor-pointer transition-all relative ${
                selectedOption === 'quote' ? 'ring-2 ring-primary-green bg-white/20' : 'hover:bg-white/15'
              }`}
              onClick={() => {
                setSelectedOption('quote');
                setShowDetails(true);
              }}
            >
              {selectedOption === 'quote' && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-primary-green rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Get Free Quote</h3>
                <div className="text-3xl font-bold text-green-400 mb-4">FREE</div>
                <div className="hidden md:block">
                  <p className="text-green-100 text-sm mb-4">Personalized quote for your project</p>
            <ul className="text-green-200 text-sm space-y-2">
                    <li>• Custom pricing</li>
                    <li>• Project consultation</li>
                    <li>• No obligation</li>
                    <li>• 24hr response</li>
                  </ul>
                </div>
                <div className="md:hidden">
                  <p className="text-green-100 text-sm">Personalized quote for your project</p>
                </div>
              </div>
            </div>

            {/* Book Demo */}
            <div 
              className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 cursor-pointer transition-all relative ${
                selectedOption === 'demo' ? 'ring-2 ring-primary-green bg-white/20' : 'hover:bg-white/15'
              }`}
              onClick={() => {
                setSelectedOption('demo');
                setShowDetails(true);
              }}
            >
              {selectedOption === 'demo' && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-primary-green rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Book Demo</h3>
                <div className="text-3xl font-bold text-green-400 mb-4">$20</div>
                <div className="hidden md:block">
                  <p className="text-green-100 text-sm mb-4">Personalized demo session</p>
            <ul className="text-green-200 text-sm space-y-2">
                    <li>• 1-hour demo session</li>
                    <li>• Live consultation</li>
                    <li>• Q&A session</li>
                    <li>• Project planning</li>
                  </ul>
                </div>
                <div className="md:hidden">
                  <p className="text-green-100 text-sm">Personalized demo session</p>
                </div>
              </div>
            </div>

            {/* Get Now Packages */}
            <div 
              className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 cursor-pointer transition-all relative ${
                selectedOption === 'package' ? 'ring-2 ring-primary-green bg-white/20' : 'hover:bg-white/15'
              }`}
              onClick={() => {
                setSelectedOption('package');
                setShowDetails(true);
              }}
            >
              {selectedOption === 'package' && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-primary-green rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Get Now</h3>
                <div className="text-3xl font-bold text-green-400 mb-4">${packages[selectedPackage].price}</div>
                <div className="hidden md:block">
                  <p className="text-green-100 text-sm mb-4">Ready-to-go packages</p>
                  <select 
                    value={selectedPackage} 
                    onChange={(e) => setSelectedPackage(e.target.value as PackageType)}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white text-sm mb-2"
                  >
                    <option value="starter" className="text-gray-900">Starter - $99</option>
                    <option value="business" className="text-gray-900">Business - $499</option>
                    <option value="premium" className="text-gray-900">Premium - $999</option>
                  </select>
                </div>
                <div className="md:hidden">
                  <p className="text-green-100 text-sm">Ready-to-go packages</p>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Option Details - Show on desktop or when showDetails is true on mobile */}
          <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 ${!showDetails ? 'hidden md:block' : ''}`}>
            <div className="text-center mb-6">
              <div className="flex items-center justify-between md:justify-center mb-4">
                <h2 className="text-2xl font-bold text-white">{getTitle()}</h2>
                <button 
                  onClick={() => setShowDetails(false)}
                  className="md:hidden text-white/70 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              <p className="text-green-100">{getDescription()}</p>
              {getPrice() > 0 && (
                <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
                  <div className="text-2xl font-bold text-white">${getPrice()}.00 USD</div>
                  {requiresPayment() && <div className="text-green-200 text-xs mt-1">+ processing fees</div>}
                </div>
              )}
              {selectedOption === 'package' && (
                <div className="mt-4 text-left max-w-md mx-auto">
                  <label className="block text-white text-sm font-medium mb-2">Select Package:</label>
                  <select 
                    value={selectedPackage} 
                    onChange={(e) => setSelectedPackage(e.target.value as PackageType)}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white text-sm mb-3"
                  >
                    <option value="starter" className="text-gray-900">Starter - $99</option>
                    <option value="business" className="text-gray-900">Business - $499</option>
                    <option value="premium" className="text-gray-900">Premium - $999</option>
                  </select>
                  <div>
                    <h4 className="text-white font-medium mb-2">Package Features:</h4>
                    <ul className="text-green-200 text-sm space-y-1">
                      {packages[selectedPackage].features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4 md:space-x-8">
                {(requiresPayment() ? [1, 2] : [1]).map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step 
                        ? 'bg-primary-green text-white'
                : 'bg-white/20 text-green-100'
                    }`}>
                      {step}
                    </div>
                    <div className={`ml-2 text-xs md:text-sm ${
                      currentStep >= step ? 'text-white' : 'text-green-200'
                    }`}>
                      {step === 1 && 'Personal & Billing Info'}
                      {step === 2 && 'Payment'}
                    </div>
                    {step < (requiresPayment() ? 2 : 1) && (
                      <div className={`ml-4 md:ml-8 w-8 md:w-16 h-0.5 ${
                        currentStep > step ? 'bg-primary-green' : 'bg-white/20'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Form - Show when quote option is selected */}
            {selectedOption === 'quote' ? (
              <QuoteForm 
                onSuccess={() => {
                  // Redirect to success page or show success message
                  router.push('/checkout/success?type=quote');
                }}
                className="max-w-2xl mx-auto"
              />
            ) : (
              /* Form for Demo and Package options */
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Details and Billing Address */}
                {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-6">Your Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-green-100 text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-green-100 text-sm font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-green-100 text-sm font-medium mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    
                    {/* Demo-specific fields */}
                    {selectedOption === 'demo' && (
                      <>
                        <div>
                          <label className="block text-green-100 text-sm font-medium mb-2">Preferred Date *</label>
                          <input
                            type="date"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                            required
                          />
                        </div>
                        

                        
                        <div>
                          <label className="block text-green-100 text-sm font-medium mb-2">Business Type *</label>
                          <select
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                            required
                          >
                            <option value="">Select business type</option>
                            <option value="restaurant">Restaurant</option>
                            <option value="retail">Retail</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="technology">Technology</option>
                            <option value="education">Education</option>
                            <option value="real-estate">Real Estate</option>
                            <option value="finance">Finance</option>
                            <option value="consulting">Consulting</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Billing Address */}
                  <div className="mt-8">
                    <h4 className="text-lg font-bold text-white mb-4">Billing Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-green-100 text-sm font-medium mb-2">Street Address *</label>
                        <input
                          type="text"
                          name="billing.street"
                          value={formData.billingAddress.street}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                          placeholder="123 Main Street"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-green-100 text-sm font-medium mb-2">City *</label>
                        <input
                          type="text"
                          name="billing.city"
                          value={formData.billingAddress.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                          placeholder="New York"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-green-100 text-sm font-medium mb-2">State *</label>
                        <input
                          type="text"
                          name="billing.state"
                          value={formData.billingAddress.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                          placeholder="NY"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-green-100 text-sm font-medium mb-2">ZIP Code *</label>
                        <input
                          type="text"
                          name="billing.zipCode"
                          value={formData.billingAddress.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                          placeholder="12345"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-green-100 text-sm font-medium mb-2">Country *</label>
                        <select
                          name="billing.country"
                          value={formData.billingAddress.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                          required
                        >
                          <option value="US" className="text-gray-900">United States</option>
                          <option value="CA" className="text-gray-900">Canada</option>
                          <option value="UK" className="text-gray-900">United Kingdom</option>
                          <option value="AU" className="text-gray-900">Australia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Information (only for demo and packages) */}
              {requiresPayment() && currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-6">Payment Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-green-100 text-sm font-medium mb-2">Card Number *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-green-100 text-sm font-medium mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        name="expiry"
                        value={`${formData.expiryMonth}${formData.expiryYear ? '/' + formData.expiryYear : ''}`}
                        onChange={handleExpiryChange}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-green-100 text-sm font-medium mb-2">CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleCvvChange}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-green-100 text-sm font-medium mb-2">Cardholder Name *</label>
                      <input
                        type="text"
                        name="cardholderName"
                        value={formData.cardholderName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                        placeholder="Name on card"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}



              {/* Validation Errors */}
              {!isStepValid() && (
                <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <h4 className="text-red-300 font-medium mb-2">Please fix the following errors:</h4>
                  <ul className="text-red-200 text-sm space-y-1">
                    {getValidationErrors().map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {requiresPayment() ? (
                  <>
                    <button
                      type="button"
                      onClick={prevStep}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        currentStep === 1
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                      disabled={currentStep === 1}
                    >
                      Previous
                    </button>
                    
                    {currentStep < 2 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                          isStepValid()
                            ? 'btn-primary'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!isStepValid()}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                          isStepValid() && !isLoading
                            ? 'btn-primary'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!isStepValid() || isLoading}
                      >
                        {isLoading ? 'Processing...' : 'Complete Payment'}
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <div></div>
                    <button
                      type="submit"
                      className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                        isStepValid() && !isLoading
                          ? 'btn-primary'
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!isStepValid() || isLoading}
                    >
                      {isLoading ? 'Submitting...' : 'Submit Quote Request'}
                    </button>
                  </>
                )}
              </div>
            </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const CheckoutPageWithSuspense = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CheckoutPage />
    </Suspense>
  );
};

export default CheckoutPageWithSuspense;