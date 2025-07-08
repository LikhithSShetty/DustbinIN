import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, QrCode, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FilterSystem, { Filter as FilterType } from './FilterSystem';
import LocationCard, { LocationData } from './LocationCard';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color: string) => {
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
    className: 'custom-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const LeafletMap = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const filters: FilterType[] = [
    { id: 'bins', label: 'Bins', icon: '🗑️', active: false, color: '#10B981' },
    { id: 'toilets', label: 'Toilets', icon: '🚻', active: false, color: '#3B82F6' },
    { id: 'feeding', label: 'Feeding Spots', icon: '🐕', active: false, color: '#F59E0B' },
    { id: 'food', label: 'Food Stalls', icon: '🍽️', active: false, color: '#EF4444' },
    { id: 'rest', label: 'Rest Areas', icon: '🪑', active: false, color: '#8B5CF6' },
    { id: 'streetlights', label: 'Streetlights', icon: '💡', active: false, color: '#06B6D4' },
  ];

  // Sample location data
  const sampleLocations: LocationData[] = [
    {
      id: '1',
      name: 'Public Bin - MG Road',
      type: 'Bin',
      distance: '0.2 km',
      rating: 4.2,
      status: 'working',
      operatingHours: '24/7',
      description: 'Large waste bin with recycling options'
    },
    {
      id: '2',
      name: 'Public Toilet - Central Park',
      type: 'Toilet',
      distance: '0.5 km',
      rating: 3.8,
      status: 'working',
      operatingHours: '6 AM - 10 PM',
      description: 'Clean public toilet with proper facilities'
    },
    {
      id: '3',
      name: 'Street Food Corner',
      type: 'Food Stall',
      distance: '0.3 km',
      rating: 4.5,
      status: 'working',
      operatingHours: '7 AM - 11 PM',
      description: 'Popular local food stall with hygiene standards'
    }
  ];

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Bangalore coordinates
          setUserLocation([12.9716, 77.5946]);
        }
      );
    } else {
      // Default to Bangalore coordinates
      setUserLocation([12.9716, 77.5946]);
    }
  }, []);

  const handleToggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleQRScan = () => {
    // Simulate QR code scanning
    alert('QR Scanner feature would open camera here');
  };

  const MapController = () => {
    const map = useMap();
    
    useEffect(() => {
      if (userLocation) {
        map.setView(userLocation, 13);
      }
    }, [userLocation, map]);

    return null;
  };

  if (!userLocation) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading map...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background pt-16 relative">
      {/* Search and Controls Overlay */}
      <div className="absolute top-20 left-4 right-4 z-[1000]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-4 rounded-2xl mb-4"
        >
          {/* Search Bar */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search locations, addresses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/90 backdrop-blur-sm"
              />
            </div>
            
            <Button
              onClick={handleQRScan}
              size="icon"
              className="bg-primary/90 hover:bg-primary text-primary-foreground"
            >
              <QrCode className="w-5 h-5" />
            </Button>
          </div>

          {/* Filter System */}
          <FilterSystem
            filters={filters}
            activeFilters={activeFilters}
            onToggleFilter={handleToggleFilter}
          />
        </motion.div>
      </div>

      {/* Map Container */}
      <MapContainer
        {...({center: userLocation, zoom: 13} as any)}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <MapController />
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location Marker */}
        <Marker
          position={userLocation}
        >
          <Popup>
            <div className="text-center">
              <strong>Your Location</strong>
            </div>
          </Popup>
        </Marker>

        {/* Sample Location Markers */}
        {sampleLocations.map((location, index) => {
          const offset = 0.01;
          const position: [number, number] = [
            userLocation[0] + (Math.random() - 0.5) * offset,
            userLocation[1] + (Math.random() - 0.5) * offset
          ];

          return (
            <Marker
              key={location.id}
              position={position}
              eventHandlers={{
                click: () => setSelectedLocation(location)
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{location.name}</h3>
                  <p className="text-sm text-gray-600">{location.type}</p>
                  <p className="text-sm">Rating: {location.rating}⭐</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Location Details Card */}
      {selectedLocation && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute bottom-0 left-0 right-0 z-[1000] max-h-96 overflow-auto"
        >
          <div className="p-4">
            <LocationCard
              location={selectedLocation}
              onExpand={() => {
                // Handle card expansion
                console.log('Expand location:', selectedLocation);
              }}
            />
            
            <Button
              onClick={() => setSelectedLocation(null)}
              variant="outline"
              size="sm"
              className="mt-2 w-full"
            >
              Close
            </Button>
          </div>
        </motion.div>
      )}

      {/* Map Controls */}
      <div className="absolute bottom-20 right-4 z-[1000] space-y-2">
        <Button
          size="icon"
          variant="outline"
          className="glass-card"
          onClick={() => {
            // Zoom to user location
            window.location.reload();
          }}
        >
          📍
        </Button>
      </div>
    </div>
  );
};

export default LeafletMap;