export type Difficulte = 'Easy' | 'Medium' | 'Hard';

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: Difficulte;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

export interface RecipePage {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

export interface Author {
  id: number;
  firstName: string;
  lastName: string;
}
