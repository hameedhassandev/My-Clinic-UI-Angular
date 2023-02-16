import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthSerciceService } from 'src/app/Services/auth-service';

@Component({
  selector: 'app-email-token',
  templateUrl: './email-token.component.html',
  styleUrls: ['./email-token.component.css']
})
export class EmailTokenComponent implements OnInit {

  token:any
  email:any
  constructor(private _router:ActivatedRoute, private authServ:AuthSerciceService) {
    
  }
  ngOnInit(): void {
    this._router.paramMap.subscribe(params => {
      console.log(params);})


  }

  // confirmUserMail(){

  // var fData= new FormData()
  // fData.append("token",this.token)
  // fData.append("email",this.email)
  //  this.authServ.confirmUserEmail(fData).subscribe({
  //   next:(data) =>{console.log(data)},
  //   error:(err)=>{console.log(err)}
  //  })
  // }
    


}
