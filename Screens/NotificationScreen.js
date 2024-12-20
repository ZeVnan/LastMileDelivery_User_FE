import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { NotiCard } from '../CommonComponents/Card';
import { UserContext } from '../Utilities/UserContext';

const NotificationScreen = () => {
    const [sendNotifications, setSendNotifications] = useState([]);
    const [receiveNotifications, setReceiveNotifications] = useState([]);
    const [selectedTab, setSelectedTab] = useState("send");
    const { userId } = useContext(UserContext);

    const getNotification = async(userId, type) => {
        try {
            if (type === 'send'){
                const response = await fetch(`https://waseminarcnpm2.azurewebsites.net/protected/notifications/senderId?senderId=${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok){
                    const result = await response.json();
                    setSendNotifications(result.data);
                }
                else{
                    Alert.alert('Error', `${response.status}`);
                }
            }
            else{
                const response = await fetch(`https://waseminarcnpm2.azurewebsites.net/protected/notifications/receiverId?receiverId=${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok){
                    const result = await response.json();
                    setReceiveNotifications(result.data);
                }
                else{
                    Alert.alert('Error', `${response.status}`);
                }
            }
        }
        catch(error){
            Alert.alert('Error', `${error.message}`);
        }
    }
    useEffect(() => {getNotification(userId, 'send')}, []);
    useEffect(() => {getNotification(userId, 'receive')}, []);

    const filteredReceiveNotifications = receiveNotifications.filter(item => 
        (item.about === 'delivery' && item.status !== 'canceled') ||
        (item.about !== 'payment')
    )

    const renderSendItem = ({item}) => (
        <View style={styles.notification}>
            <NotiCard
                orderId={item._id}
                about={item.about}
                status={item.status}
                date={item.date}
                send={true}/>
        </View>
    )
    const renderReceiveItem = ({item}) => (
        <View style={styles.notification}>
            <NotiCard
                orderId={item._id}
                about={item.about}
                status={item.status}
                date={item.date}
                send={false}/>
        </View>
    )

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
                    data={selectedTab === 'send' ? sendNotifications : filteredReceiveNotifications}
                    renderItem={selectedTab === 'send' ? renderSendItem : renderReceiveItem}
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
})

export default NotificationScreen;