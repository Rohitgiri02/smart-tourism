import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import StatusBar from './StatusBar';
import HeaderControls from './HeaderControls';
import MapComponent from './MapComponent';
import GeoFencingAlert from './GeoFencingAlert';
import SafetyPointsList from './SafetyPointsList';
import SOSButton from './SOSButton';
import { useGeolocation } from '../hooks/useGeolocation';
import { safetyPointsData, calculateDistance, formatDistance, checkSafeZone } from '../utils/locationUtils';

const ResponsiveLayout = () => {
  const { location: userLocation, error: locationError, loading: locationLoading } = useGeolocation();
  const [safetyPoints, setSafetyPoints] = useState([]);
  const [safeZoneStatus, setSafeZoneStatus] = useState({ inSafeZone: false, zoneName: null });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
      setSafetyPoints(safetyPointsData.map(point => ({ ...point, distance: 'Unknown' })));
    }
  }, [userLocation]);

  const handleBack = () => {
    // Handle navigation back
    console.log('Navigate back');
  };

  const handleCenterMap = () => {
    // This would center the map on user location
    console.log('Center map on user location');
  };

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handlePointSelect = (point) => {
    console.log('Selected safety point:', point);
    // Could show detailed view or navigate to point
  };

  if (locationLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-sm mx-auto border border-white/20">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Finding Your Location</h3>
          <p className="text-gray-600 text-sm leading-relaxed">We're accessing your location to provide personalized safety information and nearby emergency services.</p>
          <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (locationError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md mx-auto border border-white/20">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <div className="w-8 h-8 text-white">⚠️</div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Location Access Required</h3>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">{locationError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
          <p className="text-xs text-gray-500 mt-4">
            This app requires location access to show nearby safety points and emergency services.
          </p>
        </div>
      </div>
    );
  }

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        {/* Mobile Container */}
        <div className="mx-auto max-w-sm h-screen bg-white relative overflow-hidden">
          
          {/* Map Section */}
          <div className="relative h-1/2">
            <MapComponent 
              userLocation={userLocation} 
              safetyPoints={safetyPoints}
              className="absolute inset-0"
            />
            
            {/* Modern Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white/30"></div>
            
            <StatusBar />
            <HeaderControls 
              onBack={handleBack}
              onCenterMap={handleCenterMap}
              onMenuToggle={handleMenuToggle}
            />
          </div>

          {/* Content Section */}
          <div className="h-1/2 bg-white rounded-t-3xl -mt-6 relative z-10 flex flex-col">
            {/* Drag Handle */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-4 mb-6"></div>
            
            <div className="flex-1 px-6 pb-24 overflow-y-auto space-y-6">
              {/* Status Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Safety Center</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-sm text-gray-500">
                      {userLocation ? 'Live tracking active' : 'Location unavailable'}
                    </p>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>

              <GeoFencingAlert 
                isInSafeZone={safeZoneStatus.inSafeZone}
                zoneName={safeZoneStatus.zoneName}
              />
              
              <SafetyPointsList 
                safetyPoints={safetyPoints}
                onPointSelect={handlePointSelect}
              />
            </div>
          </div>

          <SOSButton userLocation={userLocation} />
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="h-screen flex">
        
        {/* Modern Sidebar */}
        <div className="w-96 bg-white shadow-2xl flex flex-col border-r border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <div className="w-6 h-6 bg-white rounded-lg"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Smart Tourism</h1>
                <p className="text-blue-200 text-sm">Safety Management System</p>
              </div>
            </div>
            
            {/* Enhanced Status */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    {userLocation ? 'Location Active' : 'Location Unavailable'}
                  </span>
                </div>
                <div className="text-xs text-blue-200">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <GeoFencingAlert 
              isInSafeZone={safeZoneStatus.inSafeZone}
              zoneName={safeZoneStatus.zoneName}
            />
            
            <SafetyPointsList 
              safetyPoints={safetyPoints}
              onPointSelect={handlePointSelect}
            />

            {/* Enhanced Location Details */}
            {userLocation && (
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  Location Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white rounded-xl p-3">
                    <span className="text-gray-500 text-xs uppercase tracking-wide">Latitude</span>
                    <p className="font-mono font-semibold text-gray-800">{userLocation.latitude.toFixed(6)}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <span className="text-gray-500 text-xs uppercase tracking-wide">Longitude</span>
                    <p className="font-mono font-semibold text-gray-800">{userLocation.longitude.toFixed(6)}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 col-span-2">
                    <span className="text-gray-500 text-xs uppercase tracking-wide">Accuracy</span>
                    <p className="font-semibold text-gray-800">±{Math.round(userLocation.accuracy)} meters</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Map Area */}
        <div className="flex-1 relative bg-gray-100">
          <HeaderControls 
            onBack={handleBack}
            onCenterMap={handleCenterMap}
            className="top-8 z-20"
          />
          
          <MapComponent 
            userLocation={userLocation} 
            safetyPoints={safetyPoints}
            className="w-full h-full"
          />
          
          {/* Map Overlay Info */}
          <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
            <div className="text-sm">
              <p className="font-semibold text-gray-800">Live Map View</p>
              <p className="text-gray-600">{safetyPoints.length} safety points nearby</p>
            </div>
          </div>
        </div>

        <SOSButton userLocation={userLocation} />
      </div>
    </div>
  );
};

export default ResponsiveLayout;
