import React from "react";
import { Alert } from "react-native";
export const createNotification = async (order, about, status, token) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  try {
    await fetch(
      `https://waseminarcnpm2.azurewebsites.net/protected/notification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: order._id,
          senderId: order.senderInfo.userId,
          receiverId: order.receiverInfo.userId,
          date: formattedDate,
          about: about,
          status: status,
        }),
      }
    );
  } catch (error) {
    Alert.alert("Create Notification Error", `${error.message}`);
  }
};
export const pushNotification = async (userId, title, message, token) => {
  console.log(userId);
  console.log(message);
  console.log(title);
  try {
    const response = await fetch(
      `https://waseminarcnpm2.azurewebsites.net/protected/one-signal/send-push-notification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
          contentEn: message,
          headingEn: title,
          subtitleEn: "-",
        }),
      }
    );
    console.log(`${response.status}`);
  } catch (error) {
    Alert.alert("Push notification error", `${error.message}`);
  }
};
