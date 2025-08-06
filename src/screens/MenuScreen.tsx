import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import sampleData from '../data/sample.json';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Dish } from '../types/dish';

const mealTypes = ['Starter', 'Main Course', 'Dessert', 'Sides'];

const MenuScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [cartQuantities, setCartQuantities] = useState<{ [id: number]: number }>({});

  useEffect(() => {
    const dishList: Dish[] = sampleData; 
    setDishes(dishList);
  }, []);

  const toggleVeg = () => setIsVegOnly((prev) => !prev);

  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = !isVegOnly || dish.veg;
    const matchesMealType = !selectedMealType || dish.mealType === selectedMealType;
    return matchesSearch && matchesVeg && matchesMealType;
  });

  const updateQuantity = (dishId: number, change: number) => {
    setCartQuantities((prev) => {
      const current = prev[dishId] || 0;
      const updated = Math.max(0, current + change);
      return { ...prev, [dishId]: updated };
    });
  };

  const selectedDishes = dishes.filter((dish) => cartQuantities[dish.id] > 0);

  const handleContinue = () => {
    navigation.navigate('SummaryScreen', {
      selectedDishes,
      cartQuantities,
    });
  };

  const renderDish = ({ item }: { item: Dish }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image || '' }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.dishName}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.cardActions}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{cartQuantities[item.id] || 0}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('IngredientScreen', { dish: item })}
            style={styles.ingredientButton}
          >
            <Text style={styles.ingredientButtonText}>Ingredients</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search dishes..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Veg / Non-Veg Toggle */}
      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Veg Only</Text>
        <TouchableOpacity
          onPress={toggleVeg}
          style={[
            styles.toggleButton,
            { backgroundColor: isVegOnly ? 'green' : 'red' },
          ]}
        >
          <Text style={styles.toggleText}>{isVegOnly ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
      </View>

      {/* Meal Type Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {mealTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterButton,
              selectedMealType === type && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedMealType(selectedMealType === type ? null : type)}
          >
            <Text
              style={[
                styles.filterText,
                selectedMealType === type && styles.filterTextActive,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Dish List */}
      <FlatList
        data={filteredDishes}
        renderItem={renderDish}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />

      {/* Continue Button */}
      {selectedDishes.length > 0 && (
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueText}>
            Continue ({selectedDishes.length} item{selectedDishes.length > 1 ? 's' : ''})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  searchBar: {
    height: 40,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  toggleButton: {
    padding: 8,
    borderRadius: 20,
    width: 60,
    alignItems: 'center',
  },
  toggleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  filterScroll: {
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#007bff',
  },
  filterText: {
    color: '#333',
  },
  filterTextActive: {
    color: '#fff',
  },
  list: {
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 10,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  ingredientButton: {
    marginLeft: 'auto',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#007bff',
    borderRadius: 6,
  },
  ingredientButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  continueButton: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    right: 20,
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
