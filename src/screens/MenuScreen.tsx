// src/screens/MenuScreen.tsx

import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Dish } from '../types/dish';
import { RootStackParamList } from '../navigation/types';
import sampleData from '../data/sample.json';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MenuScreen'>;

const FILTERS = ['STARTER', 'MAIN COURSE', 'DESSERT', 'SIDES'];

const MenuScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<'VEG' | 'NON_VEG' | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [cartQuantities, setCartQuantities] = useState<{ [id: number]: number }>({});

  const dishes: Dish[] = sampleData.map((item) => ({
    ...item,
    image: item.image ?? 'https://via.placeholder.com/100', // Fallback
    type: item.type === 'VEG' ? 'VEG' : 'NON_VEG',
    mealType: item.mealType as Dish['mealType'],
  }));

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const matchSearch = dish.name.toLowerCase().includes(search.toLowerCase());
      const matchType = selectedType ? dish.type === selectedType : true;
      const matchCategory = selectedFilter ? dish.mealType === selectedFilter : true;
      return matchSearch && matchType && matchCategory;
    });
  }, [search, selectedType, selectedFilter]);

  const handleAdd = (dishId: number) => {
    setCartQuantities((prev) => ({
      ...prev,
      [dishId]: (prev[dishId] || 0) + 1,
    }));
  };

  const handleRemove = (dishId: number) => {
    setCartQuantities((prev) => {
      if (!prev[dishId]) return prev;
      const updated = { ...prev };
      updated[dishId] -= 1;
      if (updated[dishId] <= 0) delete updated[dishId];
      return updated;
    });
  };

  const handleContinue = () => {
    const selectedDishes = dishes.filter((dish) => cartQuantities[dish.id]);
    navigation.navigate('SummaryScreen', {
      selectedDishes,
      cartQuantities,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search dishes..."
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, selectedType === 'VEG' && styles.vegButton]}
          onPress={() => setSelectedType(selectedType === 'VEG' ? null : 'VEG')}
        >
          <Text style={{ color: 'green' }}>🟢 Veg</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, selectedType === 'NON_VEG' && styles.nonVegButton]}
          onPress={() => setSelectedType(selectedType === 'NON_VEG' ? null : 'NON_VEG')}
        >
          <Text style={{ color: 'red' }}>🔴 Non-Veg</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal contentContainerStyle={styles.filterRow}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.selectedFilterButton,
            ]}
            onPress={() => setSelectedFilter(selectedFilter === filter ? null : filter)}
          >
            <Text>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item:dish,item }) => (
          <View style={styles.card}>
            <Image source={{ uri: dish.image || '' }} style={styles.image} />
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text style={styles.dishDesc}>{item.description}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.actionBtn}>
                  <Text>➖</Text>
                </TouchableOpacity>
                <Text>{cartQuantities[item.id] || 0}</Text>
                <TouchableOpacity onPress={() => handleAdd(item.id)} style={styles.actionBtn}>
                  <Text>➕</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('IngredientScreen', { dish: item })}
                  style={[styles.actionBtn, { marginLeft: 12 }]}
                >
                  <Text>Ingredients</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.cartPrompt}>
        <Text>
          🛒 {Object.values(cartQuantities).reduce((a, b) => a + b, 0)} items in cart
        </Text>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={{ color: 'white' }}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 8,
    marginBottom: 10,
  },
  toggleContainer: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  toggleButton: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  vegButton: { backgroundColor: '#d0f0d0' },
  nonVegButton: { backgroundColor: '#fcdada' },
  filterRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  selectedFilterButton: { backgroundColor: '#ddd' },
  list: { paddingBottom: 100 },
  card: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fafafa',
    marginBottom: 10,
    alignItems: 'center',
  },
  image: { width: 80, height: 80, borderRadius: 10 },
  dishName: { fontWeight: 'bold', fontSize: 16 },
  dishDesc: { color: '#666', fontSize: 13 },
  actions: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  actionBtn: {
    padding: 6,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginHorizontal: 4,
  },
  cartPrompt: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 5,
  },
  continueButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 10,
  },
});
