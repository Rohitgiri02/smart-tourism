import React from 'react';
import { ChevronLeft, MapPin, Menu, Navigation } from 'lucide-react';

const HeaderControls = ({ onBack, onCenterMap, onMenuToggle, className = '' }) => {
  return (
    <div className={`absolute top-12 md:top-16 left-0 right-0 px-4 flex justify-between items-center z-20 ${className}`}>
      <button 
        className="bg-white/90 backdrop-blur-sm p-2 md:p-3 rounded-full shadow-lg hover:bg-white transition-colors"
        onClick={onBack}
        aria-label="Go back"
      >
        <ChevronLeft className="text-gray-700" size={20} />
      </button>
      
      <div className="flex space-x-2">
        <button 
          className="bg-white/90 backdrop-blur-sm p-2 md:p-3 rounded-full shadow-lg hover:bg-white transition-colors"
          onClick={onCenterMap}
          aria-label="Center on my location"
        >
          <Navigation className="text-gray-700" size={20} />
        </button>
        
        <button 
          className="bg-white/90 backdrop-blur-sm p-2 md:p-3 rounded-full shadow-lg hover:bg-white transition-colors md:hidden"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          <Menu className="text-gray-700" size={20} />
        </button>
      </div>
    </div>
  );
};

export default HeaderControls;
