'use client';

import { Suspense } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  CheckCircle,
  Users,
  Zap
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import LeadForm from '@/components/forms/LeadForm';
import Link from 'next/link';

const ContactPage = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['0329 0091255', 'Available 24/7'],
      action: 'tel:+923290091255'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['daliweb05@gmail.com', 'We reply within 2 hours'],
      action: 'mailto:daliweb05@gmail.com'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: ['0329 0091255', 'Quick responses 24/7'],
      action: 'https://wa.me/923290091255'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: ['Street 08 Dijkot Town', 'Faisalabad, Pakistan'],
      action: 'https://maps.google.com/?q=Street+08+Dijkot+Town+Faisalabad+Pakistan'
    }
  ];

  const businessHours = [
    { day: 'Monday - Sunday', hours: '24 Hours' },
    { day: 'Call Support', hours: '24/7 Available' }
  ];

  const whyChooseUs = [
    {
      icon: Zap,
      title: 'Fast Response',
      description: 'We respond to all inquiries within 2 hours during business hours'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our experienced developers and designers deliver quality results'
    },
    {
      icon: CheckCircle,
      title: 'Proven Results',
      description: '98% client satisfaction rate with 50+ successful projects'
    },
    {
      icon: Clock,
      title: 'On-Time Delivery',
      description: 'We meet deadlines and deliver projects when promised'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Let's Build Your <span className="text-primary-blue">Dream Website</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Ready to take your business online? Get in touch with our team for a free 
              consultation and discover how we can help you succeed.
            </p>
            <div className="flex justify-center">
              <Link
                href="/category-selection"
                className="btn-primary text-white px-8 py-3 rounded-lg font-semibold"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Send Us a Message
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Have questions or want to discuss your project? Fill out the form below 
                  and we'll get back to you within 2 hours.
                </p>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-50 rounded-xl p-8">
                <LeadForm source="contact" />
              </div>

              {/* Benefits */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyChooseUs.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-lg mr-4">
                        <IconComponent className="h-6 w-6 text-primary-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Get in Touch
              </h2>
              
              {/* Contact Methods */}
              <div className="space-y-6 mb-8">
                {contactInfo.map((contact, index) => {
                  const IconComponent = contact.icon;
                  return (
                    <a
                      key={index}
                      href={contact.action}
                      target={contact.action.startsWith('http') ? '_blank' : '_self'}
                      rel={contact.action.startsWith('http') ? 'noopener noreferrer' : ''}
                      className="flex items-start p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow group"
                    >
                      <div className="bg-green-100 p-3 rounded-lg mr-4 group-hover:bg-green-200 transition-colors">
                        <IconComponent className="h-6 w-6 text-primary-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{contact.title}</h3>
                        <p className="text-gray-700 font-medium">{contact.details[0]}</p>
                        <p className="text-sm text-gray-500">{contact.details[1]}</p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Business Hours */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Clock className="h-6 w-6 text-primary-blue mr-2" />
                  Business Hours
                </h3>
                <div className="space-y-2">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{schedule.day}</span>
                      <span className="font-medium text-gray-900">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 bg-gray-200 rounded-xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Interactive Map</p>
                  <p className="text-sm text-gray-400">Street 08 Dijkot, Faisalabad, Pakistan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Choose from our packages and get your website built by experts. 
            Start with a free quote or book a demo to see what we can do for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/checkout"
              className="bg-white text-primary-blue hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Get Started Now
            </Link>
            <a
              href="tel:+923290091255"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-blue px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now: 0329 0091255
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const ContactPageWithSuspense = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ContactPage />
    </Suspense>
  );
};

export default ContactPageWithSuspense;