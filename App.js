import { SafeAreaView, StyleSheet, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Screens/HomeScreen';
import ChatScreen from './Screens/ChatScreen';
import SenderInfoScreen from './Screens/SenderInfoScreen';
import ReceiverInfoScreen from './Screens/ReceiverInfoScreen';
import DeliveryInfoScreen from './Screens/DeliveryInfoScreen';
import CheckOutScreen from './Screens/CheckOutScreen';
import OrderHisToryScreen from './Screens/OrderHistoryScreen';
import OrderDetailScreen from './Screens/OrderDetailScreen';
import ProfileScreen from './Screens/ProfileScreen';
import LoginScreen from './Screens/LoginScreen';
import NotificationScreen from './Screens/NotificationScreen';
import PaymentScreen from './Screens/PaymentScreen';
import { UserProvider } from './Utilities/UserContext';

const Stack = createNativeStackNavigator();
const linking = {
  prefixes: ['clientApp://'],
  config: {
    screens: {
      Login: 'login',
      Home: 'home',
      Chat: 'chat',
      'Sender Infomation': 'sender-info',
      'Receiver Information': 'receiver-info',
      'Delivery Information': 'delivery-info',
      'Check Out': 'checkout',
      'Order History': 'order-history',
      'Order Detail': 'order-detail',
      Notification: 'notification',
      Profile: 'profile',
      Payment: {
        path: "payment/:orderId/:payResult"
      },
    }
  }
}

export default function App() {
  return (
    <UserProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer linking={linking}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen 
              name='Login'
              component={LoginScreen}
              options={{headerShown: false}}/>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{headerShown: false}}/>
            <Stack.Screen 
              name="Chat" 
              component={ChatScreen}/>
            <Stack.Screen 
              name="Sender Infomation" 
              component={SenderInfoScreen}/>
            <Stack.Screen 
              name="Receiver Information" 
              component={ReceiverInfoScreen}/>
            <Stack.Screen 
              name="Delivery Information" 
              component={DeliveryInfoScreen}/>
            <Stack.Screen 
              name="Check Out" 
              component={CheckOutScreen}/>
            <Stack.Screen 
              name="Order History" 
              component={OrderHisToryScreen}/>
            <Stack.Screen 
              name="Order Detail" 
              component={OrderDetailScreen}/>
            <Stack.Screen 
              name="Notification" 
              component={NotificationScreen}/>
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen}/>
            <Stack.Screen
              name="Payment"
              component={PaymentScreen}
              options={{headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </UserProvider>
  );
  return (
    <UserProvider>
      <SafeAreaView style={styles.container}>
        <PaymentScreen/>
      </SafeAreaView>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
