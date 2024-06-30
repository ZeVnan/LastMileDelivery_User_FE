import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const OrderHistoryScreen = ({navigation}) => {
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

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => setCompletedOrders(json));
  }, []);

  const renderItem = ({ item, isCompleted }) => (
    <View style={styles.order}>
      <Text style={styles.trackingId}>Tracking ID: {item.id}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.addressContainer}>
        <Text style={styles.address}>Sender Address</Text>
        <Text style={styles.address}>To</Text>
        <Text style={styles.address}>Receiver Address</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.status}>Status</Text>
        <Button 
          title="View Details" 
          onPress={() => navigation.navigate('Order Detail')}
          type='clear'  
          titleStyle={{ fontSize: 13 }}
        />
      </View>
      {isCompleted &&
        <View style={styles.reviewContainer}>
          <Button 
            title="Review" 
            onPress={() => navigation.navigate('Review')}
            type='clear'  
            titleStyle={{ fontSize: 13 }}
          />
        </View>}
    </View>
  );

  const renderPendingItem = ({ item }) => renderItem({ item, isCompleted: false });
  const renderCompletedItem = ({ item }) => renderItem({ item, isCompleted: true });

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <Button
          title="Pending"
          onPress={() => handleTabChange('pending')}
          buttonStyle={[selectedTab === 'pending' ? styles.activeTab : styles.tab]}
        />
        <Button
          title="Completed"
          onPress={() => handleTabChange('completed')}
          buttonStyle={[selectedTab === 'completed' ? styles.activeTab : styles.tab]}
        />
      </View>

      {selectedTab === 'pending' && (
        <FlatList
          data={pendingOrders}
          renderItem={renderPendingItem}
          keyExtractor={item => item.id}
        />
      )}
      {selectedTab === 'completed' && (
        <FlatList
          data={completedOrders}
          renderItem={renderCompletedItem}
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
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  tab: {
    backgroundColor: '#A9A9A9',
  },
  activeTab: {

  },
  order: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#eee',
  },
  trackingId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  status: {
    fontSize: 13,
    color: '#77C795',
    alignSelf: 'center',
  },
  address: {
    fontSize: 13,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  reviewContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default OrderHistoryScreen;