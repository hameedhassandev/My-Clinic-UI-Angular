import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentServiceService } from 'src/app/Services/department-service.service';
import { DropDownSelectService } from 'src/app/Services/drop-down-select.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  citiesList :any;
  departmentList : any;
  constructor(private _ddlService: DropDownSelectService,private router: Router,
    private _departmentService : DepartmentServiceService) {}
  ngOnInit(): void {
    this.getAlCities()
    this.getAllDepartments()
  

  }

  getAlCities(){
    this._ddlService.getAllCities().subscribe(Cities=>{
      this.citiesList = Cities;
  
      const mapped = Object.entries(this.citiesList).map(([id, name]) => ({id, name}));
       this.citiesList = mapped;
      console.log(this.citiesList);
      console.log(mapped);
    })
  }
  
  movetoContact(){
    this.router.navigate(['/home/all-doctors'],{queryParams: {part: 'navbar',search: 'contact', }})
    // this.router.navigate(['/home/all-doctors'],{queryParams: {part: 'navbar',search: 'contact', year: 2021 }})
  }
  
  getAllDepartments(){
    this._departmentService.getAllDepartments().subscribe(departments=>{
      this.departmentList = departments;
      console.log(this.departmentList)
  
  })
  }
}
