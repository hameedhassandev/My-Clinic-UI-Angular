import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HospitalServiceService } from 'src/app/Services/hospital-service.service';
import { InsuranceService } from 'src/app/Services/insurance.service';
import { SpecialistServiceService } from 'src/app/Services/specialist-service.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit{

  specialistsList:any
  hospitalsList:any
  insurancesList:any
  lists :any
  lists2 :any
  lists3 :any
  doctorTitle:any
  cost:any
  waitingTime:any
  phone:any
  constructor( private _specService:SpecialistServiceService,private _hospital:HospitalServiceService,
    private _insurance :InsuranceService,@Inject(MAT_DIALOG_DATA) public doctorData:any) {
  }
  ngOnInit(): void {
    this.getAllSpecialisatByDepId(this.doctorData.departmentId);
    this.getAllHospitals();
    this.getAllInsurance();
    this.lists = this.doctorData.specialists
    this.lists2 = this.doctorData.hospitals
    this.lists3 = this.doctorData.insurances
    this.doctorTitle = this.doctorData.doctorTitle
    this.cost = this.doctorData.cost
    this.waitingTime = this.doctorData.waitingTime
    this.phone = this.doctorData.phoneNo


  }

  getAllSpecialisatByDepId(depId:number){
    this._specService.getAllSpecialistByDepartmentId(depId).subscribe(spec=>{
      this.specialistsList = spec;
        console.log(this.specialistsList);
  
    })
  }

  getAllHospitals(){
    this._hospital.getAllHospitals().subscribe(hosp=>{
      this.hospitalsList = hosp;
      console.log(this.hospitalsList);

  })
}
getAllInsurance(){
  this._insurance.getAllInsurance().subscribe(ins=>{
    this.insurancesList = ins;
    console.log(this.insurancesList);

})
}
}


// for (let s of this.selected) {
//   data.append('SpecialistsIds[]', s);
//  }
//  for (let h of this.selected2) {
//   data.append('HospitalsIds[]', h);
//  }    
// for (let i of this.selected3) {
//   data.append('InsuranceIds[]', i);
//  }