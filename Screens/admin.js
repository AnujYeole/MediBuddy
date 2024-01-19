// AdminPage.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const AdminPage = () => {
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      // Use the "canceled" property instead of "cancelled"
      // Access selected assets through the "assets" array
      if (result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        setProfilePicture(selectedAsset.uri);
      }
    }
  };

  const handleAddDoctor = async () => {
    try {
      const response = await axios.post('http://192.168.212.10:3000/addDoctor', {
        name,
        occupation,
        profilePicture,
      });

      console.log('Doctor added successfully. ID:', response.data.insertedId);
    } catch (error) {
      console.error('Error adding doctor:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Doctor</Text>

      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={(text) => setName(text)} />

      <TextInput
        style={styles.input}
        placeholder="Occupation"
        value={occupation}
        onChangeText={(text) => setOccupation(text)}
      />

      {profilePicture && <Image source={{ uri: profilePicture }} style={styles.profilePicture} />}

      <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePicker}>
        <Text style={styles.imagePickerButtonText}>Select Profile Picture</Text>
      </TouchableOpacity>

      <Button title="Add Doctor" onPress={handleAddDoctor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    width: '100%',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },

  imagePickerButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },

  imagePickerButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AdminPage;
