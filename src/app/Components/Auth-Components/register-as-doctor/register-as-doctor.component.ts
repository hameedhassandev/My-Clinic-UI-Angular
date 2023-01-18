import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-as-doctor',
  templateUrl: './register-as-doctor.component.html',
  styleUrls: ['./register-as-doctor.component.css']
})
export class RegisterAsDoctorComponent implements OnInit{
 color = 'red'
 items = [
  {id:1,name:"item1"},
  {id:2,name:"item2"},
  {id:3,name:"item3"},
  {id:4,name:"item4"},
  {id:5,name:"item5"},

 ]
 selected = [];
  constructor(){}
  ngOnInit(): void {
  }
  getValue(){
    
  }

}
