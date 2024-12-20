import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import styles from './styles';
import React, { useState } from 'react';

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
      />
<View style={styles.passwordContainer}>
  <TextInput
    style={styles.passwordInput}
    value={password}
    onChangeText={setPassword}
    placeholder="Password"
    secureTextEntry={!isPasswordVisible}
  />
  <TouchableOpacity
    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
    style={styles.eyeIcon}
  >
    <Ionicons
      name={isPasswordVisible ? 'eye' : 'eye-off'}
      size={24}
      color="#777"
    />
  </TouchableOpacity>
</View>
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </View>
    </View>
  );
};

export default AuthScreen;
