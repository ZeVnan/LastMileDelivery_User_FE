import React, { useState, useCallback, useEffect, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements'
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { UserContext } from '../Utilities/UserContext';
import { Button1 } from '../CommonComponents/Button';


const ChatScreen = ({navigation}) => {
    const [messages, setMessages] = useState([]);
    const [messageId, setMessageId] = useState(0);
    const { token } = useContext(UserContext);

  useEffect(() => {
    createMessage(2, "Bot", "Hello, I help you with the packing.")
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const createMessage = (ownerId, ownerName, text) => {
    const message = {
      _id: messageId,
      createdAt: new Date(),
      user: {
        _id: ownerId,
        name: ownerName,
      },
      text: text
    }
    const currentId = messageId + 1;
    setMessageId(currentId);
    onSend([message]);
  }
  const createImageMessage = (ownerId, ownerName, imageUri) => {
    const message = {
      _id: messageId,
      createdAt: new Date(),
      user: {
        _id: ownerId,
        name: ownerName,
      },
      image: imageUri
    }
    const currentId = messageId + 1;
    setMessageId(currentId);
    onSend([message]);
  }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      createImageMessage(1, "You", result.assets[0].uri);
      const imageUrl = await uploadImageToImgbb(result.assets[0].uri);
      if (imageUrl !== null){
        const classifyString = await classifyImage(imageUrl);
        if (classifyString !== null){
          createMessage(2, "Bot", `Your good maybe: ${classifyString}`);
          const recommendation = await recommendByImage(classifyString);
          if (recommendation !== null){
            createMessage(2, "Bot", recommendation);
          }
          else{
            Alert.alert("Error", "Cannot generate recommendation");
          }
        }
        else{
          Alert.alert("Error", "Cannot classify image");
        }
      }
      else{
        Alert.alert("Error", "Cannot upload image");
      }
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      createImageMessage(1, "You", result.assets[0].uri);
      const imageUrl = await uploadImageToImgbb(result.assets[0].uri);
      if (imageUrl !== null){
        const classifyString = await classifyImage(imageUrl);
        if (classifyString !== null){
          createMessage(2, "Bot", `Your good maybe: ${classifyString}`);
          const recommendation = await recommendByImage(classifyString);
          if (recommendation !== null){
            createMessage(2, "Bot", recommendation);
          }
          else{
            Alert.alert("Error", "Cannot generate recommendation");
          }
        }
        else{
          Alert.alert("Error", "Cannot classify image");
        }
      }
      else{
        Alert.alert("Error", "Cannot upload image");
      }
    }
  };
  const sendMessage = async(messages) => {
    const body = {
      
    }
    try{
      const response = await axios.post(`http://pythonserver:27018/protected/chat?prompt=${messages[0]}`,
        body,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      createMessage(2, "Bot", response.status)
    }
    catch(error){
      console.log(error.message);
    }
  }
  const uploadImageToImgbb = async (uri) => {
    const apiKey = '40b2cc4cf8bd13d2053771fd619ffde2';
    const data = new FormData();
    data.append('image', {
      uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        data
      );
      return response.data.data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const classifyImage = async(imageUrl) => {
    const body = {
      image_url: imageUrl
    }
    try{
      const response = await axios.post('https://waseminarcnpm2.azurewebsites.net/protected/classify-image',
        body,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.predicted_class;
    }
    catch(error) {
      console.error('Error classifying image:', error);
      return null;
    }
  }
  const recommendByImage = async(classifyString) => {
    const body= {
      category: classifyString,
    }
    try{
      const response = await axios.post('https://waseminarcnpm2.azurewebsites.net/protected/recommendation',
        body,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.response;
    }
    catch(error) {
      console.error('Error classifying image:', error);
      return null;
    }
  }

    return (
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => {
            onSend(messages);
            sendMessage(messages);
          }}
          user={{
            _id: 1,
          }}
          renderInputToolbar={(props) => (
            <View style = {styles.inputContainer}>
              <View style = {styles.inputContainer2}>
                <InputToolbar {...props} containerStyle = {styles.inputToolbar} />
              </View>
              <Button1
                iconText='image'
                onPressEvent={pickImage}/>
              <Button1
                iconText='photo-camera'
                onPressEvent={takePhoto}/>
            </View>
          )}
        />
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
       flex: 1,
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputContainer2: {
      flex: 1,
      height: '100%',
    },
    inputToolbar: {
      height: 50,
    },
});

export default ChatScreen;
