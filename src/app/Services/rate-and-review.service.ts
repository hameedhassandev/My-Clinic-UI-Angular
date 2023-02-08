import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthSerciceService } from './auth-service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RateAndReviews } from '../Models/RateAndReviews';

@Injectable({
  providedIn: 'root'
})
export class RateAndReviewService {
  private rateAndReviewAPI : string = environment.APIURL + "/RateAndReview";
  httpOptions:any
  constructor(private _httpClient:HttpClient, private _authService : AuthSerciceService) { 
    this.httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       // Authorization: authService.GetToken()
      })      
    };
  }

  getAllRateAndReviewsByDocId(docId:any) : Observable<RateAndReviews[]>{
    return this._httpClient.get<RateAndReviews[]>(`${this.rateAndReviewAPI}/GetReviewsOfDoctor?doctorId=${docId}`);
  }

}
