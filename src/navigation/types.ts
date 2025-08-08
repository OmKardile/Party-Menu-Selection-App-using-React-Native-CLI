import { Dish } from '../types/dish';

export type RootStackParamList = {
  MenuScreen: undefined;
  IngredientScreen: { dish: Dish };
  SummaryScreen: {
    selectedDishes: Dish[];
    cartQuantities: { [id: number]: number };
   cart: Dish[];
  };
};

// import { Dish } from '../types/dish';

// export type RootStackParamList = {
//   MenuScreen: undefined;
//   IngredientScreen: { dish: Dish };
//   SummaryScreen: { selectedDishes: Dish[] };
// };