import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/MeddyBuddy.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>About MeddiBuddy</Text>
      <Text style={styles.description}>
        MeddiBuddy is your trusted companion for hassle-free medical appointments. Our mission is to simplify the
        healthcare experience by connecting patients with healthcare providers efficiently.
      </Text>
      <Text style={styles.description}>
        With MeddiBuddy, you can easily book appointments, manage your medical history, and stay updated on your health
        journey. We prioritize your well-being and strive to make healthcare accessible to everyone.
      </Text>
      <Text style={styles.description}>
        Thank you for choosing MeddiBuddy as your healthcare partner. Your health is our priority!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AboutUs;
