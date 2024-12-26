import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { stylesInput } from '../CommonComponents/Input';
import { Button2 } from '../CommonComponents/Button';

const DeliveryInfoScreen = ({navigation, route}) => {
    const [deliveryInfoForm, setDeliveryInfoForm] = useState({
        shipmentType: "",
        deliveryType: "",
        pickupDate: new Date(),
        pickupTime: new Date(),
        packageSize: 0,
        value: 0,
    });
    const {senderInfo, receiverInfo} = route.params;
    //===SHIPMENT TYPE===
    const [openShipmentType, setOpenShipmentType] = useState(false);
    const [selectedShipmentType, setSelectedShipmentType] = useState(deliveryInfoForm.shipmentType);
    const [shipmentTypeItems, setShipmentTypeItems] = useState([
        { label: "Document", value: "Document" },
        { label: "Package", value: "Package" },
        { label: "Parcel", value: "Parcel" }
    ]);
    useEffect(
        () => {setDeliveryInfoForm({ ...deliveryInfoForm, shipmentType: selectedShipmentType });},
        [selectedShipmentType]);
    //===DELIVERY TYPE===
    const [openDeliveryType, setOpenDeliveryType] = useState(false);
    const [selectedDeliveryType, setSelectedDeliveryType] = useState(deliveryInfoForm.deliveryType);
    const [deliveryTypeItems, setDeliveryTypeItems] = useState([
        { label: "Standard", value: "Standard" },
        { label: "Express", value: "Express" },
        { label: "Same Day", value: "SameDay" }
    ]);
    useEffect(
        () => {setDeliveryInfoForm({ ...deliveryInfoForm, deliveryType: selectedDeliveryType });},
        [selectedDeliveryType]);
    //===PICK UP DATE===
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || deliveryInfoForm.pickupDate;
        setDeliveryInfoForm({...deliveryInfoForm, pickupDate: currentDate});
        setDatePickerVisible(false);
    };
    //===PICK UP TIME===
    const [timePickerVisible, settimePickerVisible] = useState(false);
    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || deliveryInfoForm.pickupTime;
        setDeliveryInfoForm({...deliveryInfoForm, pickupTime: currentTime});
        settimePickerVisible(false);
    };
    const handleDeliveryInfo = () => {
        if (deliveryInfoForm.shipmentType === ""){
            Alert.alert("Missing information", "Shipment type is missing");
            return;
        }
        if (deliveryInfoForm.deliveryType === ""){
            Alert.alert("Missing information", "Delivery type is missing");
            return;
        }
        if (deliveryInfoForm.packageSize === 0){
            Alert.alert("Missing information", "Package size is missing");
            return;
        }
        if (deliveryInfoForm.value === 0){
          Alert.alert("Missing information", "Package value is missing");
          return;
      }
        if (!/^[0-9]*\.?[0-9]*$/.test(deliveryInfoForm.packageSize)){
            Alert.alert("Wrong format", "Package size must be number");
            return;
        }
        if (!/^[0-9]*\.?[0-9]*$/.test(deliveryInfoForm.value)){
          Alert.alert("Wrong format", "Package value must be number");
          return;
      }
        navigation.navigate(
          'Check Out', 
            {senderInfo: senderInfo,
            receiverInfo: receiverInfo,
            deliveryInfo: deliveryInfoForm});
    }
    
    return(
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <View style={styles.pickerInfoContainer}>
              <Text style={styles.textInfo}>Pick up date</Text>
              <TouchableOpacity 
                style={styles.buttonPicker}
                onPress={() => setDatePickerVisible(true)}>
                <Text style={styles.textPicker}>
                  {deliveryInfoForm.pickupDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </View>
            {datePickerVisible && (
              <DateTimePicker
                value={deliveryInfoForm.pickupDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChangeDate}/>
            )}
            <View style={styles.pickerInfoContainer}>
              <Text style={styles.textInfo}>Pick up time</Text>
              <TouchableOpacity 
                style={styles.buttonPicker}
                onPress={() => settimePickerVisible(true)}>
                <Text style={styles.textPicker}>
                  {deliveryInfoForm.pickupTime.toLocaleTimeString()}
                </Text>
              </TouchableOpacity>
            </View>
            {timePickerVisible && (
              <DateTimePicker
                value={deliveryInfoForm.pickupTime}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChangeTime}/>
            )}
            <View style={styles.pickerInfoContainer}>
              <Text style={styles.textInfo}>Shipment type</Text>
              <DropDownPicker
                open={openShipmentType}
                value={selectedShipmentType}
                items={shipmentTypeItems}
                setOpen={setOpenShipmentType}
                setValue={setSelectedShipmentType}
                setItems={setShipmentTypeItems}
                placeholder="None"
                containerStyle={styles.dropDownPicker}/>
            </View>
            <View style={styles.pickerInfoContainer}>
              <Text style={styles.textInfo}>Delivery type</Text>
              <DropDownPicker
                open={openDeliveryType}
                value={selectedDeliveryType}
                items={deliveryTypeItems}
                setOpen={setOpenDeliveryType}
                setValue={setSelectedDeliveryType}
                setItems={setDeliveryTypeItems}
                placeholder="None"
                containerStyle={styles.dropDownPicker}
                style={styles.dropDownPickerList}/>
            </View>
            <TextInput
              style={stylesInput.textInput0}
              placeholder="Package Size (kg)"
              value={deliveryInfoForm.packageSize}
              onChangeText={(value) => setDeliveryInfoForm({...deliveryInfoForm, packageSize: value})}
              keyboardType="numeric"/>
            <TextInput
              style={stylesInput.textInput0}
              placeholder="Package Value ($)"
              value={deliveryInfoForm.value}
              onChangeText={(value) => setDeliveryInfoForm({...deliveryInfoForm, value: value})}
              keyboardType="numeric"/>
          </View>
          <Button2
            title="Confirm Delivery Information"
            onPressEvent={handleDeliveryInfo}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    inputContainer: {
      flex: 1,
    },
    pickerInfoContainer: {
      flexDirection: 'row',
      paddingVertical: 10,
      alignItems: 'center',
    },
    textInfo: {
      fontSize: 16,
      paddingVertical: 5,
      marginRight: 10,
    },
    textPicker: {
      fontSize: 16,
    },
    buttonPicker: {
      backgroundColor: '#ffffff',
      paddingHorizontal: 20,
      height: 50,
      justifyContent: 'center',
      borderRadius: 20,
      flex: 1,
    },
    dropDownPicker: {
      flex: 1,
    },
    dropDownPickerList:{
      zIndex: 5,
    }
  });

export default DeliveryInfoScreen;