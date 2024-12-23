import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Icon } from 'react-native-elements';

export const InfoCard = ({name, address, phoneNumber, from}) => {
    if (from){
        return(
            <View style={stylesInfo.containerFrom}>
                <View style={stylesInfo.infoContainerFrom}>
                    <Text style={stylesInfo.titleTextFrom}>
                        From
                    </Text>
                </View>
                <View style={stylesInfo.infoContainerFrom}>
                    <Icon
                        name='person'
                        type='material'
                        size={20}
                        color={'#808080'}/>
                    <Text style={stylesInfo.infoTextFrom}>
                        {name}
                    </Text>
                </View>
                <View style={stylesInfo.infoContainerFrom}>
                    <Icon
                        name='home'
                        type='material'
                        size={20}
                        color={'#808080'}/>
                    <Text style={stylesInfo.infoTextFrom}>
                        {address}
                    </Text>
                </View>
                <View style={stylesInfo.infoContainerFrom}>
                    <Icon
                        name='call'
                        type='material'
                        size={20}
                        color={'#808080'}/>
                    <Text style={stylesInfo.infoTextFrom}>
                        {phoneNumber}
                    </Text>
                </View>
            </View>
        );
    }
    else{
        return(
            <View style={stylesInfo.containerTo}>
                <View style={stylesInfo.infoContainerTo}>
                    <Text style={stylesInfo.titleTextTo}>
                        To
                    </Text>
                </View>
                <View style={stylesInfo.infoContainerTo}>
                    <Text style={stylesInfo.infoTextTo}>
                        {name}
                    </Text>
                    <Icon
                        name='person'
                        type='material'
                        size={20}
                        color={'#808080'}/>
                </View>
                <View style={stylesInfo.infoContainerTo}>
                    <Text style={stylesInfo.infoTextTo}>
                        {address}
                    </Text>
                    <Icon
                        name='home'
                        type='material'
                        size={20}
                        color={'#808080'}/>
                </View>
                <View style={stylesInfo.infoContainerTo}>
                    <Text style={stylesInfo.infoTextTo}>
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
export const OrderCard = ( {id, senderName, receiverName, value, deliveryStatus, paymentStatus}) => {
    return(
        <View style={stylesOrder.container}>
            <View style={[stylesOrder.containerRow,stylesOrder.containerRowOthers]}>
                <Text 
                    style={stylesOrder.textId}
                    numberOfLines={1}
                    adjustsFontSizeToFit={true}>
                    #{id}
                </Text>
            </View>
            <View style={[stylesOrder.containerRow, stylesOrder.containerRowName]}>
                <Text style={stylesOrder.textName}>
                    {senderName}
                </Text>
                <Icon
                    name='arrow-forward'
                    type='material'
                    size={20}
                    color={'#808080'}/>
                <Text style={stylesOrder.textName}>
                    {receiverName}
                </Text>
            </View>
            <View style={[stylesOrder.containerRow,stylesOrder.containerRowOthers]}>
                <Text style={stylesOrder.textOthers}>
                    Value: ${value}
                </Text>
            </View>
            <View style={[stylesOrder.containerRow,stylesOrder.containerRowOthers]}>
                <Text style={stylesOrder.textOthers}>
                    Delivery Status: {deliveryStatus}
                </Text>
            </View>
            <View style={[stylesOrder.containerRow,stylesOrder.containerRowOthers]}>
                <Text style={stylesOrder.textOthers}>
                    Payment Status: {paymentStatus}
                </Text>
            </View>
        </View>
    );
}
export const NotiCard = ({orderId, about, status, date, send}) => {
    const getMessage = () => {
        if (send === true){
            if (about === 'delivery'){
                switch(status){
                    case 'pending':
                        return(`You have created order #${orderId}.`);
                    case 'inProgress':
                        return(`You have delivered order #${orderId} to the carrier.`);
                    case 'success':
                        return(`The order #${orderId} has been delivered to the receiver.`);
                    case 'failed':
                        return(`The order #${orderId} has failed to be delivered to the receiver.`);
                    case 'canceled':
                        return(`The order #${orderId} has been returned to you.`);
                }
            }
            else{
                switch(status){
                    case 'pending':
                        return(`The order #${orderId} is awaiting payment.`);
                    case 'success':
                        return(`You paid the order #${orderId} successfully.`);
                    case 'canceled':
                        return(`The order #${orderId} has been canceled.`);
                }
            }
            
        }
        else{
            if (about === 'delivery'){
                switch(status){
                    case 'pending':
                        return(`The order #${orderId} is being prepared.`);
                    case 'inProgress':
                        return(`The order #${orderId} has been delivered to the carrier by the sender.`);
                    case 'success':
                        return(`The order #${orderId} has been delivered to you.`);
                    case 'failed':
                        return(`The order #${orderId} has failed to be delivered to you (rejected 3 times).`);
                }
            }
        }
    }
    const getIconProps = () => {
        switch (status) {
            case 'pending':
                return { name: 'pending-actions', color: '#c7a302' };
            case 'inProgress':
                return { name: 'cached', color: '#05cdff' };
            case 'success':
                return { name: 'done', color: '#03ff2d' };
            case 'failed':
                return { name: 'cancel', color: '#ed0707' };
            case 'canceled':
                return { name: 'block', color: '#ed0707' }
        }
    }
    const message = getMessage();
    const iconProps = getIconProps();
    return(
        <View style={stylesNoti.container}>
            <View style={stylesNoti.iconContainer}>
                <Icon
                    name={iconProps.name}
                    type='material'
                    size={40}
                    color={iconProps.color}/>
            </View>
            <View style={stylesNoti.messageContainer}>
                <Text style={stylesNoti.message}>
                    {message}
                </Text>
                <Text style={stylesNoti.date}>
                    {date}
                </Text>
            </View>
        </View>
    );
}

const stylesInfo = StyleSheet.create({
    containerFrom: {
        flexDirection: 'column',
        paddingHorizontal: 10,
        marginVertical: 5,
        borderRadius: 20,
        backgroundColor: '#c0c0c0',
        width: '100%',
    },
    containerTo: {
        flexDirection: 'column',
        paddingHorizontal: 10,
        marginVertical: 5,
        borderRadius: 20,
        backgroundColor: '#c0c0c0',
        width: '100%',
    },
    infoContainerFrom: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginVertical: 5,
        width: '100%',
    },
    infoContainerTo: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        marginVertical: 5,
        width: '100%',
    },
    infoTextFrom: {
        fontSize: 12,
        textAlign: 'left',
        maxWidth: '95%',
    },
    infoTextTo: {
        fontSize: 12,
        textAlign: 'right',
        maxWidth: '95%',
    },
    titleTextFrom: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    titleTextTo: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
    }
})
const stylesOrder = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 5,
        backgroundColor: '#ffffff',
        borderRadius: 20,
    },
    containerRow: {
        width: '100%',
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerRowName: {
        justifyContent: 'space-between',
    },
    containerRowOthers: {
        justifyContent: 'flex-start',
    },
    textId: {
        fontSize: 18,
        color: '#1ed102',
    },
    textName: {
        fontSize: 13,
        fontWeight: '500',
        maxWidth: '40%',
    },
    textOthers: {
        fontSize: 10,
    },
})
const stylesNoti = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#ffffff',
    },
    iconContainer: {
        width: '20%',
        justifyContent: 'center',
    },
    messageContainer: {
        width: '80%',
        justifyContent: 'center',
    },
    message: {
        fontSize: 13,
    },
    date: {
        fontSize: 11,
        fontWeight: '300',
    }
})