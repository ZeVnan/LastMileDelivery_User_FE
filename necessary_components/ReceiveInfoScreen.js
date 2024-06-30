import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

const ReceiveInfoScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSendPackage = () => {
    navigation.navigate('CheckOut');
  };

  return (
    <View style = { styles.container}>
      <ScrollView>
        <Text style = { styles.title }>Receiver Details</Text>

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
      </ScrollView>
      <Button title="Confirm Receive Information" onPress={handleSendPackage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 20,
    marginHorizontal: 20,
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ReceiveInfoScreen;