import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSerciceService } from 'src/app/Services/auth-service';
import { RoleNames } from 'src/app/ViewModels/RoleNames';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit,DoCheck {
  isUser = false
  isLogged:Boolean;
  userName:any;
  userId:any;
  constructor(private _authService:AuthSerciceService,private _router:Router){
    this.isLogged = false;
  }
checkRole():Boolean{
  var currentRole = this._authService.GetUserRoles();
  var userRole = RoleNames.PatientRole
  for(let r of currentRole){
     if(r === userRole){    
      this.isUser = true
      return true;
     }
  }
  return false
}

  ngDoCheck(): void {
    if(this._authService.isLogged() && this.checkRole())
    {
      this.isLogged = true;
      this.userName = this._authService.GetUser().userName;
      this.userId = this._authService.GetUser().Id;
      console.log(this.isLogged)

    }
  }
  ngOnInit(): void {
    //this.checkRole()
    if(this._authService.isLogged() && this.checkRole()){
      this.isLogged = true;
      this.userName = this._authService.GetUser().userName;
      this.userId = this._authService.GetUser().Id;
    console.log(this.isLogged)

    }
  }
  
  Logout(){
    this._authService.Logout();
    this.isLogged = false
    console.log(this.isLogged)

  }

  myProfile(){
    this._router.navigate(['/home/my-profile']);
  }
  myAppointments(){
    this._router.navigate(['/home/my-appointments']);
  }
}
