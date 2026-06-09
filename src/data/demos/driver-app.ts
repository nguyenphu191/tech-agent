import { DemoDriver, DemoRide } from '@/types';

export const DRIVER_DRIVERS: DemoDriver[] = [
  {
    id: 'driver-1',
    name: 'Marcus Johnson',
    email: 'marcus.j@driveconnect.com',
    avatar: '👨‍🦲',
    rating: 4.9,
    totalRides: 3847,
    earnings: 45230.50,
    status: 'available',
    vehicle: {
      make: 'Tesla',
      model: 'Model 3',
      plate: 'DRV-2024-01',
    },
  },
  {
    id: 'driver-2',
    name: 'Lisa Chen',
    email: 'lisa.c@driveconnect.com',
    avatar: '👩',
    rating: 4.85,
    totalRides: 2156,
    earnings: 28945.75,
    status: 'on-ride',
    vehicle: {
      make: 'Uber',
      model: 'Black',
      plate: 'DRV-2024-02',
    },
  },
];

export const DRIVER_RIDES: DemoRide[] = [
  {
    id: 'ride-1',
    driverId: 'driver-1',
    passengerId: 'passenger-1',
    pickupLocation: '123 Main St, Downtown',
    dropoffLocation: 'Airport Terminal 2',
    distance: 25.4,
    fare: 48.50,
    status: 'completed',
    rating: 5.0,
    createdAt: new Date('2024-05-15'),
  },
  {
    id: 'ride-2',
    driverId: 'driver-2',
    passengerId: 'passenger-2',
    pickupLocation: 'Hotel Grand',
    dropoffLocation: 'Convention Center',
    distance: 8.2,
    fare: 16.40,
    status: 'in-progress',
    createdAt: new Date('2024-05-18'),
  },
];
