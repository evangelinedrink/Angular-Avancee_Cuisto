import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { RecipePage } from '@cuisto/models';
import { RecipeService } from '../../services/recipe-service';
import { RecipeCard } from './recipe-card';

@Component({
  selector: 'app-recipes',
  imports: [AsyncPipe, RecipeCard],
  templateUrl: './recipes.html',
})
export class Recipes {
  private readonly recipeService = inject(RecipeService);
  protected readonly resultats$ = new BehaviorSubject<RecipePage | null>(null);
  protected terme = '';

  constructor() {
    this.recipeService.getAll().subscribe((page) => this.resultats$.next(page));
  }

  // Recherche côté serveur, à chaque frappe
  protected onRecherche(event: Event): void {
    this.terme = (event.target as HTMLInputElement).value;
    this.recipeService.search(this.terme).subscribe((page) => this.resultats$.next(page));
  }
}
