import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgencyEditComponent } from './pages/agency-edit/agency-edit.component';
import { AgenciesListComponent } from './pages/agencies-list/agencies-list.component';
import { AgencyRoutingModule } from './agency.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgencyEditComponent,
    AgenciesListComponent
  ],
  imports: [
    CommonModule,
    AgencyRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AgencyModule { }
