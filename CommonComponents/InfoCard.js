import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Icon } from 'react-native-elements';

export const InfoCard = ({name, address, phoneNumber, from}) => {
    if (from){
        return(
            <View style={styles.containerFrom}>
                <View style={styles.infoContainerFrom}>
                    <Text style={styles.titleTextFrom}>
                        From
                    </Text>
                </View>
                <View style={styles.infoContainerFrom}>
                    <Icon
                        name='person'
                        type='material'
                        size={20}
                        color={'#808080'}/>
                    <Text style={styles.infoTextFrom}>
                        {name}
                    </Text>
                </View>
                <View style={styles.infoContainerFrom}>
                    <Icon
                        name='home'
                        type='material'
                        size={20}
                        color={'#808080'}/>
                    <Text style={styles.infoTextFrom}>
                        {address}
                    </Text>
                </View>
                <View style={styles.infoContainerFrom}>
                    <Icon
                        name='call'
                        type='material'
                        size={20}
                        color={'#808080'}/>
                    <Text style={styles.infoTextFrom}>
                        {phoneNumber}
                    </Text>
                </View>
            </View>
        );
    }
    else{
        return(
            <View style={styles.containerTo}>
                <View style={styles.infoContainerTo}>
                    <Text style={styles.titleTextTo}>
                        To
                    </Text>
                </View>
                <View style={styles.infoContainerTo}>
                    <Text style={styles.infoTextTo}>
                        {name}
                    </Text>
                    <Icon
                        name='person'
                        type='material'
                        size={20}
                        color={'#808080'}/>
                </View>
                <View style={styles.infoContainerTo}>
                    <Text style={styles.infoTextTo}>
                        {address}
                    </Text>
                    <Icon
                        name='home'
                        type='material'
                        size={20}
                        color={'#808080'}/>
                </View>
                <View style={styles.infoContainerTo}>
                    <Text style={styles.infoTextTo}>
                        {phoneNumber}
                    </Text>
                    <Icon
                        name='phone'
                        type='material'
                        size={20}
                        color={'#808080'}/>
                </View>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    containerFrom: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        marginVertical: 5,
        borderRadius: 20,
        backgroundColor: '#c0c0c0',
    },
    containerTo: {
        flexDirection: 'column',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        marginVertical: 5,
        borderRadius: 20,
        backgroundColor: '#c0c0c0',
    },
    infoContainerFrom: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        width: '100%',
    },
    infoContainerTo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        width: '100%',
    },
    infoTextFrom: {
        fontSize: 12,
        textAlign: 'right',
        maxWidth: '90%',
    },
    infoTextTo: {
        fontSize: 12,
        textAlign: 'left',
        maxWidth: '90%',
    },
    titleTextFrom: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    titleTextTo: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
    }
})