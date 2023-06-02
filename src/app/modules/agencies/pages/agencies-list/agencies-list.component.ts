import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Agency } from 'src/app/core/models';
import { MasterLayoutStateService } from 'src/app/layouts/master-layout/master-layout-state.service';

@Component({
  selector: 'app-agencies-list',
  templateUrl: './agencies-list.component.html',
  styleUrls: ['./agencies-list.component.scss'],
})
export class AgenciesListComponent implements OnInit {
  agencies$: Observable<Agency[]> | undefined;

  constructor(
    private masterLayoutService: MasterLayoutStateService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.masterLayoutService.init({
      back: false,
      save: false,
      search: true,
    });

    this.agencies$ = this.activatedRoute.data.pipe(
      map((p) => p['agencies'] as Agency[])
    );
  }
}
