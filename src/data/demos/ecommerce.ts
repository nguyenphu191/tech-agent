import { DemoProduct, DemoUser, DemoOrder, DemoVendor } from '@/types';

export const MARKETPLACE_VENDORS: DemoVendor[] = [
  {
    id: 'vendor-1',
    name: 'TechHub Electronics',
    description: 'Leading electronics retailer with authentic products and fast shipping',
    avatar: '🏪',
    rating: 4.9,
    products: 1250,
    followers: 45320,
    joinDate: new Date('2022-03-15'),
  },
  {
    id: 'vendor-2',
    name: 'Fashion Forward Boutique',
    description: 'Curated fashion and lifestyle products from emerging designers',
    avatar: '👗',
    rating: 4.8,
    products: 580,
    followers: 28450,
    joinDate: new Date('2023-06-20'),
  },
  {
    id: 'vendor-3',
    name: 'Home Essentials Co',
    description: 'Quality home goods and furniture for modern living',
    avatar: '🏠',
    rating: 4.7,
    products: 890,
    followers: 35670,
    joinDate: new Date('2023-01-10'),
  },
];

export const MARKETPLACE_PRODUCTS: DemoProduct[] = [
  {
    id: 'market-1',
    name: 'Wireless Charging Pad',
    description: '15W fast wireless charger compatible with all Qi devices',
    price: 29.99,
    category: 'electronics',
    rating: 4.8,
    reviews: 634,
    metadata: {
      vendor: 'vendor-1',
      vendorName: 'TechHub Electronics',
      stock: 523,
      shipping: 'Free',
      shipsFrom: 'San Jose, CA',
      emoji: '⚡',
    },
  },
  {
    id: 'market-2',
    name: 'Minimalist Wallet',
    description: 'Slim leather wallet with RFID protection',
    price: 49.99,
    category: 'accessories',
    rating: 4.9,
    reviews: 456,
    metadata: {
      vendor: 'vendor-2',
      vendorName: 'Fashion Forward Boutique',
      colors: ['Black', 'Brown', 'Tan'],
      shipping: 'Free',
      shipsFrom: 'New York, NY',
      emoji: '👛',
    },
  },
  {
    id: 'market-3',
    name: 'Smart LED Desk Lamp',
    description: 'Adjustable LED desk lamp with wireless charging base',
    price: 79.99,
    category: 'electronics',
    rating: 4.7,
    reviews: 283,
    metadata: {
      vendor: 'vendor-3',
      vendorName: 'Home Essentials Co',
      stock: 189,
      shipping: '$5.99',
      shipsFrom: 'Chicago, IL',
      emoji: '💡',
    },
  },
  {
    id: 'market-4',
    name: 'Designer Sunglasses',
    description: 'Polarized UV400 protection with premium acetate frame',
    price: 189.99,
    category: 'accessories',
    rating: 4.8,
    reviews: 167,
    badge: 'Trending',
    metadata: {
      vendor: 'vendor-2',
      vendorName: 'Fashion Forward Boutique',
      colors: ['Black', 'Tortoise'],
      shipping: 'Free',
      shipsFrom: 'New York, NY',
      emoji: '🕶️',
    },
  },
];

export const MARKETPLACE_USERS: DemoUser[] = [
  {
    id: 'market-user-1',
    name: 'Sarah Kim',
    email: 'sarah.k@example.com',
    avatar: '👩‍🦰',
    createdAt: new Date('2024-02-01'),
    metadata: { orders: 23, tier: 'Gold' },
  },
];

export const MARKETPLACE_ORDERS: DemoOrder[] = [
  {
    id: 'market-order-001',
    userId: 'market-user-1',
    products: [
      { productId: 'market-1', quantity: 1, price: 29.99 },
      { productId: 'market-2', quantity: 2, price: 49.99 },
    ],
    totalPrice: 129.97,
    status: 'delivered',
    date: new Date('2024-05-20'),
  },
];
