import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-elements';

const SendInfoScreen = ({navigation}) => {
  const [sendInfoForm, setSendInfoForm] = useState({
    shipmentType: "",
    deliveryType: "",
    senderName: "",
    senderMobileNumber: "",
    senderAddress: "",
    pickupDate: new Date(),
    pickupTime: new Date(),
    packageSize: 0,
  });
  const [openShipmentType, setOpenShipmentType] = useState(false);
  const [shipmentTypeItems, setShipmentTypeItems] = useState([
    { label: "Document", value: "Document" },
    { label: "Package", value: "Package" },
    { label: "Parcel", value: "Parcel" }
  ]);
  const [openDeliveryType, setOpenDeliveryType] = useState(false);
  const [deliveryTypeItems, setDeliveryTypeItems] = useState([
    { label: "Standard", value: "Standard" },
    { label: "Express", value: "Express" },
    { label: "Same Day", value: "SameDay" }
  ]);

  const handleSendPackage = () => {
    if (sendInfoForm.shipmentType === ""){
      Alert.alert("Missing information", "Shipment type is missing");
      return;
    }
    if (sendInfoForm.deliveryType === ""){
      Alert.alert("Missing information", "Delivery type is missing");
      return;
    }
    if (sendInfoForm.senderName === ""){
      Alert.alert("Missing information", "Sender name is missing");
      return;
    }
    if (sendInfoForm.senderMobileNumber === ""){
      Alert.alert("Missing information", "Sender phone number is missing");
      return;
    }
    if (!/^\d{11}$/.test(sendInfoForm.senderMobileNumber)){
      Alert.alert("Wrong format", "Sender phone number must have correct phone number format");
      return;
    }
    if (sendInfoForm.senderAddress === ""){
      Alert.alert("Missing information", "Sender address is missing");
      return;
    }
    if (sendInfoForm.packageSize === 0){
      Alert.alert("Missing information", "Package size is missing");
      return;
    }
    if (!/^\d+$/.test(sendInfoForm.packageSize)){
      Alert.alert("Wrong format", "Package size must be number");
      return;
    }
    navigation.navigate('Receive Confirmation', {sendInfo: sendInfoForm});
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || sendInfoForm.pickupDate;
    setSendInfoForm({...sendInfoForm, pickupDate: currentDate});
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || sendInfoForm.pickupTime;
    setSendInfoForm({...sendInfoForm, pickupTime: currentTime});
  };

  const [selectedDeliveryType, setSelectedDeliveryType] = useState(sendInfoForm.deliveryType);
  const [selectedShipmentType, setSelectedShipmentType] = useState(sendInfoForm.shipmentType);

  useEffect(() => {
    setSendInfoForm({ ...sendInfoForm, deliveryType: selectedDeliveryType });
  }, [selectedDeliveryType]);
  useEffect(() => {
    setSendInfoForm({ ...sendInfoForm, shipmentType: selectedShipmentType });
  }, [selectedShipmentType]);

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.title}>Sender Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Sender Name"
          value={sendInfoForm.senderName}
          onChangeText={(value) => setSendInfoForm({...sendInfoForm, senderName: value})}
        />

        <TextInput
          style={styles.input}
          placeholder="Sender Mobile Number"
          value={sendInfoForm.senderMobileNumber}
          onChangeText={(value) => setSendInfoForm({...sendInfoForm, senderMobileNumber: value})}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Sender Address"
          value={sendInfoForm.senderAddress}
          onChangeText={(value) => setSendInfoForm({...sendInfoForm, senderAddress: value})}
        />

        <Text style={styles.title}>Pick Up Time</Text>
        <View style = {styles.pickerContainer2}>
          <Text style={styles.dateTimeLabel}>Date</Text>
          <DateTimePicker
            value={sendInfoForm.pickupDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        </View>
        <View style = {styles.pickerContainer2}>
          <Text style={styles.dateTimeLabel}>Time</Text>
          <DateTimePicker
            value={sendInfoForm.pickupTime}
            mode="time"
            display="default"
            onChange={onChangeTime}
          />
        </View>

        <Text style={styles.title}>Package Size</Text>
        <TextInput
          style={styles.input}
          placeholder="Package Size (kg)"
          value={sendInfoForm.packageSize}
          onChangeText={(value) => setSendInfoForm({...sendInfoForm, packageSize: value})}
          keyboardType="numeric"
        />

        <Text style={styles.title}>Shipment Type</Text>
        <DropDownPicker
          open={openShipmentType}
          value={selectedShipmentType}
          items={shipmentTypeItems}
          setOpen={setOpenShipmentType}
          setValue={setSelectedShipmentType}
          setItems={setShipmentTypeItems}
          placeholder="Select Shipment Type"
          style={styles.picker}
          containerStyle={[styles.pickerContainer, {zIndex: 10}]}
        />

        <Text style={styles.title}>Delivery Type</Text>
        <DropDownPicker
          open={openDeliveryType}
          value={selectedDeliveryType}
          items={deliveryTypeItems}
          setOpen={setOpenDeliveryType}
          setValue={setSelectedDeliveryType}
          setItems={setDeliveryTypeItems}
          placeholder="Select Delivery Type"
          style={styles.picker}
          containerStyle={[styles.pickerContainer, {zIndex: 5}]}
        />
      </View>
      <Button
          title="Help With Packaging"
          onPress={() => navigation.navigate('Chat')}
          type='clear'
      />
      <Button 
          title="Confirm Send Information" 
          onPress={handleSendPackage} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
    marginHorizontal: 20,
    fontSize: 16,
  },
  picker: {
    fontSize: 16,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  pickerContainer2: {
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  dateTimeLabel: {
    alignSelf:'center',
    fontSize: 16
  },
});

export default SendInfoScreen;
