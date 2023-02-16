import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  isEmpty = true;
  citiesList :any;
  departmentList : any;
  departId :any |null;
  cityId: any |null;
constructor(private _doctorService:DoctorService, private _router: Router,
  private _ddlService: DropDownSelectService,private _departmentService : DepartmentServiceService, private router: ActivatedRoute) {

}

ngOnInit(): void {
  
  this.getAlCities()
  this.getAllDepartments()
  console.log(this.router.snapshot.queryParamMap.get('department'))
  this.departId  = this.router.snapshot.queryParamMap.get('department');
  console.log(this.router.snapshot.queryParamMap.get('city'))
  this.cityId  = this.router.snapshot.queryParamMap.get('city');
  this.filter()
  // if(this.departId == null  && this,this.cityId == null)
  //   this.getAllDoctors()
 
}

getAllDoctors(){
  this._doctorService.getAllDoctors().subscribe({
    next:(res)=>{
      this.doctorList = res
      console.log(this.doctorList)
      if(this.doctorList.length === 0 ){
        this.isEmpty = false;
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

getCityValue(cityValue:any){
  console.log(cityValue.value);
  this.cityId = cityValue.value;
}

getDepartmentValue(departmentValue:any){
  console.log(departmentValue.value);
  this.departId = departmentValue.value;
}

filter(){

  console.log("department="+this.departId)

  console.log("city="+this.cityId)

 var filterDoctor: DoctorFilterVM={
   departmentId:this.departId,
   cityId:this.cityId
 };
 console.log('dataquery'+filterDoctor)
 this._doctorService.GetAllDoctorsWithFilter(filterDoctor).subscribe({
  next:(res)=>{
    this.doctorList = res
    console.log(''+this.isEmpty)    
    console.log(this.doctorList)
    this.cityId = null
    this.departId = null 
    if(this.doctorList.length === 0 ){
      this.isEmpty = false;
      console.log('after filter : '+this.isEmpty)   
   
}
    
  },
  error:(err)=>{
    this.errMassage = err
    console.log(this.errMassage)
  }
})

}
}
