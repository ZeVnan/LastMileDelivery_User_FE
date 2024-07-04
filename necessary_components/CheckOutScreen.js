import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-elements';

const CheckOutScreen = ({navigation, route}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Master Card');
  const {sendInfo, receiveInfo} = route.params;
  

  const handleCheckout = async () => {
    const hours = sendInfo.pickupTime.getHours().toString().padStart(2, '0');
    const minutes = sendInfo.pickupTime.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    
    const year = sendInfo.pickupDate.getFullYear();
    const month = (sendInfo.pickupDate.getMonth() + 1).toString().padStart(2, '0');
    const day = sendInfo.pickupDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    try{
      const response = await fetch('https://waseminarcnpm.azurewebsites.net/order/confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shipmentType: sendInfo.shipmentType,
          deliveryType: sendInfo.deliveryType,
          packageSize: sendInfo.packageSize,
          weight: 0,
          pickupDate: formattedDate,
          pickupTime: formattedTime,
          status: "",
          value: 0,
          hudId: "",
          deliveryAddress: "",
          message: receiveInfo.message,
          inProgress: true,
          sendInfo: {
            name: sendInfo.senderName,
            address: sendInfo.senderAddress,
            phoneNumber: sendInfo.senderMobileNumber,
          },
          receiverInfo: {
            name: receiveInfo.receiverName,
            address: receiveInfo.receiverAddress,
            phoneNumber: receiveInfo.receiverMobileNumber,
          }
        }),
      });
      if (response.ok){
        navigation.navigate('Home');
      }
      else{
        Alert.alert("Checkout failed");
      }
    }
    catch(error){
      Alert.alert("Something went wrong");
    }
  };
  const shippingFees = {
    Document: 1.00,
    Package: 5.00 * sendInfo.packageSize * 0.1,
    Parcel: 2.50 * sendInfo.packageSize * 0.1,
  }
  const deliveryFees = {
    Standard: 0.75,
    Express: 3.00,
    SameDay: 8.00,
  }
  const shippingFee = shippingFees[sendInfo.shipmentType] || 0;
  const deliveryFee = deliveryFees[sendInfo.deliveryType] || 0;
  const discount = 2.00;
  const value = 10.00;
  const total = value + shippingFee + deliveryFee - discount;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Your Order</Text>

          <Text style={ styles.orderInfo}>
            From:
          </Text>
          <Text style={ styles.orderName}>
            {sendInfo.senderName}
          </Text>
          <Text style={ styles.orderAddress}>
            {sendInfo.senderAddress}
          </Text>
          <Text style={ styles.orderPhoneNumber}>
            {sendInfo.senderMobileNumber}
          </Text>

          <Text style={ styles.orderInfo}>
            To:
          </Text>
          <Text style={ styles.orderName}>
            {receiveInfo.receiverName}
          </Text>
          <Text style={ styles.orderAddress}>
            {receiveInfo.receiverAddress}
          </Text>
          <Text style={ styles.orderPhoneNumber}>
            {receiveInfo.receiverMobileNumber}
          </Text>

        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Select Payment Method</Text>
          <View style={styles.paymentMethodOptions}>
            <Button
              title="Master Card"
              onPress={() => setSelectedPaymentMethod('Master Card')}
              buttonStyle={
                selectedPaymentMethod === 'Master Card'
                  ? styles.selectedPaymentMethodButton
                  : styles.paymentMethodButton
              }
            />
              <Button
                title="+ Add Card"
                onPress={() => setSelectedPaymentMethod('Online Banking')}
                buttonStyle={styles.addCardButton}
                type="outline"
              />
            <Button
              title="Online Banking"
              onPress={() => setSelectedPaymentMethod('Online Banking')}
              buttonStyle={
                selectedPaymentMethod === 'Online Banking'
                  ? styles.selectedPaymentMethodButton
                  : styles.paymentMethodButton
              }
            />
          </View>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Summary</Text>
          <View style={styles.orderSummaryRow}>
            <Text style={styles.orderSummaryLabel}>Value</Text>
            <Text style={styles.orderSummaryValue}>${value}</Text>
          </View>
          <View style={styles.orderSummaryRow}>
            <Text style={styles.orderSummaryLabel}>Transport Fee</Text>
            <Text style={styles.orderSummaryValue}>${shippingFee + deliveryFee}</Text>
          </View>
          <View style={styles.orderSummaryRow}>
            <Text style={styles.orderSummaryLabel}>Discount</Text>
            <Text style={styles.orderSummaryValue}>-${discount}</Text>
          </View>
          <View style={styles.orderSummaryRow}>
            <Text style={styles.orderSummaryLabel}>Total</Text>
            <Text style={styles.orderSummaryValue}>${total}</Text>
          </View>
        </View>
      </ScrollView>
      <Button 
        title="Pay Now" onPress={() => {const hours = sendInfo.pickupTime.getHours().toString().padStart(2, '0');
          const minutes = sendInfo.pickupTime.getMinutes().toString().padStart(2, '0');
          const formattedTime = `${hours}:${minutes}`;
          
          const year = sendInfo.pickupDate.getFullYear();
          const month = (sendInfo.pickupDate.getMonth() + 1).toString().padStart(2, '0');
          const day = sendInfo.pickupDate.getDate().toString().padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}`;
      
          Alert.alert(`${formattedDate}`, `${formattedTime}`)
          return;}} 
        buttonStyle={styles.confirmButton}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {

  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderInfo: {
    fontSize: 16,
    marginHorizontal: 20,
    marginBottom: 5,
  },
  orderName: {
    fontSize: 13,
    marginHorizontal: 30,
    marginBottom: 5,
  },
  orderAddress: {
    fontSize: 13,
    marginHorizontal: 40,
    marginBottom: 5,
  },
  orderPhoneNumber: {
    fontSize: 13,
    marginHorizontal: 40,
    marginBottom: 5,
  },
  paymentMethodOptions: {
    flexDirection: 'column',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  selectedPaymentMethodButton: {
    marginVertical: 5
  },
  paymentMethodButton: {
    marginVertical: 5,
    backgroundColor: '#e6e6e6',
  },
  addCardButton: {
    marginHorizontal: 20,
  },
  orderSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  orderSummaryLabel: {
    fontSize: 16,
  },
  orderSummaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton:{
    
  },
});

export default CheckOutScreen;