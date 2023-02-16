import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout-component',
  templateUrl: './admin-layout-component.component.html',
  styleUrls: ['./admin-layout-component.component.css']
})
export class AdminLayoutComponentComponent implements OnInit{
  title = 'My Clinic';
  sideBarOpen =true;
  ngOnInit(): void {
  }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }
}
