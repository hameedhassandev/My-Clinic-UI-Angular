import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-mail',
  templateUrl: './confirmation-mail.component.html',
  styleUrls: ['./confirmation-mail.component.css']
})
export class ConfirmationMailComponent implements OnInit{
  msgTitle:any
  msgContent:any
  imagePathOfMassage:any
  constructor() { }

  ngOnInit(): void { 
    this.msgTitle = "Authorize your email address"
    this.msgContent = "you are register successfull, kindly check your email to verify it."
    this.imagePathOfMassage = "assets/imges/home_icon/tick.png";
   
  }
}