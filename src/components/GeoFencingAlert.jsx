import React from 'react';
import { AlertTriangle, CheckCircle, Shield, MapPin } from 'lucide-react';

const GeoFencingAlert = ({ isInSafeZone, zoneName, className = '' }) => {
  if (!isInSafeZone && !zoneName) return null;

  const alertConfig = isInSafeZone 
    ? {
        icon: CheckCircle,
        bgColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
        iconColor: 'text-white',
        title: 'Safe Zone Active',
        message: `Protected area: ${zoneName}`,
        borderColor: 'border-green-200',
      }
    : {
        icon: AlertTriangle,
        bgColor: 'bg-gradient-to-r from-amber-500 to-orange-500',
        iconColor: 'text-white',
        title: 'Zone Alert',
        message: `Approaching: ${zoneName}`,
        borderColor: 'border-amber-200',
      };

  const Icon = alertConfig.icon;

  return (
    <div className={`${alertConfig.bgColor} text-white p-4 rounded-2xl shadow-lg border-2 ${alertConfig.borderColor} ${className}`}>
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <Icon className={alertConfig.iconColor} size={20} />
        </div>
        <div className="flex-grow">
          <h3 className="font-bold text-sm md:text-base">{alertConfig.title}</h3>
          <p className="text-xs md:text-sm text-white/90">{alertConfig.message}</p>
        </div>
        <div className="flex-shrink-0">
          <MapPin className="text-white/70" size={18} />
        </div>
      </div>
    </div>
  );
};

export default GeoFencingAlert;
