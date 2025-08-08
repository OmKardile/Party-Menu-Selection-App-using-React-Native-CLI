import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dish } from '../types/dish';
import sampleData from '../data/sample.json';

const mealTypes = ['Starter', 'Main Course', 'Dessert', 'Sides'] as const;
const vegFilterOptions = ['All', 'Veg', 'Non-Veg'] as const;

type VegFilter = typeof vegFilterOptions[number];

const MenuScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [selectedMealType, setSelectedMealType] = useState<string>('All');
  const [vegFilter, setVegFilter] = useState<VegFilter>('All');
  const [selectedDishes, setSelectedDishes] = useState<Dish[]>([]);

  const filteredDishes = sampleData.filter((dish: Dish) => {
    const matchSearch = dish.name.toLowerCase().includes(search.toLowerCase());
    const matchMealType =
      selectedMealType === 'All' || dish.mealType === selectedMealType;
    const matchVeg =
      vegFilter === 'All' ||
      (vegFilter === 'Veg' && dish.type === 'Veg') ||
      (vegFilter === 'Non-Veg' && dish.type === 'Non-Veg');
    return matchSearch && matchMealType && matchVeg;
  });

  const toggleDishSelection = (dish: Dish) => {
    if (selectedDishes.find(d => d.name === dish.name)) {
      setSelectedDishes(prev => prev.filter(d => d.name !== dish.name));
    } else {
      setSelectedDishes(prev => [...prev, dish]);
    }
  };

  const navigateToSummary = () => {
    navigation.navigate('SummaryScreen', { selectedDishes });
  };

  const navigateToIngredients = (dish: Dish) => {
    navigation.navigate('IngredientScreen', { dish });
  };

  const isSelected = (dish: Dish) =>
    selectedDishes.some(d => d.name === dish.name);

  const renderDishCard = ({ item }: { item: Dish }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image || '' }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.type}>{item.type}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.ingredientButton}
            onPress={() => navigateToIngredients(item)}
          >
            <Text style={styles.buttonText}>View Ingredients</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => toggleDishSelection(item)}
          >
            <Text style={styles.buttonText}>
              {isSelected(item) ? 'Remove' : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search dishes..."
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.toggleBox}>
        {vegFilterOptions.map(option => (
          <Pressable
            key={option}
            style={[
              styles.toggleOption,
              vegFilter === option && styles.toggleOptionSelected
            ]}
            onPress={() => setVegFilter(option)}
          >
            <Text
              style={[
                styles.toggleText,
                vegFilter === option && styles.toggleTextSelected
              ]}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity onPress={() => setSelectedMealType('All')}>
          <Text
            style={[
              styles.filterButton,
              selectedMealType === 'All' && styles.selectedFilter
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {mealTypes.map(meal => (
          <TouchableOpacity key={meal} onPress={() => setSelectedMealType(meal)}>
            <Text
              style={[
                styles.filterButton,
                selectedMealType === meal && styles.selectedFilter
              ]}
            >
              {meal}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredDishes}
        keyExtractor={(item, index) => item.name + index}
        renderItem={renderDishCard}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {selectedDishes.length > 0 && (
        <TouchableOpacity style={styles.continueButton} onPress={navigateToSummary}>
          <Text style={styles.continueText}>
            Continue ({selectedDishes.length} items)
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fafafa'
  },
  search: {
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1
  },
  toggleBox: {
    flexDirection: 'row',
    backgroundColor: '#eaeaea',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden'
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#eaeaea'
  },
  toggleOptionSelected: {
    backgroundColor: '#d0f0d0'
  },
  toggleText: {
    fontSize: 14,
    color: '#333'
  },
  toggleTextSelected: {
    fontWeight: 'bold',
    color: '#007700'
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    gap: 8
  },
  filterButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8
  },
  selectedFilter: {
    backgroundColor: '#d0e8ff',
    fontWeight: 'bold'
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 2
  },
  image: {
    width: 90,
    height: 90
  },
  details: {
    flex: 1,
    padding: 10
  },
  name: {
    fontSize: 16,
    fontWeight: '600'
  },
  description: {
    fontSize: 12,
    color: '#555'
  },
  type: {
    fontSize: 12,
    color: '#777',
    marginTop: 4
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 6,
    justifyContent: 'space-between'
  },
  ingredientButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  selectButton: {
    backgroundColor: '#d0f0d0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6
  },
  buttonText: {
    fontSize: 12,
    color: '#333'
  },
  continueButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#007700',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center'
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default MenuScreen;
