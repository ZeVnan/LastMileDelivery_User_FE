import React from 'react'
import { Button } from 'react-native-elements'
import { StyleSheet, View, Text } from 'react-native'

export const Button0 = ({title, iconText, onPressEvent})  => {
    return (
        <View style={styles.container}>
            <Button
                icon={{
                    name: iconText,
                    type: 'material',
                    size: 40,
                    color: 'white',
                }}
                buttonStyle={styles.button0}
                onPress={onPressEvent}
            />
            <Text style={styles.text}>
                {title}
            </Text>
        </View> 
    );
}
export const Button1 = ({iconText, onPressEvent}) => {
    return(
        <View style={styles.container}>
            <Button
                icon={{
                    name: iconText,
                    type: 'material',
                    size: 25,
                    color: 'white',
                }}
                buttonStyle={[styles.button1]}
                onPress={onPressEvent}
            />
        </View>
    );
}
export const Button2 = ({title, onPressEvent}) => {
    return(
        <Button
            title={title}
            buttonStyle={styles.button2}
            onPress={onPressEvent}/> 
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
    },
    button0: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    button1:{
        width: 50,
        height: 50,
        borderRadius: 20,
        marginHorizontal: 2,
    },
    button2: {
        height: 50,
        borderRadius: 20,
        width: '100%',
    },
    text: {
        fontSize: 12,
        marginVertical: 5,
    },
});
