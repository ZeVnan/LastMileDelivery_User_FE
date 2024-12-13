import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import { WebView } from 'react-native-webview'
import { Button2, Button3 } from '../CommonComponents/Button';

const PaymentScreen = ({navigation, route}) => {
  const {orderId, payResult} = route.params;
  const [order, setOrder] = useState([]);
  const [payUrl, setPayUrl] = useState('');
  const getIconProps = () => {
    switch (payResult) {
        case 'pending':
            return { name: 'pending-actions', color: '#c7a302' };
        case 'failed':
            return { name: 'cancel', color: '#ed0707' };
        case 'success':
            return { name: 'check-circle', color: '#03ff2d' };
    }
  }
  const iconProps = getIconProps();
  const getOrder = async (orderId) => {
    try {
      const response = await fetch(`https://waseminarcnpm2.azurewebsites.net/protected/order?id=${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok){
        const result = await response.json();
        setOrder(result);
      }
      else{
        Alert.alert("Error", "Cannot load order information");
      }
    }
    catch (error){
      Alert.alert("Error", "Something went wrong")
    }
  }
  useEffect(() => {getOrder(orderId)}, []);
  const ReturnHome = () => {
    navigation.navigate('Home');
  }
  const Pay = async(amount) => {
    amount = amount * 25000;
    try{
      const response = await fetch(`https://waseminarcnpm2.azurewebsites.net/protected/pay/momo?amount=${amount}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify({ amount }),
      });
      if (response.ok){
        const result = await response.json();
        setPayUrl(result.payUrl);
        await Linking.openURL(result.payUrl);
      }
      else{
        Alert.alert("Error", `${response.status}`);
      }
    }
    catch(error) {
      Alert.alert("Error", "Something went wrong");
    }
  }
  const fakeData = {
    orderId: '32mn59d3y4d',
    value: '100',
    payResult: 'failed',
    sender: 'A',
    receiver: 'B',
    payWith: 'Momo',
  }
  return (
    <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.textTitle}>
            Payment for order 
          </Text>
          <Text style={[styles.textTitle, styles.textTitleHighlighted]} numberOfLines={1}adjustsFontSizeToFit={true}>
            #{orderId}
          </Text>
          <Text style={styles.textValue}>
            ${order.deliveryInfo?.value}
          </Text>
          <Icon
                    name={iconProps.name}
                    type='material'
                    size={100}
                    color={iconProps.color}/>
          <View style={styles.orderSummaryRow}>
            <Text style={styles.orderSummaryLabel}>Sender</Text>
            <Text style={styles.orderSummaryValue}>{order.senderInfo?.name}</Text>
          </View>
          <View style={styles.orderSummaryRow}>
            <Text style={styles.orderSummaryLabel}>Receiver</Text>
            <Text style={styles.orderSummaryValue}>{order.receiverInfo?.name}</Text>
          </View>
          <View style={styles.orderSummaryRow}>
            <Text style={styles.orderSummaryLabel}>Pay with</Text>
            <Text style={styles.orderSummaryValue}>{order.payWith}</Text>
          </View>
        </View>
        {payResult === 'pending' && (
          <View>
            <Button2 
              title="Pay Now"
              customStyle={styles.button}
              onPressEvent={() => {Pay(order.deliveryInfo?.value)}}/>
            <Button3
              title="Cancel"
              onPressEvent={ReturnHome}/>
          </View>
        )}
        {payResult === 'failed' && (
          <View>
            <Button2 
              title="Pay Again"
              customStyle={styles.button}
              onPressEvent={() => {Pay(order.deliveryInfo?.value)}}/>
            <Button3
              title="Cancel"
              onPressEvent={ReturnHome}/>
          </View>
        )}
        {payResult === 'success' && (
          <Button2
            title="Return Home"
            onPressEvent={ReturnHome}/>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    contentContainer: {
      flex: 1,
      paddingVertical: 20,
      alignItems: 'center',
    },
    textTitle: {
      textAlign:'center',
      fontWeight: 'bold',
      fontSize: 28,
    },
    textTitleHighlighted: {
      color: '#03ff2d',
    },
    textValue: {
      textAlign:'center',
      fontWeight: 'bold',
      fontSize: 24,
      paddingVertical: 5,
    },
    orderSummaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      width: '100%',
      marginVertical: 5,
      backgroundColor: '#e0e0e0',
      borderRadius: 15,
    },
    orderSummaryLabel: {
      fontSize: 16,
    },
    orderSummaryValue: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    button: {
      marginBottom: 10,
    },
    webViewContainer: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 10,
      backgroundColor: 'white',
    },
});

export default PaymentScreen;