


import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [allItems, setAllItems] = useState([]); // Holds all items
  const [itemName, setItemName] = useState(''); // Holds new item's name
  const [itemQuantity, setItemQuantity] = useState(''); // Holds new item's quantity
  const [modalVisible, setModalVisible] = useState(false); // Controls modal visibility
  const [editMode, setEditMode] = useState(false); // Determines if we are editing an item
  const [selectedItemId, setSelectedItemId] = useState(null); // Holds the ID of the item being edited

  useEffect(() => {
    loadAllItems();
  }, []);

  const loadAllItems = async () => {
    const storedItems = await AsyncStorage.getItem('allItems');
    if (storedItems) {
      setAllItems(JSON.parse(storedItems));
    }
  };

  const saveItemsToStorage = async (updatedItems) => {
    await AsyncStorage.setItem('allItems', JSON.stringify(updatedItems));
    setAllItems(updatedItems);
  };

  const addItem = async () => {
    if (itemName.trim() && itemQuantity.trim()) {
      const newItem = {
        id: Date.now().toString(),
        name: itemName,
        quantity: itemQuantity,
      };

      const updatedAllItems = [newItem, ...allItems]; // Add new item at the top
      await saveItemsToStorage(updatedAllItems);

      // Save notification
      await saveNotification(`New item added: ${itemName} with quantity ${itemQuantity}.`);

      // Reset the input fields
      setItemName('');
      setItemQuantity('');
      setModalVisible(false);

      Alert.alert('Success', 'Item added successfully!');
    }
  };

  const updateItem = async () => {
    if (itemName.trim() && itemQuantity.trim()) {
      const updatedAllItems = allItems.map((item) =>
        item.id === selectedItemId ? { ...item, name: itemName, quantity: itemQuantity } : item
      );
      await saveItemsToStorage(updatedAllItems);

      // Save notification
      await saveNotification(`Item updated: ${itemName} with quantity ${itemQuantity}.`);

      // Reset the input fields and modal state
      setItemName('');
      setItemQuantity('');
      setSelectedItemId(null);
      setEditMode(false);
      setModalVisible(false);

      Alert.alert('Success', 'Item updated successfully!');
    }
  };

  const deleteItem = async (itemId) => {
    const updatedAllItems = allItems.filter((item) => item.id !== itemId);
    await saveItemsToStorage(updatedAllItems);

    // Save notification
    await saveNotification('Item deleted.');

    Alert.alert('Success', 'Item deleted successfully!');
  };

  const saveNotification = async (notification) => {
    const savedNotifications = await AsyncStorage.getItem('notifications');
    const notifications = savedNotifications ? JSON.parse(savedNotifications) : [];
    notifications.push(notification);
    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
  };

  const openEditModal = (item) => {
    setItemName(item.name);
    setItemQuantity(item.quantity);
    setSelectedItemId(item.id);
    setEditMode(true);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* View All Items Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Total Items: {allItems.length}</Text> {/* Display total items */}
        <FlatList
          data={allItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.allItemsItem}>
              <Text>{item.name} - {item.quantity}</Text>
              <TouchableOpacity onPress={() => openEditModal(item)}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Modal for Adding or Editing Item */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editMode ? 'Update Item' : 'Add New Item'}</Text>
            <TextInput
              placeholder="Item Name"
              value={itemName}
              onChangeText={setItemName}
              style={styles.input}
            />
            <TextInput
              placeholder="Quantity"
              value={itemQuantity}
              onChangeText={setItemQuantity}
              keyboardType="numeric"
              style={styles.input}
            />
            <TouchableOpacity
              onPress={editMode ? updateItem : addItem}
              style={styles.modalAddButton}
            >
              <Text style={styles.modalAddButtonText}>{editMode ? 'Update' : 'Add'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#ffe6e6', paddingTop: 110 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, padding: 16, backgroundColor: '#ff99cc', color: 'white', textAlign: 'center', marginBottom: 40, borderRadius: 10 },
  allItemsItem: { padding: 10, backgroundColor: '#fff', borderRadius: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center' },
  editText: { color: 'blue', marginLeft: 10 },
  deleteText: { color: 'red', marginLeft: 10 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 },
  modalTitle: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  modalAddButton: { backgroundColor: '#ff99cc', padding: 10, borderRadius: 5, alignItems: 'center' },
  modalAddButtonText: { color: '#fff', fontSize: 16 },
});
