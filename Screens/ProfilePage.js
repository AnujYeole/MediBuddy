import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/pi.jpg')} style={styles.profileImage} resizeMode="cover" />
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <Text style={styles.infoText}>Age: 30</Text>
        <Text style={styles.infoText}>Gender: Male</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.infoText}>Phone: +1 123 456 7890</Text>
        <Text style={styles.infoText}>Address: 123 Main Street, City</Text>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Ionicons name="pencil" size={24} color="white" />
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    color: 'gray',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#DC69FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
});

export default ProfilePage;
