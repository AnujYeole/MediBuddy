import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Welcome = ({ navigation }) => {
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigation.replace('Login');
    };

    fetchData();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('./../assets/MeddyBuddy.png')} style={styles.logo} resizeMode="contain" />
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
  logo: {
    width: 200,
    height: 200,
  },
});

export default Welcome;
