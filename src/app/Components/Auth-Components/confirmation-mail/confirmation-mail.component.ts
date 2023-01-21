import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirmation-mail',
  templateUrl: './confirmation-mail.component.html',
  styleUrls: ['./confirmation-mail.component.css']
})
export class ConfirmationMailComponent implements OnInit{
  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  educationalDetails!: FormGroup;
  testList :Array<string> = [];
  personal_step = false;
  address_step = false;
  education_step = false;
  step = 1;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void { this.personalDetails = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['',Validators.required]
});
this.addressDetails = this.formBuilder.group({
    city: ['', Validators.required],
    address: ['', Validators.required],
    pincode: ['',Validators.required]
});
this.educationalDetails = this.formBuilder.group({
    highest_qualification: ['', Validators.required],
    university: ['', Validators.required],
    total_marks: ['',Validators.required]
});
}
get personal() { return this.personalDetails.controls; }
get education() { return this.educationalDetails.controls; }
get address() { return this.addressDetails.controls; }
next(){
if(this.step==1){
  this.personal_step = true;
  if (this.personalDetails.invalid) { return  }
  this.step++
}
if(this.step==2){
this.address_step = true;
if (this.addressDetails.invalid) { return }
    this.step++;
}
}
previous(){
this.step--
if(this.step==1){
this.personal_step = false;
}
if(this.step==2){
this.education_step = false;
}
}
submit(){
if(this.step==3){
this.education_step = true;
if (this.educationalDetails.invalid) { return }
}
}

changeList(id:any){
  let fruits: Array<string> = ['Apple', 'Orange', 'Banana'];

  if(id === '1'){
    this.testList = fruits;
  }else{
    this.testList = []
  }
}
}
