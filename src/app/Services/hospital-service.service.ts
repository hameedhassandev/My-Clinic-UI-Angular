import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthSerciceService } from './auth-service';
import { Hospital } from '../Models/Hospital';
import { Observable } from 'rxjs';
import { Cities } from '../Models/Cities';

@Injectable({
  providedIn: 'root'
})
export class HospitalServiceService {

  private hospitalServiceAPI: string = environment.APIURL + "/Hospital";
  httpOptions: any
  constructor(private _httpClient: HttpClient,private authService : AuthSerciceService) { 
    this.httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       // Authorization: authService.GetToken()
      })
    };
  }

  getAllHospitals(): Observable<Hospital[]>{
    return this._httpClient.get<Hospital[]>(`${this.hospitalServiceAPI}/GetAll`)
  }

  getHospitalById(hospId:number): Observable<Hospital>{
    return this._httpClient.get<Hospital>(`${this.hospitalServiceAPI}/GetById/${hospId}`)
  }

  addHospital(hosp:any){
    return this._httpClient.post<any>(`${this.hospitalServiceAPI}/AddHospital`,hosp)
  }

  updateHospital(UpdatedHosp:any){
    return this._httpClient.put<any>(`${this.hospitalServiceAPI}/UpdateHospital`,UpdatedHosp)
  }

  deleteDepartment(hospId: number):Observable<Hospital> {
    return this._httpClient.delete<Hospital>(`${this.hospitalServiceAPI}/DeleteHospital/${hospId}`)

  }

  getAllCities():Observable<Cities[]>{
    return this._httpClient.get<Cities[]>(`https://localhost:7041/api/Enums/GetValuesOfCities`);
  }


}
