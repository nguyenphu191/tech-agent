'use client';

import React, { useState } from 'react';
import { DRIVER_DRIVERS, DRIVER_RIDES } from '@/data/demos';
import { Star, MapPin, DollarSign, TrendingUp, Users } from 'lucide-react';

export function DemoDriverApp() {
  const [selectedDriver, setSelectedDriver] = useState(DRIVER_DRIVERS[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <h3 className="text-lg font-bold text-foreground mb-6">Active Drivers</h3>
        <div className="space-y-4">
          {DRIVER_DRIVERS.map((driver) => (
            <button key={driver.id} onClick={() => setSelectedDriver(driver)} className={`w-full text-left p-4 rounded-lg border transition-all ${selectedDriver.id === driver.id ? 'bg-destructive/20 border-destructive/50' : 'bg-card border-border hover:border-muted-foreground/30'}`}>
              <div className="flex items-start justify-between mb-2">
                <p className="font-semibold text-foreground">{driver.name}</p>
                <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${driver.status === 'available' ? 'bg-success/20 text-success' : driver.status === 'on-ride' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>{driver.status}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />{driver.rating} ({driver.totalRides} rides)
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="bg-card border border-border rounded-xl p-8">
          <div className="flex items-start justify-between mb-8 pb-8 border-b border-border">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{selectedDriver.name}</h2>
              <p className="text-muted-foreground">{selectedDriver.email}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-2xl font-bold text-foreground">{selectedDriver.rating}</span>
              </div>
              <p className="text-muted-foreground">{selectedDriver.totalRides} completed rides</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-success/20 to-success/30 rounded-lg p-6 border border-success/20">
              <div className="flex items-center gap-3 mb-2"><DollarSign className="w-5 h-5 text-success" /><p className="text-muted-foreground text-sm">Total Earnings</p></div>
              <p className="text-2xl font-bold text-success">${selectedDriver.earnings.toFixed(2)}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-2"><Users className="w-5 h-5 text-blue-400" /><p className="text-muted-foreground text-sm">Rides</p></div>
              <p className="text-2xl font-bold text-blue-400">{selectedDriver.totalRides}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-6 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-2"><TrendingUp className="w-5 h-5 text-purple-400" /><p className="text-muted-foreground text-sm">Avg Rating</p></div>
              <p className="text-2xl font-bold text-purple-400">{selectedDriver.rating.toFixed(1)}/5</p>
            </div>
          </div>

          {selectedDriver.vehicle && (
            <div className="bg-muted/30 rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Vehicle Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-muted-foreground">Make & Model:</span><span className="text-foreground font-medium">{selectedDriver.vehicle.make} {selectedDriver.vehicle.model}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">License Plate:</span><span className="text-foreground font-medium">{selectedDriver.vehicle.plate}</span></div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Rides</h3>
            <div className="space-y-4">
              {DRIVER_RIDES.filter((ride) => ride.driverId === selectedDriver.id).slice(0, 3).map((ride) => (
                <div key={ride.id} className="bg-muted/30 rounded-lg p-4 border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-foreground font-medium">{ride.pickupLocation}</p>
                      <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1"><MapPin className="w-4 h-4" />{ride.dropoffLocation}</p>
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${ride.status === 'completed' ? 'bg-success/20 text-success' : ride.status === 'in-progress' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>{ride.status}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{ride.distance.toFixed(1)} km</span>
                    <span className="text-lg font-bold text-foreground">${ride.fare.toFixed(2)}</span>
                    {ride.rating && <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /><span className="text-foreground font-medium">{ride.rating}</span></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
