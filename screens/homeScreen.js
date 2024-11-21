

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image,TouchableOpacity, Button, Modal, TextInput, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

export default function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState('Rahat '); // Default name
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempName, setTempName] = useState(userName); // Temporary name for input
  const [searchTerm, setSearchTerm] = useState(''); // New state for search input

  const saveName = () => {
    setUserName(tempName); // Update the displayed name
    setIsModalVisible(false); // Close the modal
  };

  const handleSearch = (text) => {
    setSearchTerm(text); // Update search term state
  };

  const quickActions = [
    { id: '1', name: 'Add Item', icon: 'add-circle-outline', route: 'Add Item' },
    { id: '2', name: 'View All Items', icon: 'list-circle-outline', route: 'View Total Items' },
    { id: '3', name: 'Reset Password', icon: 'person-circle-outline', route: 'Account' },
  ];

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <ImageBackground
          source={require('../assets/homeback.jpg')} // Replace with your image path
          style={styles.background}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Hi {userName}</Text>
              <Text style={styles.welcome}>Welcome Back</Text>
            </View>
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Ionicons name="person-circle-outline" size={40} color="#fff" />
            </TouchableOpacity>
          </View>
          {/* Search Box Below the Welcome Text */}
          <View style={styles.searchBoxContainer}>
            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={20} color="#333" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search items..."
                value={searchTerm}
                onChangeText={handleSearch}
              />
            </View>
          </View>

             {/* Image Box Below Search Box */}
             
            <View style={styles.imageBox}>
              <Image
                source={require('../assets/hometop.png')} // Replace with your image path
                style={styles.image}
              />
            </View>
          
        </ImageBackground>

        {/* Wave Shape */}
        <Svg
          height="20%"
          width="100%"
          viewBox="0 0 1440 320"
          style={styles.wave}
        >
          <Path
            fill="#fff" // Adjust the wave color
            d="M0,224 C80,160 320,64 480,96 C640,128 720,256 960,288 C1200,320 1360,256 1440,224 L1440,320 L0,320 Z"
          />
        </Svg>
      </View>

      {/* Modal for Updating Name */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Your Name</Text>
            <TextInput
              style={styles.input}
              value={tempName}
              onChangeText={setTempName}
              placeholder="Enter your name"
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" color="#FF3E7F" onPress={() => setIsModalVisible(false)} />
              <Button title="Save" onPress={saveName} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Quick Actions Section */}
      <View style={styles.actions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <FlatList
          data={quickActions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => navigation.navigate(item.route)}
            >
              <Ionicons name={item.icon} size={30} color="black" />
              <Text style={styles.actionText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop:40,
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    // paddingTop: 40,
    // top:50,
    position: 'relative',
    backgroundColor: '#FF3E7F', // Placeholder for gradient color
  },
  background: {
    height: 400,
  },
  wave: {
    position: 'absolute',
    bottom: -1, // Ensures wave aligns seamlessly with the content
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 35,
    paddingRight: 20,
    top: 40,
    marginTop: 60,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  welcome: {
    fontSize: 16,
    color: '#fff',
  },
  actions: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    top: -30,
  },
  actionItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    borderStartColor: 'pink',
    borderStartWidth: 8,
    borderTopColor: 'pink',
    borderTopWidth: 9,
  },
  actionText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  searchBoxContainer: {
    paddingHorizontal: 20,
    marginTop: 60, // Adds spacing below the welcome text
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  imageBoxContainer:{
      position: 'absolute',
      bottom: -20, // Adds spacing below the quick actions section
      left: 20,
      right: 20,
      
  },
  
  image:{
    width: '60%',
    height: '65%',
    resizeMode: 'cover',
    borderRadius: 10,
    left: 130,
    top:0,
  }
})

