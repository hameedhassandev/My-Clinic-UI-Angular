import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthSerciceService } from 'src/app/Services/auth-service';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-visitor-booking',
  templateUrl: './visitor-booking.component.html',
  styleUrls: ['./visitor-booking.component.css']
})
export class VisitorBookingComponent implements OnInit {
  visitorId:any
  doctorId:any
  constructor(private _authServ:AuthSerciceService, private _bookServ:BookService,
    private _router: ActivatedRoute) {
    
  }
  ngOnInit(): void {
    this.visitorId =  this._authServ.GetUser().Id
    this._router.paramMap.subscribe((params) => {
    this.doctorId = params.get('doctorId');
    this.doctorId = params.get('doctorId');
    });  
  }

}
