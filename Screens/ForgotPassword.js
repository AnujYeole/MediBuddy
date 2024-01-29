import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [showAdminEmail, setShowAdminEmail] = useState(false);
  const adminEmail = 'admin@example.com'; // Replace with your admin's email

  const handleForgotPassword = () => {
    // Here, you can implement the logic to send a reset password email to the user
    // For simplicity, this example just shows the admin email
    setShowAdminEmail(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      {!showAdminEmail ? (
        <View>
          <Text style={styles.instructions}>
            Please enter your email address. We will send further instructions to reset your password.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
            <Text style={styles.buttonText}>Send Reset Instructions</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.instructions}>
            Please check your email for further instructions. If you don't receive an email, please contact the admin.
          </Text>

          <Text style={styles.adminEmail}>Admin Email: {adminEmail}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#DC69FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  adminEmail: {
    fontSize: 16,
    marginTop: 20,
  },
});

export default ForgotPassword;
