export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export const JOURS: Jour[] = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

// Une recette placée dans le planning : on garde ce qu'il faut pour la liste de courses
export interface RecettePlanifiee {
  id: number;
  name: string;
  ingredients: string[];
}

export type Planning = Record<Jour, RecettePlanifiee[]>;
