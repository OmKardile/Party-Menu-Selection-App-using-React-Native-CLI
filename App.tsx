import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from './src/screens/MenuScreen';
import IngredientScreen from './src/screens/IngredientScreen';
import SummaryScreen from './src/screens/SummaryScreen';
import { RootStackParamList } from './src/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MenuScreen">
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="IngredientScreen" component={IngredientScreen} />
        <Stack.Screen name="SummaryScreen" component={SummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}