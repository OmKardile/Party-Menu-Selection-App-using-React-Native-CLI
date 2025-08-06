// src/screens/SummaryScreen.tsx

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Dish } from '../types/Dish';

type SummaryRouteParams = {
  selectedDishes: Dish[];
  cartQuantities: { [id: number]: number };
};

const SummaryScreen = () => {
  const route = useRoute<RouteProp<Record<string, SummaryRouteParams>, string>>();
  const { selectedDishes, cartQuantities } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Selected Items</Text>
      <FlatList
        data={selectedDishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.dishName}>{item.name}</Text>
            <Text style={styles.qty}>Qty: {cartQuantities[item.id]}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No items selected.</Text>}
      />
    </View>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemRow: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  dishName: {
    fontSize: 16,
    fontWeight: '600',
  },
  qty: {
    color: '#444',
    marginTop: 4,
  },
});
