import { Component, input } from '@angular/core';

@Component({
  selector: 'app-cooking-timer',
  template: `
    <div class="panneau">
      <h2>Minuteur de cuisson</h2>
      <p class="minuteur">{{ affichage() }}</p>
      <button class="bouton" type="button" (click)="demarrer()">Démarrer ({{ minutes() }} min)</button>
    </div>
  `,
})
export class CookingTimer {
  readonly minutes = input.required<number>();
  protected restant = 0;

  protected demarrer(): void {
    this.restant = this.minutes() * 60;
    // TODO
    console.count('minuteur');
    setInterval(() => {
      if (this.restant > 0) {
        this.restant--;
      }
    }, 1000);
  }

  protected affichage(): string {
    const m = Math.floor(this.restant / 60);
    const s = this.restant % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}
