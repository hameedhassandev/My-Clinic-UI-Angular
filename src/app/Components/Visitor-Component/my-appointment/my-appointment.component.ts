import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSerciceService } from 'src/app/Services/auth-service';
import { BookService } from 'src/app/Services/book.service';
import { RateAndReviewService } from 'src/app/Services/rate-and-review.service';
import { VisitorService } from 'src/app/Services/visitor.service';

@Component({
  selector: 'app-my-appointment',
  templateUrl: './my-appointment.component.html',
  styleUrls: ['./my-appointment.component.css']
})
export class MyAppointmentComponent implements OnInit/*,DoCheck */{
  rateAndReviewForm!: FormGroup 
  visitorBook:any
  DoctorData:any
  VisitId:any
  doctorIdV:any
  isBookAccepted = false
  constructor(private _authServ:AuthSerciceService,private _router: Router,
    private _rateAndReviewServ:RateAndReviewService, private _bookServ:BookService,private _fb : FormBuilder,) {
    
  }
  clickme(doctorId:any) {
    this.doctorIdV = doctorId;
  }
  // ngDoCheck(): void {
  //   this.VisitId =  this._authServ.GetUser().Id
  //   this.getAllBookingByVisitorId(this.VisitId)  }
  ngOnInit(): void {
    this.VisitId =  this._authServ.GetUser().Id
    this.getAllBookingByVisitorId(this.VisitId)
    this.rateAndReviewForm = this._fb.group({
      rate:['', Validators.required],
      review :['',Validators.required],       
    
    })
  }

  getAllBookingByVisitorId(visitorId:any){
     this._bookServ.getBookingByVisitorId(visitorId).subscribe(data=>{
      this.visitorBook = data
      console.log(this.visitorBook)
     })
  }

  addRateReview(){
    var form = new FormData();
    form.append("rate", this.rateAndReviewForm.get('rate')?.value);
    form.append("review", this.rateAndReviewForm.get('review')?.value);
    form.append("doctorId", this.doctorIdV);
    form.append("patientId", this.VisitId);
  
    this._rateAndReviewServ.addRateAndReview(form).subscribe({
      next:(value)=> {
        this._router.navigate(['/home/doctor-details',this.doctorIdV]);
        console.log('success')
      },
      error:(err)=>{
         alert('somthing err, try again');
         console.log(err.error);
      }
    })
    // const data = {"rate":this.rateAndReviewForm.get('rate')?.value,
    // "review": this.rateAndReviewForm.get('review')?.value,
  
    // "doctorId": this.doctorIdV,
    // "patientId ": this.VisitId} 
    // console.log(data)
  }
}
