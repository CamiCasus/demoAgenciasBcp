import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterLayoutComponent } from './layouts/master-layout/master-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'agencies',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MasterLayoutComponent,
    children: [
      {
        path: 'agencies',
        loadChildren: () =>
          import('./modules/agencies/agency.module').then(
            (m) => m.AgencyModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
