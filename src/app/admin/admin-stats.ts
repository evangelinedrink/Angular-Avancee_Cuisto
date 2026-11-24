import { Component, inject } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Recipe } from '@cuisto/models';
import { RecipeService } from '../services/recipe-service';

@Component({
  selector: 'app-admin-stats',
  imports: [AsyncPipe, DecimalPipe],
  templateUrl: './admin-stats.html',
})
export class AdminStats {
  protected readonly page$ = inject(RecipeService).getAll();

  protected moyenne(recettes: Recipe[], champ: 'caloriesPerServing' | 'rating'): number {
    return recettes.reduce((s, r) => s + r[champ], 0) / recettes.length;
  }

  protected parCuisine(recettes: Recipe[]): { cuisine: string; nombre: number }[] {
    const compte = new Map<string, number>();
    recettes.forEach((r) => compte.set(r.cuisine, (compte.get(r.cuisine) ?? 0) + 1));
    return [...compte].map(([cuisine, nombre]) => ({ cuisine, nombre })).sort((a, b) => b.nombre - a.nombre);
  }
}
