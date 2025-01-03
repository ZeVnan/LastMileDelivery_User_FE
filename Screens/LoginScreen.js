import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Alert, Image, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { UserContext } from '../Utilities/UserContext';
import { stylesInput } from '../CommonComponents/Input'
import { Button2 } from '../CommonComponents/Button'
import { OneSignal } from 'react-native-onesignal';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const {setUserId, setUserRole, userRole, setToken, setUserName} = useContext(UserContext);

  const togglePasswordVisibility = () =>{
    setIsPasswordHidden(!isPasswordHidden);
  }

  const handleLogin = async () => {
    try{
      const response = await fetch('https://waseminarcnpm2.azurewebsites.net/auth/sign-in',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      });
      
      if (response.ok){
        const result = await response.json();
        setUserId(result.data.id);
        setUserRole(result.data.role);
        setToken(result.data.token);
        setUserName(username);
        if (result.data.role === "client"){
          await OneSignal.login(result.data.id);
          navigation.navigate('Home');
        }
      }
      else{
        Alert.alert("Login Failed");
      }
    }
    catch (error){
      Alert.alert("Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image 
          source={require('../assets/login.png')} 
          style={styles.image}/>
        <TextInput
          style={[styles.inputUserName]}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.inputPassword]}
            placeholder="Password"
            secureTextEntry={isPasswordHidden}
            value={password}
            onChangeText={setPassword}/>
          <Button
            icon={{
                name: isPasswordHidden ? 'visibility-off' : 'visibility',
                type: 'material',
                size: 25,
                color: '#808080',
            }}
            buttonStyle={styles.visibilityButton}
            onPress={togglePasswordVisibility}/>
        </View>
        <View style={styles.navigateContainer}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.navigateText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
      </View>
      <Button2
        title="Log In" 
        onPressEvent={async() => {await handleLogin()}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: 'center',
  },
  inputUserName: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
  },
  inputPassword: {
    flex: 1,
    height: 50,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    marginVertical: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  visibilityButton: {
    width: 50,
    height: 50,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#ffffff'
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  navigateContainer: {
    flexDirection: 'row',
  },
  navigateText: {
    color: '#007AFF',
  }
});

export default LoginScreen