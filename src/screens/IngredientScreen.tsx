import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { Dish } from '../types/dish';

const IngredientScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'IngredientScreen'>>();
  const { dish } = route.params;

  const mockIngredients = [
    'Salt',
    'Turmeric',
    'Tomato',
    'Paneer',
    'Cumin Seeds',
    'Onion',
    'Chili Powder',
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>{dish.name} Ingredients</Text>
      <View style={styles.ingredientBox}>
        {mockIngredients.map((item, index) => (
          <Text key={index} style={styles.ingredient}>
            • {item}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  ingredientBox: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
});

export default IngredientScreen;
