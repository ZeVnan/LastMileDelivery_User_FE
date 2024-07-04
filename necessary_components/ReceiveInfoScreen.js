import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';

const ReceiveInfoScreen = ({navigation, route}) => {
  const [receiveInfoForm, setReceiveInfoForm] = useState({
    receiverName: "",
    receiverMobileNumber: "",
    receiverAddress: "",
    message: "",
  })
  const {sendInfo} = route.params;

  const handleSendPackage = () => {
    if (receiveInfoForm.receiverName === ""){
      Alert.alert("Missing information", "Receiver name is missing");
      return;
    }
    if (!/^\d{11}$/.test(receiveInfoForm.receiverMobileNumber)){
      Alert.alert("Missing information", "Receiver phone number must have correct phone number format");
      return;
    }
    if (receiveInfoForm.receiverAddress === "" || addressString === ""){
      Alert.alert("Missing information", "Receiver address is missing");
      return;
    }
    navigation.navigate('CheckOut', {sendInfo: sendInfo, receiveInfo: receiveInfoForm});
  };

  const [location, setLocation] = useState(null);
  const apiKey = '1ac6150e984944cca2b8066620759a85';
  const [addressString, setAddressString] = useState("");
  useEffect(() => {
    getGeocodingData()
  }, [receiveInfoForm.receiverAddress]);
  useEffect(() => {
    if (location === null)
      return;
    const housenumber = location.housenumber === undefined ? '' : `${location.housenumber}, `;
    const street = location.street === undefined ? '' : `${location.street}, `;
    const district = location.district === undefined ? '' : `${location.district}, `;
    const city = location.city === undefined ? '' : `${location.city}, `;
    const state = location.state === undefined ? '' : `${location.state}, `;
    const country = location.country === undefined ? '.' : `${location.country}. `;
    setAddressString(`${housenumber}${street}${district}${city}${state}${country}`);
    if (receiveInfoForm.receiverAddress.length === 0){
      setAddressString("");
    }
  }, [location])

  const getGeocodingData = async () => {
    const response = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${receiveInfoForm.receiverAddress}&apiKey=${apiKey}`)
    .then((response) => {
      setLocation(response.data.features[0].properties);
    })
    .catch((error) => {
      
    });
  }

  return (
    <View style = { styles.container}>
      <View style={{flex: 1}}>
        <Text style = { styles.title }>Receiver Details</Text>

        <TextInput
          style = { styles.input }
          placeholder="Receiver Name"
          value={receiveInfoForm.receiverName}
          onChangeText={(value) => setReceiveInfoForm({...receiveInfoForm, receiverName: value})}
        />

        <TextInput
          style = { styles.input }
          placeholder="Receiver Mobile Number"
          value={receiveInfoForm.receiverMobileNumber}
          onChangeText={(value) => setReceiveInfoForm({...receiveInfoForm, receiverMobileNumber: value})}
          keyboardType="numeric"
        />

        <TextInput
          style = { styles.input }
          placeholder="Receiver Address"
          value={receiveInfoForm.receiverAddress}
          onChangeText={(value) => setReceiveInfoForm({...receiveInfoForm, receiverAddress: value})}
        />

        {addressString !== "" && receiveInfoForm.receiverAddress !== "" && location !== null && (
          <View styles={{flexDirection: 'row',}}>
            <Text style={styles.suggested}>Suggested: {addressString}</Text>
            <Button
              title="Use suggestion" 
              onPress={() => setReceiveInfoForm({...receiveInfoForm, receiverAddress: addressString})}
              type='clear'
            />
          </View>
        )}

        <TextInput
          style = { styles.input }
          placeholder="Enter Message"
          value={receiveInfoForm.message}
          onChangeText={(value) => setReceiveInfoForm({...receiveInfoForm, message: value})}
        />
      </View>
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
  suggested: {
    marginBottom: 20,
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: '200'
  },
});

export default ReceiveInfoScreen;