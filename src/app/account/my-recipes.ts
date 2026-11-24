import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from '@cuisto/models';
import { User } from '@cuisto/models';
import { AuthService } from '../services/auth-service';
import { RecipeService } from '../services/recipe-service';
import { RecipeCard } from '../pages/recipes/recipe-card';

interface Etat {
  chargement: boolean;
  erreur?: string;
  utilisateur?: User;
  recettes: Recipe[];
}

@Component({
  selector: 'app-my-recipes',
  imports: [AsyncPipe, RecipeCard],
  templateUrl: './my-recipes.html',
})
export class MyRecipes implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly recipeService = inject(RecipeService);
  protected readonly etat$ = new BehaviorSubject<Etat>({ chargement: true, recettes: [] });

  ngOnInit(): void {
    this.auth.me().subscribe({
      next: (utilisateur) => {
        this.recipeService.getAll().subscribe((page) =>
          this.etat$.next({ chargement: false, utilisateur, recettes: page.recipes.filter((r) => r.userId === utilisateur.id) }),
        );
      },
      error: () => this.etat$.next({ chargement: false, erreur: 'Connectez-vous pour voir vos recettes.', recettes: [] }),
    });
  }
}
