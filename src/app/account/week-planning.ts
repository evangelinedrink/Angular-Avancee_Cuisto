import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Jour, JOURS, Planning } from '@cuisto/models';
import { PlanningService } from '../services/planning-service';

@Component({
  selector: 'app-week-planning',
  imports: [AsyncPipe],
  templateUrl: './week-planning.html',
})
export class WeekPlanning {
  private readonly service = inject(PlanningService);
  protected readonly planning$ = this.service.planning$;
  protected readonly jours = JOURS;

  protected nombreDeRepas(planning: Planning): number {
    return JOURS.reduce((n, j) => n + planning[j].length, 0);
  }

  protected listeDeCourses(planning: Planning): string[] {
    const tous = JOURS.flatMap((j) => planning[j].flatMap((r) => r.ingredients));
    return [...new Set(tous)].sort();
  }

  protected retirer(jour: Jour, index: number): void {
    this.service.retirer(jour, index);
  }
}
