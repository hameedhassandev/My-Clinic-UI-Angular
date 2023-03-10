import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSerciceService } from 'src/app/Services/auth-service';
import { LoginVM } from 'src/app/ViewModels/LoginVM';
import { RoleNames } from 'src/app/ViewModels/RoleNames';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

loader = true;
public loginVm: LoginVM;
public errorMessage: string;
public serverError: boolean;
emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
constructor(private _authSrevice: AuthSerciceService, private _router: Router) { 
  this.loginVm =  new LoginVM();
  this.errorMessage = "";
  this.serverError = false;

}
ngOnInit(): void {
}

Login(){
  this.errorMessage = "";
    this.serverError = false;
    
    this._authSrevice.Login(this.loginVm).subscribe({
      next: data => {
        localStorage.setItem("User", JSON.stringify(data));
        console.log(data)
        let userRoles = this._authSrevice.GetUserRoles();

        if(userRoles.some( i => i === RoleNames.AdminRole))
          this._router.navigate(['/admin']);

       else if(userRoles.some( i => i === RoleNames.DoctorRole))
          this._router.navigate(['/doctor']);
      
          else if(userRoles.some( i => i === RoleNames.PatientRole))
          this._router.navigate(['/home']);

        else
          this._router.navigate(['/home']);
      },

      error: err => {
        this.serverError = true;
        console.log(err)
        
        if(typeof err["error"] == "string")
          this.errorMessage = err["error"];
        
        else if(err["error"].hasOwnProperty("errors"))
          for(const e of err["error"]["errors"])
            this.errorMessage += e; 

        else if(err["error"].hasOwnProperty("Email"))  
          for(const e of err["error"]["Email"])
            this.errorMessage += e; 

        else if(err["error"].hasOwnProperty("Login Refused"))  
          for(const e of err["error"]["Login Refused"])
            this.errorMessage += e; 

        else
          this.errorMessage = "Cannot login, Please Try Again";
        }
      });
    }
    
  
  }