import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Agency } from 'src/app/core/models';
import { AgencyService } from 'src/app/core/services';
import { MasterLayoutStateService } from 'src/app/layouts/master-layout/master-layout-state.service';
import { AgencyMapComponent } from './agency-map.component';

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
    private agencyService: AgencyService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.masterLayoutService.update({
      title: 'Agencias',
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

  togleFavorite(agency: Agency) {
    agency.isFavorite = !agency.isFavorite;
    this.agencyService.update(agency);
  }

  showMap(agency: Agency) {
    this.dialog.open(AgencyMapComponent, {
      width: '100%',
      enterAnimationDuration: '350ms',
      exitAnimationDuration: '350ms',
      data: {
        agency
      }
    });
  }
}
