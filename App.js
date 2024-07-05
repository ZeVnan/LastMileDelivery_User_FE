import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './necessary_components/HomeScreen';
import ChatScreen from './necessary_components/ChatScreen';
import SendInfoScreen from './necessary_components/SendInfoScreen';
import ReceiveInfoScreen from './necessary_components/ReceiveInfoScreen';
import CheckOutScreen from './necessary_components/CheckOutScreen';
import OrderHisToryScreen from './necessary_components/OrderHistoryScreen';
import OrderDetailScreen from './necessary_components/OrderDetailScreen';
import ProfileScreen from './necessary_components/ProfileScreen';
import LoginScreen from './necessary_components/LoginScreen';
import ReviewScreen from './necessary_components/ReviewScreen'
import { UserProvider } from './necessary_components/UserContext';

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
  if (!isLoggedIn){
    return (
      <UserProvider>
        <SafeAreaView style={styles.container}>
          <LoginScreen onLogin={handleLogin}/>
        </SafeAreaView>
      </UserProvider>
    )
  }
  return (
    <UserProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Chat" component={ChatScreen}/>
            <Stack.Screen name="Send Confirmation" component={SendInfoScreen}/>
            <Stack.Screen name="Receive Confirmation" component={ReceiveInfoScreen}/>
            <Stack.Screen name="CheckOut" component={CheckOutScreen}/>
            <Stack.Screen name="Order History" component={OrderHisToryScreen}/>
            <Stack.Screen name="Order Detail" component={OrderDetailScreen}/>
            <Stack.Screen name="Profile">
              {props => <ProfileScreen {...props} onLogout={handleLogout}/>}
            </Stack.Screen>
            <Stack.Screen name="Review" component={ReviewScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
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
