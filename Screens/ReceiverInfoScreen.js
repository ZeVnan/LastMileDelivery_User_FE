import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import {stylesInput} from '../CommonComponents/Input'
import { Button2 } from '../CommonComponents/Button'

const ReceiverInfoScreen = ({navigation, route}) => {
  const [receiverUsername, setReceiverUsername] =useState("");
  const [receiverInfoForm, setReceiverInfoForm] = useState({
    receiverName: "",
    receiverMobileNumber: "",
    receiverAddress: "",
    receiverId: "",
    message: "",
  })
  const {senderInfo} = route.params;

  const apiKey = '1ac6150e984944cca2b8066620759a85';
  const [location, setLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [addressString, setAddressString] = useState("");
  const assembleAddressString = () => {
    if (location === null)
      return;
    const housenumber = location.housenumber === undefined ? '' : `${location.housenumber}, `;
    const street = location.street === undefined ? '' : `${location.street}, `;
    const district = location.district === undefined ? '' : `${location.district}, `;
    const city = location.city === undefined ? '' : `${location.city}, `;
    const state = location.state === undefined ? '' : `${location.state}, `;
    const country = location.country === undefined ? '.' : `${location.country}. `;
    setAddressString(`${housenumber}${street}${district}${city}${state}${country}`);
    if (receiverInfoForm.receiverAddress.length === 0){
      setAddressString("");
    }
  }
  const getGeocodingData = async () => {
    const response = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${receiverInfoForm.receiverAddress}&apiKey=${apiKey}`)
    .then((response) => {
      setLocations(response.data.features);
      setLocation(locations[0].properties)
    })
    .catch((error) => {
      
    });
  }
  useEffect(
    () => {getGeocodingData()}, 
    [receiverInfoForm.receiverAddress]);
  useEffect(
    () => {assembleAddressString()},
    [location])

  const getUserId = async() => {
    try{
      const response = await fetch('https://waseminarcnpm2.azurewebsites.net/getUserIdByUsername',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: receiverUsername,
        }),
      });
      if (response.ok){
        const result = await response.json();
        setReceiverInfoForm({...receiverInfoForm, receiverId: result.userId})
        return result.userId;
      }
      else{
        setReceiverInfoForm({...receiverInfoForm, receiverId: ''})
        return '';
      }
    }
    catch (error){
      Alert.alert(`${error.message}`);
      setReceiverInfoForm({...receiverInfoForm, receiverId: ''})
      return '';
    }
  }
  const handleReceiverInfo = async() => {
    if (receiverInfoForm.receiverName === ""){
      Alert.alert("Missing information", "Receiver name is missing");
      return;
    }
    if (!/^\d{11}$/.test(receiverInfoForm.receiverMobileNumber)){
      Alert.alert("Missing information", "Receiver phone number must have correct phone number format (11 numbers)");
      return;
    }
    if (receiverInfoForm.receiverAddress === "" || addressString === ""){
      Alert.alert("Missing information", "Receiver address is missing");
      return;
    }
    const userId = await getUserId();
    if (userId === ''){
      
      Alert.alert("Missing data", "Receiver username is missing or not found");
      return;
    }
  };
  useEffect(
    () => {
      if (receiverInfoForm.receiverId !== ''){
        
        navigation.navigate('Delivery Information', {senderInfo: senderInfo, receiverInfo: receiverInfoForm});
      }
    },
    [receiverInfoForm.receiverId]
  )

  return (
    <View style = {styles.container}>
      <View style={styles.inputContainer}>

        <TextInput
          style = {stylesInput.textInput0}
          placeholder="Receiver Username"
          value={receiverUsername}
          onChangeText={setReceiverUsername}/>

        <TextInput
          style = {stylesInput.textInput0}
          placeholder="Receiver Name"
          value={receiverInfoForm.receiverName}
          onChangeText={(value) => setReceiverInfoForm({...receiverInfoForm, receiverName: value})}/>

        <TextInput
          style = {stylesInput.textInput0}
          placeholder="Receiver Mobile Number"
          value={receiverInfoForm.receiverMobileNumber}
          onChangeText={(value) => setReceiverInfoForm({...receiverInfoForm, receiverMobileNumber: value})}
          keyboardType="numeric"/>

        <TextInput
          style = {stylesInput.textInput0}
          placeholder="Enter Message"
          value={receiverInfoForm.message}
          onChangeText={(value) => setReceiverInfoForm({...receiverInfoForm, message: value})}/>  

        <TextInput
          style = {stylesInput.textInput0}
          placeholder="Receiver Address"
          value={receiverInfoForm.receiverAddress}
          onChangeText={(value) => setReceiverInfoForm({...receiverInfoForm, receiverAddress: value})}/>

        {addressString !== "" && receiverInfoForm.receiverAddress !== "" && location !== null && (
          <View style={styles.suggestedContainer}>
            <Text style={styles.suggestedText}>Suggested locations</Text>
            <ScrollView style={styles.locationListContainer}>
              {locations.map((location, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setReceiverInfoForm({ ...receiverInfoForm, receiverAddress: location.properties.formatted })}
                  style={styles.buttonContainer}>
                  <Text style={styles.buttonTitle}>{location.properties.formatted}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
      <Button2 
        title="Confirm Receiver Information" 
        onPressEvent={handleReceiverInfo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flex: 1,
  },
  suggestedContainer: {
    flex: 1,
    
  },
  locationListContainer:{
    flexDirection: 'column',
    overflow: 'scroll',
    flex: 1,
  },
  suggestedText: {
    fontSize: 16,
    fontWeight: '200'
  },
  buttonTitle: {
    textAlign: 'left', 
    fontSize: 14,  
    marginVertical: 5,
  },
  buttonContainer: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
  },
});

export default ReceiverInfoScreen;