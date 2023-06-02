import { Injectable, signal } from '@angular/core';
import { Observable, Subject, single } from 'rxjs';

interface ToolbarState {
  search?: ButtonState;
  back?: ButtonState;
  save?: ButtonState;
}

interface ButtonState {
  visible?: boolean;
  enabled?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MasterLayoutStateService {
  backState = signal<ButtonState>({ visible: false, enabled: false });
  saveState = signal<ButtonState>({ visible: false, enabled: false });
  searchState = signal<ButtonState>({ visible: false, enabled: false });

  private onBack$ = new Subject<void>();
  private onSave$ = new Subject<void>();

  private defaultStates = {
    back: { visible: false, enabled: false },
    save: { visible: false, enabled: false },
    search: { visible: false, enabled: false },
  };

  constructor() {}

  getState(currentButton: 'back' | 'search' | 'save'): ButtonState {
    if (currentButton === 'back') return this.backState();
    else if (currentButton === 'save') return this.saveState();
    else if (currentButton === 'search') return this.searchState();

    return { visible: false, enabled: false };
  }

  update(state: ToolbarState) {
    setTimeout(() => {
      this.backState.mutate((value) => {
        value.enabled = state.back && state.back.enabled != undefined ? state.back.enabled : value.enabled;
        value.visible = state.back && state.back.visible != undefined ? state.back.visible : value.visible;
      });

      this.saveState.mutate((value) => {
        value.enabled = state.save && state.save.enabled != undefined ? state.save.enabled : value.enabled;
        value.visible = state.save && state.save.visible != undefined ? state.save.visible : value.visible;
      });

      this.searchState.mutate((value) => {
        value.enabled = state.search && state.search.enabled != undefined ? state.search.enabled : value.enabled;
        value.visible = state.search && state.search.visible != undefined ? state.search.visible : value.visible;
      });
    }, 0);
  }  

  back() {
    this.onBack$.next();
  }

  onBack(): Observable<void> {
    return this.onBack$.asObservable();
  }

  save() {
    this.onSave$.next();
  }

  onSave(): Observable<void> {
    return this.onSave$.asObservable();
  }
}
