import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Search, MapPin, QrCode, User } from 'lucide-react';

const MapInterface = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');

  const filters = [
    { id: 'bins', label: 'Bins', icon: '🗑️', active: false },
    { id: 'toilets', label: 'Toilets', icon: '🚻', active: false },
    { id: 'feeding', label: 'Feeding Spots', icon: '🐕', active: false },
    { id: 'food', label: 'Food Stalls', icon: '🍜', active: false },
    { id: 'rest', label: 'Rest Areas', icon: '💺', active: false },
  ];

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [77.2090, 28.6139], // Delhi, India
      zoom: 12,
      pitch: 0,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'bottom-right'
    );

    // Get user location
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      'bottom-right'
    );

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  if (!mapboxToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Urban Companion</h1>
            <p className="text-white/80 mb-6">Your civic engagement platform for navigating and improving urban spaces</p>
          </div>
          
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">Enter Mapbox Token</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get your free token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
            </p>
            <input
              type="text"
              placeholder="pk.eyJ1..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={() => mapboxToken && console.log('Token set')}
              disabled={!mapboxToken}
              className="w-full mt-4 btn-primary disabled:opacity-50 disabled:transform-none"
            >
              Launch App
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">
      {/* Map Container */}
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Top UI Layer */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Urban Companion</h1>
              <p className="text-xs text-muted-foreground">Civic engagement platform</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="btn-ghost p-3 rounded-2xl">
              <QrCode className="w-5 h-5" />
            </button>
            <button className="btn-ghost p-3 rounded-2xl">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="flex items-center p-4">
              <Search className="w-5 h-5 text-muted-foreground mr-3" />
              <input
                type="text"
                placeholder="Search for places, addresses..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              className={`filter-pill ${activeFilters.includes(filter.id) ? 'active' : ''} shrink-0`}
            >
              <span className="text-lg">{filter.icon}</span>
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-6 right-6 z-10">
        <button className="btn-primary w-14 h-14 rounded-full flex items-center justify-center shadow-glow">
          <MapPin className="w-6 h-6" />
        </button>
      </div>

      {/* Status Indicator */}
      {activeFilters.length > 0 && (
        <div className="absolute bottom-6 left-6 z-10">
          <div className="glass-card px-4 py-2 rounded-full">
            <span className="text-sm font-medium">
              {activeFilters.length} filter{activeFilters.length > 1 ? 's' : ''} active
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapInterface;