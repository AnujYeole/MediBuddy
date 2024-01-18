// DateTimePickerComponent.js
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';

const DateTimePickerComponent = ({ onDateTimeSelected }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigation = useNavigation();

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
      onDateTimeSelected(date.getTime()); // Pass the timestamp instead of the Date object
      navigation.navigate('AppBooker');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Date and Time</Text>
      <Button onPress={showDatePicker} title="Select Date and Time" />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default DateTimePickerComponent;
