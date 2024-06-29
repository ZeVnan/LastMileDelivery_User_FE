import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Location } from 'expo-location';

const PickUpLocationScreen = () => {
  const [location, setLocation] = useState(null);

  const handleSelectLocation = (event) => {
    setLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.783333,
          longitude: -122.416667,
          latitudeDelta: 0.09,
          longitudeDelta: 0.034,
        }}
        onRegionChangeComplete={(event) => console.log('Region changed:', event)}
        onPress={handleSelectLocation}
      >
        {location && <Marker coordinate={location} />}
      </MapView>
      <Button title="Confirm Pickup Address" />
    </View>
  );
};

export default PickUpLocationScreen;