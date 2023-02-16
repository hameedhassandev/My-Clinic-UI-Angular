import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthSerciceService } from './auth-service';
import { Observable } from 'rxjs';
import { Visitor } from '@angular/compiler';
import { Patient } from '../Models/Patient';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  private visitorAPI : string = environment.APIURL + "/Patient";

  constructor(private _httpClient:HttpClient, private _authService : AuthSerciceService) { }

  GetAllVisitors() : Observable<Patient[]>{
    return this._httpClient.get<Patient[]>(`${this.visitorAPI}/GetAllWithData`);
  }

  getVisitorById(Id:any) : Observable<Patient>{
    return this._httpClient.get<Patient>(`${this.visitorAPI}/GetPatientByIdWithData?patientId=${Id}`);
  }

}
