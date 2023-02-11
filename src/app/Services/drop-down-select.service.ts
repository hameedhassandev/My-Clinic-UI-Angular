import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cities } from '../Models/Cities';
import { Area } from '../Models/Area';

@Injectable({
  providedIn: 'root'
})
export class DropDownSelectService {
  private enumAPI : string = environment.APIURL + "/Enums";
  private areaAPI : string = environment.APIURL + "/Area";

  constructor(private _httpClient: HttpClient) { }

  getAllCities():Observable<Cities[]>{
    return this._httpClient.get<Cities[]>(`${this.enumAPI}/GetValuesOfCities`);
  }

  getAllAreaByCityId(cityId:number):Observable<Area[]>{
    return this._httpClient.get<Area[]>(`${this.areaAPI}/GetAllAreasByCityId/${cityId}`);
  }
  getAllArea():Observable<Area[]>{
    return this._httpClient.get<Area[]>(`${this.areaAPI}/GetAllAreas`);
  }
}
