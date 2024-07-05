import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';

const ReceiveInfoScreen = ({navigation, route}) => {
  const [receiverUsername, setReceiverUsername] =useState("");
  const [receiveInfoForm, setReceiveInfoForm] = useState({
    receiverName: "",
    receiverMobileNumber: "",
    receiverAddress: "",
    receiverId: "",
    message: "",
  })
  const {sendInfo} = route.params;

  const handleSendPackage = () => {
    getUserId();
    if (receiveInfoForm.receiverId === ""){
      Alert.alert("Missing data", "Receiver username is missing or not found");
      return;
    }
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
  const [locations, setLocations] = useState([]);
  const apiKey = '1ac6150e984944cca2b8066620759a85';
  const [addressString, setAddressString] = useState("");
  const [suggestedLocationIndex, setSuggestedLocationIndex] = useState(0);
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
      setLocations(response.data.features);
      setLocation(locations[0].properties)
    })
    .catch((error) => {
      
    });
  }

  const getUserId = async() => {
    try{
      const response = await fetch('https://waseminarcnpm.azurewebsites.net/getUserIdByUsername',{
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
        setReceiveInfoForm({...receiveInfoForm, receiverId: result.userId})
      }
    }
    catch (error){
      Alert.alert(`${error.message}`);
    }
  }

  return (
    <View style = { styles.container}>
      <View style={{flex: 1}}>
        <Text style = { styles.title }>Receiver Details</Text>

        <TextInput
          style = { styles.input }
          placeholder="Receiver Username"
          value={receiverUsername}
          onChangeText={setReceiverUsername}
        />

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
          <View>
             <Text style={styles.suggested}>Suggested: {addressString}</Text>
             <View styles={{flexDirection: 'row',}}>
            <Button
              title="Use suggestion" 
              onPress={() => setReceiveInfoForm({...receiveInfoForm, receiverAddress: addressString})}
              type='clear'
            />
            {locations.length > 1 && (
              <Button
              title="Other suggestion" 
              onPress={() => {
                setSuggestedLocationIndex(suggestedLocationIndex + 1)
                if (suggestedLocationIndex >= locations.length - 1){
                  setSuggestedLocationIndex(0);
                }
                setLocation(locations[suggestedLocationIndex].properties);
              }}
              type='clear'
            />
            )}
          </View>
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