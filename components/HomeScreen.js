import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const [totals, setTotals] = useState({
    Clinical: 0,
    Extracurricular: 0,
    Shadowing: 0,
    Volunteer: 0,
    Research: 0,
  });
  const [overallTotal, setOverallTotal] = useState(0);

  const calculateTotals = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("formData");
      const formData = jsonValue != null ? JSON.parse(jsonValue) : [];

      const newTotals = {
        Clinical: 0,
        Extracurricular: 0,
        Shadowing: 0,
        Volunteer: 0,
        Research: 0,
      };

      formData.forEach((data) => {
        if (data.number && data.category) {
          newTotals[data.category] += parseFloat(data.number);
        }
      });

      setTotals(newTotals);
      const totalSum = Object.values(newTotals).reduce(
        (acc, curr) => acc + curr,
        0
      );
      setOverallTotal(totalSum);
    } catch (error) {
      console.error("Error calculating totals", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      calculateTotals();
    }, [])
  );

  const renderItem = (item) => (
    <View key={item.category} style={styles.smallCard}>
      <Text style={styles.value}>{item.value}</Text>
      <Text style={styles.label}>{item.category}</Text>
    </View>
  );

  const data = [
    { category: "Clinical", value: totals.Clinical },
    { category: "Extracurricular", value: totals.Extracurricular },
    { category: "Shadowing", value: totals.Shadowing },
    { category: "Volunteer", value: totals.Volunteer },
    { category: "Research", value: totals.Research },
    { category: "Total", value: overallTotal },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.centralCard}>
        <Text style={styles.greeting}>Hello</Text>
        <View style={styles.row}>{data.map(renderItem)}</View>
      </View>
      <Button title="Go to Form" onPress={() => navigation.navigate("Form")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  centralCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  smallCard: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    margin: 5,
    width: "45%", // Adjust width to fit two columns with margins
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 12,
  },
  value: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default HomeScreen;
