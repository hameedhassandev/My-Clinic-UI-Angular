import { Component, OnInit } from '@angular/core';
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
  allBook:any
  constructor(private _authServ:AuthSerciceService, private _bookServ:BookService) {
    
  }
  ngOnInit(): void {
    this.doctorId = this._authServ.GetUser().Id;
    this.getAllDoctorsBook(this.doctorId);
  }
getAllDoctorsBook(docId:any){
  this._bookServ.gettAllBookOfDoctor(docId).subscribe(book=>{
    this.allBook = book;
    console.log(this.allBook);
  })
}
acceptBook(id:any){
  var fData = new FormData()
  fData.append("bookId",id);
  this._bookServ.confirmBook(fData).subscribe({
    next:(res)=>{
      alert("Book has accepted successfully")
      this.getAllDoctorsBook(this.doctorId);
    },
    error:(err)=>{
      alert("Somthing error, try again")
      console.log(err)
    }
  })
}
}
