import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';
import { NotiCard } from '../CommonComponents/Card';

const NotificationScreen = () => {
    const [notifications, setNotifications] = useState([]);

    // useEffect(() => {
    //   const subscription = Notifications.addListener(handleNotification);
    //   return () => subscription.remove();
    // }, []);

    const handleNotification = (notification) => {
        setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    };

    const fakeNotifications = [
        {
            _id: '0',
            orderId: '39f93f',
            status: 'pending',
            date: '2024-12-20',
            send: true,
        },
        {
            _id: '1',
            orderId: '8fj3k2',
            status: 'inProgress',
            date: '2024-12-8',
            send: false,
        },
        {
            _id: '2',
            orderId: '92n4f',
            status: 'completed',
            date: '2024-11-30',
            send: true,
        },
        {
            _id: '3',
            orderId: '0fn2n4',
            status: 'pending',
            date: '2024-11-26',
            send: false,
        },
        {
            _id: '4',
            orderId: '2mc81g',
            status: 'inProgress',
            date: '2024-11-20',
            send: true,
        },
        {
            _id: '5',
            orderId: '1mk3n5',
            status: 'completed',
            date: '2024-11-15',
            send: false,
        },
    ]

    const renderItem = ({item}) => (
        <View style={styles.notification}>
            <NotiCard
                orderId={item.orderId}
                status={item.status}
                date={item.date}
                send={item.send}/>
        </View>
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={fakeNotifications}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}/>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex: 1, 
        padding: 20,
    },
    notification: {
        width: '100%',
        marginVertical: 5,
    },
})

export default NotificationScreen;