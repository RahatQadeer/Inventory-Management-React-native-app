
import React from "react";
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 

export default function SplashScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("./assets/background.jpg")} // Replace with your image path
      style={styles.background}
    >
   
      <View style={styles.container}>
        <Image 
          source={require("./assets/icon.png")} // Replace with your logo/image path
          style={styles.logo} 
        />

        <TouchableOpacity
          style={styles.button} 
          onPress={() => { navigation.navigate('SignInUp'); }} // Navigate to SignInUpScreen
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <FontAwesome 
            name="arrow-right" // Right arrow icon
            size={15}           // Icon size
            color="white"       // Icon color
            style={styles.icon} // Style for the icon
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Ensures the background image covers the entire screen
  },
 
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 250,  // Adjust size as needed
    height: 250, // Adjust size as needed
    resizeMode: "contain",
  },
  button: {
    flexDirection: "row",
    width: 200,   // Adjust the width of the button
    height: 50,   // Adjust the height of the button
    backgroundColor: "#ed5598", // Button background color
    justifyContent: "center",   // Centers text vertically
    alignItems: "center",     // Centers text horizontally
    borderRadius: 40,   
    top: 170,        // Optional: rounded corners
  },
  buttonText: {
    color: "white",   // Text color
    fontSize: 18,     // Font size of the button text
  },
  icon: {
    marginLeft: 20, // Adds space between the text and icon
  },
});
