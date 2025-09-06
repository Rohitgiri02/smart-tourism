import React, { useState } from 'react';
import { Phone, MessageCircle, X, AlertTriangle } from 'lucide-react';

const SOSButton = ({ userLocation, className = '' }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const handleSOSPress = () => {
    setIsPressed(true);
    setCountdown(5);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          triggerEmergencyCall();
          setIsPressed(false);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto-cancel after 5 seconds if not confirmed
    setTimeout(() => {
      if (countdown !== null) {
        clearInterval(countdownInterval);
        setIsPressed(false);
        setCountdown(null);
      }
    }, 5000);
  };

  const handleCancel = () => {
    setIsPressed(false);
    setCountdown(null);
  };

  const triggerEmergencyCall = () => {
    const emergencyNumber = '911';
    
    if (confirm(`Emergency services will be contacted. Your location: ${userLocation ? `${userLocation.latitude.toFixed(4)}, ${userLocation.longitude.toFixed(4)}` : 'Location unavailable'}`)) {
      window.location.href = `tel:${emergencyNumber}`;
    }
  };

  const sendEmergencySMS = () => {
    const message = `EMERGENCY: I need help! My location: ${userLocation ? `https://maps.google.com/?q=${userLocation.latitude},${userLocation.longitude}` : 'Location unavailable'}`;
    const smsUrl = `sms:911?body=${encodeURIComponent(message)}`;
    window.location.href = smsUrl;
  };

  if (isPressed) {
    return (
      <div className={`fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50 ${className}`}>
        <div className="bg-white rounded-3xl p-6 shadow-2xl border-4 border-red-500 max-w-xs">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <div className="text-4xl font-bold text-red-600 mb-2">{countdown}</div>
            <p className="text-sm text-gray-600">Emergency call in {countdown} second{countdown !== 1 ? 's' : ''}</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              onClick={triggerEmergencyCall}
              className="flex-1 bg-red-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
            >
              <Phone size={16} />
              Call Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50 ${className}`}>
      <div className="flex flex-col items-center space-y-3">
        {/* Main SOS Button */}
        <button 
          className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-2xl shadow-red-500/40 transform active:scale-95 transition-all duration-200 hover:shadow-red-500/60 animate-pulse border-4 border-white"
          onClick={handleSOSPress}
          aria-label="Emergency SOS"
        >
          SOS
        </button>
        
        {/* Quick action buttons */}
        <div className="flex space-x-3 opacity-80">
          <button
            onClick={triggerEmergencyCall}
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-red-100"
            aria-label="Emergency call"
          >
            <Phone className="text-red-600" size={18} />
          </button>
          
          <button
            onClick={sendEmergencySMS}
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-red-100"
            aria-label="Emergency SMS"
          >
            <MessageCircle className="text-red-600" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SOSButton;
