import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  public backendServerUrl = 'assets/data/';

  constructor() {}
}
