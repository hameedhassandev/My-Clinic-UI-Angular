import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthSerciceService } from './auth-service';
import { Observable } from 'rxjs';
import { IDepartment } from '../Models/IDepartment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {

  private depServiceApi: string = environment.APIURL + "/Department";
  httpOptions: any
  constructor(private _httpClient: HttpClient, authService : AuthSerciceService) { 
    this.httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       // Authorization: authService.GetToken()
      })
    };
  }

  getAllDepartments(): Observable<IDepartment[]>{
    return this._httpClient.get<IDepartment[]>(`${this.depServiceApi}/GetAll`)
  }

  getDepartmentById(depId:number): Observable<IDepartment[]>{
    return this._httpClient.get<IDepartment[]>(`${this.depServiceApi}/GetDepartmentById/${depId}`)
  }

  addDepartment(dep:any){
    console.log(dep);
    return this._httpClient.post<IDepartment>(`${this.depServiceApi}/AddDepartment`,dep,this.httpOptions)
  }

  updateDepartment(depId : number, UpdatedDep:any){
    return this._httpClient.put<any>(`${this.depServiceApi}/UpadteDepartment/${depId}`,UpdatedDep,this.httpOptions)
  }

  deleteDepartment(depId: number):Observable<IDepartment> {
    return this._httpClient.delete<IDepartment>(`${this.depServiceApi}/DeleteDepartment/${depId}`)

  }

}
