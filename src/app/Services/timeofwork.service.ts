import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthSerciceService } from './auth-service';
import { environment } from 'src/environments/environment';
import { TimeOfWork } from '../Models/TimeOfWork';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeofworkService {
  private timeOfWorkAPI : string = environment.APIURL + "/TimesOfWork";
  httpOptions:any
  constructor(private _httpClient:HttpClient, private _authService : AuthSerciceService) {
    if(_authService.isLogged()){
      this.httpOptions = {
        headers: new HttpHeaders({Authorization: _authService.GetToken()})
      };
    }
   
   }

  getAllAppointmentByDocId(doctorId:string): Observable<TimeOfWork>{
    return this._httpClient.get<TimeOfWork>(`${this.timeOfWorkAPI}/GetDatesOfDoctor?doctorId=${doctorId}`)
  }

  getAllTimesByDocId(doctorId:any): Observable<TimeOfWork>{
    return this._httpClient.get<TimeOfWork>(`${this.timeOfWorkAPI}/GetAvailableTimesOfDoctorNext3Days?doctorId=${doctorId}`)
  }
  

  addAppointmentToDoctor(appoinData:any){
    return this._httpClient.post<any>(`${this.timeOfWorkAPI}/AddTimeToDoctor`,appoinData,this.httpOptions)

  }

  removeAppointement(id:any){
    return this._httpClient.delete<any>(`${this.timeOfWorkAPI}/DeleteTimeOfDoctor?TimeId=${id}`,this.httpOptions)
 
  }
}
