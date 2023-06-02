import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, concat, forkJoin, map, tap } from 'rxjs';
import { Agency } from 'src/app/core/models';
import { AgencyService } from 'src/app/core/services';
import { MasterLayoutStateService } from 'src/app/layouts/master-layout/master-layout-state.service';

@Component({
  selector: 'app-agencies-list',
  templateUrl: './agencies-list.component.html',
  styleUrls: ['./agencies-list.component.scss'],
})
export class AgenciesListComponent implements OnInit {
  agencies: Agency[];
  currentPage: number = 1;

  constructor(
    private masterLayoutService: MasterLayoutStateService,
    private activatedRoute: ActivatedRoute,
    private agencyService: AgencyService
  ) {}

  ngOnInit(): void {
    this.masterLayoutService.update({
      search: { visible: true, enabled: true },
      back: { visible: false, enabled: false },
      save: { visible: false, enabled: false },
    });

    this.activatedRoute.data
      .pipe(map((p) => p['agencies'] as Agency[]))
      .subscribe((p) => (this.agencies = p));
  }

  onScroll() {
    this.agencyService
      .getAll(++this.currentPage, 20)
      .subscribe((p) => this.agencies.push(...p));
  }
}
