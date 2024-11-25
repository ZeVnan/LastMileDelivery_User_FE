import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const ProfileScreen = ({onLogout}) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        {/*<Image source={require('../assets/profile.jpg')} style={styles.avatar} />*/}
        <Text style={styles.name}>Johnson Smith</Text>
        <Text style={styles.email}>johnson@gmail.com</Text>
      </View>
      <View style={styles.actions}>
        <Button title="Edit Profile" type="outline" onPress={() => {}} />
        <Button title="Change Password" type="outline" onPress={() => {}} />
      </View>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
  },
  actions: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
  },
});

export default ProfileScreen;