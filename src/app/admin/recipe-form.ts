import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { RecipeService } from '../services/recipe-service';

@Component({
  selector: 'app-recipe-form',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './recipe-form.html',
})
export class RecipeForm {
  private readonly recipeService = inject(RecipeService);
  protected recette = { name: '', cuisine: '', difficulty: 'Easy', prepTimeMinutes: 0, cookTimeMinutes: 0, servings: 1, ingredients: '', instructions: '' };
  protected readonly message$ = new BehaviorSubject('');

  protected envoyer(): void {
    const corps = {
      ...this.recette,
      ingredients: this.recette.ingredients.split(','),
      instructions: this.recette.instructions.split('.'),
    };
    this.recipeService.add(corps).subscribe((r) => this.message$.next(`Recette n° ${r.id} enregistrée : ${r.name}`));
  }
}
