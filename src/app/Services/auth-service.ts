import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { LoginVM } from '../ViewModels/LoginVM';
import { Observable } from 'rxjs';
import { AuthUserVM } from '../ViewModels/AuthUserVM';



@Injectable({
  providedIn: 'root'
})
export class AuthSerciceService {

  private serviceApi: string = environment.APIURL + "/Auth";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
      })
  };


  

  constructor(private _httpClient: HttpClient,  private _router: Router) { }

  Login(logingUser: LoginVM) : Observable<AuthUserVM>
  {
    return this._httpClient.post<AuthUserVM>(this.serviceApi + "/Login",logingUser);
  }

  RegisterAsDoctor(registerAsDoctor: any)
  {
    return this._httpClient.post<any>(this.serviceApi + "/DoctorRegister", registerAsDoctor);
  }

  RegisterAsVisitor(registerVisitor: any)
  {
    return this._httpClient.post<any>( `${this.serviceApi}/RegisterAsPatient`,registerVisitor);
  }
  
  UpdateImagePicture(userData:any){
    return this._httpClient.put<any>( `${this.serviceApi}/updateProfilePic`,userData);

  }
  confirmUserEmail(data:any){
    return this._httpClient.post<any>( `${this.serviceApi}/ConfirmUserMail`,data);

  }
  confirmAdminToDoctorMail(doctorId:any){
    return this._httpClient.post<any>( `${this.serviceApi}/ConfirmDoctorWithEmail`,doctorId,this.httpOptions);

  }
  isLogged() : Boolean
  {
    if(!localStorage.hasOwnProperty("User"))
      return false;

      let user: AuthUserVM = this.GetUser();
      const currentDate = (new Date()).getTime();

      //if token is expires
      if(currentDate > user.expiresOn.getTime())
      {
        localStorage.removeItem("User");
        console.log(user.expiresOn.getTime())
        console.log("not logged and user removed");
        return false;
        
      }

      console.log("logged successfully");
      return true;
  }

  GetToken(): string
  {
    let user: AuthUserVM = this.GetUser();
    return "Bearer " + user.token;
  }

  GetUserRoles(): string[] 
  {
    return this.GetUser().roles;
  }


  GetUser(): AuthUserVM
  {
    let user: any = localStorage.getItem("User");
    user = JSON.parse(user);
    
    return new AuthUserVM(user.id,user.massage,user.email, user.userName,user.isAuth,user.roles, user.token, user.expiresOn);
  }

  Logout()
  {
    localStorage.removeItem("User");
    this._router.navigate(['/login']);
  }

}

