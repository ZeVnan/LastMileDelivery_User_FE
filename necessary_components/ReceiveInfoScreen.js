import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-elements';

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
    if (receiveInfoForm.receiverAddress === ""){
      Alert.alert("Missing information", "Receiver address is missing");
      return;
    }
    navigation.navigate('CheckOut', {sendInfo: sendInfo, receiveInfo: receiveInfoForm});
  };

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
});

export default ReceiveInfoScreen;