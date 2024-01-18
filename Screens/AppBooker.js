// AppBooker.js
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import DateTimePickerComponent from './DateTimePicker';
import axios from 'axios';

const AppBooker = ({ route }) => {
  const { selectedDateTimestamp } = route.params || {};
  const [appointmentDate, setAppointmentDate] = useState(
    selectedDateTimestamp ? new Date(selectedDateTimestamp) : null,
  );

  const handleDateChange = (timestamp) => {
    setAppointmentDate(timestamp ? new Date(timestamp) : null);
  };

  const bookAppointment = async () => {
    try {
      if (appointmentDate) {
        // Make a request to your server to save the appointment in the database
        await axios.post('http://192.168.11.10:3000/book-appointment', { date: appointmentDate });

        // Handle success, e.g., show a success message
        alert('Appointment booked successfully!');
      } else {
        // Handle the case where appointmentDate is undefined or falsy
        alert('Please select a valid date and time before booking.');
      }
    } catch (error) {
      // Handle error, e.g., show an error message
      alert('Error booking appointment. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Appointment</Text>
      <Text style={styles.selectedDate}>
        Selected Date: {appointmentDate ? appointmentDate.toString() : 'Not selected'}
      </Text>
      <DateTimePickerComponent onDateTimeSelected={handleDateChange} />
      <Button title="Book Appointment" onPress={bookAppointment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  selectedDate: {
    marginBottom: 16,
  },
});

export default AppBooker;
