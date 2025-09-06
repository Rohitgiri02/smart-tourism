import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers in react-leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Delete default icon to replace with custom
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom icon for user location
const createUserIcon = () => {
  return L.divIcon({
    className: 'custom-user-marker',
    html: `
      <div class="relative">
        <div class="w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-lg relative z-10"></div>
        <div class="absolute top-0 left-0 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
      </div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

// Custom icons for safety points
const createSafetyIcon = (type) => {
  const iconMap = {
    hospital: '🏥',
    police: '🚔',
    fire: '🚒',
    medical: '⚕️',
  };
  
  const colors = {
    hospital: '#16a34a',
    police: '#3b82f6',
    fire: '#ef4444',
    medical: '#9333ea',
  };
  
  const icon = iconMap[type] || '🏥';
  const color = colors[type] || '#6b7280';
  
  return L.divIcon({
    className: 'custom-safety-marker',
    html: `
      <div class="w-8 h-8 bg-white border-2 rounded-full shadow-lg flex items-center justify-center text-lg" style="border-color: ${color}">
        ${icon}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const MapComponent = ({ userLocation, safetyPoints, className = '' }) => {
  const mapRef = useRef(null);

  // Default center (New York City)
  const defaultCenter = [40.7128, -74.0060];
  const center = userLocation ? [userLocation.latitude, userLocation.longitude] : defaultCenter;

  return (
    <div className={`w-full h-full relative ${className}`}>
      <MapContainer
        center={center}
        zoom={15}
        className="w-full h-full z-0"
        ref={mapRef}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User location marker */}
        {userLocation && (
          <>
            <Marker
              position={[userLocation.latitude, userLocation.longitude]}
              icon={createUserIcon()}
            >
              <Popup>
                <div className="text-center p-2">
                  <strong className="block mb-1">Your Location</strong>
                  <span className="text-sm text-gray-600">
                    Accuracy: ±{Math.round(userLocation.accuracy)}m
                  </span>
                </div>
              </Popup>
            </Marker>
            
            {/* Accuracy circle */}
            <Circle
              center={[userLocation.latitude, userLocation.longitude]}
              radius={userLocation.accuracy}
              fillColor="#3b82f6"
              fillOpacity={0.1}
              color="#3b82f6"
              weight={1}
            />
          </>
        )}

        {/* Safety points markers */}
        {safetyPoints.map((point) => (
          <Marker
            key={point.id}
            position={[point.latitude, point.longitude]}
            icon={createSafetyIcon(point.type)}
          >
            <Popup>
              <div className="p-2 min-w-48">
                <h3 className="font-semibold text-gray-800 mb-1">{point.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{point.address}</p>
                <div className="flex gap-2">
                  <a 
                    href={`tel:${point.phone}`} 
                    className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                  >
                    Call
                  </a>
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${point.latitude},${point.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                  >
                    Navigate
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
