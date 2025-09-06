import React from 'react';
import { MapPin, Shield, Phone, Navigation, AlertTriangle, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'emergency',
      title: 'Emergency SOS',
      description: 'Quick access to emergency services',
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      action: () => window.location.href = 'tel:911',
    },
    {
      id: 'map',
      title: 'Safety Map',
      description: 'View nearby safety points',
      icon: MapPin,
      color: 'from-blue-500 to-blue-600',
      action: () => navigate('/map'),
    },
    {
      id: 'report',
      title: 'Report Issue',
      description: 'Report safety concerns',
      icon: Shield,
      color: 'from-green-500 to-green-600',
      action: () => navigate('/report'),
    },
    {
      id: 'guidelines',
      title: 'Safety Guidelines',
      description: 'Learn safety tips',
      icon: Heart,
      color: 'from-purple-500 to-purple-600',
      action: () => navigate('/guidelines'),
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Heavy traffic reported on Main Street',
      time: '10 min ago',
    },
    {
      id: 2,
      type: 'info',
      message: 'New safety checkpoint added near Central Park',
      time: '1 hour ago',
    },
    {
      id: 3,
      type: 'success',
      message: 'You are in a safe zone',
      time: '2 hours ago',
    },
  ];

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 text-white px-6 py-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-2">Welcome to Smart Tourism</h1>
          <p className="text-blue-100 text-sm">Your safety companion for a worry-free journey</p>
          
          {/* Quick Stats */}
          <div className="flex justify-between mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-center">
              <div className="text-xl font-bold">24/7</div>
              <div className="text-xs text-blue-100">Support</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">150+</div>
              <div className="text-xs text-blue-100">Safe Points</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">5sec</div>
              <div className="text-xs text-blue-100">Response</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6">
        {/* Quick Actions */}
        <div className="py-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={action.action}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-105"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{action.title}</h3>
                  <p className="text-xs text-gray-500">{action.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="pb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Alerts</h2>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'warning' ? 'bg-yellow-500' :
                    alert.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 mb-1">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="pb-6">
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1">Emergency Contact</h3>
                <p className="text-red-100 text-sm">Tap to call immediately</p>
              </div>
              <button 
                onClick={() => window.location.href = 'tel:911'}
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Phone size={24} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
