import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { UserContext } from '../Utilities/UserContext';
import { InfoCard } from '../CommonComponents/InfoCard';

const CheckOutScreen = ({navigation, route}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Master Card');
  const {senderInfo, receiverInfo, deliveryInfo} = route.params;
  const { token } = useContext(UserContext);
  
  useEffect(() => {
    try{

    }
    catch(error){

    }
  }, [receiverInfo]);
  const handleCheckout = async () => {
    const hours = deliveryInfo.pickupTime.getHours().toString().padStart(2, '0');
    const minutes = deliveryInfo.pickupTime.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    
    const year = deliveryInfo.pickupDate.getFullYear();
    const month = (deliveryInfo.pickupDate.getMonth() + 1).toString().padStart(2, '0');
    const day = deliveryInfo.pickupDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    try{
      const response = await fetch('https://waseminarcnpm2.azurewebsites.net/protected/confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          shipmentType: deliveryInfo.shipmentType,
          deliveryType: deliveryInfo.deliveryType,
          packageSize: deliveryInfo.packageSize,
          weight: deliveryInfo.packageSize,
          pickupDate: formattedDate,
          pickupTime: formattedTime,
          status: "pending",
          value: value,
          hudId: "",
          deliveryAddress: receiverInfo.receiverAddress,
          message: receiverInfo.message === "" ? "-" : receiverInfo.message,
          inProgress: true,
          senderInfo: {
            userId: senderInfo.senderId,
            name: senderInfo.senderName,
            address: senderInfo.senderAddress,
            phoneNumber: senderInfo.senderMobileNumber,
          },
          receiverInfo: {
            userId: receiverInfo.receiverId,
            name: receiverInfo.receiverName,
            address: receiverInfo.receiverAddress,
            phoneNumber: receiverInfo.receiverMobileNumber,
          }
        }),
      });
      if (response.ok){
        navigation.navigate('Home');
      }
      else{
        const result = await response.json()
        console.log(result.err);
      }
    }
    catch(error){
      Alert.alert("Something went wrong");
    }
  };
  const shippingFees = {
    Document: 1.00,
    Package: 5.00 * deliveryInfo.packageSize * 0.1,
    Parcel: 2.50 * deliveryInfo.packageSize * 0.1,
  }
  const deliveryFees = {
    Standard: 0.75,
    Express: 3.00,
    SameDay: 8.00,
  }
  const shippingFee = shippingFees[deliveryInfo.shipmentType] || 0;
  const deliveryFee = deliveryFees[deliveryInfo.deliveryType] || 0;
  const discount = 2.00;
  const value = 10.00;
  const total = value + shippingFee + deliveryFee - discount;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Your Order</Text>

          <InfoCard
            name={senderInfo.senderName}
            address={senderInfo.senderAddress}
            phoneNumber={senderInfo.senderMobileNumber}
            from={true}/>
          <InfoCard
            name={receiverInfo.receiverName}
            address={receiverInfo.receiverAddress}
            phoneNumber={receiverInfo.receiverMobileNumber}
            from={false}/>
          

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
        title="Pay Now" onPress={handleCheckout} 
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