import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Dish } from '../types/Dish';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type DishCardProps = {
  dish: Dish;
  count: number;
  onAdd: () => void;
  onRemove: () => void;
};

const DishCard: React.FC<DishCardProps> = ({ dish, count, onAdd, onRemove }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.card}>
      <Image source={{ uri: dish.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{dish.name}</Text>
        <Text style={styles.desc}>{dish.description}</Text>
        <Text style={styles.type}>{dish.isVeg ? '🌱 Veg' : '🍖 Non-Veg'}</Text>

        <View style={styles.actions}>
          <TouchableOpacity onPress={onRemove} style={styles.button}>
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={styles.count}>{count}</Text>
          <TouchableOpacity onPress={onAdd} style={styles.button}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('IngredientScreen', { dish })}>
          <Text style={styles.link}>View Ingredients</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', margin: 10, backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden' },
  image: { width: 100, height: 100 },
  info: { flex: 1, padding: 10 },
  name: { fontWeight: 'bold', fontSize: 16 },
  desc: { color: '#666' },
  type: { marginTop: 4 },
  actions: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  button: { padding: 5, backgroundColor: '#eee', marginHorizontal: 5 },
  count: { minWidth: 20, textAlign: 'center' },
  link: { color: '#007bff', marginTop: 5 },
});

export default DishCard;
