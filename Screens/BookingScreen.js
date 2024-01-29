import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const BookingScreen = ({ route }) => {
  const { doctor } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleBooking = async () => {
    try {
      const response = await axios.post('http://192.168.1.101:3000/book-appointment', {
        doctorId: doctor.id,
        doctorName: doctor.name,
        date: selectedDate,
      });

      Alert.alert('Appointment Booked Successfully');
    } catch (error) {
      console.error('Error booking appointment:', error.message);
      Alert.alert('Error', 'Error booking appointment. Please try again.');
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <ImageBackground source={require('../assets/smoky.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Ionicons name="calendar" size={32} color="black" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
        />
        <TouchableOpacity onPress={handleBooking} style={styles.loginBtn}>
          <Text style={{ color: 'white' }}>Book Appointment </Text>
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
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
});

export default BookingScreen;
