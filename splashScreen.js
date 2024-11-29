
import React from "react";
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 

export default function SplashScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("./assets/background.jpg")} 
      style={styles.background}
    >
   
      <View style={styles.container}>
        <Image 
          source={require("./assets/icon.png")} 
          style={styles.logo} 
        />

        <TouchableOpacity
          style={styles.button} 
          onPress={() => { navigation.navigate('SignInUp'); }} 
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <FontAwesome 
            name="arrow-right" 
            size={15}          
            color="white"       
            style={styles.icon} 
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
// **************** Styling for Splash Screen **************** //
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", 
  },
 
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 250,  
    height: 250, 
    resizeMode: "contain",
  },
  button: {
    flexDirection: "row",
    width: 200,   
    height: 50,   
    backgroundColor: "#ed5598", 
    justifyContent: "center",   
    alignItems: "center",    
    borderRadius: 40,   
    top: 170,       
  },
  buttonText: {
    color: "white",   
    fontSize: 18,     
  },
  icon: {
    marginLeft: 20, 
  },
});
