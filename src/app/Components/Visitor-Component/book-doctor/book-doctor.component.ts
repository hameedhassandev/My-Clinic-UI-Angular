import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthSerciceService } from 'src/app/Services/auth-service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { TimeofworkService } from 'src/app/Services/timeofwork.service';

@Component({
  selector: 'app-book-doctor',
  templateUrl: './book-doctor.component.html',
  styleUrls: ['./book-doctor.component.css']
})
export class BookDoctorComponent implements OnInit{

  allTimes:any
  getTimesByDay:any
 dayOfBooking:any
 doctorObj:any
  constructor(private _timeOfWorkServ:TimeofworkService,private _doctorServ:DoctorService,
    private _authService:AuthSerciceService,private _router: ActivatedRoute) {
    
  }
  ngOnInit(): void {
    this._router.paramMap.subscribe((params) => {
      const doctorId = params.get('doctorId');
      const day = params.get('day');
      this.dayOfBooking = day
      this.getDoctoById(doctorId);
      // this.getDoctorTimesOfWork(doctorId)
    });  
  }
  getDoctoById(docId:any){
    this._doctorServ.GetDoctorById(docId).subscribe({
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

}
