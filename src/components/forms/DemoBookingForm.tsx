'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { BusinessType } from '@/types';
import { Loader2, CheckCircle, Calendar } from 'lucide-react';

const demoBookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  businessType: z.string().min(1, 'Please select your business type'),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  category: z.string().optional(),
  message: z.string().optional(),
});

type DemoBookingFormData = z.infer<typeof demoBookingSchema>;

interface DemoBookingFormProps {
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



const DemoBookingForm = ({ className = '' }: DemoBookingFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<DemoBookingFormData>({
    resolver: zodResolver(demoBookingSchema),
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

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Get maximum date (30 days from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  const router = useRouter();

  const onSubmit = async (data: DemoBookingFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          category: data.category || localStorage.getItem('selectedCategory') || 'general'
        }),
      });
      
      let result;
       try {
         result = await response.json();
       } catch (jsonError) {
         console.error('Invalid JSON response:', jsonError);
         console.error('Response status:', response.status);
         throw new Error(`Invalid JSON response from server. Status: ${response.status}`);
       }
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to book demo');
      }
      
      setIsSubmitted(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error booking demo:', error);
      const errorMessage = error instanceof Error ? error.message : 'There was an error booking your demo. Please try again.';
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
          Demo Booked Successfully!
        </h3>
        <p className="text-green-700 mb-4">
          We've received your demo booking request. Our team will contact you within 24 hours to confirm the details.
        </p>
        <div className="bg-white rounded-lg p-4 border border-green-200">
          <p className="text-sm text-gray-600">
            <strong>What's Next?</strong><br />
            1. We'll call you to confirm the demo time<br />
            2. We'll prepare a customized presentation for your business<br />
            3. During the demo, we'll show you examples and discuss your needs
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Book Your Free Demo
        </h3>
        <p className="text-gray-600">
          Schedule a 30-minute demo to see how we can help grow your business online.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

          <div>
            <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Preferred Date *
            </label>
            <input
              type="date"
              id="preferredDate"
              {...register('preferredDate')}
              min={getMinDate()}
              max={getMaxDate()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors text-gray-900 bg-white"
            />
            {errors.preferredDate && (
              <p className="mt-1 text-sm text-red-600">{errors.preferredDate.message}</p>
            )}
          </div>


        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            id="message"
            rows={3}
            {...register('message')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors text-gray-900 bg-white"
            placeholder="Any specific questions or requirements you'd like us to address during the demo?"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full font-semibold py-3 px-6 rounded-lg flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Booking Demo...
            </>
          ) : (
            'Book Free Demo'
          )}
        </button>

        <p className="text-sm text-gray-600 text-center">
          No commitment required. We'll show you exactly how we can help your business.
        </p>
      </form>
    </div>
  );
};

export default DemoBookingForm;