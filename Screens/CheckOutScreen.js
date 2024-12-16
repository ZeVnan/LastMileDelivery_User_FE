import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { UserContext } from '../Utilities/UserContext';
import { InfoCard } from '../CommonComponents/Card';
import { Button2 } from '../CommonComponents/Button';

const CheckOutScreen = ({navigation, route}) => {
  const {senderInfo, receiverInfo, deliveryInfo} = route.params;
  const { token } = useContext(UserContext);
  
  const handleCheckout = async () => {
    if (selectedPayType === ''){
      Alert.alert("Missing Payment Method");
      return;
    }
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
          },
          deliveryInfo: {
            shipmentType: deliveryInfo.shipmentType,
            deliveryType: deliveryInfo.deliveryType,
            status: "pending",
            packageSize: deliveryInfo.packageSize,
            pickupDate: formattedDate,
            pickupTime: formattedTime,
            value: deliveryInfo.value,
          },
          hudId: "",
          message: receiverInfo.message === "" ? "-" : receiverInfo.message,
          payStatus: 'pending',
          payWith: selectedPayType,
        }),
      });
      if (response.ok){
        const result = await response.json();
        if (selectedPayType === 'momo'){
          const order = result["order##"]
          navigation.navigate('Payment', ({order: order, payResult: 'pending'}));
        }
        else {
          navigation.navigate('Home');
        }
      }
      else{
        const result = await response.json()
        Alert.alert(result);
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
  const shippingFee = shippingFees[deliveryInfo.shipmentType] || 0.00;
  const deliveryFee = deliveryFees[deliveryInfo.deliveryType] || 0.00;
  const discount = 2.00;
  const total = Number(deliveryInfo.value) + shippingFee + deliveryFee - discount;

  const [openPayType, setOpenPayType] = useState(false);
  const [selectedPayType, setSelectedPayType] = useState('');
  const [payTypeItems, setPayTypeItems] = useState([
      { label: "Momo", value: "momo" },
      { label: "Cash", value: "cash" },
      { label: "Wallet", value: "wallet" }
  ]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollArea}>
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
          <Text style={styles.itemTitle}>Summary</Text>
          <View style={styles.orderSummaryRow}>
            <Text style={styles.orderSummaryLabel}>Value</Text>
            <Text style={styles.orderSummaryValue}>${deliveryInfo.value}</Text>
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
            <Text style={[styles.orderSummaryValue, {fontWeight: 'bold'}]}>${total}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>Select Payment Method</Text>
        <DropDownPicker
              open={openPayType}
              value={selectedPayType}
              items={payTypeItems}
              setOpen={setOpenPayType}
              setValue={setSelectedPayType}
              setItems={setPayTypeItems}
              placeholder="None"
              containerStyle={styles.dropDownPicker}/>
        <Button2 
          title={selectedPayType === 'momo' ? "Create Order And Pay" : "Create Order"}
          onPressEvent={handleCheckout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollArea: {
    flex: 1,
  },
  itemContainer: {
    
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  orderSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  orderSummaryLabel: {
    fontSize: 12,
  },
  orderSummaryValue: {
    fontSize: 12,
  },
  dropDownPicker: {
    marginBottom: 20,
  },
});

export default CheckOutScreen;