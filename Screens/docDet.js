import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const AppointmentBooking = ({ route }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log('Route:', route.params);
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        setLoading(true);
        if (route?.params?.doctorID) {
          const userId = route.params?.doctorID;
          console.log(' Doctor Id : ', userId);

          if (userId) {
            console.log('Inside if', typeof userId);
            const response = await axios.get(`http://192.168.11.10:3000/doctors/${userId}`);
            console.log(typeof userId);
            setSelectedDoctor(response.data);
            setLoading(false);
            console.log('Response:', response);
          }
        }
      } catch (error) {
        console.error('Error fetching doctor details:', error.message);
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [route?.params?.doctorID]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!selectedDoctor) {
    return (
      <View>
        <Text>Error loading data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: selectedDoctor.profilePicture }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{selectedDoctor.name}</Text>
        <Text style={styles.occupation}>{selectedDoctor.occupation}</Text>
        {/* Add more details as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  occupation: {
    fontSize: 16,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppointmentBooking;
