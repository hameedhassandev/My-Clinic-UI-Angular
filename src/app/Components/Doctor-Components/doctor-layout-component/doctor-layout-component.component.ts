import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-layout-component',
  templateUrl: './doctor-layout-component.component.html',
  styleUrls: ['./doctor-layout-component.component.css']
})
export class DoctorLayoutComponentComponent implements OnInit{
  sideBarOpen =true;
  ngOnInit(): void {
  }

 
}