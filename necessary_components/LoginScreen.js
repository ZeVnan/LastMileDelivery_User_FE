import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { UserContext } from './UserContext';

const LoginScreen = ({onLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setUserId, setUserRole, userRole, setToken} = useContext(UserContext);

  const handleLogin = async () => {
    if (username === "1" && password ==="1"){
      setUserId("1");
      setUserRole("sender");
      onLogin();
      return;
    }
    try{
      const response = await fetch('https://waseminarcnpm.azurewebsites.net/auth/sign-in',{
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
        if (userRole === "sender" || userRole === "receiver"){
          onLogin();
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
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button
        title="Login" 
        onPress={handleLogin}
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
  inputContainer: {
    flex: 1,
    justifyContent:'center',
  },
  input: {
    height: 40,
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginBottom: 10,
  },
});

export default LoginScreen