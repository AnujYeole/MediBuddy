// App.js (or your entry point file)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './Screens/signup';
import Login from './Screens/login';
import Welcome from './Screens/welcome';
import AdminPage from './Screens/admin';
import ClientPage from './Screens/doc';
import AppointmentBooking from './Screens/docDet';
import DateTimePickerComponent from './Screens/DateTimePicker';
import AppBooker from './Screens/AppBooker';
import BookingScreen from './Screens/BookingScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="admin" component={AdminPage} />
        <Stack.Screen name="DocInfo" component={ClientPage} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
        <Stack.Screen name="DateTime" component={DateTimePickerComponent} />
        <Stack.Screen name="AppBooker" component={AppBooker} />
        <Stack.Screen name="AppointmentBooking" component={AppointmentBooking} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
