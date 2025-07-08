import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, MapPin, QrCode, Navigation, Layers, Filter, Star, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FilterSystem, { Filter as FilterType } from './FilterSystem';
import LocationCard, { LocationData } from './LocationCard';
import ThemeToggle from './ThemeToggle';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Enhanced marker icons with categories
const createCategoryIcon = (category: string, color: string) => {
  const icons = {
    bins: '🗑️',
    toilets: '🚻',
    feeding: '🐕',
    food: '🍽️',
    rest: '🪑',
    streetlights: '💡'
  };
  
  return L.divIcon({
    html: `
      <div style="
        background: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
      ">
        ${icons[category as keyof typeof icons] || '📍'}
      </div>
    `,
    className: 'custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const EnhancedMapInterface = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [mapStyle, setMapStyle] = useState('default');

  // Enhanced filter categories
  const filters: FilterType[] = [
    { id: 'bins', label: 'Waste Bins', icon: '🗑️', active: false, color: '#10B981' },
    { id: 'toilets', label: 'Restrooms', icon: '🚻', active: false, color: '#3B82F6' },
    { id: 'feeding', label: 'Pet Areas', icon: '🐕', active: false, color: '#F59E0B' },
    { id: 'food', label: 'Dining', icon: '🍽️', active: false, color: '#EF4444' },
  ];

  // Enhanced sample locations with rich data
  const sampleLocations: LocationData[] = [
    {
      id: '1',
      name: 'Central Park Waste Station',
      type: 'Waste Bin',
      distance: '0.2 km',
      rating: 4.5,
      status: 'working',
      operatingHours: '24/7',
      description: 'Large capacity waste bin with recycling compartments. Recently serviced and well-maintained.',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: '2',
      name: 'Metro Plaza Restroom',
      type: 'Restroom',
      distance: '0.5 km',
      rating: 4.2,
      status: 'working',
      operatingHours: '6 AM - 10 PM',
      description: 'Clean, accessible public restroom with baby changing facilities and wheelchair access.',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: '3',
      name: 'Urban Eats Food Court',
      type: 'Dining',
      distance: '0.3 km',
      rating: 4.7,
      status: 'working',
      operatingHours: '7 AM - 11 PM',
      description: 'Popular food court with diverse dining options, outdoor seating, and high hygiene standards.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: '4',
      name: 'Riverside Dog Park',
      type: 'Pet Area',
      distance: '0.8 km',
      rating: 4.3,
      status: 'working',
      operatingHours: '5 AM - 9 PM',
      description: 'Spacious off-leash dog park with water stations, waste bags, and separate areas for small and large dogs.',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop&crop=center'
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
          setUserLocation([12.9716, 77.5946]); // Default to Bangalore
        }
      );
    } else {
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
    // TODO: Implement QR scanner
    alert('QR Scanner will open camera to scan location codes');
  };

  const MapController = () => {
    const map = useMap();
    
    useEffect(() => {
      if (userLocation) {
        map.setView(userLocation, 15);
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
          <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h3 className="headline-medium mb-2">Loading Your Map</h3>
          <p className="text-muted-foreground">Getting your location for the best experience...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background relative overflow-hidden">
      {/* Enhanced Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-[1000]">
        <div className="nav-blur">
          <div className="flex items-center justify-between p-4">
            {/* Logo and Title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Urban Maps</h1>
                <p className="text-xs text-muted-foreground">Smart City Navigation</p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleQRScan}
                className="glass-card w-11 h-11 p-0"
              >
                <QrCode className="w-5 h-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className="glass-card w-11 h-11 p-0"
              >
                <Filter className="w-5 h-5" />
              </Button>
              
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 pt-2"
        >
          <div className="glass-intense rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search places, addresses, or landmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-base placeholder:text-muted-foreground"
              />
              <Button size="sm" className="btn-primary">
                Search
              </Button>
            </div>

            {/* Filter System */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FilterSystem
                    filters={filters}
                    activeFilters={activeFilters}
                    onToggleFilter={handleToggleFilter}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Map Container */}
      <MapContainer
        {...({center: userLocation, zoom: 15} as any)}
        style={{ height: '100vh', minHeight: '400px', width: '100%' }}
        zoomControl={false}
        className="rounded-none"
      >
        <MapController />
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location Marker */}
        <Marker position={userLocation}>
          <Popup>
            <div className="text-center p-2">
              <strong className="text-primary">Your Location</strong>
              <p className="text-sm text-muted-foreground mt-1">
                Current position
              </p>
            </div>
          </Popup>
        </Marker>

        {/* Enhanced Location Markers */}
        {sampleLocations.map((location, index) => {
          const offset = 0.01;
          const position: [number, number] = [
            userLocation[0] + (Math.random() - 0.5) * offset,
            userLocation[1] + (Math.random() - 0.5) * offset
          ];

          const categoryMap: { [key: string]: string } = {
            'Waste Bin': 'bins',
            'Restroom': 'toilets', 
            'Dining': 'food',
            'Pet Area': 'feeding'
          };
          
          const category = categoryMap[location.type] || 'bins';
          const filter = filters.find(f => f.id === category);
          
          // Only show if filter is active or no filters are active
          if (activeFilters.length > 0 && !activeFilters.includes(category)) {
            return null;
          }

          return (
            <Marker
              key={location.id}
              position={position}
              eventHandlers={{
                click: () => setSelectedLocation(location)
              }}
            >
              <Popup>
                <div className="p-3 min-w-[200px]">
                  <h3 className="font-semibold text-base mb-2">{location.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-muted-foreground">{location.type}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{location.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{location.description}</p>
                  <Button 
                    size="sm" 
                    onClick={() => setSelectedLocation(location)}
                    className="w-full"
                  >
                    View Details
                  </Button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Enhanced Location Details Panel */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className="absolute bottom-0 left-0 right-0 z-[1000] max-h-[60vh] overflow-auto"
          >
            <div className="p-6 pb-8">
              <div className="location-card">
                <div className="flex items-start gap-4 mb-4">
                  {selectedLocation.image && (
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                      <img 
                        src={selectedLocation.image}
                        alt={selectedLocation.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h2 className="headline-medium mb-2">{selectedLocation.name}</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="font-medium">{selectedLocation.type}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{selectedLocation.rating}</span>
                      </div>
                      <span>{selectedLocation.distance}</span>
                    </div>
                    
                    {selectedLocation.operatingHours && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedLocation.operatingHours}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6">{selectedLocation.description}</p>
                
                <div className="flex gap-3">
                  <Button className="flex-1">
                    <Navigation className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedLocation(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-6 right-6 z-[1000] flex flex-col gap-3">
        <Button
          size="icon"
          className="glass-card w-14 h-14 rounded-full shadow-2xl"
          onClick={() => {
            if (userLocation) {
              window.location.reload(); // Re-center on user
            }
          }}
        >
          <Navigation className="w-6 h-6" />
        </Button>
        
        <Button
          size="icon"
          variant="outline"
          className="glass-card w-12 h-12 rounded-full"
          onClick={() => {
            const styles = ['default', 'satellite', 'terrain'];
            const currentIndex = styles.indexOf(mapStyle);
            const nextStyle = styles[(currentIndex + 1) % styles.length];
            setMapStyle(nextStyle);
          }}
        >
          <Layers className="w-5 h-5" />
        </Button>
      </div>

      {/* Active Filters Indicator */}
      {activeFilters.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-6 left-6 z-[1000]"
        >
          <div className="glass-card px-4 py-2 rounded-full">
            <span className="text-sm font-medium">
              {activeFilters.length} filter{activeFilters.length > 1 ? 's' : ''} active
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EnhancedMapInterface;