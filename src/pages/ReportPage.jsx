import React, { useState } from 'react';
import { Camera, MapPin, AlertTriangle, Send, Check } from 'lucide-react';

const ReportPage = () => {
  const [reportType, setReportType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState('medium');
  const [submitted, setSubmitted] = useState(false);

  const reportTypes = [
    { id: 'safety', label: 'Safety Concern', icon: AlertTriangle, color: 'bg-red-100 text-red-600' },
    { id: 'infrastructure', label: 'Infrastructure Issue', icon: MapPin, color: 'bg-blue-100 text-blue-600' },
    { id: 'emergency', label: 'Emergency', icon: AlertTriangle, color: 'bg-orange-100 text-orange-600' },
    { id: 'other', label: 'Other', icon: Camera, color: 'bg-gray-100 text-gray-600' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the report to your backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setReportType('');
      setDescription('');
      setLocation('');
      setPriority('medium');
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="flex-1 bg-gray-50 overflow-y-auto pb-20">
        <div className="max-w-lg mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Report Submitted!</h2>
            <p className="text-gray-600 mb-4">Thank you for your report. We'll review it and take appropriate action.</p>
            <div className="text-sm text-gray-500">
              Report ID: #R{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto pb-20">
      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Report an Issue</h1>
          <p className="text-gray-600">Help us keep everyone safe by reporting concerns</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Report Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              What would you like to report?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setReportType(type.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      reportType === type.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${type.color}`}>
                      <Icon size={20} />
                    </div>
                    <div className="text-sm font-medium text-gray-800">{type.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority Level */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Priority Level
            </label>
            <div className="flex gap-2">
              {[
                { id: 'low', label: 'Low', color: 'bg-green-500' },
                { id: 'medium', label: 'Medium', color: 'bg-yellow-500' },
                { id: 'high', label: 'High', color: 'bg-red-500' },
              ].map((level) => (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => setPriority(level.id)}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all duration-200 ${
                    priority === level.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className={`w-4 h-4 ${level.color} rounded-full mx-auto mb-1`}></div>
                  <div className="text-sm font-medium text-gray-800">{level.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location or address"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => setLocation('Current Location')}
              className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Use current location
            </button>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide details about the issue..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Add Photo (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Camera className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-sm text-gray-600 mb-2">Tap to add a photo</p>
              <p className="text-xs text-gray-500">Helps us understand the issue better</p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!reportType || !description || !location}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Send size={20} />
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportPage;
