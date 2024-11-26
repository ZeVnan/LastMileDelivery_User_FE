import React, { useContext } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { UserContext } from '../Utilities/UserContext';
import { Button0 } from '../CommonComponents/Button';

const HomeScreen = ({navigation}) => {
  const { userName } = useContext(UserContext);

  const data = [
    { 
        id: '0', 
        title: 'Profile', 
        iconText: 'account-circle', 
        onPressEvent: () => navigation.navigate('Profile', {userName: userName}) 
    },
    { 
        id: '2', 
        title: 'Notification', 
        iconText: 'notifications', 
        onPressEvent: () => navigation.navigate('Notification') 
    },
    { 
        id: '3', 
        title: 'Order History', 
        iconText: 'list', 
        onPressEvent: () => navigation.navigate('Order History') 
    },
    { 
        id: '4', 
        title: 'Send Package', 
        iconText: 'local-shipping', 
        onPressEvent: () => navigation.navigate('Sender Infomation') 
    },
    { 
        id: '5', 
        title: 'Help with packaging', 
        iconText: 'question-answer', 
        onPressEvent: () => navigation.navigate('Chat') 
    },
    // { 
    //     id: '6', 
    //     title: 'Order detail sample', 
    //     iconText: 'info', 
    //     onPressEvent: () => navigation.navigate('Order Detail') 
    // },
  ];

  const renderItem = ({ item }) => { 
    return (
      <View style={styles.itemContainer}>
            <Button0
                title={item.title}         
                iconText={item.iconText}  
                onPressEvent={item.onPressEvent} 
            />
      </View>
    );
  };

  return (
    <View style={styles.container}>
        <Text style={styles.helloText}>
            Hello {userName} !
        </Text>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.buttonContainer}
            numColumns={2}/>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
    },
    itemContainer:{
        width: '50%',
        paddingVertical: 20,
    },
    helloText: {
        fontSize: 20,
        fontWeight: '500',
    },
});

export default HomeScreen;
