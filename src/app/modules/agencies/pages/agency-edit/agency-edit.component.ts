import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
import { Agency } from 'src/app/core/models';
import { AgencyService } from 'src/app/core/services/agency.service';
import { MasterLayoutStateService } from 'src/app/layouts/master-layout/master-layout-state.service';

@Component({
  selector: 'app-agency-edit',
  templateUrl: './agency-edit.component.html',
  styleUrls: ['./agency-edit.component.scss'],
})
export class AgencyEditComponent implements OnInit, OnDestroy {
  agencyForm: FormGroup;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private masterLayoutService: MasterLayoutStateService,
    private agencyService: AgencyService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    
  }

  ngOnInit(): void {
    this.manageHeader();

    this.activatedRoute.data
      .pipe(
        map((p) => p['agency'] as Agency),
        tap((p) => this.setForm(p))
      )
      .subscribe();
  }

  manageHeader() {
    this.masterLayoutService.init({
      back: true,
      save: true,
      search: false,
    });

    this.masterLayoutService
      .onBack()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.router.navigate(['agencies']);
      });

    this.masterLayoutService
      .onSave()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.agencyService.update(this.agencyForm.value);
        alert("grabado");
      });
  }

  setForm(agency: Agency): void {
    this.agencyForm = this.formBuilder.group({
      id: [agency.id, [Validators.required]],
      agencia: [agency.agencia, [Validators.required]],
      direccion: [agency.direccion, [Validators.required]],
      provincia: [agency.provincia, []],
      departamento: [agency.departamento, []],
      distrito: [agency.distrito, [Validators.required]],
      lat: [agency.lat, [Validators.required]],
      lon: [agency.lon, [Validators.required]],
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
