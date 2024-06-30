import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

const CheckOutScreen = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Master Card');

  const handlePayNow = () => {
    // Implement payment processing logic here
    console.log('Payment processing...');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Your Order</Text>

          <Text style={ styles.orderInfo}>
            From:
          </Text>
          <Text style={ styles.orderName}>
            Johnson Smith
          </Text>
          <Text style={ styles.orderAddress}>
            4517 Washington Ave. Manchester, Kentucky 39495
          </Text>
          <Text style={ styles.orderPhoneNumber}>
          (209) 555-0104
          </Text>

          <Text style={ styles.orderInfo}>
            To:
          </Text>
          <Text style={ styles.orderName}>
            Arlene McCoy
          </Text>
          <Text style={ styles.orderAddress}>
            8502 Preston Rd. Inglewood, Maine 98380
          </Text>
          <Text style={ styles.orderPhoneNumber}>
            (308) 555-0121
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
            <Text style={styles.orderSummaryLabel}>Shipping Fee</Text>
            <Text style={styles.orderSummaryValue}>$3.00</Text>
          </View>
          <View style={styles.orderSummaryRow}>
            <Text style={styles.orderSummaryLabel}>Discount</Text>
            <Text style={styles.orderSummaryValue}>-$2.00</Text>
          </View>
          <View style={styles.orderSummaryRow}>
            <Text style={styles.orderSummaryLabel}>Total</Text>
            <Text style={styles.orderSummaryValue}>$3.02</Text>
          </View>
        </View>
      </ScrollView>
      <Button 
        title="Pay Now" onPress={handlePayNow} 
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