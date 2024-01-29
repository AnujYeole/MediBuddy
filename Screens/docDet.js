import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Linking, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AppointmentBooking = ({ route }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        setLoading(true);
        if (route?.params?.doctorID && route?.params?.doctorName) {
          const userId = route.params?.doctorID;
          const userName = route.params?.doctorName;
          console.log('Doctor Id:', userId);
          console.log('Doctor Name:', userName);

          if (userId) {
            const response = await axios.get(`http://192.168.1.100:3000/doctors/${userId}/${userName}`);
            setSelectedDoctor(response.data);
            setLoading(false);
            console.log('Response:', response);
          }
        }
      } catch (error) {
        console.error('Error fetching doctor details:', error.message);
        setLoading(false);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchDoctorDetails();
  }, [route?.params?.doctorID, route?.params?.doctorName]);

  const handleAppointmentConfirmation = () => {
    // Navigate to the DateTimePicker component or any other screen
    navigation.navigate('BookingScreen', { doctor: selectedDoctor });
  };

  const openWhatsAppChat = () => {
    if (selectedDoctor && selectedDoctor.whatsappNumber) {
      const whatsappUrl = `https://wa.me/${selectedDoctor.whatsappNumber}`;
      Linking.openURL(whatsappUrl);
    } else {
      Alert.alert('Error', 'Number is not available');
    }
  };

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
      <TouchableOpacity style={styles.confirmButton} onPress={handleAppointmentConfirmation}>
        <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.whatsappButton} onPress={openWhatsAppChat}>
        <Text style={styles.whatsappButtonText}>Chat on WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
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
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  whatsappButton: {
    marginTop: 10,
    backgroundColor: '#25D366',
    padding: 10,
    borderRadius: 5,
  },
  whatsappButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AppointmentBooking;
