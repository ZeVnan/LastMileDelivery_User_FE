import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

const HomeScreen = ({navigation}) => {
  return (
    <View style={ styles.container}>
      <View style={ styles.rowContainer}>
        <View style={styles.itemContainer}>
          <Button
            title="Send Package"
            onPress={() => navigation.navigate('Send Confirmation')}
          />
        </View>
        <View style={styles.itemContainer}>
          <Button
            title="Order History"
            onPress={() => navigation.navigate('Order History')}
          />
        </View>
      </View>
      <View style={ styles.rowContainer}>
      <View style={styles.itemContainer}>
          <Button
            title="Profile"
            onPress={() => navigation.navigate('Profile')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        margin: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '25%',
    },
    itemContainer: {
        height: '100%',
        width: '50%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default HomeScreen;