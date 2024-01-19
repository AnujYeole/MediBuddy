import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const BookingScreen = ({ route }) => {
  const { doctor } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleBooking = async () => {
    try {
      console.log('Inside Try', doctor.id, doctor.name);
      //console.log('DocId,Name,date', doctorId, doctorName, selectedDate, route.params);
      const response = await axios.post('http://192.168.212.10:3000/book-appointment', {
        doctorId: doctor.id,
        doctorName: doctor.name,
        date: selectedDate,
      });
      console.log('Inside Call', response.data);
      // Handle success, e.g., show a success message to the user
    } catch (error) {
      console.error('Error booking appointment:', error.message);
      // Handle error, e.g., show an error message to the user
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
    <View style={styles.container}>
      <Ionicons name="calendar" size={32} color="black" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
      />
      <Button title="Book Appointment" onPress={handleBooking} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BookingScreen;
