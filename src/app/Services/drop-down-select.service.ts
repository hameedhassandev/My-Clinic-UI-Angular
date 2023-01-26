import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cities } from '../Models/Cities';

@Injectable({
  providedIn: 'root'
})
export class DropDownSelectService {
  private DDLApi : string = environment.APIURL + "/Enums";

  constructor(private _httpClient: HttpClient) { }

  getAllCities():Observable<Cities[]>{
    return this._httpClient.get<Cities[]>(`${this.DDLApi}/GetValuesOfCities`);
  }
}
