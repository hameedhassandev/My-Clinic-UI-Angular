import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthSerciceService } from './auth-service';
import { Observable } from 'rxjs';
import { Department } from '../Models/Department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {

  private depServiceApi: string = environment.APIURL + "/Department";
  httpOptions: any
  constructor(private _httpClient: HttpClient, authService : AuthSerciceService) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: authService.GetToken()
      })
    };
  }

  getAllDepartments(): Observable<Department[]>{
    return this._httpClient.get<Department[]>(`${this.depServiceApi}/GetAll`)
  }

  getDepartmentById(depId:number): Observable<Department>{
    return this._httpClient.get<Department>(`${this.depServiceApi}/GetDepartmentById/${depId}`)
  }

  addDepartment(dep:any){
    console.log(dep);
    return this._httpClient.post<Department>(`${this.depServiceApi}/AddDepartment`,dep,this.httpOptions)
  }

  updateDepartment(UpdatedDep:any){
    return this._httpClient.put<any>(`${this.depServiceApi}/UpadteDepartment`,UpdatedDep)
  }

  deleteDepartment(depId: number):Observable<Department> {
    return this._httpClient.delete<Department>(`${this.depServiceApi}/DeleteDepartment?id=${depId}`)

  }

}
