import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';

const CheckOutScreen = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Master Card');

  const handlePayNow = () => {
    // Implement payment processing logic here
    console.log('Payment processing...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      <View style={styles.orderDetails}>
        <Text style={styles.orderTitle}>Your Order</Text>
        <Text style={styles.orderInfo}>
          Johnson Smith
          4517 Washington Ave. Manchester, Kentucky 39495
          (209) 555-0104
        </Text>
        <Text style={styles.orderInfo}>
          Arlene McCoy
          8502 Preston Rd. Inglewood, Maine 98380
          (308) 555-0121
        </Text>
      </View>

      <View style={styles.paymentMethod}>
        <Text style={styles.paymentMethodTitle}>Select Payment Method</Text>
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
          <Text style={styles.addCardText}>+ Add Card</Text>
        </View>
      </View>

      <View style={styles.orderSummary}>
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

      <Button title="Pay Now" onPress={handlePayNow} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderDetails: {
    marginBottom: 20,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderInfo: {
    marginBottom: 5,
  },
  paymentMethod: {
    marginBottom: 20,
  },
  paymentMethodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentMethodOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedPaymentMethodButton: {
    backgroundColor: '#007BFF',
  },
  paymentMethodButton: {
    backgroundColor: '#fff',
  },
  addCardText: {
    color: '#007BFF',
  },
  orderSummary: {
    marginBottom: 20,
  },
  orderSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  orderSummaryLabel: {
    fontSize: 16,
  },
  orderSummaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default CheckOutScreen;