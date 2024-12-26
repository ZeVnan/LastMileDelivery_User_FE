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

  useEffect(() => {getOrder(userId, "send")}, []);
  useEffect(() => {getOrder(userId, "receive")}, []);

  const getOrder = async(userId, type) => {
    try{
      const response = await fetch('https://waseminarcnpm2.azurewebsites.net/getOrderByUserIdAndType', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, type }),
      });
      if (response.ok){
        const result = await response.json();
        if (type === "send"){
          setSendOrders(result.orders.reverse())
        }
        else if (type === "receive"){
          setReceiveOrder(result.orders.reverse())
        }
      }
      else{
        if (type === "send"){
          Alert.alert("Error", "Cannot load send orders")
        }
        else if (type === "receive"){
          Alert.alert("Error", "Cannot load receive orders")
        }
      }
    }
    catch(error){
      Alert.alert("Error", "Something went wrong")
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.order}
      onPress={() => navigation.navigate('Order Detail', {order: item, role: selectedTab})}>
      <OrderCard
        id = {item._id}
        senderName={item.senderInfo.name}
        receiverName={item.receiverInfo.name}
        value={item.deliveryInfo.value}
        deliveryStatus={item.deliveryInfo.status}
        paymentStatus={item.payStatus}/>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <View style={styles.tabContainer}>
          <Button
            title="Send"
            onPress={() => {setSelectedTab('send')}}
            buttonStyle={[styles.tabLeft, selectedTab === 'send' ? styles.activeTab : styles.inactiveTab]}
          />
        </View>
        <View style={styles.tabContainer}>
          <Button
            title="Receive"
            onPress={() => {setSelectedTab('receive')}}
            buttonStyle={[styles.tabRight, selectedTab === 'receive' ? styles.activeTab : styles.inactiveTab]}
          />
        </View>
        
      </View>
      <FlatList
        data={selectedTab == 'send' ? sendOrders : receiveOrders}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
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
    marginVertical: 10,
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