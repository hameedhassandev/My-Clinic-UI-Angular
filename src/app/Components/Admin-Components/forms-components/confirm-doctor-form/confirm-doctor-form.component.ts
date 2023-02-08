import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-confirm-doctor-form',
  templateUrl: './confirm-doctor-form.component.html',
  styleUrls: ['./confirm-doctor-form.component.css']
})
export class ConfirmDoctorFormComponent implements OnInit{
  doctorObj : any
  constructor(private _docServeic : DoctorService,  
    @Inject(MAT_DIALOG_DATA) public id:any) {
    
  }
  ngOnInit(): void {
    if(this.id)
        this.getDoctorById(this.id)
  }

  getDoctorById(id:any){
    this._docServeic.GetDoctorById(id).subscribe({
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
