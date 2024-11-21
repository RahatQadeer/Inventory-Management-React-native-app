
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import SplashScreen from './splashScreen';
import SignInUpScreen from './screens/signInUp';
import HomeScreen from './screens/homeScreen';
import AddItemScreen from './screens/AddItemScreen';
import AccountDetailsScreen from './screens/AccountDetailsScreen';
import ViewAllItemScreen from './screens/ViewAllItemScreen';
import NotificationsScreen from './screens/NotificationsScreen';
const BASE_URL = 'https://se-5-project-default-rtdb.firebaseio.com/';

// Create navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for the bottom tabs
function HomeTabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#f8f8f8', borderTopWidth: 0 },
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Add Item') iconName = 'add-circle-outline';
          else if (route.name === 'Account') iconName = 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Add Item" component={AddItemScreen} />
      <Tab.Screen name="Account" component={AccountDetailsScreen} />
    </Tab.Navigator>
  );
}

// Drawer Navigator for side menu
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent', // Make the header transparent
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
          
        },
        headerTitleStyle: {
          color: '#000', // Adjust title color as needed
          fontSize: 20,
          left: 70,
         fontWeight: 'bold' // Optional: adjust font size
        },
        headerTransparent: true, // Set header as transparent
      }}
      
    >
      <Drawer.Screen name="RE' Inventory " component={HomeTabs} />
      <Drawer.Screen name="View Total Items" component={ViewAllItemScreen} />
      <Drawer.Screen name="Password Setting" component={AccountDetailsScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}

// Main App with Stack Navigator
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SignInUp" component={SignInUpScreen} />
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
        {/* <Stack.Screen name="ViewAllItems" component={ViewAllItemScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    // backgroundColor: '#d8f8fa ',
    paddingTop: 20, // Adjust top padding (this can be adjusted for your needs)
    paddingBottom: 20, // Adjust bottom padding
  },
  headerTitle: {
    left: 40,
  },
});
