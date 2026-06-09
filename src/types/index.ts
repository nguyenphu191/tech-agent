import { LucideIcon } from 'lucide-react';

/**
 * Demo Slug - All available demo projects
 */
export type DemoSlug =
  | 'corporate'
  | 'fashion'
  | 'ordering-app'
  | 'product-catalog'
  | 'driver-app'
  | 'note-app'
  | 'ecommerce'
  | 'language-app';

/**
 * Demo Category - Classification of demo projects
 */
export type DemoCategory =
  | 'enterprise'
  | 'ecommerce'
  | 'lifestyle'
  | 'mobile'
  | 'productivity'
  | 'marketplace'
  | 'learning';

/**
 * Demo Project Metadata
 */
export interface Demo {
  slug: DemoSlug;
  title: string;
  description: string;
  category: DemoCategory;
  icon: LucideIcon;
  gradient: string; // Tailwind gradient class
  color: string; // Tailwind accent color
  comingSoon?: boolean;
  href: string;
}

/**
 * Demo Product - Sample product/item in a demo
 */
export interface DemoProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string; // URL or path
  category: string;
  rating?: number; // 0-5
  reviews?: number;
  badge?: string; // e.g., "Featured", "New", "Sale"
  metadata?: Record<string, any>; // Demo-specific data (size, color, etc.)
}

/**
 * Demo User - Sample user/customer
 */
export interface DemoUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  metadata?: Record<string, any>;
}

/**
 * Demo Order - Sample order/transaction
 */
export interface DemoOrder {
  id: string;
  userId: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  date: Date;
  metadata?: Record<string, any>;
}

/**
 * Form Status - State machine for form submission
 */
export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Form Feedback - Notification content
 */
export interface FormFeedback {
  status: FormStatus;
  message?: string;
  type?: 'success' | 'error' | 'info';
}

/**
 * Demo Filter State
 */
export interface DemoFilterState {
  search: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: 'name' | 'price' | 'rating' | 'newest';
}

/**
 * Demo Notes - For note-taking demo
 */
export interface DemoNote {
  id: string;
  title: string;
  content: string;
  folderId?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Demo Folder - For note organization
 */
export interface DemoFolder {
  id: string;
  name: string;
  parentId?: string;
  createdAt: Date;
}

/**
 * Demo Course - For language learning
 */
export interface DemoCourse {
  id: string;
  title: string;
  description: string;
  language: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  lessons: DemoLesson[];
  progress?: number; // 0-100
}

/**
 * Demo Lesson
 */
export interface DemoLesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: number; // minutes
  vocabulary?: string[];
}

/**
 * Demo Ride - For driver app
 */
export interface DemoRide {
  id: string;
  driverId: string;
  passengerId: string;
  pickupLocation: string;
  dropoffLocation: string;
  distance: number;
  fare: number;
  status: 'requested' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  rating?: number;
  createdAt: Date;
}

/**
 * Demo Driver Profile
 */
export interface DemoDriver {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  rating: number;
  totalRides: number;
  earnings: number;
  status: 'available' | 'offline' | 'on-ride';
  vehicle?: {
    make: string;
    model: string;
    plate: string;
  };
}

/**
 * Demo Vendor - For marketplace
 */
export interface DemoVendor {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  rating: number;
  products: number;
  followers: number;
  joinDate: Date;
}

/**
 * Re-export types that might be useful
 */
export type ProjectCategory = 'web' | 'mobile' | 'uiux' | 'dashboard';
