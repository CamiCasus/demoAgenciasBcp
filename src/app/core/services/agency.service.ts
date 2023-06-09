import { Injectable } from '@angular/core';
import { Observable, delay, map, of, skip, take } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getAll(
    pageIndex: number,
    pageSize: number,
    term: string = ''
  ): Observable<Agency[]> {

    /* 

      Se generó un archivo argencias_lage.json con data (duplicada) para simular un conjunto de datos grandes y poder aplicar el infinite scroll.
      Se puede usar el archivo original agencias.json que contiene la data que venía de prueba en el challege.
    */

    const result$ = this.http
      .get<Agency[]>(`${this.environmentService.backendServerUrl}agencias_large.json`)
      .pipe(
        map((p) => {
          const modifiedAgencies = this.getModifiedAgencies();
          const createdAgencies = this.getCreatedAgencies();

          let wholeData = p.concat(createdAgencies).map((q, index) => {
            const modifiedAgencyIndex = modifiedAgencies.findIndex(
              (p) => p.id == index + 1
            );
            return modifiedAgencyIndex < 0
              ? { ...q, id: index + 1, isFavorite: false }
              : modifiedAgencies[modifiedAgencyIndex];
          });

          wholeData = this.filterData(wholeData, term);

          if (pageIndex > 0) {
            const start = pageSize * (pageIndex - 1);
            wholeData = wholeData.slice(start, start + pageSize);
          }

          return wholeData;
        })
      );

    return result$;
  }

  get(agencyId: number): Observable<Agency> {
    return this.getAll(-1, -1).pipe(
      map((p) => p.find((p) => p.id == agencyId) as Agency)
    );
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

  create(agency: Agency) {
    this.getAll(-1, -1)
      .pipe(map((p) => p.length))
      .subscribe((index) => {
        agency.id = index + 1;
        localStorage.setItem('created', JSON.stringify(agency));
      });
  }

  private getCreatedAgencies() {
    return this.getStoredAgencies('created');
  }

  private getModifiedAgencies(): Agency[] {
    return this.getStoredAgencies('modified');
  }

  private getStoredAgencies(type: 'modified' | 'created') {
    const value = localStorage.getItem(type);
    let modifiedAgencies: Agency[] = [];

    if (value) {
      modifiedAgencies = JSON.parse(value) as Agency[];
    }

    return modifiedAgencies;
  }

  private filterData(data: Agency[], term: string): Agency[] {
    term = term.toUpperCase();

    return data.filter(
      (p) =>
        p.agencia.toUpperCase().includes(term) ||
        p.departamento.toUpperCase().includes(term) ||
        p.direccion.toUpperCase().includes(term) ||
        p.distrito.toUpperCase().includes(term) ||
        p.provincia.toUpperCase().includes(term)
    );
  }
}
