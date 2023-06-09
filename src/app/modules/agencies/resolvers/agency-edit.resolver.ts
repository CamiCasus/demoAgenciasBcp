import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Agency } from "src/app/core/models";
import { AgencyService } from "src/app/core/services/agency.service";

export const agencyEditResolver: ResolveFn<Agency> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      const paramId = route.paramMap.get("id");
      const agencyId = paramId != null ? parseInt(paramId) : -1;
      return inject(AgencyService).get(agencyId);
    };