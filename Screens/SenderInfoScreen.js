import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { UserContext } from '../Utilities/UserContext';
import { Button2 } from '../CommonComponents/Button';
import { stylesInput } from '../CommonComponents/Input'

const SenderInfoScreen = ({navigation}) => {
  const { userId } = useContext(UserContext);
  const [senderInfoForm, setSenderInfoForm] = useState({
    senderId: userId,
    senderName: "",
    senderMobileNumber: "",
    senderAddress: "",
  });
  //===ADDRESS===
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
    if (senderInfoForm.senderAddress.length === 0){
      setAddressString("");
    }
  }
  const getGeocodingData = async () => {
    const response = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${senderInfoForm.senderAddress}&apiKey=${apiKey}`)
    .then((response) => {
      setLocations(response.data.features);
      setLocation(response.data.features[0].properties);
    })
    .catch((error) => {
      
    });
  }
  useEffect(
    () => {getGeocodingData()}, 
    [senderInfoForm.senderAddress]);
  useEffect(
    () => {assembleAddressString()},
    [location])
  //===============
  const handleSenderInfo = () => {
    
    if (senderInfoForm.senderName === ""){
      Alert.alert("Missing information", "Sender name is missing");
      return;
    }
    if (senderInfoForm.senderMobileNumber === ""){
      Alert.alert("Missing information", "Sender phone number is missing");
      return;
    }
    if (!/^\d{11}$/.test(senderInfoForm.senderMobileNumber)){
      Alert.alert("Wrong format", "Sender phone number must have correct phone number format (11 numbers)");
      return;
    }
    if (senderInfoForm.senderAddress === "" || addressString === ""){
      Alert.alert("Missing information", "Sender address is missing");
      return;
    }
    navigation.navigate('Receiver Information', {senderInfo: senderInfoForm});
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={stylesInput.textInput0}
          placeholder="Sender Name"
          value={senderInfoForm.senderName}
          onChangeText={(value) => setSenderInfoForm({...senderInfoForm, senderName: value})}/>

        <TextInput
          style={stylesInput.textInput0}
          placeholder="Sender Mobile Number"
          value={senderInfoForm.senderMobileNumber}
          onChangeText={(value) => setSenderInfoForm({...senderInfoForm, senderMobileNumber: value})}
          keyboardType="numeric"/>

        <TextInput
          style={stylesInput.textInput0}
          placeholder="Sender Address"
          value={senderInfoForm.senderAddress}
          onChangeText={(value) => setSenderInfoForm({...senderInfoForm, senderAddress: value})}/>
        {addressString !== "" && senderInfoForm.senderAddress !== "" && location !== null && (
        <View style={styles.suggestedContainer}>
          <Text style={styles.suggestedText}>Suggested locations</Text>
          <ScrollView style={styles.locationListContainer}>
            {locations.map((location, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSenderInfoForm({ ...senderInfoForm, senderAddress: location.properties.formatted })}
                style={styles.buttonContainer}>
                <Text style={styles.buttonTitle}>{location.properties.formatted}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        )}
      </View>
      <Button2 
        title="Confirm Sender Information" 
        onPressEvent={handleSenderInfo}/>
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

export default SenderInfoScreen;
