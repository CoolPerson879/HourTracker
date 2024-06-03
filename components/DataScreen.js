import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const DataScreen = () => {
  const [formData, setFormData] = useState([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("formData");
      setFormData(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (error) {
      console.error("Error retrieving data", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const deleteData = async (index) => {
    try {
      const updatedData = formData.filter((_, i) => i !== index);
      setFormData(updatedData);
      await AsyncStorage.setItem("formData", JSON.stringify(updatedData));
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {formData.map((data, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.dataItem}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.cardText}>{data.name}</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.cardText}>{data.email}</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.label}>Number:</Text>
              <Text style={styles.cardText}>{data.number}</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.label}>Category:</Text>
              <Text style={styles.cardText}>{data.category}</Text>
            </View>
            <Button title="Delete" onPress={() => deleteData(index)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  scrollViewContent: {
    alignItems: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dataItem: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 16,
  },
});

export default DataScreen;
