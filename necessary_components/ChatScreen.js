import React, { useState, useCallback, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const ChatScreen = ({navigation}) => {
    const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! How can I help you?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'ChatGPT',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

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
      const imageMessage = {
        _id: Math.random().toString(36).substring(7),
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'You',
        },
        image: result.assets[0].uri, // Sử dụng result.assets[0].uri cho đúng URI
      };
      onSend([imageMessage]);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log('Image URI from camera:', result.uri); // Logging URI
      const imageMessage = {
        _id: Math.random().toString(36).substring(7),
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'You',
        },
        image: result.uri,
      };
      onSend([imageMessage]);
    }
  };    
  
  
    return (
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderInputToolbar={(props) => (
            <View style = {styles.inputContainer}>
              <InputToolbar {...props} style = {styles.inputToolbar}/>
              <View style = {styles.inputContainer2}>
                    <Button 
                        title="Pick an Image" onPress={pickImage}
                        style={styles.buttonPickImage}/>
                    <Button 
                        title="Take photo" onPress={takePhoto}
                        style={styles.buttonTakePhoto}/>
              </View>
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
        flexDirection: 'column',
    },
    inputContainer2: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    buttonPickImage: {
        
    },
    buttonTakePhoto: {
        
    },
    inputToolbar: {
    },
});

export default ChatScreen;
