import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const data = [
  {
    name: 'Johnny Deep',
    phoneNumber: '+01 123 456 7890',
    address: '4140 Parker Rd. Allentown, New Mexico 31134',
    type: 'Home',
  },
  {
    name: 'Johnny Deep',
    phoneNumber: '+01 123 456 7890',
    address: '4140 Parker Rd. Allentown, New Mexico 31134',
    type: 'Work',
  },
];

const AddressItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
      <Text style={styles.address}>{item.address}</Text>
      <Text style={styles.type}>{item.type}</Text>
    </View>
  );
};

const AddressScreen = () => {
  return (
    <View style={styles.container}>
      <Text style = { styles.title }>My Address</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <AddressItem item={item} />}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 16,
  },
  address: {
    fontSize: 14,
  },
  type: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default AddressScreen;