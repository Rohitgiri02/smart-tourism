import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
      return;
    }

    const successCallback = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      });
      setError(null);
      setLoading(false);
    };

    const errorCallback = (error) => {
      setError(error.message);
      setLoading(false);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    };

    // Get initial position
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);

    // Watch position changes
    const watchId = navigator.geolocation.watchPosition(
      successCallback,
      errorCallback,
      options
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return { location, error, loading };
};
