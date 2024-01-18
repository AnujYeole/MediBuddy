import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleSignUp = async () => {
    // Simple validation
    if (!username.trim()) {
      Alert.alert('Validation Error', 'Please enter a username.');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Validation Error', 'Please enter an email address.');
      return;
    }

    // You can add more advanced email validation if needed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Validation Error', 'Please enter a password.');
      return;
    }

    if (password !== confirmpassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.11.10:3000/signup', {
        username,
        email,
        password,
        confirmpassword,
      });

      // Handle the response, e.g., show a success message
      console.log(response.data);

      // After successful signup, navigate to the login page
      navigation.navigate('DocInfo');
    } catch (error) {
      console.error('Signup error: ' + error.message);
      // Handle signup error, e.g., show an error message to the user
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} value={email} />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          {isPasswordVisible ? (
            <Ionicons name="eye-off" size={24} color="black" />
          ) : (
            <Ionicons name="eye" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          secureTextEntry={!isConfirmPasswordVisible}
          onChangeText={(text) => setConfirmpassword(text)}
          value={confirmpassword}
        />
        <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIcon}>
          {isConfirmPasswordVisible ? (
            <Ionicons name="eye-off" size={24} color="black" />
          ) : (
            <Ionicons name="eye" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    padding: 10,
  },
  eyeIcon: {
    padding: 10,
  },
});

export default SignUp;
