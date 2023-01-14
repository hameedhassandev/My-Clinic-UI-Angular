import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/Models/doctor';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit{
  doctorList : Doctor[] = [];
  errMassage:any;
  constructor(private _doctorService:DoctorService) {
    
  }
  ngOnInit(): void {
    this.getAllDoctors()
  }

  getAllDoctors(){
    this._doctorService.getAllDoctors().subscribe({
      next:(res)=>{
        this.doctorList = res
      },
      error:(err)=>{
        this.errMassage = err
        console.log(this.errMassage)
      }
    })
  }

}
