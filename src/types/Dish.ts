// export type Dish = {
//   id: number;
//   name: string;
//   description: string;
//   image: string | null;
//   categoryId: number;
//   mealType: 'STARTER' | 'MAIN COURSE' | 'DESSERT' | 'SIDES' | string; // 
//   type: 'VEG' | 'NON_VEG' | string; // 
//   category: {
//     id: number;
//     name: string;
//     image: string;
//     isRecommendedForMealSuggestion: boolean;
//   };
//   dishType: string;
//   forChefit: boolean;
//   forParty: boolean;
//   nameHi: string;
//   nameBn: string;
// };


export type Dish = {
  id: number;
  name: string;
  description: string;
  image: string | null;
  categoryId: number;
  mealType: 'STARTER' | 'MAIN COURSE' | 'DESSERT' | 'SIDES' | string;
  type: 'VEG' | 'NON_VEG' | string;
  category: {
    id: number;
    name: string;
    image: string;
    isRecommendedForMealSuggestion: boolean;
  };
  dishType: string;
  forChefit: boolean;
  forParty: boolean;
  nameHi: string;
  nameBn: string;
};
