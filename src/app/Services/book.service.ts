import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthSerciceService } from './auth-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../Models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookApi: string = environment.APIURL + "/Department";
  httpOptions: any
  constructor(private _httpClient: HttpClient, authService : AuthSerciceService) { 
    this.httpOptions = {
      headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
       // Authorization: authService.GetToken()
      })
    };
  }

  gettAllBookOfDoctor(doctorId:any): Observable<Book[]>{
    return this._httpClient.get<Book[]>(`${this.bookApi}/GetBookingsOfDoctor?doctorId=${doctorId}`)
  }
}
