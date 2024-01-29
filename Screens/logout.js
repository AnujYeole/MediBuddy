import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Logout = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Perform logout actions, e.g., clear authentication state

    // Navigate to the login screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={require('./../assets/logout.jpg')} style={styles.logo} resizeMode="contain" />

      <TouchableOpacity onPress={handleLogout} style={styles.loginBtn}>
        <Text style={styles.loginText}>Logout </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  logo: {
    height: 100,
    width: 200,
  },
});

export default Logout;
