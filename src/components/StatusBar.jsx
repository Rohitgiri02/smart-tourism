import React from 'react';
import { Wifi, Battery } from 'lucide-react';

const StatusBar = ({ className = '' }) => {
  const currentTime = new Date().toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`absolute top-0 left-0 right-0 px-4 md:px-8 py-3 md:py-4 flex justify-between items-center text-gray-800 z-10 ${className}`}>
      <span className="font-semibold text-base md:text-lg">{currentTime}</span>
      <div className="flex items-center space-x-2">
        <Wifi size={18} className="md:w-5 md:h-5" />
        <div className="flex space-x-1">
          <div className="w-1 h-3 bg-gray-800 rounded-full"></div>
          <div className="w-1 h-3 bg-gray-800 rounded-full"></div>
          <div className="w-1 h-3 bg-gray-800 rounded-full"></div>
          <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
        </div>
        <Battery size={20} className="transform -rotate-90 md:w-6 md:h-6"/>
      </div>
    </div>
  );
};

export default StatusBar;
