import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const PickUpLocationScreen = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');

  const handleSelectLocation = async (event) => {
    const selectedLocation = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    };
    setLocation(selectedLocation);

    const geocode = await Location.reverseGeocodeAsync(selectedLocation);
    const selectedAddress = geocode[0];
    const addressString = `${selectedAddress.name}, ${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.region}, ${selectedAddress.country}`;
    setAddress(addressString);
  };
  const handleConfirmPickUpAddress = () => {
    // TODO: Implement actual sending logic
    navigation.navigate('Send Confirmation');
  };

  return (
    <View style={ styles.container}>
      <View style={{ padding: 10 }}>
        {address ? <Text>Selected Address: {address}</Text> : <Text>Select a location on the map</Text>}
      </View>
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
      <Button 
        title="Confirm Pickup Address" 
        onPress={handleConfirmPickUpAddress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});

export default PickUpLocationScreen;
