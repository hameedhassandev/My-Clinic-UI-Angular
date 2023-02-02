import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { Doctor } from 'src/app/Models/Doctor';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit{

  @Input('app-doctor') doctor!:Doctor;
  timesOfWorkList:any
  listOfrate = [1,2,3,4,5]
  checkedMe = 'checked'

  constructor(private _doctorService:DoctorService, private _router: Router) {
    
  }
  ngOnInit(): void {
 this.getDoctorTimesOfWork()
  }

  getDoctorTimesOfWork(){
    this._doctorService.GetAllTimesOfWork(this.doctor.id).subscribe({
      next:(res)=>{
        this.timesOfWorkList = res
        console.log(this.timesOfWorkList)
      },
      error:(err)=>{
        console.log(err)
      }
    })
    
    }
  
  
  getDoctorDetails(doctorId:any){
    this._router.navigate(['/home/doctor-details',doctorId]);
  }
}
