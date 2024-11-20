import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import * as Notifications from 'expo-notifications';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);

  // useEffect(() => {
  //   const subscription = Notifications.addListener(handleNotification);
  //   return () => subscription.remove();
  // }, []);

  const handleNotification = (notification) => {
    setNotifications((prevNotifications) => [notification, ...prevNotifications]);
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 20 }}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
            <Text style={{ fontSize: 18 }}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default NotificationScreen;