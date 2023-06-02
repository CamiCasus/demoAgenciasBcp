import { Injectable, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface ToolbarState {
  search: boolean;
  back: boolean;
  save: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MasterLayoutStateService {
  private state = {
    search: false,
    back: false,
    save: false,
  };

  private onBack$ = new Subject<void>();
  private onSave$ = new Subject<void>();

  constructor() {}

  getState() : ToolbarState {
    return this.state;
  }

  init(state: ToolbarState) {
    this.state = state;
  }

  back() {
    this.onBack$.next();
  }

  onBack() : Observable<void> {
    return this.onBack$.asObservable();
  }

  save() {
    this.onSave$.next();
  }

  onSave() : Observable<void> {
    return this.onSave$.asObservable();
  }
}
