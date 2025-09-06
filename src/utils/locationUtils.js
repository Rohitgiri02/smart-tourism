// Calculate distance between two coordinates using Haversine formula
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // Distance in km
  return d;
};

// Format distance for display
export const formatDistance = (distance) => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
};

// Sample safety points with coordinates (you can replace with real data)
export const safetyPointsData = [
  {
    id: 1,
    name: 'City Hospital',
    type: 'hospital',
    address: 'Main Street, City Center',
    latitude: 40.7128,
    longitude: -74.0060,
    phone: '+1-555-0123',
  },
  {
    id: 2,
    name: 'Central Police Station',
    type: 'police',
    address: 'Police Plaza, Downtown',
    latitude: 40.7589,
    longitude: -73.9851,
    phone: '+1-555-0456',
  },
  {
    id: 3,
    name: 'Fire Department Station 1',
    type: 'fire',
    address: 'Fire House Lane',
    latitude: 40.6892,
    longitude: -74.0445,
    phone: '+1-555-0789',
  },
  {
    id: 4,
    name: 'Emergency Medical Center',
    type: 'medical',
    address: 'Healthcare District',
    latitude: 40.7505,
    longitude: -73.9934,
    phone: '+1-555-0321',
  },
];

// Check if user is in a safe zone
export const checkSafeZone = (userLat, userLon) => {
  // Sample safe zones (you can define custom zones)
  const safeZones = [
    {
      name: 'Historic City Center',
      centerLat: 40.7128,
      centerLon: -74.0060,
      radius: 2, // km
    },
    {
      name: 'Tourist District',
      centerLat: 40.7589,
      centerLon: -73.9851,
      radius: 1.5, // km
    },
  ];

  for (const zone of safeZones) {
    const distance = calculateDistance(userLat, userLon, zone.centerLat, zone.centerLon);
    if (distance <= zone.radius) {
      return { inSafeZone: true, zoneName: zone.name };
    }
  }

  return { inSafeZone: false, zoneName: null };
};
