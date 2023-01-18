import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthSerciceService } from './auth-service';
import { Observable } from 'rxjs';
import { Doctor } from '../Models/Doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

 private DoctorAPIUrl:string = environment.APIURL +'/Doctor'
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

}