import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const SendPackageScreen = () => {
  const [shipmentType, setShipmentType] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderMobileNumber, setSenderMobileNumber] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [packageSize, setPackageSize] = useState('');
  const [deliveryType, setDeliveryType] = useState('');
  const [message, setMessage] = useState('');

  const handleSendPackage = () => {
    setMessage('Sending package...');
    // TODO: Implement actual sending logic
    setTimeout(() => {
      setMessage('Package sent successfully!');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Package</Text>

      <TextInput
        style={styles.input}
        placeholder="Shipment Type"
        value={shipmentType}
        onChangeText={setShipmentType}
      />

      <TextInput
        style={styles.input}
        placeholder="Sender Name"
        value={senderName}
        onChangeText={setSenderName}
      />

      <TextInput
        style={styles.input}
        placeholder="Sender Mobile Number"
        value={senderMobileNumber}
        onChangeText={setSenderMobileNumber}
      />

      <TextInput
        style={styles.input}
        placeholder="Sender Address"
        value={senderAddress}
        onChangeText={setSenderAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Pickup Date"
        value={pickupDate}
        onChangeText={setPickupDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Pickup Time"
        value={pickupTime}
        onChangeText={setPickupTime}
      />

      <TextInput
        style={styles.input}
        placeholder="Package Size"
        value={packageSize}
        onChangeText={setPackageSize}
      />

      <TextInput
        style={styles.input}
        placeholder="Delivery Type"
        value={deliveryType}
        onChangeText={setDeliveryType}
      />

      <Button title="Send Package" onPress={handleSendPackage} />

      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  message: {
    marginTop: 20,
  },
});

export default SendPackageScreen;