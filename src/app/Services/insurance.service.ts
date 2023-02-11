import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthSerciceService } from './auth-service';
import { Insurance } from '../Models/Insurance';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  private insuarnceAPI: string = environment.APIURL + "/Insurance";
  httpOptions: any
  constructor(private _httpClient: HttpClient,private authService : AuthSerciceService) { 
    this.httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       // Authorization: authService.GetToken()
      })
    };
  }

  getAllInsurance(): Observable<Insurance[]>{
    return this._httpClient.get<Insurance[]>(`${this.insuarnceAPI}/GetAllWithData`)
  }
}
