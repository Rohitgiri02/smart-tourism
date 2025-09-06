import React, { useState, useEffect } from 'react';
import { MapPin, Shield, Phone, Navigation, AlertTriangle, CheckCircle, Menu, X, Hospital } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Import custom hooks and utilities
import { useGeolocation } from '../hooks/useGeolocation';
import { safetyPointsData, calculateDistance, formatDistance, checkSafeZone } from '../utils/locationUtils';
import { getEmergencyConfig } from '../utils/emergencyConfig';

const TourismSafetyApp = () => {
  const { location: userLocation, error, loading } = useGeolocation();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [safetyPoints, setSafetyPoints] = useState([]);
  const [safeZoneStatus, setSafeZoneStatus] = useState({ inSafeZone: false, zoneName: null });
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Update safety points with distances and check safe zones
  useEffect(() => {
    if (userLocation) {
      const pointsWithDistance = safetyPointsData.map(point => ({
        ...point,
        distance: formatDistance(
          calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            point.latitude,
            point.longitude
          )
        ),
        lat: point.latitude,
        lng: point.longitude,
      })).sort((a, b) => {
        const distA = calculateDistance(userLocation.latitude, userLocation.longitude, a.latitude, a.longitude);
        const distB = calculateDistance(userLocation.latitude, userLocation.longitude, b.latitude, b.longitude);
        return distA - distB;
      });

      setSafetyPoints(pointsWithDistance);

      // Check safe zone status
      const zoneStatus = checkSafeZone(userLocation.latitude, userLocation.longitude);
      setSafeZoneStatus(zoneStatus);
    } else {
      setSafetyPoints(safetyPointsData.map(point => ({ ...point, distance: 'Unknown', lat: point.latitude, lng: point.longitude })));
    }
  }, [userLocation]);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const emergencyConfig = getEmergencyConfig();

  const handleEmergencyCall = () => {
    if (confirm('Call emergency services?')) {
      window.location.href = `tel:${emergencyConfig.emergencyNumber}`;
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      hospital: '🏥',
      police: '🚔',
      fire: '🚒',
      medical: '⚕️'
    };
    return icons[type] || '📍';
  };

  const getIconForType = (type) => {
    const icons = {
      hospital: Hospital,
      police: Shield,
      fire: AlertTriangle,
      medical: Hospital,
    };
    return icons[type] || Hospital;
  };

  const getTypeColor = (type) => {
    const colors = {
      hospital: 'bg-green-500',
      police: 'bg-blue-500',
      fire: 'bg-red-500',
      medical: 'bg-purple-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  const getColorForType = (type) => {
    const colors = {
      hospital: { 
        bg: 'bg-emerald-50', 
        text: 'text-emerald-600',
        border: 'border-emerald-200',
        accent: 'bg-emerald-500'
      },
      police: { 
        bg: 'bg-blue-50', 
        text: 'text-blue-600',
        border: 'border-blue-200',
        accent: 'bg-blue-500'
      },
      fire: { 
        bg: 'bg-red-50', 
        text: 'text-red-600',
        border: 'border-red-200',
        accent: 'bg-red-500'
      },
      medical: { 
        bg: 'bg-purple-50', 
        text: 'text-purple-600',
        border: 'border-purple-200',
        accent: 'bg-purple-500'
      },
    };
    return colors[type] || { 
      bg: 'bg-gray-50', 
      text: 'text-gray-600',
      border: 'border-gray-200',
      accent: 'bg-gray-500'
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-blue-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Smart Tourism Safety</h2>
          <p className="text-gray-600">Getting your location...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-red-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Location Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Offline Warning */}
      {!isOnline && (
        <div className="bg-red-500 text-white text-center py-2 px-4">
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle size={16} />
            <span className="text-sm font-medium">You're offline. Some features may not work.</span>
          </div>
        </div>
      )}

      {/* Mobile Layout */}
      {isMobile ? (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-2">
          <div className="w-full max-w-sm h-screen max-h-screen bg-white overflow-hidden rounded-3xl shadow-2xl relative flex flex-col border border-white/10">
            
            {/* Map and Header Section */}
            <div className="relative h-2/5 flex-shrink-0">
              {/* Map Container */}
              {userLocation && (
                <div className="absolute inset-0 w-full h-full">
                  <MapContainer
                    center={[userLocation.latitude, userLocation.longitude]}
                    zoom={15}
                    className="w-full h-full rounded-t-3xl"
                    zoomControl={false}
                    attributionControl={false}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    {/* User Location */}
                    <Marker position={[userLocation.latitude, userLocation.longitude]}>
                      <Popup>Your Location</Popup>
                    </Marker>

                    {/* Safety Points */}
                    {safetyPoints.map(point => (
                      <Marker key={point.id} position={[point.latitude, point.longitude]}>
                        <Popup>
                          <div className="text-center">
                            <h3 className="font-semibold">{point.name}</h3>
                            <p className="text-sm text-gray-600 capitalize">{point.type}</p>
                            <button
                              onClick={() => window.location.href = `tel:${point.phone}`}
                              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm"
                            >
                              Call
                            </button>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              )}
              
              {/* Safe zone overlay with animated gradient */}
              {safeZoneStatus.inSafeZone && (
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-green-400/20 to-teal-400/30 rounded-t-3xl animate-pulse-slow"></div>
              )}

              {/* Status Bar */}
              <div className="absolute top-0 left-0 right-0 px-6 py-3 flex justify-between items-center text-white z-10 bg-gradient-to-b from-black/30 to-transparent">
                <span className="font-bold text-lg tracking-wide drop-shadow-lg">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <div className="flex items-center space-x-3">
                  {isOnline ? (
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-4 bg-white rounded-full drop-shadow-lg"></div>
                      <div className="w-1 h-4 bg-white rounded-full drop-shadow-lg"></div>
                      <div className="w-1 h-4 bg-white rounded-full drop-shadow-lg"></div>
                      <div className="w-1 h-3 bg-white/60 rounded-full drop-shadow-lg"></div>
                    </div>
                  ) : (
                    <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse drop-shadow-lg"></div>
                  )}
                  <div className="w-7 h-4 border-2 border-white rounded-md drop-shadow-lg">
                    <div className="w-full h-full bg-white rounded-sm"></div>
                  </div>
                </div>
              </div>
              
              {/* Header Controls */}
              <div className="absolute top-14 left-0 right-0 px-4 flex justify-between items-center z-10">
                <button 
                  className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg hover:bg-white transition-all duration-300 hover:scale-105 border border-white/20"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Menu className="text-gray-700" size={18} />
                </button>
                <button className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg hover:bg-white transition-all duration-300 hover:scale-105 border border-white/20">
                  <MapPin className="text-gray-700" size={18} />
                </button>
              </div>

              {/* User Location Dot */}
              {userLocation && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-5 h-5 bg-blue-500 rounded-full border-3 border-white shadow-xl"></div>
                  <div className="absolute inset-0 -m-3 bg-blue-400/50 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 -m-6 bg-blue-300/30 rounded-full animate-ping animation-delay-1000"></div>
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="flex-grow bg-gradient-to-b from-gray-50 to-white rounded-t-3xl -mt-6 px-5 pt-8 pb-20 space-y-5 relative overflow-y-auto">
              
              {/* Geo-Fencing Alert */}
              {safeZoneStatus.inSafeZone ? (
                <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white p-4 rounded-2xl flex items-center space-x-4 shadow-lg border border-emerald-200/20">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <CheckCircle className="text-white" size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-base">Safe Zone Active</p>
                    <p className="text-xs text-emerald-100 mt-1">Protected area: {safeZoneStatus.zoneName}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white p-4 rounded-2xl flex items-center space-x-4 shadow-lg border border-amber-200/20">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <AlertTriangle className="text-white" size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-base">Caution Zone</p>
                    <p className="text-xs text-amber-100 mt-1">Not in a monitored area</p>
                  </div>
                </div>
              )}

              {/* Nearby Safety Points Section */}
              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-white/20 backdrop-saturate-150">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="font-black text-gray-900 text-xl tracking-tight">Safety Points</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-sm text-gray-600 font-medium">{safetyPoints.length} locations nearby</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <MapPin className="text-white" size={20} />
                  </div>
                </div>
                
                <div className="space-y-4">
                  {safetyPoints.slice(0, 3).map((point, index) => {
                    const IconComponent = getIconForType(point.type);
                    const colors = getColorForType(point.type);
                    
                    return (
                      <div 
                        key={point.id} 
                        className="group relative overflow-hidden"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {/* Background gradient that animates on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105"></div>
                        
                        <div className="relative flex items-center space-x-4 p-5 bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-100/50 hover:border-white/80 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 transform hover:-translate-y-1">
                          {/* Icon with animated background */}
                          <div className="relative">
                            <div className={`p-4 rounded-2xl ${colors.bg} flex-shrink-0 shadow-sm border border-white/50 relative overflow-hidden group-hover:scale-110 transition-transform duration-300`}>
                              <IconComponent className={`${colors.text} relative z-10`} size={24} />
                              {/* Animated background circle */}
                              <div className={`absolute inset-0 ${colors.accent} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300`}></div>
                            </div>
                            {/* Pulsing dot indicator */}
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                          </div>
                          
                          <div className="flex-grow min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="min-w-0 flex-grow">
                                <h3 className="font-bold text-gray-900 text-base truncate group-hover:text-blue-700 transition-colors duration-300">
                                  {point.name}
                                </h3>
                                <p className="text-sm text-gray-500 truncate mt-1 group-hover:text-gray-600 transition-colors duration-300">
                                  {point.address}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-lg border border-blue-100">
                                    <Navigation size={12} className="text-blue-600" />
                                    <span className="text-xs text-blue-700 font-semibold">{point.distance}</span>
                                  </div>
                                  <div className={`px-2 py-1 ${colors.bg} rounded-lg border ${colors.border}`}>
                                    <span className={`text-xs ${colors.text} font-semibold capitalize`}>{point.type}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2 flex-shrink-0">
                            <button
                              onClick={() => window.location.href = `tel:${point.phone}`}
                              className="group/btn p-3 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl transition-all duration-300 hover:scale-110 shadow-sm border border-green-100 hover:border-green-200 hover:shadow-lg hover:shadow-green-200/50"
                            >
                              <Phone className="text-green-600 group-hover/btn:text-green-700 transition-colors duration-300" size={16} />
                            </button>
                            <button
                              onClick={() => {
                                const url = `https://www.google.com/maps/dir/?api=1&destination=${point.latitude},${point.longitude}`;
                                window.open(url, '_blank');
                              }}
                              className="group/btn p-3 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all duration-300 hover:scale-110 shadow-sm border border-blue-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-200/50"
                            >
                              <Navigation className="text-blue-600 group-hover/btn:text-blue-700 transition-colors duration-300" size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {safetyPoints.length > 3 && (
                  <div className="mt-6">
                    <button 
                      onClick={() => setSidebarOpen(true)}
                      className="w-full group relative overflow-hidden py-4 px-6 text-center font-bold text-base bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-1"
                    >
                      <span className="relative z-10">View All {safetyPoints.length} Safety Points</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <Navigation size={18} />
                      </div>
                    </button>
                  </div>
                )}
              </div>
              
            </div>
            
            {/* Fixed SOS Button Container */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/95 to-transparent p-5 z-20">
              <div className="flex justify-center">
                <button 
                  onClick={handleEmergencyCall}
                  className="w-24 h-24 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-2xl shadow-red-500/50 transform active:scale-95 transition-all duration-300 hover:shadow-red-500/70 border-4 border-white relative overflow-hidden group"
                >
                  <span className="relative z-10">SOS</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-30"></div>
                </button>
              </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30 rounded-3xl">
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl rounded-t-3xl max-h-[75%] overflow-hidden shadow-2xl border-t border-white/20">
                  <div className="p-6 border-b border-gray-100/50 bg-gradient-to-r from-white via-blue-50/30 to-indigo-50/30">
                    {/* Drag handle */}
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">All Safety Points</h2>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <p className="text-sm text-gray-600 font-medium">{safetyPoints.length} locations nearby</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-3 rounded-2xl hover:bg-gray-100/80 transition-all duration-300 hover:scale-110 group"
                      >
                        <X size={24} className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-5 space-y-4 overflow-y-auto max-h-96">
                    {safetyPoints.map((point, index) => {
                      const IconComponent = getIconForType(point.type);
                      const colors = getColorForType(point.type);
                      
                      return (
                        <div 
                          key={point.id} 
                          className="group relative overflow-hidden animate-fade-in"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {/* Hover background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                          
                          <div className="relative flex items-center space-x-4 p-5 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-100/50 hover:border-white/80 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/30 transform hover:-translate-y-1">
                            {/* Enhanced icon with status indicator */}
                            <div className="relative">
                              <div className={`p-4 rounded-2xl ${colors.bg} flex-shrink-0 shadow-lg border border-white/50 group-hover:scale-110 transition-all duration-300`}>
                                <IconComponent className={`${colors.text} relative z-10`} size={22} />
                                {/* Animated ring */}
                                <div className={`absolute inset-0 ${colors.accent} opacity-0 group-hover:opacity-20 rounded-2xl transition-all duration-300 animate-pulse`}></div>
                              </div>
                              {/* Status indicator */}
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                              </div>
                            </div>
                            
                            <div className="flex-grow min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="min-w-0 flex-grow">
                                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-700 transition-colors duration-300">
                                    {point.name}
                                  </h3>
                                  <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-300">
                                    {point.address}
                                  </p>
                                  
                                  {/* Enhanced info badges */}
                                  <div className="flex items-center gap-2 mt-3">
                                    <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-100">
                                      <Navigation size={12} className="text-blue-600" />
                                      <span className="text-xs text-blue-700 font-bold">{point.distance}</span>
                                    </div>
                                    <div className={`px-3 py-1.5 ${colors.bg} rounded-full border ${colors.border}`}>
                                      <span className={`text-xs ${colors.text} font-bold capitalize`}>{point.type}</span>
                                    </div>
                                    <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
                                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                      <span className="text-xs text-gray-600 font-medium">Open 24/7</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-3 flex-shrink-0">
                              <button
                                onClick={() => window.location.href = `tel:${point.phone}`}
                                className="group/btn relative overflow-hidden p-4 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg border border-green-100 hover:border-green-200 hover:shadow-xl hover:shadow-green-200/50"
                              >
                                <Phone className="text-green-600 group-hover/btn:text-green-700 transition-colors duration-300 relative z-10" size={18} />
                                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                              </button>
                              <button
                                onClick={() => {
                                  const url = `https://www.google.com/maps/dir/?api=1&destination=${point.latitude},${point.longitude}`;
                                  window.open(url, '_blank');
                                }}
                                className="group/btn relative overflow-hidden p-4 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg border border-blue-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-200/50"
                              >
                                <Navigation className="text-blue-600 group-hover/btn:text-blue-700 transition-colors duration-300 relative z-10" size={18} />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Desktop Layout */
        <div className="w-full h-screen flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 xl:w-96 bg-white shadow-lg flex flex-col flex-shrink-0">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 xl:p-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 xl:w-10 xl:h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Shield size={18} className="xl:w-5 xl:h-5" />
                </div>
                <div>
                  <h1 className="text-lg xl:text-xl font-bold">Smart Tourism</h1>
                  <p className="text-blue-100 text-xs xl:text-sm">Safety System</p>
                </div>
              </div>
              
              {/* Status */}
              <div className="mt-3 xl:mt-4 bg-white bg-opacity-10 rounded-lg p-2 xl:p-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs xl:text-sm">
                    {userLocation ? 'Location Active' : 'Location Unavailable'}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 xl:p-6 overflow-y-auto">
              {/* Safety Alert */}
              {safeZoneStatus.inSafeZone ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 xl:p-4 mb-4 xl:mb-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={18} />
                    <div>
                      <h3 className="font-medium text-green-800 text-sm xl:text-base">Safe Zone</h3>
                      <p className="text-xs xl:text-sm text-green-600">You are in: {safeZoneStatus.zoneName}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 xl:p-4 mb-4 xl:mb-6">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="text-amber-600" size={18} />
                    <div>
                      <h3 className="font-medium text-amber-800 text-sm xl:text-base">Caution Zone</h3>
                      <p className="text-xs xl:text-sm text-amber-600">Not in a monitored area</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Safety Points */}
              <div>
                <h2 className="text-base xl:text-lg font-semibold text-gray-800 mb-3 xl:mb-4">Nearby Safety Points</h2>
                <div className="space-y-3">
                  {safetyPoints.map(point => (
                    <div key={point.id} className="bg-gray-50 hover:bg-gray-100 rounded-lg p-3 xl:p-4 transition-colors">
                      <div className="flex items-center gap-3 xl:gap-4">
                        <div className={`w-10 h-10 xl:w-12 xl:h-12 ${getTypeColor(point.type)} rounded-lg flex items-center justify-center text-white text-sm xl:text-base`}>
                          {getTypeIcon(point.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-800 text-sm xl:text-base truncate">{point.name}</h3>
                          <p className="text-xs xl:text-sm text-gray-500 capitalize">{point.type}</p>
                          {userLocation && (
                            <p className="text-xs text-gray-400 mt-1">
                              {point.distance} away
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => window.location.href = `tel:${point.phone}`}
                            className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                          >
                            <Phone size={14} className="text-green-600 xl:w-4 xl:h-4" />
                          </button>
                          <button
                            onClick={() => {
                              const url = `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`;
                              window.open(url, '_blank');
                            }}
                            className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                          >
                            <Navigation size={14} className="text-blue-600 xl:w-4 xl:h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Info */}
              {userLocation && (
                <div className="mt-4 xl:mt-6 bg-gray-50 rounded-lg p-3 xl:p-4">
                  <h3 className="font-medium text-gray-800 mb-2 xl:mb-3 text-sm xl:text-base">Your Location</h3>
                  <div className="text-xs xl:text-sm text-gray-600 space-y-1">
                    <p>Lat: {userLocation.latitude.toFixed(6)}</p>
                    <p>Lng: {userLocation.longitude.toFixed(6)}</p>
                    <p>Accuracy: ±{Math.round(userLocation.accuracy)}m</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 w-full relative min-w-0 bg-gray-100">
            {userLocation && (
              <MapContainer
                center={[userLocation.latitude, userLocation.longitude]}
                zoom={15}
                className="w-full h-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                
                {/* User Location */}
                <Marker position={[userLocation.latitude, userLocation.longitude]}>
                  <Popup>Your Location</Popup>
                </Marker>

                {/* Safety Points */}
                {safetyPoints.map(point => (
                  <Marker key={point.id} position={[point.lat, point.lng]}>
                    <Popup>
                      <div className="text-center">
                        <h3 className="font-semibold">{point.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{point.type}</p>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => window.location.href = `tel:${point.phone}`}
                            className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                          >
                            Call
                          </button>
                          <button
                            onClick={() => {
                              const url = `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`;
                              window.open(url, '_blank');
                            }}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                          >
                            Navigate
                          </button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}

            {/* Emergency Button */}
            <button
              onClick={handleEmergencyCall}
              className="absolute bottom-6 right-6 xl:bottom-8 xl:right-8 w-16 h-16 xl:w-20 xl:h-20 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-xl flex items-center justify-center text-lg xl:text-xl font-bold transition-colors z-10"
            >
              SOS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourismSafetyApp;
