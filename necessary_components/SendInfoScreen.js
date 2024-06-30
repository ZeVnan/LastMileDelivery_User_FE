import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Platform, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-elements';

const SendInfoScreen = ({navigation}) => {
  const [shipmentType, setShipmentType] = useState('');
  const [openShipmentType, setOpenShipmentType] = useState(false);
  const [shipmentTypeItems, setShipmentTypeItems] = useState([
    { label: 'Document', value: 'document' },
    { label: 'Package', value: 'package' },
    { label: 'Parcel', value: 'parcel' }
  ]);

  const [senderName, setSenderName] = useState('');
  const [senderMobileNumber, setSenderMobileNumber] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(new Date());
  const [packageSize, setPackageSize] = useState('');
  const [deliveryType, setDeliveryType] = useState('');
  const [openDeliveryType, setOpenDeliveryType] = useState(false);
  const [deliveryTypeItems, setDeliveryTypeItems] = useState([
    { label: 'Standard', value: 'standard' },
    { label: 'Express', value: 'express' },
    { label: 'Same Day', value: 'same_day' }
  ]);
  const [message, setMessage] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSendPackage = () => {
    navigation.navigate('Receive Confirmation');
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || pickupDate;
    setShowDatePicker(Platform.OS === 'ios');
    setPickupDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || pickupTime;
    setShowTimePicker(Platform.OS === 'ios');
    setPickupTime(currentTime);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Shipment Type</Text>

        <DropDownPicker
          open={openShipmentType}
          value={shipmentType}
          items={shipmentTypeItems}
          setOpen={setOpenShipmentType}
          setValue={setShipmentType}
          setItems={setShipmentTypeItems}
          placeholder="Select Shipment Type"
          style={styles.picker}
          containerStyle={styles.pickerContainer}
        />

        <Text style={styles.title}>Sender Details</Text>
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
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Sender Address"
          value={senderAddress}
          onChangeText={setSenderAddress}
        />

        <View style = {styles.pickerContainer2}>
          <Text style={styles.dateTimeLabel}>Pick Up Date</Text>
          <DateTimePicker
            value={pickupDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        </View>

        <View style = {styles.pickerContainer2}>
          <Text style={styles.dateTimeLabel}>Pick Up Time</Text>
          <DateTimePicker
            value={pickupTime}
            mode="time"
            display="default"
            onChange={onChangeTime}
          />
        </View>

        <Text style={styles.title}>Package Size</Text>
        <TextInput
          style={styles.input}
          placeholder="Package Size (kg)"
          value={packageSize}
          onChangeText={setPackageSize}
          keyboardType="numeric"
        />

        <Text style={styles.title}>Delivery Type</Text>
        <DropDownPicker
          open={openDeliveryType}
          value={deliveryType}
          items={deliveryTypeItems}
          setOpen={setOpenDeliveryType}
          setValue={setDeliveryType}
          setItems={setDeliveryTypeItems}
          placeholder="Select Delivery Type"
          style={styles.picker}
          containerStyle={styles.pickerContainer}
        />
        <Button
          title="Help With Packaging"
          onPress={() => navigation.navigate('Chat')}
        />
      </ScrollView>
      <Button title="Confirm Send Information" onPress={handleSendPackage} />
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
