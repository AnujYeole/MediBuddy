// DateTimePickerComponent.js
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';

const DateTimePickerComponent = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();
    if (date) {
      setSelectedDate(date);
      // Handle booking logic directly here
      bookAppointment(date);
    }
  };

  const bookAppointment = async (date) => {
    try {
      // Make a request to your server to save the appointment in the database
      await axios.post('http://192.168.88.10:3000/book-appointment', { date });

      // Handle success, e.g., show a success message
      alert('Appointment booked successfully!');
    } catch (error) {
      // Handle error, e.g., show an error message
      alert('Error booking appointment. Please try again.');
    }
  };

  return (
    <ImageBackground source={require('../assets/appo3.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Choose Date and Time</Text>
        <TouchableOpacity style={styles.button} onPress={showDatePicker}>
          <Text style={styles.buttonText}>Select Date and Time</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()} // Set minimumDate to the current date
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Semi-transparent white background
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Dark text color
  },
  button: {
    backgroundColor: '#4285F4', // Google Blue
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default DateTimePickerComponent;
