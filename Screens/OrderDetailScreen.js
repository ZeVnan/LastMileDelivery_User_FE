import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { UserContext } from '../Utilities/UserContext';

const OrderDetailScreen = ({route}) => {
  const [trackingData, setTrackingData] = useState(null);
  const {item} = route.params;
  const {userRole} = useContext(UserContext);

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
      <Text style={styles.trackingId}>Tracking ID: {item._id}</Text>
      <Text style={styles.title}>{item.packageSize}kg package</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.from}>{item.senderInfo.name}</Text>
        <Text style={styles.toLabel}>To</Text>
        <Text style={styles.to}>{item.receiverInfo.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.from}>{item.senderInfo.address}</Text>
        <Text style={styles.toLabel}>To</Text>
        <Text style={styles.to}>{item.receiverInfo.address}</Text>
      </View>
      <Text style={styles.info}>Shipment Type: {item.shipmentType}</Text>
      <Text style={styles.info}>Delivery Type: {item.deliveryType}</Text>
      {userRole === "sender" &&(
        <View>
          <Text style={styles.info}>Pick Up Date: {item.pickupDate}</Text>
          <Text style={styles.info}>Pick Up Time: {item.pickupTime}</Text>
          <Text style={styles.info}>Message: {item.message}</Text>
        </View>
      )}
      <Text style={styles.status}>{item.status}</Text>
      <ScrollView>
        {/* <View style={styles.dayActivity}>
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
        </View> */}
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
  from: {
    fontSize: 13,
    width: '45%',
    textAlign: 'left',
  },
  to: {
    fontSize: 13,
    width: '45%',
    textAlign: 'right',
  },
  toLabel: {
    fontSize: 13,
    width: '10%'
  },
  infoContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  info: {
    marginHorizontal: 10,
    marginBottom: 10,
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