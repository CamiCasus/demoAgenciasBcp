import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgenciesListComponent } from './pages/agencies-list/agencies-list.component';
import { AgencyEditComponent } from './pages/agency-edit/agency-edit.component';
import { agenciesListResolver } from './resolvers/agencies-list.resolver';
import { agencyEditResolver } from './resolvers/agency-edit.resolver';

const routes: Routes = [
  {
    path: '',
    component: AgenciesListComponent,
    resolve: { agencies: agenciesListResolver },
  },
  { path: 'new', component: AgencyEditComponent },
  {
    path: 'edit/:id',
    component: AgencyEditComponent,
    resolve: {
      agency: agencyEditResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgencyRoutingModule {}
