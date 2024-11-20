import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

const ReviewScreen = ({navigation}) => {
  const [starCount, setStarCount] = useState(0);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');

  const handleStarRatingPress = (rating) => {
    setStarCount(rating);
  };

  const handleUploadPhoto = async () => {
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

    if (!result.canceled){
      setImages([...images, result]);
    }
  };

  const handleSubmitReview = () => {
    navigation.navigate('Order History')
  };

  return (
    <View style={styles.container}>
      <View style={styles.actionContainer}>
        <Text style={styles.title}>Rate Us</Text>
        

        <Text style={styles.title}>Add Image</Text>
        <Button 
          title="Upload Photo" 
          onPress={handleUploadPhoto}
          type='clear'
        />
        <View style={styles.imageContainer}>
          <FlatList
            data={images}
            renderItem={({ item }) => (
              <Image source={{ uri: item.assets[0].uri }} style={styles.uploadedImage} />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
          />
        </View>
        

        <Text style={styles.title}>Add Message</Text>
        <TextInput
          style={styles.message}
          placeholder="Add Message"
          multiline={true}
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
        />
      </View>
      <Button 
        title="Submit Review" 
        onPress={handleSubmitReview} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  actionContainer: {
    flex: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  stars: {
    width: 100,
    height: 20,
  },
  message: {
    fontSize: 16,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  uploadedImage: {
    width: 300,
    height: 300,
    margin: 10,
    borderRadius: 8,
    alignSelf: 'center'
  },
  imageContainer: {
    marginVertical: 20,
    height: 300
  },
});

export default ReviewScreen;