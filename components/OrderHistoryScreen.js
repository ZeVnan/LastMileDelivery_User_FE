import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

const OrderHistoryScreen = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState('pending');

  const handleTabChange = (newTab) => {
    setSelectedTab(newTab);
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => setPendingOrders(json));
  }, []);

 

  const renderItem = ({ item }) => (
    <View style={styles.order}>
      <Text style={styles.trackingId}>Tracking ID: {item.id}</Text>
      <Text style={styles.details}>{item.title}</Text>
      <Text style={styles.status}>Status</Text>
      <Text style={styles.status}>From: </Text>
      <Text style={styles.status}>To: </Text>
      <Button title="View Details" onPress={() => {}} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>

      <View style={styles.tabs}>
        <Button
          title="Pending"
          onPress={() => handleTabChange('pending')}
          style={[styles.tab, selectedTab === 'pending' && styles.activeTab]}
        />
        <Button
          title="Completed"
          onPress={() => handleTabChange('completed')}
          style={[styles.tab, selectedTab === 'completed' && styles.activeTab]}
        />
      </View>

      {selectedTab === 'pending' && (
        <FlatList
          data={pendingOrders}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
      {selectedTab === 'completed' && (
        <FlatList
          data={completedOrders}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
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
    marginBottom: 20
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  tab: {
    backgroundColor: '#A9A9A9',
    width: '100%',
    alignSelf: 'stretch'
  },
  activeTab: {
    backgroundColor: '#7FFFD4',
    width: '100%',
    alignSelf: 'stretch'
  },
  order: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#eee',
  },
  trackingId: {
    fontWeight: 'bold',
    margin: 2
  },
  details: {
    margin : 2,
  },
  status: {
    fontStyle: 'italic',
    margin : 2,
  },
});

export default OrderHistoryScreen;