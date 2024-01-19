// AppBooker.js
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import DateTimePickerComponent from './DateTimePicker';

const AppBooker = () => {
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);

  const handleAppointmentBooked = () => {
    // Handle any additional logic after the appointment is booked
    // For example, you can update the state or perform other actions

    // For demonstration purposes, let's update the state and show a success message
    setBookingStatus('Appointment booked successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Appointment</Text>
      <Text style={styles.selectedDate}>
        Selected Date: {appointmentDate ? appointmentDate.toString() : 'Not selected'}
      </Text>
      <Text style={styles.bookingStatus}>{bookingStatus}</Text>
      <DateTimePickerComponent onAppointmentBooked={() => handleAppointmentBooked()} />
      {/* You can add more UI elements or components as needed */}
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
  bookingStatus: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default AppBooker;
