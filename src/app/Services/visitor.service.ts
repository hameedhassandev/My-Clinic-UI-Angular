import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthSerciceService } from './auth-service';
import { Observable } from 'rxjs';
import { Visitor } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  private visitorAPI : string = environment.APIURL + "/Patient";

  constructor(private _httpClient:HttpClient, private _authService : AuthSerciceService) { }

  GetAllVisitors() : Observable<Visitor[]>{
    return this._httpClient.get<Visitor[]>(`${this.visitorAPI}/GetAllWithData`);
  }

}
