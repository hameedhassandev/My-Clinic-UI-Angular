import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSerciceService } from 'src/app/Services/auth-service';
import { DepartmentServiceService } from 'src/app/Services/department-service.service';
import { DropDownSelectService } from 'src/app/Services/drop-down-select.service';
import { HospitalServiceService } from 'src/app/Services/hospital-service.service';
import { InsuranceService } from 'src/app/Services/insurance.service';
import { SpecialistServiceService } from 'src/app/Services/specialist-service.service';
import { RegisterAsDoctorVM } from 'src/app/ViewModels/RegisterAsDoctorVM';

@Component({
  selector: 'app-register-as-doctor',
  templateUrl: './register-as-doctor.component.html',
  styleUrls: ['./register-as-doctor.component.css']
})
export class RegisterAsDoctorComponent implements OnInit{
  public RegisteDoctorVM : RegisterAsDoctorVM;
  finalRegisterForm !:FormGroup;
  personalDetails!: FormGroup;
  addressAndCostDetails!: FormGroup;
  extraInfoDetails!: FormGroup;
  personal_step = false;
  address_step = false;
  extraInfo_step = false;
  step = 1;
  citiesList :any;
  areasList :any;
  imageValue:any
  departmentList : any;
  specialistsList : any[] = [];
  hospitalsList : any[] = [];
  insuranceList : any[] = [];
  file:string='';
  selected = [];
  selected2 = [];
  selected3 = [];
  errorMassage:any
  isError = false

 constructor(private _fb: FormBuilder,private _authSrevice: AuthSerciceService,private _insuranceServ : InsuranceService,
  private _router: Router,private _ddlService: DropDownSelectService,private _departmentService : DepartmentServiceService,
  private _specService:SpecialistServiceService, private _hospitalServ:HospitalServiceService) {

  this.RegisteDoctorVM = new RegisterAsDoctorVM();
  }


 ngOnInit(): void {

  this.getAlCities();
  this.getAllDepartments();
  this.getAllHospitals();
  this.getAllInsurance();

  
  this.finalRegisterForm = this._fb.group({
    p1 :this._fb.group({
      userName: ['osama88', Validators.required],
      email: ['osamaali88@gmail.com  ', Validators.required],
      fullName: ['osama ali ahmed',Validators.required],
      doctorTitle: ['title text',Validators.required],
      password: ['Osama33@',Validators.required],
      phoneNo: ['01128199201',Validators.required],
    

  }),

    p2 : this._fb.group({
        gender: ['0',Validators.required],
        cities: ['0', Validators.required],
        areaId: ['1', Validators.required],
        address: ['osama address',Validators.required],
        cost: ['500',Validators.required],
        waitingTime: ['20',Validators.required],    
  }),

    p3: this._fb.group({
        departmentId: ['', Validators.required],
        specialistsIds: ['',Validators.required],
        hospitalsIds: ['',Validators.required],
         insuranceIds: ['',Validators.required],
         image: ['', Validators.required],

  })
  });

}
 

getAlCities(){
  this._ddlService.getAllCities().subscribe(Cities=>{
    this.citiesList = Cities;

    const mapped = Object.entries(this.citiesList).map(([id, name]) => ({id, name}));
     this.citiesList = mapped;
    console.log(Cities);
    console.log(this.citiesList);
    console.log(mapped);

  })
}

getAllAreaByCityId(cityId:number){
  this._ddlService.getAllAreaByCityId(cityId).subscribe(areas=>{
    this.areasList = areas;
    console.log(areas);
    console.log(this.areasList);
  })
}
getAllDepartments(){
  this._departmentService.getAllDepartments().subscribe(departments=>{
    this.departmentList = departments;
})
  console.log(this.departmentList);
}

getAllHospitals(){
  this._hospitalServ.getAllHospitals().subscribe(hospital=>{
    this.hospitalsList = hospital;
})
}

getAllInsurance(){
  this._insuranceServ.getAllInsurance().subscribe(insurance=>{
    this.insuranceList = insurance;
})
}

getSpecByDepId(depId:any){
 var departmentId = depId.target.value;
 this.getAllSpecialisatByDepId(departmentId);
}


getAllSpecialisatByDepId(depId:number){
  this._specService.getAllSpecialistByDepartmentId(depId).subscribe(spec=>{
    this.specialistsList = spec;

    console.log(spec);
    console.log(this.specialistsList);

  })
}


changeAreaValue(cityValue:any){
 
  console.log(cityValue.target.value);
  var cityId = cityValue.target.value;
  if(cityId === ''){
    console.log('empty')
  }else{
    this.getAllAreaByCityId(cityId);
  }
}

getAreaValue(areaVal:any){
  console.log(areaVal.target.value);

}
 // Access formcontrols getter
 get cityName() {
  console.log(this.finalRegisterForm.get('cities'))

  return this.finalRegisterForm.get('cities');
}



onchange(event:any){
  let fileList: FileList = event.target.files;
  if(fileList.length > 0) {
      let file: File = fileList[0];

  this.imageValue = file;
  }
  
}

next(){
  console.log('use test()')
  if(this.step==1 && this.finalRegisterForm.controls['p1'].valid)
  {
    ///this.personal_step = true;
    this.step++
    console.log('yes in p1')
    console.log(this.step)
  }
  if(this.step == 2 && this.finalRegisterForm.controls['p2'].valid)
  {
    ///this.personal_step = true;
    this.step++
    console.log('yes in p2')
    console.log(this.step)

  }
  console.log(this.step)
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
    var data = new FormData();
    data.append("UserName", this.finalRegisterForm.value['p1'].userName);
    data.append("Email", this.finalRegisterForm.value['p1'].email);
    data.append("FullName", this.finalRegisterForm.value['p1'].fullName);
    data.append("DoctorTitle", this.finalRegisterForm.value['p1'].doctorTitle);
    data.append("Password", this.finalRegisterForm.value['p1'].password);
    data.append("PhoneNo", this.finalRegisterForm.value['p1'].phoneNo);
    data.append("Gender", this.finalRegisterForm.value['p2'].gender);
    data.append("Cities", this.finalRegisterForm.value['p2'].cities);
    data.append("AreaId", this.finalRegisterForm.value['p2'].areaId);
    data.append("Address", this.finalRegisterForm.value['p2'].address);
    data.append("Cost", this.finalRegisterForm.value['p2'].cost);
    data.append("WaitingTime", this.finalRegisterForm.value['p2'].waitingTime);
    data.append("DepartmentId", this.finalRegisterForm.value['p3'].departmentId);
    data.append("Image", this.finalRegisterForm.value['p3'].image);
    for (let s of this.selected) {
      data.append('SpecialistsIds[]', s);
     }
     for (let h of this.selected2) {
      data.append('HospitalsIds[]', h);
     }    
    for (let i of this.selected3) {
      data.append('InsuranceIds[]', i);
     }
    data.append("Image", this.imageValue, this.imageValue.name);

    console.log(this.selected)
    console.log(this.selected2)
    console.log(this.selected3)
    console.log(this.imageValue);
    console.log(data)
    if (this.finalRegisterForm.valid) {
    this._authSrevice.RegisterAsDoctor(data).subscribe(
      {
        next:(data) =>{
          alert('register successfully')
          
        },error:(err)=>{

          console.log(err.error);
          this.isError = true;
          this.errorMassage = err.error
        }
      }
    )
    }
  }
}

}
