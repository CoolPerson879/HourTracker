import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const AnalyticsScreen = () => {
  const [totals, setTotals] = useState({
    'Clinical': 0,
    'Extracurricular': 0,
    'Shadowing': 0,
    'Volunteer': 0,
    'Research': 0,
  });
  const [overallTotal, setOverallTotal] = useState(0);

  const calculateTotals = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('formData');
      const formData = jsonValue != null ? JSON.parse(jsonValue) : [];

      const newTotals = {
        'Clinical': 0,
        'Extracurricular': 0,
        'Shadowing': 0,
        'Volunteer': 0,
        'Research': 0,
      };

      formData.forEach(data => {
        if (data.number && data.category) {
          newTotals[data.category] += parseFloat(data.number);
        }
      });

      setTotals(newTotals);

      const totalSum = Object.values(newTotals).reduce((acc, curr) => acc + curr, 0);
      setOverallTotal(totalSum);
    } catch (error) {
      console.error('Error calculating totals', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      calculateTotals();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {Object.keys(totals).map((category, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.label}>{category}:</Text>
            <Text style={styles.value}>{totals[category]}</Text>
          </View>
        ))}
        <View style={styles.card}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.value}>{overallTotal}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  value: {
    fontSize: 24,
    marginTop: 10,
  },
});

export default AnalyticsScreen;
