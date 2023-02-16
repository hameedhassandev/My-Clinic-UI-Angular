import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthSerciceService } from 'src/app/Services/auth-service';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-confirm-doctor-form',
  templateUrl: './confirm-doctor-form.component.html',
  styleUrls: ['./confirm-doctor-form.component.css']
})
export class ConfirmDoctorFormComponent implements OnInit{
  doctorObj : any
  constructor(private _docServeic : DoctorService,private router:Router,private _dialog : MatDialogRef<ConfirmDoctorFormComponent>,  
    @Inject(MAT_DIALOG_DATA) public id:any,private _authServ:AuthSerciceService) {
    
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

  confirmDoctorAndSendEmail(doctorId:any){
    let formData = new FormData();
    formData.append("doctorId",doctorId)
    this._authServ.confirmAdminToDoctorMail(formData).subscribe({
      next:(res)=>{
        this.router.navigate(['/admin/confirmed-doctors/confirmed',]);
       alert("confirmed and sent email")
       this._dialog.close();
       
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
