import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';

const HomePageScreen = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [packageInfo, setPackageInfo] = useState(null);

  const handleTrackPackage = () => {
    // Gọi API để lấy thông tin gói hàng theo mã theo dõi
    // Thay thế `YOUR_API_URL` bằng URL API của bạn
    fetch(`YOUR_API_URL/${trackingNumber}`)
      .then((response) => response.json())
      .then((data) => setPackageInfo(data));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your location </Text>
      <Text style={styles.locationValue}>Your location </Text>
      <Text style={styles.title}>Track your package</Text>
      <View style = {styles.container2}>
        <TextInput
          style={styles.input}
           placeholder="Enter tracking number"
          value={trackingNumber}
          onChangeText={(text) => setTrackingNumber(text)}
         />
        <Button title="Track" onPress={handleTrackPackage}/>
      </View>
      
      <View style={styles.packageInfo}>
          <Text style={styles.packageInfoLabel}>Tracking number:</Text>
          <Text style={styles.packageInfoValue}>a</Text>

          <Text style={styles.packageInfoLabel}>From:</Text>
          <Text style={styles.packageInfoValue}>c</Text>

          <Text style={styles.packageInfoLabel}>To:</Text>
          <Text style={styles.packageInfoValue}>d</Text>

          <Text style={styles.packageInfoLabel}>Status:</Text>
          <Text style={styles.packageInfoValue}>b</Text>
        </View>

      {packageInfo && (
        <View style={styles.packageInfo}>
          <Text style={styles.packageInfoLabel}>Tracking number:</Text>
          <Text style={styles.packageInfoValue}>{packageInfo.trackingId}</Text>

          <Text style={styles.packageInfoLabel}>Status:</Text>
          <Text style={styles.packageInfoValue}>{packageInfo.status}</Text>

          <Text style={styles.packageInfoLabel}>From:</Text>
          <Text style={styles.packageInfoValue}>{packageInfo.from}</Text>

          <Text style={styles.packageInfoLabel}>To:</Text>
          <Text style={styles.packageInfoValue}>{packageInfo.to}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  container2: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: 250
  },
  packageInfo: {
    padding: 10
  },
  packageInfoLabel: {
    fontWeight: 'bold',

  },
  packageInfoValue: {
    marginHorizontal: 10,
  },
  locationValue: {
    marginStart: 20,
    marginBottom: 10,
  },
});

export default HomePageScreen;