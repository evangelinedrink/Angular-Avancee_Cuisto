import { Routes } from '@angular/router';
import { Recipes } from './pages/recipes/recipes';
import { RecipeDetail } from './pages/recipe-detail/recipe-detail';
import { Login } from './pages/login/login';
import { AccountLayout } from './account/account-layout';
import { Favorites } from './account/favorites';
import { WeekPlanning } from './account/week-planning';
import { MyRecipes } from './account/my-recipes';
import { AdminStats } from './admin/admin-stats';
import { RecipeForm } from './admin/recipe-form';

export const routes: Routes = [
  { path: '', redirectTo: 'recettes', pathMatch: 'full' },
  { path: 'recettes', component: Recipes },
  { path: 'recettes/:id', component: RecipeDetail },
  { path: 'connexion', component: Login },
  {
    path: 'compte',
    component: AccountLayout,
    children: [
      { path: '', redirectTo: 'favoris', pathMatch: 'full' },
      { path: 'favoris', component: Favorites },
      { path: 'planning', component: WeekPlanning },
      { path: 'mes-recettes', component: MyRecipes },
    ],
  },
  { path: 'admin', component: AdminStats },
  { path: 'proposer', component: RecipeForm },
  { path: '**', redirectTo: 'recettes' },
];
