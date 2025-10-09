'use client';

import { X, Facebook, Instagram, Twitter, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890';
  
  // Default message for WhatsApp
  const defaultMessage = "Hi! I'm interested in getting a website for my business. Can you help me?";
  
  // WhatsApp URL
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(defaultMessage)}`;

  // Social media links
  const socialLinks = {
    facebook: 'https://facebook.com/daliweb',
    instagram: 'https://instagram.com/daliweb',
    twitter: 'https://twitter.com/daliweb'
  };

  useEffect(() => {
    // Show button after a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    
    // Show admin panel after 3 clicks
    if (clickCount >= 2) {
      setShowAdminPanel(true);
      setClickCount(0);
    } else {
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleAdminClick = () => {
    // You can add admin functionality here
    alert('Admin panel access - Add your admin functionality here');
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Admin Panel */}
          {showAdminPanel && (
            <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-xl border p-4 w-64 mb-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">Quick Access</h3>
                <button
                  onClick={() => setShowAdminPanel(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              {/* Social Media Options */}
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Social Media</h4>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleSocialClick(socialLinks.facebook)}
                    className="flex flex-col items-center p-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Facebook className="h-5 w-5 text-blue-600 mb-1" />
                    <span className="text-xs text-gray-600">Facebook</span>
                  </button>
                  <button
                    onClick={() => handleSocialClick(socialLinks.instagram)}
                    className="flex flex-col items-center p-2 rounded-lg hover:bg-pink-50 transition-colors"
                  >
                    <Instagram className="h-5 w-5 text-pink-600 mb-1" />
                    <span className="text-xs text-gray-600">Instagram</span>
                  </button>
                  <button
                    onClick={() => handleSocialClick(socialLinks.twitter)}
                    className="flex flex-col items-center p-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Twitter className="h-5 w-5 text-blue-400 mb-1" />
                    <span className="text-xs text-gray-600">Twitter</span>
                  </button>
                </div>
              </div>
              
              {/* Admin Button */}
              <button
                onClick={handleAdminClick}
                className="w-full flex items-center justify-center p-2 bg-primary-green hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin Panel
              </button>
              
              {/* WhatsApp Option */}
              <button
                onClick={() => {
                  window.open(whatsappUrl, '_blank');
                  setShowAdminPanel(false);
                }}
                className="w-full flex items-center justify-center p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors mt-2"
              >
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.686"/>
                </svg>
                WhatsApp Chat
              </button>
            </div>
          )}
          
          {/* Main WhatsApp Button */}
          <button
            onClick={handleClick}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-bounce"
            aria-label="Chat on WhatsApp"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.686"/>
            </svg>
          </button>
          
          {/* Tooltip */}
          {!showAdminPanel && (
            <div className="absolute bottom-16 right-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Chat with us on WhatsApp
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;