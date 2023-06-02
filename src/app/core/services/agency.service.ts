import { Injectable } from '@angular/core';
import { Observable, map, skip, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Agency } from '../models';
import { EnvironmentService } from '../environment/environment.service';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) {}

  getAll(pageIndex: number, pageSize: number): Observable<Agency[]> {
    const result$ = this.http
      .get<Agency[]>(`${this.environmentService.backendServerUrl}agencias.json`)
      .pipe(
        map((p) => {
          const modifiedAgencies = this.getModifiedAgencies();
          return p.map((q, index) => {
            const modifiedAgencyIndex = modifiedAgencies.findIndex(
              (p) => p.id == index + 1
            );
            return modifiedAgencyIndex < 0
              ? { ...q, id: index + 1 }
              : modifiedAgencies[modifiedAgencyIndex];
          });
        })
      );

    if (pageIndex > 1) {
      return result$.pipe(skip(pageSize * (pageIndex - 1)), take(pageSize));
    }

    return result$;
  }

  get(agencyId: number): Observable<Agency> {
    return this.getAll(-1, -1).pipe(map((p) => p[agencyId]));
  }

  update(agency: Agency): void {
    const modifiedAgencies = this.getModifiedAgencies();

    const modifiedAgencyIndex = modifiedAgencies.findIndex(
      (p) => p.id == agency.id
    );
    if (modifiedAgencyIndex < 0) {
      modifiedAgencies.push(agency);
    } else {
      modifiedAgencies[modifiedAgencyIndex] = agency;
    }

    localStorage.setItem('modified', JSON.stringify(modifiedAgencies));
  }

  private getModifiedAgencies(): Agency[] {
    const value = localStorage.getItem('modified');
    let modifiedAgencies: Agency[] = [];

    if (value) {
      modifiedAgencies = JSON.parse(value) as Agency[];
    }

    return modifiedAgencies;
  }
}
