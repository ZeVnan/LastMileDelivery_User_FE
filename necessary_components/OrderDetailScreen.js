import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const OrderDetailScreen = () => {
  const [trackingData, setTrackingData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/tracking/TY9860036NM')
      .then(response => response.json())
      .then(data => setTrackingData(data));
  }, []);

  const activity = ([place, time, detail]) => {
    <View style={styles.activity}>
      <Text style={styles.activityTitle}>
        place time
      </Text>
      <Text style={styles.activityDetail}>
        detail
      </Text>
    </View>
  }

  const dayActivity = ({day}) => {
    <View style={styles.dayActivity}>
      <Text style={styles.dayActivityTitle}>
        day
      </Text>
      activity(["Hanoi", "6:38AM", "Processed at warehouse"])
    </View>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.trackingId}>Tracking ID:</Text>
      <Text style={styles.title}>Iphone 15 Pro Max 128GB</Text>
      <View style={styles.addressContainer}>
        <Text style={styles.address}>Sender Address</Text>
        <Text style={styles.address}>To</Text>
        <Text style={styles.address}>Receiver Address</Text>
      </View>
      <Text style={styles.status}>Status</Text>
      <ScrollView>
        <View style={styles.dayActivity}>
          <Text style={styles.dayActivityTitle}>
            30/6/2024
          </Text>
          <View style={styles.activity}>
            <Text style={styles.activityTitle}>
              Hanoi 8:43AM
            </Text>
            <Text style={styles.activityDetail}>
              Processed at warehouse
            </Text>
          </View>
          <View style={styles.activity}>
            <Text style={styles.activityTitle}>
              Hanoi 8:43AM
            </Text>
            <Text style={styles.activityDetail}>
              Processed at warehouse
            </Text>
          </View>
        </View>
        <View style={styles.dayActivity}>
          <Text style={styles.dayActivityTitle}>
            30/6/2024
          </Text>
          <View style={styles.activity}>
            <Text style={styles.activityTitle}>
              Hanoi 8:43AM
            </Text>
            <Text style={styles.activityDetail}>
              Processed at warehouse
            </Text>
          </View>
          <View style={styles.activity}>
            <Text style={styles.activityTitle}>
              Hanoi 8:43AM
            </Text>
            <Text style={styles.activityDetail}>
              Processed at warehouse
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  trackingId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  trackingId: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  status: {
    fontSize: 13,
    color: '#77C795',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  address: {
    fontSize: 13,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  activity: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  activityTitle: {
    fontSize: 13,
    marginBottom: 5,
    fontStyle: 'italic'
  },
  activityDetail: {
    fontSize: 13,
  },
  dayActivity: {
    marginHorizontal: 20,
  },
  dayActivityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderDetailScreen;