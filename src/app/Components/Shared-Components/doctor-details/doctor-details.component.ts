import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  doctorObj:any
  timesOfWorkList:any

  constructor(private _doctorService:DoctorService,private _router: ActivatedRoute) {
    
  }
  ngOnInit(): void {
    this._router.paramMap.subscribe((params) => {
      const doctorId = params.get('doctorId');
      this.getDoctoById(doctorId);
      this.getDoctorTimesOfWork(doctorId)
    });  
  }

  getDoctoById(docId:any){
    this._doctorService.GetDoctorById(docId).subscribe({
      next:(res)=>{
        this.doctorObj = res
        console.log(this.doctorObj.Insurance)
        console.log(this.doctorObj)
      },
      error:(err)=>{
        console.log(err)
      }
    })
    
}
getDoctorTimesOfWork(docId:any){
  this._doctorService.GetAllTimesOfWork(docId).subscribe({
    next:(res)=>{
      this.timesOfWorkList = res
      console.log(this.timesOfWorkList)
    },
    error:(err)=>{
      console.log(err)
    }
  })
  
  }

  
}
