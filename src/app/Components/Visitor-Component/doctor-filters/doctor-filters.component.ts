import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/Models/Doctor';
import { DepartmentServiceService } from 'src/app/Services/department-service.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { DropDownSelectService } from 'src/app/Services/drop-down-select.service';
import { DoctorFilterVM } from 'src/app/ViewModels/DoctorFilterVM';

@Component({
  selector: 'app-doctor-filters',
  templateUrl: './doctor-filters.component.html',
  styleUrls: ['./doctor-filters.component.css']
})
export class DoctorFiltersComponent implements OnInit{
  doctorList : Doctor[] = [];
  errMassage:any;
  isEmpty = false;
  citiesList :any;
  departmentList : any;
  departId:number;
  cityId:number;
constructor(private _doctorService:DoctorService, private _router: Router,
  private _ddlService: DropDownSelectService,private _departmentService : DepartmentServiceService) {

    this.departId = 1
    this.cityId = 1
}

ngOnInit(): void {
  this.getAllDoctors()
  this.getAlCities()
  this.getAllDepartments()
}

getAllDoctors(){
  this._doctorService.getAllDoctors().subscribe({
    next:(res)=>{
      this.doctorList = res
      console.log(this.doctorList)
      if(this.doctorList.length === 0 ){
        this.isEmpty = true;
        this.errMassage = 'No result match your filter'
      }
    },
    error:(err)=>{
      this.errMassage = err

      console.log(this.errMassage)
    }
  })
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


getAllDepartments(){
  this._departmentService.getAllDepartments().subscribe(departments=>{
    this.departmentList = departments;

})
}

filter(){
 var filterDoctor: DoctorFilterVM={
   departmentId:this.departId,
   cityId:this.cityId
 };
 this._doctorService.GetAllDoctorsWithFilter(filterDoctor).subscribe({
  next:(res)=>{
    this.doctorList = res
    console.log(this.doctorList)
  },
  error:(err)=>{
    this.errMassage = err
    console.log(this.errMassage)
  }
})

}
}
