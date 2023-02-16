import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthSerciceService } from './auth-service';
import { Observable } from 'rxjs';
import { Area } from '../Models/Area';

@Injectable({
  providedIn: 'root'
})
export class AreaServiceService {

  private areaApi: string = environment.APIURL + "/Area";
  httpOptions: any
  constructor(private _httpClient: HttpClient, authService : AuthSerciceService) { 
    this.httpOptions = {
      headers: new HttpHeaders({Authorization: authService.GetToken()})
    };
  }

  getAllAreas(): Observable<Area[]>{
    return this._httpClient.get<Area[]>(`${this.areaApi}/GetAllAreas`)
  }
  deleteArea(id:number){

  }
  addArea(data:any){
    return this._httpClient.post<any>(`${this.areaApi}/AddArea`,data,this.httpOptions)

  }
  updateArea(data:any){
    return this._httpClient.put<any>(`${this.areaApi}/UpadteArea`,data)

  }
}