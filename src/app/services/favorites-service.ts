import { Service } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

const CLE = 'cuisto-favoris';

@Service()
export class FavoritesService {
  private readonly ids = new BehaviorSubject<number[]>(this.lire());
  readonly ids$ = this.ids.asObservable();
  readonly count$ = this.ids$.pipe(map((ids) => ids.length));

  estFavori(id: number): boolean {
    return this.ids.value.includes(id);
  }

  basculer(id: number): void {
    const suivants = this.estFavori(id) ? this.ids.value.filter((i) => i !== id) : [...this.ids.value, id];
    this.ids.next(suivants);
    localStorage.setItem(CLE, JSON.stringify(suivants));
  }

  private lire(): number[] {
    const brut = localStorage.getItem(CLE);
    return brut ? JSON.parse(brut) : [];
  }
}
