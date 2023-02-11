import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpecialistServiceService } from 'src/app/Services/specialist-service.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit{

  specialistsList:any
  lists :any

  constructor( private _specService:SpecialistServiceService,
    @Inject(MAT_DIALOG_DATA) public doctorData:any) {
  }
  ngOnInit(): void {
    this.getAllSpecialisatByDepId(this.doctorData.departmentId);
    console.log(this.doctorData)
    this.lists = this.doctorData.specialists
    //specialists
  }

  getAllSpecialisatByDepId(depId:number){
    this._specService.getAllSpecialistByDepartmentId(depId).subscribe(spec=>{
      this.specialistsList = spec;
  
      console.log(spec);
      console.log(this.specialistsList);
  
    })
  }

}
