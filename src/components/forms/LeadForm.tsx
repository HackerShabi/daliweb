'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BusinessType } from '@/types';
import { Loader2, CheckCircle } from 'lucide-react';

// API function for quote submission
const submitQuote = async (quoteData: any) => {
  const response = await fetch('/api/quote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quoteData),
  });
  
  let data;
   try {
     data = await response.json();
   } catch (jsonError) {
     console.error('Invalid JSON response:', jsonError);
     console.error('Response status:', response.status);
     throw new Error(`Invalid JSON response from server. Status: ${response.status}`);
   }
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to submit quote');
  }
  
  return data;
};

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  businessType: z.string().min(1, 'Please select your business type'),
  category: z.string().optional(),
  message: z.string().min(10, 'Please provide more details about your needs'),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadFormProps {
  source: 'contact' | 'pricing' | 'home';
  className?: string;
}

const businessTypes: { value: BusinessType | 'other'; label: string }[] = [
  { value: 'doctor', label: 'Doctor/Healthcare' },
  { value: 'hotel', label: 'Hotel/Hospitality' },
  { value: 'shop', label: 'Retail/Shop' },
  { value: 'school', label: 'School/Education' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'restaurant', label: 'Restaurant/Food' },
  { value: 'travel-agency', label: 'Travel Agency' },
  { value: 'other', label: 'Other' },
];

const LeadForm = ({ source, className = '' }: LeadFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  // Auto-fill category from localStorage or URL
  useEffect(() => {
    const storedCategory = localStorage.getItem('selectedCategory');
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get('category');
    
    const category = categoryFromUrl || storedCategory;
    if (category) {
      setValue('category', category);
    }
  }, [setValue]);

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    try {
      await submitQuote({
        ...data,
        source,
        status: 'new',
        priority: 'medium',
        initialPackage: 'basic',
        category: data.category || localStorage.getItem('selectedCategory') || 'general'
      });
      setIsSubmitted(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting quote:', error);
      const errorMessage = error instanceof Error ? error.message : 'There was an error submitting your request. Please try again.';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 text-center ${className}`}>
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Thank You for Your Interest!
        </h3>
        <p className="text-green-700">
          We will reply you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-6 ${className}`}>
      {/* Hidden category field */}
      <input type="hidden" {...register('category')} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors text-gray-900 bg-white"
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors text-gray-900 bg-white"
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors text-gray-900 bg-white"
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
            Business Type *
          </label>
          <select
            id="businessType"
            {...register('businessType')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors text-gray-900 bg-white"
          >
            <option value="">Select your business type</option>
            {businessTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.businessType && (
            <p className="mt-1 text-sm text-red-600">{errors.businessType.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Tell us about your project *
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('message')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors text-gray-900 bg-white"
          placeholder="Describe what kind of website you need, your goals, timeline, etc."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full font-semibold py-3 px-6 rounded-lg flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin h-5 w-5 mr-2" />
            Submitting...
          </>
        ) : (
          source === 'contact' ? 'Contact Us' : 'Get Free Quote'
        )}
      </button>

      <p className="text-sm text-gray-600 text-center">
        We respect your privacy. Your information will never be shared with third parties.
      </p>
    </form>
  );
};

export default LeadForm;