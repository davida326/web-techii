import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

constructor(private _router: Router) {};
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}