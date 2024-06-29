import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.userInfo}>
        {/*<Image source={require('../assets/profile.jpg')} style={styles.avatar} />*/}
        <Text style={styles.name}>Johnson Smith</Text>
        <Text style={styles.email}>johnson@gmail.com</Text>
      </View>
      <View style={styles.actions}>
        <Button title="Edit Profile" type="outline" onPress={() => {}} />
        <Button title="My Address" type="outline" onPress={() => {}} />
        <Button title="My Orders" type="outline" onPress={() => {}} />
        <Button title="Change Password" type="outline" onPress={() => {}} />
        <Button title="Privacy Policy" type="outline" onPress={() => {}} />
        <Button title="Terms & Conditions" type="outline" onPress={() => {}} />
        <Button title="Logout" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
  },
  actions: {
    marginTop: 20,
  },
});

export default ProfileScreen;