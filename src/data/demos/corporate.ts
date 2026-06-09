import { DemoProduct, DemoUser, DemoOrder } from '@/types';

export const CORPORATE_PRODUCTS: DemoProduct[] = [
  {
    id: 'corp-1',
    name: 'Cloud Platform',
    description: 'Scalable cloud infrastructure with 99.99% uptime SLA and global CDN',
    price: 299,
    category: 'infrastructure',
    rating: 4.9,
    reviews: 342,
    badge: 'Popular',
    metadata: {
      support: '24/7',
      deployment: 'Multi-region',
      scaling: 'Auto-scaling',
      specs: 'Up to 100TB storage, 10Gbps network, multi-region failover',
    },
  },
  {
    id: 'corp-2',
    name: 'API Gateway',
    description: 'Enterprise-grade API management with rate limiting and analytics',
    price: 199,
    category: 'integration',
    rating: 4.8,
    reviews: 218,
    metadata: {
      rateLimit: '100k req/min',
      auth: 'OAuth2, API Key',
      monitoring: 'Real-time',
      specs: '100k req/min, OAuth2, JWT, WebSocket support, real-time monitoring',
    },
  },
  {
    id: 'corp-3',
    name: 'Analytics Dashboard',
    description: 'Real-time analytics and business intelligence for enterprise data',
    price: 399,
    category: 'analytics',
    rating: 4.9,
    reviews: 287,
    badge: 'Featured',
    metadata: {
      dataPoints: '500M+',
      latency: '<100ms',
      retention: '5 years',
      specs: '500M+ data points, <100ms query latency, 5 year retention, custom dashboards',
    },
  },
  {
    id: 'corp-4',
    name: 'Security Suite',
    description: 'Comprehensive security with encryption, DLP, and threat detection',
    price: 599,
    category: 'security',
    rating: 5.0,
    reviews: 156,
    metadata: {
      encryption: 'AES-256',
      compliance: 'SOC2, HIPAA',
      scanning: '24/7',
      specs: 'AES-256 encryption, SOC2 & HIPAA compliant, 24/7 threat scanning',
    },
  },
  {
    id: 'corp-5',
    name: 'Workflow Automation',
    description: 'No-code automation platform with 1000+ integrations and templates',
    price: 249,
    category: 'automation',
    rating: 4.7,
    reviews: 423,
    metadata: {
      integrations: '1000+',
      templates: '500+',
      reliability: '99.95%',
      specs: '1000+ integrations, 500+ templates, 99.95% uptime, drag-and-drop builder',
    },
  },
];

export const CORPORATE_USERS: DemoUser[] = [
  {
    id: 'corp-user-1',
    name: 'Sarah Chen',
    email: 'sarah.chen@techcorp.com',
    avatar: '👩‍💼',
    createdAt: new Date('2024-01-15'),
    metadata: { role: 'CTO', company: 'TechCorp Inc' },
  },
  {
    id: 'corp-user-2',
    name: 'Michael Rodriguez',
    email: 'michael.r@innovate.io',
    avatar: '👨‍💼',
    createdAt: new Date('2024-02-20'),
    metadata: { role: 'DevOps Lead', company: 'Innovate Labs' },
  },
];

export const CORPORATE_ORDERS: DemoOrder[] = [
  {
    id: 'corp-order-001',
    userId: 'corp-user-1',
    products: [{ productId: 'corp-1', quantity: 1, price: 299 }],
    totalPrice: 299,
    status: 'delivered',
    date: new Date('2024-04-10'),
  },
  {
    id: 'corp-order-002',
    userId: 'corp-user-2',
    products: [
      { productId: 'corp-3', quantity: 1, price: 399 },
      { productId: 'corp-5', quantity: 1, price: 249 },
    ],
    totalPrice: 648,
    status: 'confirmed',
    date: new Date('2024-05-18'),
  },
];
