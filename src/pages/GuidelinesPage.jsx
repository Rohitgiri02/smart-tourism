import React, { useState } from 'react';
import { Shield, AlertTriangle, Phone, MapPin, Heart, ChevronRight, Search } from 'lucide-react';

const GuidelinesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: Shield },
    { id: 'emergency', label: 'Emergency', icon: AlertTriangle },
    { id: 'safety', label: 'Safety', icon: Heart },
    { id: 'navigation', label: 'Navigation', icon: MapPin },
  ];

  const guidelines = [
    {
      id: 1,
      category: 'emergency',
      title: 'Emergency Contacts',
      description: 'Important numbers to know',
      content: [
        'Police: 911 or local emergency number',
        'Medical Emergency: Call ambulance immediately',
        'Fire Department: Report fires or gas leaks',
        'Tourist Helpline: 24/7 assistance for visitors',
      ],
      icon: Phone,
      color: 'bg-red-100 text-red-600',
    },
    {
      id: 2,
      category: 'safety',
      title: 'Personal Safety Tips',
      description: 'Stay safe while exploring',
      content: [
        'Always inform someone of your travel plans',
        'Keep emergency contacts readily available',
        'Stay in well-lit and populated areas',
        'Trust your instincts about situations',
        'Keep copies of important documents',
      ],
      icon: Shield,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id: 3,
      category: 'navigation',
      title: 'Getting Around Safely',
      description: 'Transportation safety guidelines',
      content: [
        'Use official transportation services',
        'Share your ride details with trusted contacts',
        'Keep GPS tracking enabled on your phone',
        'Have offline maps downloaded as backup',
        'Know your accommodation address in local language',
      ],
      icon: MapPin,
      color: 'bg-green-100 text-green-600',
    },
    {
      id: 4,
      category: 'safety',
      title: 'Health & Wellness',
      description: 'Stay healthy during your travels',
      content: [
        'Carry necessary medications with prescriptions',
        'Stay hydrated, especially in hot climates',
        'Be cautious with street food and water',
        'Know location of nearest medical facilities',
        'Have travel insurance information accessible',
      ],
      icon: Heart,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      id: 5,
      category: 'emergency',
      title: 'What to Do in an Emergency',
      description: 'Step-by-step emergency procedures',
      content: [
        '1. Stay calm and assess the situation',
        '2. Call emergency services immediately',
        '3. Provide your exact location',
        '4. Follow instructions from authorities',
        '5. Contact your embassy if needed',
      ],
      icon: AlertTriangle,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      id: 6,
      category: 'safety',
      title: 'Digital Safety',
      description: 'Protect your digital presence',
      content: [
        'Use secure Wi-Fi networks only',
        'Enable two-factor authentication',
        'Backup important data to cloud storage',
        'Be cautious sharing location on social media',
        'Keep software and apps updated',
      ],
      icon: Shield,
      color: 'bg-indigo-100 text-indigo-600',
    },
  ];

  const filteredGuidelines = guidelines.filter((guideline) => {
    const matchesCategory = selectedCategory === 'all' || guideline.category === selectedCategory;
    const matchesSearch = guideline.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guideline.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto pb-20">
      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Safety Guidelines</h1>
          <p className="text-gray-600">Essential tips for safe and enjoyable travels</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search guidelines..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon size={16} />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Guidelines List */}
        <div className="space-y-4">
          {filteredGuidelines.map((guideline) => {
            const Icon = guideline.icon;
            return (
              <div key={guideline.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${guideline.color} flex-shrink-0`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{guideline.title}</h3>
                      <p className="text-sm text-gray-600">{guideline.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {guideline.content.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700 flex-1">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredGuidelines.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No guidelines found</h3>
            <p className="text-gray-600">Try adjusting your search or category filter</p>
          </div>
        )}

        {/* Emergency Quick Action */}
        <div className="mt-8 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg mb-1">Emergency Assistance</h3>
              <p className="text-red-100 text-sm">Available 24/7 for immediate help</p>
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
  );
};

export default GuidelinesPage;
