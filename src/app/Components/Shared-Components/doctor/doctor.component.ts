import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { Doctor } from 'src/app/Models/Doctor';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit{
  doctorList : Doctor[] = [];
  errMassage:any;
  myImage!:Observable<any>;


  constructor(private _doctorService:DoctorService, private _router: Router) {
    
  }
  ngOnInit(): void {
    this.getAllDoctors()
  }

  onChange(event:Event){
    const target = event.target as HTMLInputElement;
    const file:File = (target.files as FileList)[0];
    this.converToBase64(file);
  }
  converToBase64(file:File){
    const observable = new Observable((subscriber : Subscriber<any>)=>{
       this.readFile(file, subscriber);
    })
    observable.subscribe((img=>{
      console.log(img);
      this.myImage = img;
      this.converToBase64(img);
    }))
  }

  readFile(file:File, subscribe:Subscriber<any>){
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      subscribe.next(fileReader.result);
      subscribe.complete();
    }
    fileReader.onerror = () => {
      subscribe.error();
      subscribe.complete();
    }
  }

  getAllDoctors(){
    this._doctorService.getAllDoctors().subscribe({
      next:(res)=>{
        this.doctorList = res
      },
      error:(err)=>{
        this.errMassage = err
        console.log(this.errMassage)
      }
    })
  }

  getDoctorDetails(){
    this._router.navigate(['/home/doctor-details']);
  }
}
