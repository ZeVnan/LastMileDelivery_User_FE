import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, StatusBar, TextInput } from 'react-native';

const ReviewScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.header}>Write a Review</Text>

      <View style={styles.details}>
        <Text style={styles.label}>Tracking ID:</Text>
        <Text style={styles.value}>TY9860036NM</Text>

        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>Jan 30, 2023</Text>

        <Text style={styles.label}>From:</Text>
        <Text style={styles.value}>New York</Text>

        <Text style={styles.label}>To:</Text>
        <Text style={styles.value}>Mumbai</Text>
      </View>

      <View style={styles.rating}>
        <Text style={styles.label}>Rate Us:</Text>
        {/*<Image source={require('./assets/stars.png')} style={styles.stars} />*/}
      </View>

      <View style={styles.actions}>
        <Button title="Add Image" onPress={() => {}} />
        <Button title="Upload Photo" onPress={() => {}} />
      </View>

      <TextInput
        style={styles.message}
        placeholder="Add Message"
        multiline={true}
        numberOfLines={4}
      />

      <Button title="Submit Review" onPress={() => {}} />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stars: {
    width: 100,
    height: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default ReviewScreen;