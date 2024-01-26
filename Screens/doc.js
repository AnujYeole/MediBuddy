// ClientPage.js

import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, TouchableOpacity, Text, StyleSheet, Animated, Easing } from 'react-native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome from expo vector-icons

const ClientPage = ({ navigation }) => {
  const [doctorsData, setDoctorsData] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://192.168.1.100:3000/doctors');
        setDoctorsData(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error.message);
      }
    };

    fetchDoctors();
  }, []);

  const handlePress = (item) => {
    navigation.navigate('AppointmentBooking', { doctorID: item.id, doctorName: item.name });
  };

  const handleHover = (item) => {
    setHoveredItem(item.id);
  };

  const renderItem = ({ item }) => {
    const opacity = hoveredItem === item.id ? 0.8 : 1;
    return (
      <TouchableOpacity
        style={[styles.itemContainer, { opacity }]}
        onPress={() => handlePress(item)}
        onShowUnderlay={() => handleHover(item)}
        onHideUnderlay={() => setHoveredItem(null)}
      >
        <Image source={{ uri: item.profilePicture }} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.occupation}>{item.occupation}</Text>
        </View>
        <FontAwesome name="arrow-right" size={20} color="#fa96ff" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={doctorsData} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fffcff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  occupation: {
    fontSize: 14,
    color: '#666',
  },
});

export default ClientPage;
