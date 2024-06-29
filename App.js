import { Text, SafeAreaView, StyleSheet } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import LoginScreen from './components/LoginScreen'
import HomePageScreen from './components/HomePageScreen'
import PickupLocationScreen from './components/PickUpLocationScreen'
import SendPackageScreen from './components/SendPackageScreen'
import SendPackageScreen2 from './components/SendPackageScreen2'
import CheckOutScreen from './components/CheckOutScreen'
import TrackingScreen from './components/TrackingScreen'
import OrderHistoryScreen from './components/OrderHistoryScreen'
import OrderDetailScreen from './components/OrderDetailScreen'
import ReviewScreen from './components/ReviewScreen'
import ProfileScreen from './components/ProfileScreen'
import EditProfileScreen from './components/EditProfileScreen'
import NotificationScreen from './components/NotificationScreen'
import AddressScreen from './components/AddressScreen'
import AddAddressScreen from './components/AddAddressScreen'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AddAddressScreen />
    </SafeAreaView>
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
