import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RateAndReviewService } from 'src/app/Services/rate-and-review.service';

@Component({
  selector: 'app-visitor-comments',
  templateUrl: './visitor-comments.component.html',
  styleUrls: ['./visitor-comments.component.css']
})
export class VisitorCommentsComponent implements OnInit{
allVisitorsRateAndReview:any
  constructor(private _router: ActivatedRoute, private _rateAndReveiw : RateAndReviewService) {
    
  }
  ngOnInit(): void {
    this._router.paramMap.subscribe((params) => {
      const doctorId = params.get('doctorId');
      this.getAllRateAndReview(doctorId);
    });  
  }
getAllRateAndReview(docId:any){
  this._rateAndReveiw.getAllRateAndReviewsByDocId(docId).subscribe(rateAndRe=>{
    this.allVisitorsRateAndReview = rateAndRe 
    console.log(this.allVisitorsRateAndReview) 
  })
}
}
