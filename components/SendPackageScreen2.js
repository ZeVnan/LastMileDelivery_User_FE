import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SendPackageScreen = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSendPackage = () => {
    // Gửi dữ liệu đến API để đặt bưu kiện
    // ...
  };

  return (
    <View style = { styles.container}>
      <Text style = { styles.title }>Send Package</Text>

      <TextInput
        style = { styles.input }
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style = { styles.input }
        placeholder="Enter Mobile Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />

      <TextInput
        style = { styles.input }
        placeholder="Enter Address"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style = { styles.input }
        placeholder="Enter Message"
        value={message}
        onChangeText={setMessage}
      />

      <Button title="Book Now" onPress={handleSendPackage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
});

export default SendPackageScreen;