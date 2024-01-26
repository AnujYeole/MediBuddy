import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Alert, Text, ImageBackground, Image } from 'react-native';
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
      const response = await axios.post('http://192.168.1.100:3000/signup', {
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

  const onPressLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground source={require('../assets/smoky.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image source={require('./../assets/signup.png')} style={styles.logo} resizeMode="contain" />

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="black" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} value={email} />
        </View>
        <View style={styles.passwordContainer}>
          <Ionicons name="lock-closed-outline" size={24} color="black" style={styles.icon} />
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
          <Ionicons name="lock-closed-outline" size={24} color="black" style={styles.icon} />
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
        <TouchableOpacity onPress={handleSignUp} style={styles.loginBtn}>
          <Text style={styles.loginText}>Sign Up </Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 10 }}>Already have an account?</Text>
        <TouchableOpacity onPress={onPressLogin}>
          <Text style={{ color: 'blue' }}>Login here</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
  },
  icon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    padding: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  loginBtn: {
    width: '70%',
    backgroundColor: '#DC69FF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  logo: {
    height: 200,
    width: 200,
  },
});

export default SignUp;
