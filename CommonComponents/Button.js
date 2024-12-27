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
export const Button2 = ({title, onPressEvent, customStyle, disabled}) => {
    return(
        <Button
            title={title}
            buttonStyle={[styles.button2, customStyle]}
            onPress={onPressEvent}
            disabled={disabled}/> 
    );
}
export const Button3 = ({title, onPressEvent, customStyle}) => {
    return(
        <Button
            title={title}
            buttonStyle={[styles.button3, customStyle]}
            onPress={onPressEvent}
            type='outline'/>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
    },
    button0: {
        width: 70,
        height: 70,
        borderRadius: 25,
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
    button3: {
        height: 50,
        borderRadius: 20,
        width: '100%',
        borderWidth: 2,
    },
    text: {
        fontSize: 12,
        marginVertical: 5,
    },
});
