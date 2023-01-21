import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { LoginVM } from '../ViewModels/LoginVM';
import { Observable } from 'rxjs';
import { AuthUserVM } from '../ViewModels/AuthUserVM';
import { RegisterAsDoctorVM } from '../ViewModels/RegisterAsDoctorVM';


@Injectable({
  providedIn: 'root'
})
export class AuthSerciceService {

  private serviceApi: string = environment.APIURL + "/Auth";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };


  

  constructor(private _httpClient: HttpClient,  private _router: Router) { }

  Login(logingUser: LoginVM) : Observable<AuthUserVM>
  {
    return this._httpClient.post<AuthUserVM>(this.serviceApi + "/Login", JSON.stringify(logingUser), this.httpOptions);
  }

  RegisterAsDoctor(registerAsDoctor: RegisterAsDoctorVM) : Observable<RegisterAsDoctorVM>
  {
    return this._httpClient.post<RegisterAsDoctorVM>(this.serviceApi + "/RegisterAsDoctor", JSON.stringify(registerAsDoctor));
  }

  isLogged() : Boolean
  {
    if(!localStorage.hasOwnProperty("User"))
      return false;

      let user: AuthUserVM = this.GetUser();
      const currentDate = (new Date()).getTime();

      //if token is expires
      if(currentDate > user.expiresOn.getTime())
      {
        localStorage.removeItem("User");
        return false;
      }

      return true;
  }

  GetToken(): string
  {
    let user: AuthUserVM = this.GetUser();
    return "Bearer " + user.token;
  }

  GetUserRoles(): string[] 
  {
    return this.GetUser().roles;
  }


  GetUser(): AuthUserVM
  {
    let user: any = localStorage.getItem("User");
    user = JSON.parse(user);
    
    return new AuthUserVM(user.massage,user.email, user.userName,user.isAuth,user.roles, user.token, user.expiresOn);
  }

  Logout()
  {
    localStorage.removeItem("User");
    this._router.navigate(['/login']);
  }

}

