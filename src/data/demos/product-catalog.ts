import { DemoProduct, DemoUser, DemoOrder } from '@/types';

export const CATALOG_PRODUCTS: DemoProduct[] = [
  {
    id: 'catalog-1',
    name: 'Wireless Headphones Pro',
    description: 'Premium noise-cancelling headphones with 40-hour battery life',
    price: 349.99,
    category: 'electronics',
    rating: 4.9,
    reviews: 1247,
    badge: 'Best Seller',
    metadata: {
      brand: 'SoundTech',
      color: ['Black', 'Silver', 'Gold'],
      warranty: '2 years',
      emoji: '🎧',
    },
  },
  {
    id: 'catalog-2',
    name: 'Ultra HD 4K Monitor',
    description: '32-inch 4K display with 120Hz refresh rate for professionals',
    price: 899.99,
    category: 'electronics',
    rating: 4.8,
    reviews: 654,
    metadata: {
      resolution: '4K',
      refreshRate: '120Hz',
      ports: 'USB-C, HDMI, DP',
      emoji: '🖥️',
    },
  },
  {
    id: 'catalog-3',
    name: 'Ergonomic Office Chair',
    description: 'Lumbar support office chair with breathable mesh and adjustable height',
    price: 299.99,
    category: 'furniture',
    rating: 4.7,
    reviews: 892,
    badge: 'Popular',
    metadata: {
      material: 'Mesh + Plastic',
      weight: 'Up to 300 lbs',
      warranty: '5 years',
      emoji: '🪑',
    },
  },
  {
    id: 'catalog-4',
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with hot-swappable switches and aluminum frame',
    price: 189.99,
    category: 'electronics',
    rating: 4.9,
    reviews: 734,
    metadata: {
      switches: 'Cherry MX',
      layout: 'Full Size',
      lighting: 'RGB',
      emoji: '⌨️',
    },
  },
  {
    id: 'catalog-5',
    name: 'Studio Desk Lamp',
    description: 'Dimmable LED lamp with adjustable color temperature for productivity',
    price: 79.99,
    category: 'lighting',
    rating: 4.6,
    reviews: 456,
    metadata: {
      power: '10W LED',
      colorTemp: '2700K-6500K',
      control: 'Touch + App',
      emoji: '💡',
    },
  },
  {
    id: 'catalog-6',
    name: 'Smart Scale',
    description: 'Precision digital scale with smart app integration and health tracking',
    price: 49.99,
    category: 'health',
    rating: 4.8,
    reviews: 2134,
    badge: 'New',
    metadata: {
      accuracy: '±100g',
      bluetooth: 'Yes',
      app: 'iOS & Android',
      emoji: '⚖️',
    },
  },
];

export const CATALOG_USERS: DemoUser[] = [
  {
    id: 'catalog-user-1',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    avatar: '👨‍🎨',
    createdAt: new Date('2024-05-01'),
    metadata: { tier: 'Premium', spent: '$2400' },
  },
];

export const CATALOG_ORDERS: DemoOrder[] = [
  {
    id: 'catalog-order-001',
    userId: 'catalog-user-1',
    products: [
      { productId: 'catalog-1', quantity: 1, price: 349.99 },
      { productId: 'catalog-4', quantity: 1, price: 189.99 },
    ],
    totalPrice: 539.98,
    status: 'delivered',
    date: new Date('2024-06-01'),
  },
];
