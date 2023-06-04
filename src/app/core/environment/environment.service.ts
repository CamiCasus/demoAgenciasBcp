import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  public backendServerUrl = 'http://localhost:4200/assets/data/';

  constructor() {}
}
