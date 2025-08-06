// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from './src/screens/MenuScreen';
import IngredientScreen from './src/screens/IngredientScreen';
import SummaryScreen from './src/screens/SummaryScreen';
import { Dish } from './src/types/Dish';

export type RootStackParamList = {
  MenuScreen: undefined;
  IngredientScreen: { dish: Dish };
  SummaryScreen: { selectedDishes: [string, Dish][] };
};


const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="MenuScreen">
      <Stack.Screen name="MenuScreen" component={MenuScreen} options={{ headerShown: false }} />
      <Stack.Screen name="IngredientScreen" component={IngredientScreen} options={{ title: 'Ingredients' }} />
      <Stack.Screen name="SummaryScreen" component={SummaryScreen} options={{ title: 'Your Selections' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
