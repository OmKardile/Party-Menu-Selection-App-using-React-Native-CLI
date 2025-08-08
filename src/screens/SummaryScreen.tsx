// src/screens/SummaryScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Dish } from '../types/dish';
import { RootStackParamList } from '../navigation/types';

type SummaryScreenRouteProp = RouteProp<RootStackParamList, 'SummaryScreen'>;

const SummaryScreen = () => {
  const route = useRoute<SummaryScreenRouteProp>();
  const { selectedDishes } = route.params || { selectedDishes: [] };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Summary</Text>
      {selectedDishes.length === 0 ? (
        <Text style={styles.empty}>No dishes selected.</Text>
      ) : (
        <FlatList
          data={selectedDishes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>{item.description}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  empty: { fontSize: 16, color: 'gray' },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  name: { fontSize: 16, fontWeight: '600' },
  desc: { fontSize: 14, color: '#666' },
});

export default SummaryScreen;
