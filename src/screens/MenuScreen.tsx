import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import DishCard from '../components/DishCard';
import { Dish } from '../types/Dish';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

const DISHES: Dish[] = [
  {
    id: '1',
    name: 'Spring Rolls',
    description: 'Crispy rolls with veggies',
    image: 'https://via.placeholder.com/100',
    isVeg: true,
    ingredients: ['Cabbage', 'Carrot', 'Flour'],
    category: 'Starter',
  },
  {
    id: '2',
    name: 'Butter Chicken',
    description: 'Creamy spiced chicken',
    image: 'https://via.placeholder.com/100',
    isVeg: false,
    ingredients: ['Chicken', 'Butter', 'Cream'],
    category: 'Main Course',
  },
  // Add more dishes...
];

const TABS = ['Starter', 'Main Course', 'Dessert', 'Sides'] as Dish['category'][];

const MenuScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedTab, setSelectedTab] = useState<Dish['category']>('Starter');
  const [search, setSearch] = useState('');
  const [onlyVeg, setOnlyVeg] = useState(false);
  const [selected, setSelected] = useState<{ [id: string]: Dish }>({});

  const filteredDishes = DISHES.filter(
    dish =>
      dish.category === selectedTab &&
      dish.name.toLowerCase().includes(search.toLowerCase()) &&
      (!onlyVeg || dish.isVeg)
  );

  const handleAdd = (dish: Dish) => {
    setSelected(prev => ({ ...prev, [dish.id]: dish }));
  };

  const handleRemove = (dish: Dish) => {
    const newSelected = { ...selected };
    delete newSelected[dish.id];
    setSelected(newSelected);
  };

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabs}
      >
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={styles.tab}
          >
            <Text
              style={[styles.tabText, selectedTab === tab && styles.activeTab]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TextInput
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <TouchableOpacity
        onPress={() => setOnlyVeg(prev => !prev)}
        style={styles.vegToggle}
      >
        <Text>{onlyVeg ? 'Show All' : 'Show Veg Only'}</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredDishes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <DishCard
            dish={item}
            count={selected[item.id] ? 1 : 0}
            onAdd={() => handleAdd(item)}
            onRemove={() => handleRemove(item)}
          />
        )}
      />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('SummaryScreen', {
            selectedDishes: Object.entries(selected),
          })
        }
        style={styles.continue}
      >
        <Text style={{ color: 'white' }}>
          Continue ({Object.keys(selected).length})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabs: { flexDirection: 'row', paddingHorizontal: 10 },
  tab: { marginRight: 15 },
  tabText: { fontSize: 16, color: '#555' },
  activeTab: { color: '#000', fontWeight: 'bold' },
  search: {
    margin: 10,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
  },
  vegToggle: { alignItems: 'center', marginBottom: 10 },
  continue: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default MenuScreen;
