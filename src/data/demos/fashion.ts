import { DemoProduct, DemoUser, DemoOrder } from '@/types';

export const FASHION_PRODUCTS: DemoProduct[] = [
  {
    id: 'fashion-1',
    name: 'Silk Evening Dress',
    description: 'Hand-crafted silk gown with delicate embroidery, perfect for special occasions',
    price: 1299,
    category: 'dresses',
    rating: 4.9,
    reviews: 89,
    badge: 'New',
    metadata: {
      material: '100% Silk',
      sizes: 'XS-XL',
      colors: ['Black', 'Navy', 'Burgundy'],
      emoji: '👗',
    },
  },
  {
    id: 'fashion-2',
    name: 'Leather Handbag',
    description: 'Italian leather handbag with gold-plated hardware and interior pockets',
    price: 1599,
    category: 'accessories',
    rating: 5.0,
    reviews: 156,
    badge: 'Featured',
    metadata: {
      material: 'Italian Leather',
      capacity: '15L',
      warranty: 'Lifetime',
      emoji: '👜',
    },
  },
  {
    id: 'fashion-3',
    name: 'Cashmere Coat',
    description: 'Premium cashmere coat with satin lining, ideal for winter elegance',
    price: 2499,
    category: 'outerwear',
    rating: 4.8,
    reviews: 67,
    metadata: {
      material: '100% Cashmere',
      lining: 'Silk',
      care: 'Hand wash',
      emoji: '🧥',
    },
  },
  {
    id: 'fashion-4',
    name: 'Diamond Necklace',
    description: 'Lab-grown diamond necklace with platinum setting, ethically sourced',
    price: 3999,
    category: 'jewelry',
    rating: 5.0,
    reviews: 43,
    badge: 'Luxury',
    metadata: {
      stone: 'Lab Diamond',
      carat: '2.5ct',
      setting: 'Platinum',
      emoji: '💎',
    },
  },
  {
    id: 'fashion-5',
    name: 'Designer Heels',
    description: 'Italian designer heels with memory foam insole for all-day comfort',
    price: 899,
    category: 'footwear',
    rating: 4.7,
    reviews: 124,
    metadata: {
      height: '4.5 inch',
      sizes: '34-42 EU',
      style: 'Stiletto',
      emoji: '👠',
    },
  },
];

export const FASHION_USERS: DemoUser[] = [
  {
    id: 'fashion-user-1',
    name: 'Emma Wilson',
    email: 'emma.w@luxeliving.com',
    avatar: '👩‍🦰',
    createdAt: new Date('2024-03-10'),
    metadata: { tier: 'VIP', preferences: ['dresses', 'jewelry'] },
  },
];

export const FASHION_ORDERS: DemoOrder[] = [
  {
    id: 'fashion-order-001',
    userId: 'fashion-user-1',
    products: [{ productId: 'fashion-2', quantity: 1, price: 1599 }],
    totalPrice: 1599,
    status: 'delivered',
    date: new Date('2024-04-15'),
  },
];
