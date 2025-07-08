import React from 'react';
import { Star, MapPin, Clock, Info } from 'lucide-react';

export interface LocationData {
  id: string;
  name: string;
  type: string;
  distance: string;
  rating: number;
  status: 'working' | 'not-working' | 'unknown';
  image?: string;
  operatingHours?: string;
  description?: string;
}

interface LocationCardProps {
  location: LocationData;
  onExpand: (location: LocationData) => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onExpand }) => {
  const statusColors = {
    working: 'text-emerald-500',
    'not-working': 'text-red-500',
    unknown: 'text-slate-500',
  };

  return (
    <div 
      className="location-card cursor-pointer"
      onClick={() => onExpand(location)}
    >
      <div className="flex items-start gap-4">
        {location.image && (
          <div className="w-16 h-16 rounded-xl bg-muted overflow-hidden shrink-0">
            <img 
              src={location.image} 
              alt={location.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-foreground truncate">{location.name}</h3>
              <p className="text-sm text-muted-foreground">{location.type}</p>
            </div>
            
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{location.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{location.distance}</span>
            </div>
            
            {location.operatingHours && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{location.operatingHours}</span>
              </div>
            )}
            
            <div className={`flex items-center gap-1 ${statusColors[location.status]}`}>
              <div className="w-2 h-2 rounded-full bg-current" />
              <span className="capitalize">{location.status.replace('-', ' ')}</span>
            </div>
          </div>
          
          {location.description && (
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
              {location.description}
            </p>
          )}
        </div>
        
        <Info className="w-4 h-4 text-muted-foreground shrink-0" />
      </div>
    </div>
  );
};

export default LocationCard;