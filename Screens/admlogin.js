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

const AdminLogin = ({ navigation }) => {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
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

  const handleAdminLogin = async () => {
    // Simple validation
    if (!adminEmail.trim() || !adminPassword.trim()) {
      setValidationError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      // Make an API request to your backend for admin login
      // Replace 'http://your-api-url/admin-login' with your actual admin login API endpoint
      const response = await axios.post('http://192.168.1.100:3000/admlogin', {
        email: adminEmail,
        password: adminPassword,
      });

      // Check if the response indicates incorrect information
      if (response.data && response.data.error) {
        setValidationError('Incorrect email or password. Please try again.');
        return;
      }

      // Handle the response, e.g., show a success message
      console.log(response.data);

      // After successful admin login, navigate to the admin panel or dashboard
      navigation.navigate('admin', { adminEmail: response.data.email });
    } catch (error) {
      console.error('Admin login error: ' + error.message);
      // Handle other admin login errors, e.g., network issues
      setValidationError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
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
            placeholder="Admin Email"
            onChangeText={(text) => setAdminEmail(text)}
            value={adminEmail}
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
            onChangeText={(text) => setAdminPassword(text)}
            value={adminPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            {visiblePassword ? (
              <Ionicons name="eye-off" size={24} color="black" />
            ) : (
              <Ionicons name="eye" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleAdminLogin} style={styles.loginBtn} disabled={loading}>
          {loading ? <ActivityIndicator size="small" color="white" /> : <Text style={{ color: 'white' }}>LOGIN</Text>}
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
  loginBtn: {
    width: '70%',
    backgroundColor: '#DC69FF',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 200,
  },
});

export default AdminLogin;
