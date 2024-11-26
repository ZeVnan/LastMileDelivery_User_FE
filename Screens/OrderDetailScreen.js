import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

const OrderDetailScreen = ({navigation, route}) => {
    const [selectedTab, setSelectedTab] = useState('sender');
    const {order, role} = route.params;
    const fakeOrder = {
        _id: '94jnfvk4',
        senderInfo: {
            userId: '1kebv83',
            name: 'Brace Phoenix',
            address: 'China',
            phoneNumber: '11111',
        },
        receiverInfo: {
            userId: 'c8j2msah',
            name: 'November Ajax',
            address: 'Unknown',
            phoneNumber: '66666',
        },
        deliveryInfo: {
            shipmentType: 'Package',
            deliveryType: 'Express',
            status: "pending",
            packageSize: '5',
            pickupDate: '2024-10-30',
            pickupTime: '2024-11-15',
            value: '10',
        },
    }
    return (
        <View style={styles.container}>
            <View style={styles.tabsContainer}>
                <View style={styles.tabContainer}>
                    <Button
                        title='Sender'
                        onPress={()=>{setSelectedTab('sender')}}
                        buttonStyle={[styles.tabLeft, selectedTab === 'sender' ? styles.activeTab : styles.inactiveTab]}/>
                </View>
                <View style={styles.tabContainer}>
                    <Button
                        title='Receiver'
                        onPress={()=>{setSelectedTab('receiver')}}
                        buttonStyle={[selectedTab === 'receiver' ? styles.activeTab : styles.inactiveTab]}/>
                </View>
                <View style={styles.tabContainer}>
                    <Button
                        title='Delivery'
                        onPress={()=>{setSelectedTab('delivery')}}
                        buttonStyle={[styles.tabRight, selectedTab === 'delivery' ? styles.activeTab : styles.inactiveTab]}/>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.textId}>
                    #{fakeOrder._id}
                </Text>
                {selectedTab === 'sender' && (
                    <View>
                        <Text style={styles.textInfo}>
                            Sender name: {order.senderInfo.name}
                        </Text>
                        <Text style={styles.textInfo}>
                            Sender address: {order.senderInfo.address}
                        </Text>
                        <Text style={styles.textInfo}>
                            Sender phone number: {order.senderInfo.phoneNumber}
                        </Text>
                    </View>
                )}
                {selectedTab === 'receiver' && (
                    <View>
                        <Text style={styles.textInfo}>
                            Receiver name: {order.receiverInfo.name}
                        </Text>
                        <Text style={styles.textInfo}>
                            Receiver address: {order.receiverInfo.address}
                        </Text>
                        <Text style={styles.textInfo}>
                            Receiver phone number: {order.receiverInfo.phoneNumber}
                        </Text>
                    </View>
                )}
                {selectedTab === 'delivery' && (
                    <View>
                        <Text style={styles.textInfo}>
                            Shipment type: {order.deliveryInfo.shipmentType}
                        </Text>
                        <Text style={styles.textInfo}>
                            Delivery type: {order.deliveryInfo.deliveryType}
                        </Text>
                        <Text style={styles.textInfo}>
                            Package size: {order.deliveryInfo.packageSize} kg
                        </Text>
                        <Text style={styles.textInfo}>
                            Value: ${order.deliveryInfo.value}
                        </Text>
                        <Text style={styles.textInfo}>
                            Status: {order.deliveryInfo.status}
                        </Text>
                    </View>
                )}
            </View>
            {role === 'send' && (
                <View style={styles.qrContainer}>

                </View>
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
        width: '90%',
        alignSelf: 'center',
    },
    tabContainer: {
        width: '33%',
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
    infoContainer: {
        width: '100%',
        padding: 10,
        marginVertical: 20,
        backgroundColor: '#ffffff',
        borderRadius: 20,
    },
    textId: {
        fontSize: 18,
        color: '#1ed102',
        textAlign: 'center',
    },
    textInfo: {
        fontSize: 13,
        paddingVertical: 10,
    },
    qrContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 20,
    }
});

export default OrderDetailScreen;