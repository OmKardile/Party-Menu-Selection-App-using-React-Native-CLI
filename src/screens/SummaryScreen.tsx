import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

const SummaryScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'SummaryScreen'>>();
  const { selectedDishes } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Selected Dishes</Text>
      <FlatList
        data={selectedDishes}
        keyExtractor={([id]) => id}
        renderItem={({ item: [id, dish] }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{dish.name}</Text>
            <Text style={styles.type}>{dish.category}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 },
  name: { fontSize: 16 },
  type: { color: '#888' },
});

export default SummaryScreen;
