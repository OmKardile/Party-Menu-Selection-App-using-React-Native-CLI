export type Dish = {
  id: string;
  name: string;
  description: string;
  image: string;
  isVeg: boolean;
  ingredients: string[];
  category: 'Starter' | 'Main Course' | 'Dessert' | 'Sides';
};
