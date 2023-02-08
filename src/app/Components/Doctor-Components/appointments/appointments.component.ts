import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthSerciceService } from 'src/app/Services/auth-service';
import { TimeofworkService } from 'src/app/Services/timeofwork.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  appointemtObj:any
  dId:any
  appoiForm !:FormGroup;

  constructor(private _fb: FormBuilder,private _timeOdWork : TimeofworkService,private authService : AuthSerciceService) {    
  }
  ngOnInit(): void {
    this.dId = this.authService.GetUser().Id
    this.getAppointemntsByDocId(this.dId);

    this.appoiForm = this._fb.group({
      day: ['', Validators.required],
      startWork: ['', Validators.required],
      endWork: ['', Validators.required],
    })
  }

getAppointemntsByDocId(docId:string){
  this._timeOdWork.getAllAppointmentByDocId(docId).subscribe({
    next:(res)=>{
      this.appointemtObj = res  
      console.log(this.appointemtObj)
 },
 error:(err)=>{
  console.log(err)
 }
  })
}

addAppontment(){

  const data = {
    day:this.appoiForm.value['day'],
    startWork:this.appoiForm.value['startWork'],
    endWork:this.appoiForm.value['endWork'],
    doctorId :this.dId,

  }
  console.log(data)
  if(this.appoiForm.valid)
  {
    this._timeOdWork.addAppointmentToDoctor(data).subscribe({
      next:(res)=>{
         alert('Appointment added successfully');
         this.getAppointemntsByDocId(this.dId);
 
       },error: err=>{
         alert('somthing error: ' +err.error);
         console.log(err)
        }
    })
  }

}

removeAppointement(id:any){

  this._timeOdWork.removeAppointement(id).subscribe({
    next:(res)=>{
      alert('Appointment deleted successfully');
      this.getAppointemntsByDocId(this.dId);

    },error: err=>{
      alert('somthing error while delete');
      console.log(err)
     }

  })
}
}
