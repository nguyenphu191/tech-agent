import { DemoProduct, DemoUser, DemoOrder } from '@/types';

export const ORDERING_PRODUCTS: DemoProduct[] = [
  {
    id: 'order-1',
    name: 'Classic Burger',
    description: 'Juicy beef patty with fresh lettuce, tomato, pickles, and special sauce',
    price: 8.99,
    category: 'burgers',
    rating: 4.8,
    reviews: 342,
    badge: 'Popular',
    metadata: {
      prep: '10 mins',
      calories: '650',
      allergens: ['gluten', 'sesame'],
      emoji: '🍔',
    },
  },
  {
    id: 'order-2',
    name: 'Vegetarian Pizza',
    description: 'Wood-fired pizza with seasonal vegetables and organic cheese',
    price: 14.99,
    category: 'pizza',
    rating: 4.7,
    reviews: 287,
    metadata: {
      prep: '15 mins',
      size: '12"',
      vegan: true,
      emoji: '🍕',
    },
  },
  {
    id: 'order-3',
    name: 'Crispy Wings (8pc)',
    description: 'Lightly breaded chicken wings with your choice of sauce',
    price: 9.99,
    category: 'appetizers',
    rating: 4.9,
    reviews: 523,
    badge: 'Featured',
    metadata: {
      prep: '12 mins',
      sauces: ['Spicy', 'BBQ', 'Garlic Parmesan'],
      emoji: '🍗',
    },
  },
  {
    id: 'order-4',
    name: 'Caesar Salad',
    description: 'Crisp romaine with house-made Caesar dressing and croutons',
    price: 10.99,
    category: 'salads',
    rating: 4.6,
    reviews: 156,
    metadata: {
      prep: '5 mins',
      portions: ['Small', 'Large'],
      protein: ['Chicken', 'Shrimp'],
      emoji: '🥗',
    },
  },
  {
    id: 'order-5',
    name: 'Chocolate Brownie',
    description: 'Warm fudgy brownie served with vanilla ice cream',
    price: 5.99,
    category: 'desserts',
    rating: 4.9,
    reviews: 234,
    metadata: {
      prep: '2 mins',
      temp: 'Warm',
      allergens: ['nuts', 'dairy'],
      emoji: '🍫',
    },
  },
];

export const ORDERING_USERS: DemoUser[] = [
  {
    id: 'order-user-1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    avatar: '👨‍💼',
    createdAt: new Date('2024-04-05'),
    metadata: { orders: 15, loyalty: 'Gold' },
  },
];

export const ORDERING_ORDERS: DemoOrder[] = [
  {
    id: 'order-ord-001',
    userId: 'order-user-1',
    products: [
      { productId: 'order-1', quantity: 2, price: 8.99 },
      { productId: 'order-3', quantity: 1, price: 9.99 },
    ],
    totalPrice: 37.97,
    status: 'delivered',
    date: new Date('2024-05-10'),
  },
  {
    id: 'order-ord-002',
    userId: 'order-user-1',
    products: [{ productId: 'order-2', quantity: 1, price: 14.99 }],
    totalPrice: 14.99,
    status: 'confirmed',
    date: new Date('2024-05-18'),
  },
];
