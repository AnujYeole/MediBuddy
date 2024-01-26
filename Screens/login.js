import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [loading, setLoading] = useState(true); // Set to true initially
  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimerFinished(true);
    }, 3000); // Set the duration for the initial timer (3 seconds in this example)

    return () => clearTimeout(timer);
  }, []);

  const togglePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  const handleLogin = async () => {
    // Simple validation
    if (!email.trim() || !password.trim()) {
      setValidationError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://192.168.1.100:3000/login', {
        email,
        password,
      });

      // Check if the response indicates incorrect information
      if (response.data && response.data.error) {
        setValidationError('Incorrect email or password. Please try again.');
        return;
      }

      // Handle the response, e.g., show a success message
      console.log(response.data);

      // After successful login, navigate to the welcome page
      navigation.navigate('Our Team', { userEmail: response.data.email });
    } catch (error) {
      console.error('Login error: ' + error.message);
      // Handle other login errors, e.g., network issues
      setValidationError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const onPressSignUp = () => {
    navigation.navigate('Signup');
  };

  return (
    <ImageBackground style={styles.backgroundImage} source={require('../assets/smoky.png')}>
      <View style={styles.container}>
        <Image source={require('./../assets/login.png')} style={styles.logo} resizeMode="contain" />
        {timerFinished && validationError && <Text style={{ color: 'red', marginBottom: 10 }}>{validationError}</Text>}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!visiblePassword}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            {visiblePassword ? (
              <Ionicons name="eye-off" size={24} color="black" />
            ) : (
              <Ionicons name="eye" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin} style={styles.loginBtn} disabled={loading}>
          {loading ? <ActivityIndicator size="small" color="white" /> : <Text style={{ color: 'white' }}>LOGIN</Text>}
        </TouchableOpacity>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={onPressSignUp}>
          <Text style={styles.inputText}>Signup here</Text>
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
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 50,
    height: 50,
  },
  icon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  forgotAndSignUpText: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '70%',
    backgroundColor: '#DC69FF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  inputText: {
    height: 50,
    color: 'blue',
  },
  logo: {
    width: 150,
    height: 200,
  },
});

export default Login;
