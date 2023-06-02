import { Component } from '@angular/core';
import { SplashScreenStateService } from 'src/app/shared/components/splash-screen/splash-screen-state.service';
import { MasterLayoutStateService } from './master-layout-state.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.scss'],
})
export class MasterLayoutComponent {
  
  constructor(
    private location: Location,
    private splashScreenStateService: SplashScreenStateService,
    protected masterLayoutService: MasterLayoutStateService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.splashScreenStateService.stop();
    }, 5000);
  }

  back() {
    this.location.back();
  }
}
