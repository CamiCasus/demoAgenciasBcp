import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Agency } from "src/app/core/models";
import { AgencyService } from "src/app/core/services/agency.service";

export const agenciesListResolver: ResolveFn<Agency[]> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(AgencyService).getAll(1, 100);
    };