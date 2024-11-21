import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';

const EditAccountScreen = () => {
  // State to store the current password and the new password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle the password change logic
  const handleChangePassword = async () => {
    // Check if the new password matches the confirm password
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match.');
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Error', 'No user is logged in.');
      return;
    }

    // Re-authenticate the user before changing the password
    const credentials = EmailAuthProvider.credential(user.email, currentPassword);
    try {
      await reauthenticateWithCredential(user, credentials);

      // Now update the password
      await updatePassword(user, newPassword);

      // Success alert
      Alert.alert('Success', 'Password changed successfully!');
      
      // Reset the input fields after successful change
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      // Handle errors (e.g., wrong current password)
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Image at the top */}
      <Image
        source={require('../assets/pswrd.png')} // Replace with your image URL or local path
        style={styles.image}
      />

      <Text style={styles.title}>Change Password</Text>

      {/* Current Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Current Password"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />

      {/* New Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      {/* Confirm New Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Change Password Button */}
      <TouchableOpacity style={styles.Btn} onPress={handleChangePassword}>
        <Text style={styles.BtnText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffe6e6',
    paddingTop: 90,  // Adjust padding for the image and title
  },
  image: {
    width: '60%',
    height: 150,  // Adjust the height based on your image size
    resizeMode: 'cover',
    top: 10, // Adjust image scaling
    marginBottom: 20,
    left: 60,  // Space between image and title
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: '92%',
    height: 50,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    left: 10,
  },
  Btn: {
    backgroundColor: '#ff99cc', // Button background color
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    width: '89%',
    alignItems: 'center',
    left: 15,
  },
  BtnText: {
    color: '#fff', // Text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditAccountScreen;
