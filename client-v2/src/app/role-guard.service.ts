import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoleGuardService {

  constructor() { }

  CanActivate(
    next: ActivatedRouteSnapshot,
    state:  RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
      return (localStorage.getItem('role').toLowerCase() == 'company' ||
              localStorage.getItem('role').toLowerCase() == 'student');
  }

}
