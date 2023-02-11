import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSerciceService } from 'src/app/Services/auth-service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit,DoCheck {
  isLogged:Boolean;
  userName:any;
  userId:any;
  constructor(private _authService:AuthSerciceService,private _router:Router){
    this.isLogged = false;
  }
  /*DoCheck, Implements the ngDoCheck() 
  method with custom change detection.
  Watch the hook post changes to a log
  to see how often Angular calls this hook.*/

  ngDoCheck(): void {
    if(this._authService.isLogged()){
      this.isLogged = true;
      this.userName = this._authService.GetUser().userName;
      this.userId = this._authService.GetUser().Id;
      console.log(this.isLogged)

    }
  }
  ngOnInit(): void {
    if(this._authService.isLogged()){
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

  }
  myAppointments(){

  }
}
