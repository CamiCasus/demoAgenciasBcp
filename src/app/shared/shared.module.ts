import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { SplashScreenStateService } from './components/splash-screen/splash-screen-state.service';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [SplashScreenComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    InfiniteScrollModule
  ],
  exports: [
    SplashScreenComponent,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    InfiniteScrollModule
  ],
  providers: [SplashScreenStateService],
})
export class SharedModule {}
