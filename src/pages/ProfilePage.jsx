import React, { useState } from 'react';
import { User, Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, Camera, Edit3 } from 'lucide-react';

const ProfilePage = () => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    emergencyContact: 'Jane Doe - +1 (555) 987-6543',
    joinDate: 'January 2024',
  });

  const [notifications, setNotifications] = useState({
    emergency: true,
    safety: true,
    updates: false,
  });

  const menuItems = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Update your profile details',
      icon: User,
      action: () => console.log('Edit profile'),
    },
    {
      id: 'emergency',
      title: 'Emergency Contacts',
      description: 'Manage emergency contact information',
      icon: Shield,
      action: () => console.log('Emergency contacts'),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Configure alert preferences',
      icon: Bell,
      action: () => console.log('Notifications'),
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'App preferences and privacy',
      icon: Settings,
      action: () => console.log('Settings'),
    },
    {
      id: 'help',
      title: 'Help & Support',
      description: 'Get help and contact support',
      icon: HelpCircle,
      action: () => console.log('Help'),
    },
  ];

  const stats = [
    { label: 'Reports Submitted', value: '12' },
    { label: 'Safe Trips', value: '45' },
    { label: 'Points Earned', value: '1,250' },
  ];

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto pb-20">
      <div className="max-w-lg mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 text-white px-6 py-8">
          <div className="text-center">
            {/* Profile Picture */}
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <User size={40} className="text-white" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Camera size={16} className="text-white" />
              </button>
            </div>
            
            <h1 className="text-xl font-bold mb-1">{user.name}</h1>
            <p className="text-blue-100 text-sm mb-4">{user.email}</p>
            
            {/* Stats */}
            <div className="flex justify-between bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-bold">{stat.value}</div>
                  <div className="text-xs text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-6 py-6">
          {/* Quick Info */}
          <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <User size={18} />
              Quick Info
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Phone</span>
                <span className="text-sm font-medium text-gray-800">{user.phone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Member since</span>
                <span className="text-sm font-medium text-gray-800">{user.joinDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Emergency Contact</span>
                <span className="text-xs font-medium text-gray-800">{user.emergencyContact}</span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-3 mb-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon size={20} className="text-gray-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              );
            })}
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Bell size={18} />
              Notification Preferences
            </h2>
            <div className="space-y-3">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 capitalize">
                    {key === 'emergency' ? 'Emergency Alerts' : 
                     key === 'safety' ? 'Safety Updates' : 'App Updates'}
                  </span>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                    className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                      value ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                      value ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Information */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1">Emergency SOS</h3>
                <p className="text-red-100 text-sm">Quick access in emergencies</p>
              </div>
              <button 
                onClick={() => window.location.href = 'tel:911'}
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Shield size={24} className="text-white" />
              </button>
            </div>
          </div>

          {/* Logout */}
          <button className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 flex items-center justify-center gap-3 text-red-600 hover:bg-red-50">
            <LogOut size={20} />
            <span className="font-semibold">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
