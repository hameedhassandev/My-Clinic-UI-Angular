import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthSerciceService } from 'src/app/Services/auth-service';
import { BookService } from 'src/app/Services/book.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { TimeofworkService } from 'src/app/Services/timeofwork.service';
import { VisitorService } from 'src/app/Services/visitor.service';

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
 visitorId:any
 doctorId:any
 day:any
 time:any
 VisitorObj:any
  constructor(private _timeOfWorkServ:TimeofworkService,private _doctorServ:DoctorService,
    private _authService:AuthSerciceService,private _visitorServ: VisitorService,
    private _router: ActivatedRoute,private router:Router,private _bookSrvice:BookService) {
    
  }
  ngOnInit(): void {
    this.visitorId = this._authService.GetUser().Id;
    this.getVisitorById(this.visitorId)
    this._router.paramMap.subscribe((params) => {
      this.doctorId = params.get('doctorId');
      this.day = params.get('day');
      this.dayOfBooking = this.day
      this.getDoctoById(this.doctorId);
      // this.getDoctorTimesOfWork(doctorId)
    });  
  }

  getVisitorById(Id:any){
    this._visitorServ.getVisitorById(Id).subscribe(visitor=>{
      this.VisitorObj = visitor
    })
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
getTimeValue(timeValue:any){
  this.time =  timeValue.target.value;
  console.log(this.time)
}
book(){
  var fData =new FormData();
  fData.append("Day",this.day);
  fData.append("Time",this.time);
  fData.append("DoctorId",this.doctorId);
  fData.append("PatientId",this.visitorId);
  this._bookSrvice.addBook(fData).subscribe({
    next:(data)=>{
      this.router.navigate(['/home/my-appointments']);
    },
    error:(err)=> {
      alert("somthing error, err: "+ err.error)
    },
  })
   
}

}
