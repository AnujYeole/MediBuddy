import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const Settings = () => {
  const [notificationSwitch, setNotificationSwitch] = React.useState(false);
  const [darkModeSwitch, setDarkModeSwitch] = React.useState(false);

  const handleNotificationSwitch = () => {
    setNotificationSwitch(!notificationSwitch);
    // Handle saving the notification switch state in your app
  };

  const handleDarkModeSwitch = () => {
    setDarkModeSwitch(!darkModeSwitch);
    // Handle applying dark mode in your app
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingItem}>
        <Text>Receive Notifications</Text>
        <Switch value={notificationSwitch} onValueChange={handleNotificationSwitch} />
      </View>

      <View style={styles.settingItem}>
        <Text>Dark Mode</Text>
        <Switch value={darkModeSwitch} onValueChange={handleDarkModeSwitch} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 35,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
});

export default Settings;
