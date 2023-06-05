import { Component } from '@angular/core';
import { MasterLayoutStateService } from './master-layout-state.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.scss'],
})
export class MasterLayoutComponent {
  constructor(
    private location: Location,
    protected masterLayoutService: MasterLayoutStateService
  ) {}

  ngOnInit(): void {}

  back() {
    this.location.back();
  }

  search(term: string) {
    this.masterLayoutService.search(term);
  }
}
