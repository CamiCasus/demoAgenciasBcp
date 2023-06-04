import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterLayoutComponent } from './master-layout/master-layout.component';
import { SearchComponent } from './master-layout/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MasterLayoutComponent, SearchComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, RouterModule],
  exports: [MasterLayoutComponent, SearchComponent],
})
export class LayoutsModule {}
