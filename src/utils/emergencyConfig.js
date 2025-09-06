// Emergency services configuration
export const EMERGENCY_CONFIG = {
  default: {
    emergencyNumber: '911',
    police: '911',
    fire: '911',
    medical: '911',
    smsEnabled: true,
  },
  // Add country-specific configurations
  US: {
    emergencyNumber: '911',
    police: '911',
    fire: '911',
    medical: '911',
    smsEnabled: true,
  },
  UK: {
    emergencyNumber: '999',
    police: '101',
    fire: '999',
    medical: '999',
    smsEnabled: false,
  },
  IN: {
    emergencyNumber: '112',
    police: '100',
    fire: '101',
    medical: '108',
    smsEnabled: true,
  },
  // Add more countries as needed
};

// Detect user's country (basic implementation)
export const detectCountry = () => {
  // This is a simplified version. In production, use a proper geolocation service
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timezone.includes('America')) return 'US';
  if (timezone.includes('Europe/London')) return 'UK';
  if (timezone.includes('Asia/Kolkata')) return 'IN';
  return 'default';
};

export const getEmergencyConfig = (country = null) => {
  const detectedCountry = country || detectCountry();
  return EMERGENCY_CONFIG[detectedCountry] || EMERGENCY_CONFIG.default;
};
