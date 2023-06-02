import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, debounceTime, map, takeUntil, tap } from 'rxjs';
import { Agency } from 'src/app/core/models';
import { AgencyService, MessageService } from 'src/app/core/services';
import { MasterLayoutStateService } from 'src/app/layouts/master-layout/master-layout-state.service';

@Component({
  selector: 'app-agency-edit',
  templateUrl: './agency-edit.component.html',
  styleUrls: ['./agency-edit.component.scss'],
})
export class AgencyEditComponent implements OnInit, OnDestroy {
  agencyForm: FormGroup;
  private unsubscribe$ = new Subject<void>();
  isEdit = false;

  constructor(
    private masterLayoutService: MasterLayoutStateService,
    private agencyService: AgencyService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.manageHeader();

    this.activatedRoute.data
      .pipe(
        map((p) => p['agency'] as Agency),
        tap((p) => this.setForm(p)),
        tap((p) => {
          this.isEdit = p != undefined;

          this.masterLayoutService.update({
            save: { enabled: this.agencyForm.valid },
          });
        })
      )
      .subscribe();

    this.agencyForm.valueChanges
      .pipe(debounceTime(50), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.masterLayoutService.update({
          save: { enabled: this.agencyForm.valid },
        });
      });
  }

  manageHeader() {
    this.masterLayoutService.update({
      back: { visible: true, enabled: true },
      save: { visible: true, enabled: true },
      search: { visible: false, enabled: true },
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
        this.isEdit
          ? this.agencyService.update(this.agencyForm.value)
          : this.agencyService.create(this.agencyForm.value);

        this.messageService.toastMessage(
          {
            title: `Se ha ${
              this.isEdit ? 'Actualizado' : 'Creado'
            } la Agencia satisfactoriamente`,
            type: 'success',
          },
          'agencies'
        );
      });
  }

  setForm(agency: Agency): void {
    agency = agency ?? ({ id: 0 } as Agency);

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
