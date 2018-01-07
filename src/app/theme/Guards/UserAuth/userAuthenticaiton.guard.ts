import { StudentregisterationApi } from './../../../shared/sdk/services/custom/Studentregisteration';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable()
export class UserAuthenticationGuard implements CanActivate {

    constructor(private StudentregisterationApi: StudentregisterationApi ){
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean { 
        return this.StudentregisterationApi.isAuthenticated();
    }

}