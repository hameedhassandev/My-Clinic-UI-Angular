import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthSerciceService } from '../Services/auth-service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {

  constructor(private _authService: AuthSerciceService,private _router:Router) {
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let roles = route.data["roles"] as Array<string>;
      let userRoles = this._authService.GetUserRoles();
      for (const r of userRoles) {
        if (roles.some( i => i === r))
          return true;
      }
     
      this._router.navigate(['/home']);
      return false;
    }
  
}
