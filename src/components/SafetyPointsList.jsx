import React from 'react';
import { ChevronRight, Hospital, Shield, Phone, Navigation2, MapPin } from 'lucide-react';

const getIconForType = (type) => {
  const icons = {
    hospital: Hospital,
    police: Shield,
    fire: Shield,
    medical: Hospital,
  };
  return icons[type] || Hospital;
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

const SafetyPointsList = ({ safetyPoints, onPointSelect, className = '' }) => {
  const handleCall = (phone, e) => {
    e.stopPropagation();
    window.location.href = `tel:${phone}`;
  };

  const handleNavigate = (point, e) => {
    e.stopPropagation();
    const url = `https://www.google.com/maps/dir/?api=1&destination=${point.latitude},${point.longitude}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
      <div className="px-6 py-6 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold text-gray-800 text-2xl md:text-3xl">Safety Points</h2>
            <p className="text-lg text-gray-500 mt-2">Nearby emergency services</p>
          </div>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
            <MapPin className="text-blue-600" size={24} />
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-5 max-h-96 overflow-y-auto">
        {safetyPoints.map((point) => {
          const Icon = getIconForType(point.type);
          const colors = getColorForType(point.type);
          
          return (
            <div 
              key={point.id} 
              className={`flex items-center space-x-6 p-6 rounded-xl border ${colors.border} hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.02] group`}
              onClick={() => onPointSelect && onPointSelect(point)}
            >
              <div className={`relative p-5 rounded-xl ${colors.bg} flex-shrink-0`}>
                <Icon className={colors.text} size={28} />
                <div className={`absolute -top-1 -right-1 w-4 h-4 ${colors.accent} rounded-full`}></div>
              </div>
              
              <div className="flex-grow min-w-0">
                <h3 className="font-semibold text-gray-800 text-xl md:text-2xl truncate group-hover:text-blue-600 transition-colors">
                  {point.name}
                </h3>
                <p className="text-base md:text-lg text-gray-500 truncate mt-2">
                  {point.address}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-base text-gray-400 font-medium">
                    {point.distance}
                  </span>
                  <span className="text-base text-gray-300">•</span>
                  <span className="text-base text-blue-500 capitalize font-medium">
                    {point.type}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-6 flex-shrink-0">
                <button
                  onClick={(e) => handleCall(point.phone, e)}
                  className="min-w-[80px] min-h-[80px] p-8 rounded-2xl bg-green-100 hover:bg-green-200 transition-all duration-200 group/btn shadow-lg hover:shadow-xl flex items-center justify-center"
                  aria-label={`Call ${point.name}`}
                >
                  <Phone className="text-green-600 group-hover/btn:scale-125 transition-transform" size={36} />
                </button>
                
                <button
                  onClick={(e) => handleNavigate(point, e)}
                  className="min-w-[80px] min-h-[80px] p-8 rounded-2xl bg-blue-100 hover:bg-blue-200 transition-all duration-200 group/btn shadow-lg hover:shadow-xl flex items-center justify-center"
                  aria-label={`Navigate to ${point.name}`}
                >
                  <Navigation2 className="text-blue-600 group-hover/btn:scale-125 transition-transform" size={36} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SafetyPointsList;
