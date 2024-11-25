import { SafeAreaView, StyleSheet } from 'react-native';
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
import { UserProvider } from './Utilities/UserContext';

import { useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  }
  const handleLogout = () => {
    setIsLoggedIn(false);
  }
  // if (!isLoggedIn){
  //   return (
  //     <UserProvider>
  //       <SafeAreaView style={styles.container}>
  //         <LoginScreen onLogin={handleLogin}/>
  //       </SafeAreaView>
  //     </UserProvider>
  //   )
  // }
  // return (
  //   <UserProvider>
  //     <SafeAreaView style={styles.container}>
  //       <NavigationContainer>
  //         <Stack.Navigator initialRouteName="Home">
  //           <Stack.Screen name="Home" component={HomeScreen}/>
  //           <Stack.Screen name="Chat" component={ChatScreen}/>
  //           <Stack.Screen name="Sender Infomation" component={SenderInfoScreen}/>
  //           <Stack.Screen name="Receiver Information" component={ReceiverInfoScreen}/>
  //           <Stack.Screen name="Delivery Information" component={DeliveryInfoScreen}/>
  //           <Stack.Screen name="CheckOut" component={CheckOutScreen}/>
  //           <Stack.Screen name="Order History" component={OrderHisToryScreen}/>
  //           <Stack.Screen name="Order Detail" component={OrderDetailScreen}/>
  //           <Stack.Screen name="Profile">
  //             {props => <ProfileScreen {...props} onLogout={handleLogout}/>}
  //           </Stack.Screen>
  //         </Stack.Navigator>
  //       </NavigationContainer>
  //     </SafeAreaView>
  //   </UserProvider>
  // );
  return (
    <UserProvider>
      <SafeAreaView style={styles.container}>
        <NotificationScreen/>
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
