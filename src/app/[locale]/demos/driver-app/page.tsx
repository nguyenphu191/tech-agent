'use client';

import React, { useState } from 'react';
import { DemoLayout } from '@/components/demos/demo-layout';
import { DRIVER_DRIVERS, DRIVER_RIDES, getDemoBySlug } from '@/data/demos';
import { Star, MapPin, DollarSign, TrendingUp, Users } from 'lucide-react';

export default function DriverAppDemo() {
  const demo = getDemoBySlug('driver-app');
  const [selectedDriver, setSelectedDriver] = useState(DRIVER_DRIVERS[0]);

  if (!demo) return null;

  return (
    <DemoLayout
      title={demo.title}
      description={demo.description}
      gradient={demo.gradient}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Driver List */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-bold text-white mb-6">Active Drivers</h3>
          <div className="space-y-4">
            {DRIVER_DRIVERS.map((driver) => (
              <button
                key={driver.id}
                onClick={() => setSelectedDriver(driver)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedDriver.id === driver.id
                    ? 'bg-red-500/20 border-red-500/50'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-white">{driver.name}</p>
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                      driver.status === 'available'
                        ? 'bg-green-500/20 text-green-400'
                        : driver.status === 'on-ride'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {driver.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {driver.rating} ({driver.totalRides} rides)
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Driver Details */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            {/* Driver Header */}
            <div className="flex items-start justify-between mb-8 pb-8 border-b border-white/10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{selectedDriver.name}</h2>
                <p className="text-white/60">{selectedDriver.email}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold text-white">{selectedDriver.rating}</span>
                </div>
                <p className="text-white/60">{selectedDriver.totalRides} completed rides</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-lg p-6 border border-emerald-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <p className="text-white/60 text-sm">Total Earnings</p>
                </div>
                <p className="text-2xl font-bold text-emerald-400">${selectedDriver.earnings.toFixed(2)}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-6 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <p className="text-white/60 text-sm">Rides</p>
                </div>
                <p className="text-2xl font-bold text-blue-400">{selectedDriver.totalRides}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-6 border border-purple-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <p className="text-white/60 text-sm">Avg Rating</p>
                </div>
                <p className="text-2xl font-bold text-purple-400">{selectedDriver.rating.toFixed(1)}/5</p>
              </div>
            </div>

            {/* Vehicle Info */}
            {selectedDriver.vehicle && (
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Vehicle Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/60">Make & Model:</span>
                    <span className="text-white font-medium">
                      {selectedDriver.vehicle.make} {selectedDriver.vehicle.model}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">License Plate:</span>
                    <span className="text-white font-medium">{selectedDriver.vehicle.plate}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Rides */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Rides</h3>
              <div className="space-y-4">
                {DRIVER_RIDES.filter((ride) => ride.driverId === selectedDriver.id)
                  .slice(0, 3)
                  .map((ride) => (
                    <div key={ride.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-white font-medium">{ride.pickupLocation}</p>
                          <p className="text-white/60 text-sm flex items-center gap-2 mt-1">
                            <MapPin className="w-4 h-4" />
                            {ride.dropoffLocation}
                          </p>
                        </div>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            ride.status === 'completed'
                              ? 'bg-green-500/20 text-green-400'
                              : ride.status === 'in-progress'
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          {ride.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/60">{ride.distance.toFixed(1)} km</span>
                        <span className="text-lg font-bold text-white">${ride.fare.toFixed(2)}</span>
                        {ride.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-white font-medium">{ride.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DemoLayout>
  );
}
