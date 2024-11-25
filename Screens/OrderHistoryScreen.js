import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { UserContext } from '../Utilities/UserContext';
import { OrderCard } from '../CommonComponents/Card';

const OrderHistoryScreen = ({navigation}) => {
  const [sendOrders, setSendOrders] = useState([]);
  const [receiveOrders, setReceiveOrder] = useState([]);
  const [selectedTab, setSelectedTab] = useState("send");
  const { userId } = useContext(UserContext);

  const handleTabChange = (newTab) => {
    setSelectedTab(newTab);
  };

  // useEffect(getOrder(userId, "send"), []);
  // useEffect(getOrder(userId, "receive"), []);

  const getOrder = async(userId, status) => {
    try{
      const response = await fetch('https://waseminarcnpm2.azurewebsites.net/getOrderByUserIdAndStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, status }),
      });
      if (response.ok){
        const result = await response.json();
        if (status === "send"){
          setSendOrders(result.orders)
        }
        else if (status === "receive"){
          setReceiveOrder(result.orders)
        }
      }
      else{
        if (status === "send"){
          Alert.alert("Error", "Cannot load send orders")
        }
        else if (status === "receive"){
          Alert.alert("Error", "Cannot load receive orders")
        }
      }
    }
    catch(error){
      Alert.alert("Error", "Something went wrong")
    }
  }
  const fakeSendOrders = [
    {
      _id: '0',
      senderName: 'Crimson Typhoon',
      receiverName: 'Striker Eureka',
      value: '10',
      status: 'Pending',
    },
    {
      _id: '1',
      senderName: 'Crimson Typhoon',
      receiverName: 'Vulcan Specter',
      value: '20',
      status: 'Completed',
    },
  ];
  const fakeReceiveOrders = [
    {
      _id: '0',
      senderName: 'Gipsy Danger',
      receiverName: 'Cherno Alpha',
      value: '10',
      status: 'Completed',
    },
    {
      _id: '1',
      senderName: 'Saber Athena',
      receiverName: 'Titan Redeemer',
      value: '20',
      status: 'In progress',
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.order}
      onPress={() => {}}>
      <OrderCard
        id = {item._id}
        senderName={item.senderName}
        receiverName={item.receiverName}
        value={item.value}
        status={item.status}/>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <View style={styles.tabContainer}>
          <Button
            title="Send"
            onPress={() => handleTabChange('send')}
            buttonStyle={[styles.tabLeft, selectedTab === 'send' ? styles.activeTab : styles.inactiveTab]}
          />
        </View>
        <View style={styles.tabContainer}>
          <Button
            title="Receive"
            onPress={() => handleTabChange('receive')}
            buttonStyle={[styles.tabRight, selectedTab === 'receive' ? styles.activeTab : styles.inactiveTab]}
          />
        </View>
        
      </View>
      {selectedTab === 'send' && (
        <FlatList
          data={fakeSendOrders}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      )}
      {selectedTab === 'receive' && (
        <FlatList
          data={fakeReceiveOrders}
          renderItem={renderItem}
          keyExtractor={item => item._id}
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
  tabsContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    width: '90%',
    alignSelf: 'center',
  },
  tabContainer: {
    width: '50%',
  },
  tabLeft: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  tabRight: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  inactiveTab: {
    backgroundColor: '#c0c0c0'
  },
  activeTab: {

  },
  order: {
    width: '100%',
    marginVertical: 10,
  },
});

export default OrderHistoryScreen;