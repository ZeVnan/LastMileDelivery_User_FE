import { useEffect } from 'react';
import { Linking } from 'react-native';

useEffect(() => {
  const handleDeepLink = (event) => {
    const url = event.url;
    console.log('Deep link URL:', url);
  };

  Linking.addEventListener('url', handleDeepLink);

  return () => {
    Linking.removeEventListener('url', handleDeepLink);
  };
}, []);