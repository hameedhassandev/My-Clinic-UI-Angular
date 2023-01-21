import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSerciceService } from 'src/app/Services/auth-service';
import { RegisterAsDoctorVM } from 'src/app/ViewModels/RegisterAsDoctorVM';

@Component({
  selector: 'app-register-as-doctor',
  templateUrl: './register-as-doctor.component.html',
  styleUrls: ['./register-as-doctor.component.css']
})
export class RegisterAsDoctorComponent implements OnInit{
  public RegisteDoctorVM : RegisterAsDoctorVM;
  personalDetails!: FormGroup;
  addressAndCostDetails!: FormGroup;
  extraInfoDetails!: FormGroup;
  testList :Array<string> = [];
  personal_step = false;
  address_step = false;
  extraInfo_step = false;
  step = 1;
 selected = [];
 constructor(private _fb: FormBuilder,private _authSrevice: AuthSerciceService, private _router: Router) {
  this.RegisteDoctorVM = new RegisterAsDoctorVM();
  }


 ngOnInit(): void {
    this.personalDetails = this._fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      fullName: ['',Validators.required],
      doctorTitle: ['',Validators.required],
      password: ['',Validators.required],
      gender: ['',Validators.required],
      phoneNo: ['',Validators.required],
  });

    this.addressAndCostDetails = this._fb.group({
        cities: ['', Validators.required],
        areaId: ['', Validators.required],
        address: ['',Validators.required],
        cost: ['',Validators.required],
        waitingTime: ['',Validators.required],    
  });

    this.extraInfoDetails = this._fb.group({
        image: ['', Validators.required],
        departmentId: ['', Validators.required],
        specialistsIds: ['',Validators.required],
        hospitalsIds: ['',Validators.required],
        insuranceIds: ['',Validators.required],
  });

}
 
get personal(){ 
  return this.personalDetails.controls;
}
get address(){
 return this.addressAndCostDetails.controls;
}
get extraInfo() {
   return this.extraInfoDetails.controls; 
}

next(){
    if(this.step==1){
      this.personal_step = true;
      if (this.personalDetails.invalid) { return  }
      this.step++
    }
    if(this.step==2){
    this.address_step = true;
    if (this.addressAndCostDetails.invalid) { return }
        this.step++;
    }
}

previous(){
    this.step--
    if(this.step==1){
    this.personal_step = false;
    }
    if(this.step==2){
    this.extraInfo_step = false;
    }
  }

register(){
    if(this.step==3){
    this.extraInfo_step = true;
    if (this.extraInfoDetails.invalid) { return }
    this._authSrevice.RegisterAsDoctor(this.RegisteDoctorVM).subscribe(
      {
        next:data =>{
          
        },
      }
    )
    }
}

}
