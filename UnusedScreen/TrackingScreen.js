import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const TrackingScreen = () => {
  const [courierLocation, setCourierLocation] = useState({
    latitude: 37.7833,
    longitude: -122.4167,
  });

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Track Courier</Text>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: courierLocation.latitude,
          longitude: courierLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={courierLocation}
          title="Courier Location"
        />
      </MapView>
      <View style={{ padding: 20 }}>
        <Text style={ styles.info }>Package Information</Text>
        <Text style={ styles.info }>Delivery Type: Express Delivery</Text>
        <Text style={ styles.info }>Package Weight: 4 Kg</Text>
        <Text style={ styles.info }>Recipient: Smith Deo</Text>
        <Text style={ styles.info }>Courier: Experienced Courier</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  info: {
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20
  },
});

export default TrackingScreen;