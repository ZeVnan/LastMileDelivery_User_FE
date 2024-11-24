import React, { useContext } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { UserContext } from '../Utilities/UserContext';
import { Button0 } from '../CommonComponents/Button';

const HomeScreen = ({navigation}) => {
  const { userRole } = useContext(UserContext);

  const data = [
    { 
        id: '0', 
        title: 'Order History', 
        iconText: 'list', 
        onPressEvent: () => navigation.navigate('Order History') 
    },
    { 
        id: '1', 
        title: 'Profile', 
        iconText: 'account-circle', 
        onPressEvent: () => navigation.navigate('Profile') 
    },
    { 
        id: '2', 
        title: 'Send Package', 
        iconText: 'local-shipping', 
        onPressEvent: () => navigation.navigate('Sender Infomation') 
    },
    { 
        id: '3', 
        title: 'Help with packaging', 
        iconText: 'help', 
        onPressEvent: () => navigation.navigate('Chat') 
    },
    // { 
    //   id: '4', 
    //   title: 'Delivery Screen', 
    //   iconText: 'inventory', 
    //   onPressEvent: () => navigation.navigate('Delivery Information') 
    // },
    // { 
    //   id: '5', 
    //   title: 'Check Out Screen', 
    //   iconText: 'payments', 
    //   onPressEvent: () => navigation.navigate('CheckOut') 
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
    <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
        numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    itemContainer:{
        width: '50%',
        paddingVertical: 20,
    },
});

export default HomeScreen;
