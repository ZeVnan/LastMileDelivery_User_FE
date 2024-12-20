import React from 'react';
import { Alert } from 'react-native';
export const createNotification = (order, about, status, token) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    try {
        fetch(`https://waseminarcnpm2.azurewebsites.net/protected/notification`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            orderId: order._id,
            senderId: order.senderInfo.userId,
            receiverId: order.receiverInfo.userId,
            date: formattedDate,
            about: about,
            status: status,
        }),
        })
    }
    catch(error){
        Alert.alert("Create Notification Error", `${error.message}`);
    }
}
export const pushNotification = ({userId, title, message}) => {

}