import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import { Button2, Button3 } from '../CommonComponents/Button';

const PaymentScreen = ({navigation, route}) => {
  const {order, payResult} = route.params;
  const [payUrl, setPayUrl] = useState('');
  const [currentPayResult, setCurrentPayResult] = useState('');
  const payResultText = currentPayResult === 'pending' ? 'Waiting for payment' 
                      : currentPayResult === 'failed'  ? 'Payment failed'
                      : currentPayResult === 'success' ? 'Payment successfull'
                      : "Unknown";
  useEffect(() => {
    setCurrentPayResult(payResult);
  },[payResult])
  const getIconProps = () => {
    switch (currentPayResult) {
        case 'pending':
            return { name: 'pending-actions', color: '#c7a302' };
        case 'failed':
            return { name: 'cancel', color: '#ed0707' };
        case 'success':
            return { name: 'check-circle', color: '#03ff2d' };
        default:
            return { name: 'help', color: '#000' };
    }
  }
  const iconProps = getIconProps();
  const ReturnHome = () => {
    navigation.navigate('Home');
  }
  const Pay = async(amount) => {
    //amount = amount * 25000;
    if (amount < 1000){
      amount = 1000;
    }
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
      }
      else{
        Alert.alert("Error", `${response.status}`);
      }
    }
    catch(error) {
      Alert.alert("Error", "Something went wrong");
    }
  }
  const changeOrderPayStatus = async() => {
    try{
      const response = await fetch(`https://waseminarcnpm2.azurewebsites.net/protected/order/payStatus?id=${order._id}&payStatus=success`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify({ amount }),
      });
      if (response.ok){
        setCurrentPayResult('success');
        setPayUrl('');
      }
      else{
        Alert.alert("Error", `${response.status}`);
      }
    }
    catch(error) {
      Alert.alert("Error", "Something went wrong");
    }
  }
  const handleWebViewNavigationStateChange = async(navState) => {
    //console.log('Navigated to URL:', navState.url);
    const url = navState.url;
    if (url.startsWith('https://test-payment.momo.vn/v2/gateway/credit/redirect')){
      const urlParams = new URL(navState.url);
      const resultCode = urlParams.searchParams.get('resultCode');
      //console.log('Result code:', resultCode);
      if (resultCode === "0"){
        await changeOrderPayStatus();
      }
    }
  }
  // const fakeData = {
  //   orderId: '32mn59d3y4d',
  //   value: '100',
  //   payResult: 'failed',
  //   sender: 'A',
  //   receiver: 'B',
  //   payWith: 'Momo',
  // }
  return (
    <View style={styles.container}>
        {payUrl !== '' && (
          <View style={styles.webViewContainer}>
            <WebView
              source={{uri: payUrl}}
              onNavigationStateChange={handleWebViewNavigationStateChange}/>
              {currentPayResult !== 'success' && (
                <Button3
                title={'Cancel'}
                onPressEvent={() => {setPayUrl(''); setCurrentPayResult('failed')}}/>
              )}
          </View>
        )}
        <View style={styles.contentContainer}>
          <Text style={styles.textTitle}>
            Payment for order 
          </Text>
          <Text style={[styles.textTitle, styles.textTitleHighlighted]} numberOfLines={1}adjustsFontSizeToFit={true}>
            #{order._id}
          </Text>
          <Text style={styles.textValue}>
            ${order.deliveryInfo.value}
          </Text>
          <Icon
            name={iconProps.name}
            type='material'
            size={100}
            color={iconProps.color}/>
          <Text>
            {payResultText}
          </Text>
          <View style={styles.orderSummaryRow}>
            <Text style={styles.orderSummaryLabel}>Sender</Text>
            <Text style={styles.orderSummaryValue}>{order.senderInfo.name}</Text>
          </View>
          <View style={styles.orderSummaryRow}>
            <Text style={styles.orderSummaryLabel}>Receiver</Text>
            <Text style={styles.orderSummaryValue}>{order.receiverInfo.name}</Text>
          </View>
          <View style={styles.orderSummaryRow}>
            <Text style={styles.orderSummaryLabel}>Pay with</Text>
            <Text style={styles.orderSummaryValue}>{order.payWith}</Text>
          </View>
        </View>
        {currentPayResult === 'pending' && (
          <View>
            <Button2 
              title="Pay Now"
              customStyle={styles.button}
              onPressEvent={() => {Pay(order.deliveryInfo.value)}}/>
            <Button3
              title="Cancel"
              onPressEvent={ReturnHome}/>
          </View>
        )}
        {currentPayResult === 'failed' && (
          <View>
            <Button2 
              title="Pay Again"
              customStyle={styles.button}
              onPressEvent={() => {Pay(order.deliveryInfo.value)}}/>
            <Button3
              title="Cancel"
              onPressEvent={ReturnHome}/>
          </View>
        )}
        {currentPayResult === 'success' && (
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