import { Service } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Jour, JOURS, Planning, RecettePlanifiee } from '@cuisto/models';

const CLE = 'cuisto-planning';

function vide(): Planning {
  return Object.fromEntries(JOURS.map((j) => [j, []])) as unknown as Planning;
}

@Service()
export class PlanningService {
  private readonly etat = new BehaviorSubject<Planning>(this.lire());
  readonly planning$ = this.etat.asObservable();

  ajouter(jour: Jour, recette: RecettePlanifiee): void {
    const planning = this.etat.value;
    planning[jour].push(recette);
    this.etat.next(planning);
    localStorage.setItem(CLE, JSON.stringify(planning));
  }

  retirer(jour: Jour, index: number): void {
    const planning = this.etat.value;
    planning[jour].splice(index, 1);
    this.etat.next(planning);
    localStorage.setItem(CLE, JSON.stringify(planning));
  }

  private lire(): Planning {
    const brut = localStorage.getItem(CLE);
    return brut ? JSON.parse(brut) : vide();
  }
}
