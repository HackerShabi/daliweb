// Business Types
export type BusinessType = 
  | 'E-commerce'
  | 'Technology'
  | 'Healthcare'
  | 'Finance'
  | 'Education'
  | 'Real Estate'
  | 'Restaurant'
  | 'Retail'
  | 'Manufacturing'
  | 'Consulting'
  | 'Non-profit'
  | 'doctor'
  | 'hotel'
  | 'shop'
  | 'school'
  | 'real-estate'
  | 'restaurant'
  | 'travel-agency'
  | 'Other';

// Submission Types
export interface Submission {
  id: string;
  type: 'quote' | 'demo' | 'package';
  name: string;
  email: string;
  phone?: string;
  company?: string;
  businessType?: BusinessType;
  message?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  
  // Quote specific fields
  website?: string;
  budget?: string;
  timeline?: string;
  requirements?: string;
  
  // Demo specific fields
  preferredDate?: string;

  paymentStatus?: 'pending' | 'completed' | 'failed';
  
  // Package specific fields
  packageName?: string;
  packagePrice?: number;
  
  // Source tracking
  source?: 'contact' | 'pricing' | 'home';
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Admin Types
export interface Admin {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'super_admin';
  createdAt: string;
  updatedAt: string;
}

// Stats Types
export interface Stats {
  totalSubmissions: number;
  quotes: number;
  demos: number;
  packages: number;
  pendingSubmissions: number;
  completedSubmissions: number;
  totalRevenue: number;
  todaySubmissions: number;
}

// Google User Types
export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  provider: 'google';
  createdAt: string;
  lastLogin: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Form Data Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  businessType: BusinessType;
  message: string;
  source?: 'contact' | 'pricing' | 'home';
}

export interface DemoFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  businessType: BusinessType;
  preferredDate: string;

  source?: 'contact' | 'pricing' | 'home';
}

export interface PackageFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  packageName: string;
  packagePrice: number;
  source?: 'contact' | 'pricing' | 'home';
}