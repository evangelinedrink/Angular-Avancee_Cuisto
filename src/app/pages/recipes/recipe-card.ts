import { Component, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Recipe } from '@cuisto/models';
import { FavoritesService } from '../../services/favorites-service';

@Component({
  selector: 'app-recipe-card',
  imports: [DecimalPipe],
  templateUrl: './recipe-card.html',
})
export class RecipeCard {
  readonly recette = input.required<Recipe>();
  private readonly favoris = inject(FavoritesService);
  private readonly router = inject(Router);

  protected duree(): string {
    const total = this.recette().prepTimeMinutes + this.recette().cookTimeMinutes;
    return total >= 60 ? `${Math.floor(total / 60)} h ${total % 60} min` : `${total} min`;
  }

  protected libelleDifficulte(): string {
    switch (this.recette().difficulty) {
      case 'Easy':
        return 'Facile';
      case 'Medium':
        return 'Moyenne';
      default:
        return 'Difficile';
    }
  }

  protected estFavori(): boolean {
    return this.favoris.estFavori(this.recette().id);
  }

  protected ouvrir(): void {
    this.router.navigate(['/recettes', this.recette().id]);
  }

  protected basculer(event: Event): void {
    event.stopPropagation();
    this.favoris.basculer(this.recette().id);
  }
}
