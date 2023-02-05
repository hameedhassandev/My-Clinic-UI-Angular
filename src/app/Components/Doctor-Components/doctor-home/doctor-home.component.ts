import { Component, OnInit } from '@angular/core';
import { AuthSerciceService } from 'src/app/Services/auth-service';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit{
  doctorObj:any
  doctorId:string = '';

  constructor(private _doctorService:DoctorService,private authService:AuthSerciceService) {
    
  }
  ngOnInit(): void {
    this.doctorId = this.authService.GetUser().Id
    this.getDoctoById(this.doctorId)

  }
  getDoctoById(docId:any){
    this._doctorService.GetDoctorById(docId).subscribe({
      next:(res)=>{
        this.doctorObj = res
        console.log(this.doctorObj)
      },
      error:(err)=>{
        console.log(err)
      }
    })
    
}

}
