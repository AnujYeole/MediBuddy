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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from './Screens/settings';
import Logout from './Screens/logout';
import { Ionicons } from '@expo/vector-icons';
import ProfilePage from './Screens/ProfilePage';
import ForgotPassword from './Screens/ForgotPassword';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Signup" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="admin" component={AdminPage} />
      <Stack.Screen name="Our Team" component={ClientPage} />
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="DateTime" component={DateTimePickerComponent} />
      <Stack.Screen name="AppBooker" component={AppBooker} />
      <Stack.Screen name="AppointmentBooking" component={AppointmentBooking} />
      <Stack.Screen name="fp" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
            } else if (route.name === 'Logout') {
              iconName = 'log-out';
            } else if (route.name === 'Profile') {
              iconName = 'create';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={MainStack} options={{ headerShown: false }} />
        <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }} />

        <Tab.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
