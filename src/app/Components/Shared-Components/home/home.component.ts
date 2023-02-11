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
  cityId:any
  departmentId:any
  areaList:any
  ShowTop = false
  constructor(private _ddlService: DropDownSelectService,private router: Router,
    private _departmentService : DepartmentServiceService) {}
  ngOnInit(): void {
    this.getAlCities()
    this.getAllDepartments()  
    this.getAllAreas()
    this.ShowTop = true

  }
 
  getCityValue(cityValue:any){
    console.log(cityValue.value);
    this.cityId = cityValue.value;
  }

  getDepartmentValue(departmentValue:any){
    console.log(departmentValue.value);
    this.departmentId = departmentValue.value;
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

  getAllAreas(){
    this._ddlService.getAllArea().subscribe(areas=>{
      this.areaList = areas;
      console.log(areas);
      console.log(this.areaList);
    })
  }
  movetoContact(){

    this.router.navigate(['/home/all-doctors'],{queryParams: {department: this.departmentId, city:this.cityId }})
  }
  
  getAllDepartments(){
    this._departmentService.getAllDepartments().subscribe(departments=>{
      this.departmentList = departments;
      console.log(this.departmentList)
  
  })
  }
}
