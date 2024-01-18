import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground } from 'react-native';

const Welcome = ({ navigation, route }) => {
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const goToSignUp = () => {
    navigation.navigate('Signup');
  };

  return (
    <ImageBackground source={require('.././assets/mb.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to MediBuddy!</Text>
        <View style={styles.buttonContainer}>
          <Button title="Log In" onPress={goToLogin} />
          <Button title="Sign Up" onPress={goToSignUp} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Add some transparency to the background
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Choose a suitable text color
  },
  buttonContainer: {
    width: '80%', // Adjust the width as needed
    flexDirection: 'row', // Align buttons horizontally
    justifyContent: 'space-around', // Add space around buttons
    marginTop: 20,
  },
});

export default Welcome;
