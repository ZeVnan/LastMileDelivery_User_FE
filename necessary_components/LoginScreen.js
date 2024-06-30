import React, { useState } from 'react';
import { View, TextInput, Text, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const LoginScreen = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
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