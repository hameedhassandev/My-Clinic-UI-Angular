import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthSerciceService } from './auth-service';
import { IHospital } from '../Models/IHospital';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalServiceService {

  private hospitalServiceAPI: string = environment.APIURL + "/Hospital";
  httpOptions: any
  constructor(private _httpClient: HttpClient, authService : AuthSerciceService) { 
    this.httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       // Authorization: authService.GetToken()
      })
    };
  }

  getAllHospitals(): Observable<IHospital[]>{
    return this._httpClient.get<IHospital[]>(`${this.hospitalServiceAPI}/GetAll`)
  }

  getHospitalById(hospId:number): Observable<IHospital[]>{
    return this._httpClient.get<IHospital[]>(`${this.hospitalServiceAPI}/GetById/${hospId}`)
  }

  addHospital(hosp:any){
    return this._httpClient.post<any>(`${this.hospitalServiceAPI}/AddHospital`,this.httpOptions)
  }

  updateHospital(hospId : number, UpdatedHosp:any){
    return this._httpClient.put<any>(`${this.hospitalServiceAPI}/UpdateHospital/${hospId}`,this.httpOptions)
  }

  deleteDepartment(hospId: number):Observable<IHospital> {
    return this._httpClient.delete<IHospital>(`${this.hospitalServiceAPI}/DeleteHospital/${hospId}`)

  }


}
