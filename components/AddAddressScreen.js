import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const AddAddressScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [addressType, setAddressType] = useState('Home');

  const handleSubmit = () => {
    // Handle form submission
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone Number:', phoneNumber);
    console.log('Country:', country);
    console.log('State:', state);
    console.log('Address:', address);
    console.log('Address Type:', addressType);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Address</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Email Address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <Picker
        style={styles.picker}
        selectedValue={country}
        onValueChange={setCountry}>
      <Picker.Item label="Select Country" value="" />
      <Picker.Item label="United States" value="US" />
      <Picker.Item label="Canada" value="CA" />
      <Picker.Item label="Mexico" value="MX" />
        {/* Add more countries as needed */}
      </Picker>

      <Picker
        style={styles.picker}
        selectedValue={state}
        onValueChange={setState}>
        <Picker.Item label="Select State" value="" />
        {/* Add states based on the selected country */}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Enter Address"
        value={address}
        onChangeText={setAddress}
      />

      <View style={styles.addressTypeContainer}>
        <Button
          title="Home"
          onPress={() => setAddressType('Home')}
          style={addressType === 'Home' ? styles.activeAddressTypeButton : styles.addressTypeButton}
        />

        <Button
          title="Work"
          onPress={() => setAddressType('Work')}
          style={addressType === 'Work' ? styles.activeAddressTypeButton : styles.addressTypeButton}
        />

        <Button
          title="Other"
          onPress={() => setAddressType('Other')}
          style={addressType === 'Other' ? styles.activeAddressTypeButton : styles.addressTypeButton}
        />
      </View>

      <Button
        title="Save Address"
        onPress={handleSubmit}
        style={styles.saveButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  addressTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  addressTypeButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeAddressTypeButton: {
    backgroundColor: '#ccc',
  },
  saveButton: {
    backgroundColor: '#007'
  },
});

export default AddAddressScreen;