import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { Button2 } from '../CommonComponents/Button';

const ProfileScreen = ({onLogout, navigation, route}) => {
    const {userName} = route.params;
  return (
    <View style={styles.container}>
        <View style={styles.infoContainer}>
            <Text style={styles.name}>{userName}</Text>
            <Icon
                name='person'
                type='material'
                size={100}
                color='#808080'/>
        </View>
        <View style={styles.actionsContainer}>
            {/* <Button title="Edit Profile" type="outline" onPress={() => {}} />
            <Button title="Change Password" type="outline" onPress={() => {}} /> */}
        </View>
        <Button2 
            title="Logout" 
            onPressEvent={onLogout}/>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    infoContainer: {
        alignItems: 'center',
    },
    actionsContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;