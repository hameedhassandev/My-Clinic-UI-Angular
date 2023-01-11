import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthSerciceService } from './auth-service';
import { Observable } from 'rxjs';
import { Specialist } from '../Models/Specialist';

@Injectable({
  providedIn: 'root'
})
export class SpecialistServiceService{

  private spcialistAPI : string = environment.APIURL + "/Specialist";
  httpOptions:any
  constructor(private _httpClient:HttpClient, private _authService : AuthSerciceService) { 
    this.httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       // Authorization: authService.GetToken()
      })
    };
  }

  getAllSpecialistsWithDepartment() : Observable<Specialist[]>{
    return this._httpClient.get<Specialist[]>(`${this.spcialistAPI}/GetAllWithDepartment`);
  }

  getAllSpecialistByDepartmentId(departId: number):Observable<Specialist[]> {
    return this._httpClient.get<Specialist[]>(`${this.spcialistAPI}/GetAllByDepartmentId/${departId}`)

  }
  getSpecialistById(spcId:number): Observable<Specialist>{
    return this._httpClient.get<Specialist>(`${this.spcialistAPI}/GetById/${spcId}`)
  }

  addSpecialist(spec:any){
    return this._httpClient.post<any>(`${this.spcialistAPI}/AddSpecialist`,spec)
  }

  updateSpecialist(specId : number, UpdatedSpec:any){
    return this._httpClient.put<any>(`${this.spcialistAPI}/UpdateSpecialist/${specId}`,UpdatedSpec)
  }

  deleteSpecialist(specId: number):Observable<Specialist> {
    return this._httpClient.delete<Specialist>(`${this.spcialistAPI}/DeleteSpecialist/${specId}`)

  }
}
