import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/Services/doctor.service';
import { TimeofworkService } from 'src/app/Services/timeofwork.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  doctorObj:any
  timesOfWorkList:any
  showReviews = false;
  constructor(private _timeOfWorkSer: TimeofworkService,private router: Router,
    private _doctorService:DoctorService,private _router: ActivatedRoute) {
    
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
  this._timeOfWorkSer.getAllAppointmentByDocId(docId).subscribe({
    next:(res)=>{
      this.timesOfWorkList = res
      console.log(this.timesOfWorkList)
    },
    error:(err)=>{
      console.log(err)
    }
  })
  
  }

  ShowAllReviews(){
    this.showReviews = true;
    alert('clicked')
  }

  navigateToBook(day:any){
    this.router.navigate(['/home/book-doctor/',day,this.doctorObj.id]);

  }

}
