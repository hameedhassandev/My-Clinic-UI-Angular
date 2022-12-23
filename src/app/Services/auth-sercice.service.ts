import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { LoginVM } from '../ViewModels/LoginVM';
import { Observable } from 'rxjs';
import { AuthUserVM } from '../ViewModels/AuthUserVM';


@Injectable({
  providedIn: 'root'
})
export class AuthSerciceService {

  private seviceApi: string = environment.APIURL + "/Auth";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };


  

  constructor(private _httpClient: HttpClient,  private _router: Router) { }

  Login(logingUser: LoginVM) : Observable<AuthUserVM>
  {
    return this._httpClient.post<AuthUserVM>(this.seviceApi + "/Login", JSON.stringify(logingUser), this.httpOptions);
  }
}
