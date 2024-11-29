import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const savedNotifications = await AsyncStorage.getItem("notifications");
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  };

  // Function to render icon based on notification type
  const renderIcon = (notification) => {
    if (notification.includes("added")) {
      return <Ionicons name="checkmark-circle" size={24} color="green" />;
    } else if (notification.includes("deleted")) {
      return <Ionicons name="trash-bin" size={24} color="red" />;
    } else if (notification.includes("updated")) {
      return <Ionicons name="pencil" size={24} color="blue" />;
    }
    return <Ionicons name="notifications" size={24} color="gray" />;
  };

  return (
    <ScrollView style={styles.container}>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <View key={index} style={styles.notificationContainer}>
            {/* Render the appropriate icon */}
            <TouchableOpacity style={styles.iconContainer}>
              {renderIcon(notification)}
            </TouchableOpacity>
            <Text style={styles.notificationText}>{notification}</Text>
          </View>
        ))
      ) : (
        <Text>No notifications yet.</Text>
      )}
    </ScrollView>
  );
};
// ********************* Styles ********************** //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 100,
    backgroundColor: "#ffe6e6",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  notificationContainer: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  notificationText: {
    color: "#333",
    fontSize: 16,
    marginLeft: 10,
  },
  iconContainer: {
    padding: 5,
  },
});

export default NotificationsScreen;
