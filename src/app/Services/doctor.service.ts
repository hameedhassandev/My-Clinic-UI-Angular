import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthSerciceService } from './auth-service';
import { Observable } from 'rxjs';
import { Doctor } from '../Models/Doctor';
import { DoctorFilterVM } from '../ViewModels/DoctorFilterVM';
import { TimeOfWork } from '../Models/TimeOfWork';
import { DoctorVM } from '../ViewModels/DoctorVM';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

 private DoctorAPIUrl:string = environment.APIURL +'/Doctor'
 private TimeOfWork:string = environment.APIURL +'/TimesOfWork'
 httpOptions: any
 constructor(private _httpClient: HttpClient, authService : AuthSerciceService) { 
   this.httpOptions = {
     headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: authService.GetToken()
     })
   };
  }
getAllDoctors():Observable<Doctor[]>{
return this._httpClient.get<Doctor[]>(`${this.DoctorAPIUrl}/GetAllDoctorsWithData`);
}

GetAllConfirmedDoctors():Observable<DoctorVM[]>{
  return this._httpClient.get<DoctorVM[]>(`${this.DoctorAPIUrl}/GetAllConfirmedDoctors`);
}

GetAllNotConfirmedDoctors():Observable<DoctorVM[]>{
  return this._httpClient.get<DoctorVM[]>(`${this.DoctorAPIUrl}/GetAllNotConfirmedDoctors`);
}

GetAllDoctorsWithFilter(filterObj : DoctorFilterVM):Observable<Doctor[]>{
var filterQuery:string = "";
if(filterObj.cityId != null)
 filterQuery = `city=${filterObj.cityId}`;

if(filterObj.departmentId != null){
  if(filterQuery != "")
  filterQuery=`${filterQuery}&department=${filterObj.departmentId}`;
  else
  filterQuery =`department=${filterObj.departmentId}`;
}
console.log(filterQuery)
return this._httpClient.get<Doctor[]>(`${this.DoctorAPIUrl}/GetAllDoctorsWithFilter?${filterQuery}`);
}
  
GetDoctorById(doctorId:any):Observable<Doctor>{
  return this._httpClient.get<Doctor>(`${this.DoctorAPIUrl}/GetDoctorByIdWithData?doctorId=${doctorId}`);
}




}