import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderDetailScreen = () => {
  const [trackingData, setTrackingData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/tracking/TY9860036NM')
      .then(response => response.json())
      .then(data => setTrackingData(data));
  }, []);

  if (!trackingData) {
    return <Text style = { styles.loading }>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tracking Package</Text>
      <Text style={styles.trackingId}>Tracking ID: {trackingData.trackingId}</Text>
      <Text style={styles.route}>
        {trackingData.route.map(event => (
          <Text key={event.id}>
            {event.timestamp} - {event.location} - {event.description}
          </Text>
        ))}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  trackingId: {
    fontSize: 18,
    marginBottom: 20,
  },
  route: {
    fontSize: 16,
  },
  loading: {
    fontSize: 30,
    alignSelf: 'center'
  }
});

export default OrderDetailScreen;