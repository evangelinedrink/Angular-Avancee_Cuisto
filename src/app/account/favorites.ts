import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from '@cuisto/models';
import { FavoritesService } from '../services/favorites-service';
import { RecipeService } from '../services/recipe-service';
import { RecipeCard } from '../pages/recipes/recipe-card';

@Component({
  selector: 'app-favorites',
  imports: [AsyncPipe, RecipeCard],
  templateUrl: './favorites.html',
})
export class Favorites implements OnInit {
  private readonly favoris = inject(FavoritesService);
  private readonly recipeService = inject(RecipeService);
  protected readonly recettes$ = new BehaviorSubject<Recipe[]>([]);

  ngOnInit(): void {
    this.favoris.ids$.subscribe((ids) => {
      const recettes: Recipe[] = [];
      for (const id of ids) {
        this.recipeService.getById(id).subscribe((r) => {
          recettes.push(r);
          this.recettes$.next([...recettes]);
        });
      }
      if (ids.length === 0) {
        this.recettes$.next([]);
      }
    });
  }
}
