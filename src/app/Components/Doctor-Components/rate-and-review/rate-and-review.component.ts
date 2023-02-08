import { Component, OnInit } from '@angular/core';
import { AuthSerciceService } from 'src/app/Services/auth-service';
import { RateAndReviewService } from 'src/app/Services/rate-and-review.service';

@Component({
  selector: 'app-rate-and-review',
  templateUrl: './rate-and-review.component.html',
  styleUrls: ['./rate-and-review.component.css']
})
export class RateAndReviewComponent implements OnInit{
 
  rateAndReviewObj:any
  doctorId:any
  constructor( private _authService:AuthSerciceService, private _rateAndRevServ: RateAndReviewService) {
    
  }
  ngOnInit(): void {
     this.doctorId = this._authService.GetUser().Id
     this.getAllRateAndReviewByDocId(this.doctorId)
  }

  getAllRateAndReviewByDocId(docId:any){
    this._rateAndRevServ.getAllRateAndReviewsByDocId(docId).subscribe({
      next:(res)=>{
        this.rateAndReviewObj = res
        console.log(this.rateAndReviewObj)
      },
      error:(err)=>{
          console.log(err)
      }
    })
  }
}
