import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

const IngredientScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'IngredientScreen'>>();
  const { dish } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{dish.name} Ingredients</Text>
      <FlatList
        data={dish.ingredients}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text style={styles.item}>• {item}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  item: { fontSize: 16, marginVertical: 5 },
});

export default IngredientScreen;
