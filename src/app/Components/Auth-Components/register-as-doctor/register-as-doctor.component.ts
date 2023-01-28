import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSerciceService } from 'src/app/Services/auth-service';
import { DepartmentServiceService } from 'src/app/Services/department-service.service';
import { DropDownSelectService } from 'src/app/Services/drop-down-select.service';
import { HospitalServiceService } from 'src/app/Services/hospital-service.service';
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
  departmentList : any;
  specialistsList : any;
  hospitalsList : any;
  file:string='';
  selected = 0;

 constructor(private _fb: FormBuilder,private _authSrevice: AuthSerciceService, 
  private _router: Router,private _ddlService: DropDownSelectService,private _departmentService : DepartmentServiceService,
  private _specService:SpecialistServiceService, private _hospitalServ:HospitalServiceService) {

  this.RegisteDoctorVM = new RegisterAsDoctorVM();
  }


 ngOnInit(): void {
  this.getAlCities();
  this.getAllDepartments();
  this.getAllSpecialisatByDepId(1);
  this.getAllHospitals();
  //this.getAllAreaByCityId(0);
  // this.finalRegisterForm = this._fb.group({
  //   userGroup: this._fb.group({
  //     name: ['', Validators.required],
  
  // }),
  // addressGroup: this._fb.group({
  //     street: ['', Validators.required],
 
  // })
  // });
  
  this.finalRegisterForm = this._fb.group({
    p1 :this._fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      fullName: ['',Validators.required],
      doctorTitle: ['',Validators.required],
      password: ['',Validators.required],
      phoneNo: ['',Validators.required],
  }),

    p2 : this._fb.group({
        gender: ['',Validators.required],
        cities: ['', Validators.required],
        areaId: ['', Validators.required],
        address: ['',Validators.required],
        cost: ['',Validators.required],
        waitingTime: ['',Validators.required],    
  }),

    p3: this._fb.group({
        image: ['', Validators.required],
        departmentId: ['', Validators.required],
        specialistsIds: ['',Validators.required],
        hospitalsIds: ['',Validators.required],
        // insuranceIds: ['',Validators.required],
  })
  });

  //   this.personalDetails = this._fb.group({
  //     userName: ['', Validators.required],
  //     email: ['', Validators.required],
  //     fullName: ['',Validators.required],
  //     doctorTitle: ['',Validators.required],
  //     password: ['',Validators.required],
  //     phoneNo: ['',Validators.required],
  // });

  //   this.addressAndCostDetails = this._fb.group({
  //       // gender: ['',Validators.required],
  //       cities: ['', Validators.required],
  //       // areaId: ['', Validators.required],
  //       address: ['',Validators.required],
  //       // cost: ['',Validators.required],
  //       // waitingTime: ['',Validators.required],    
  // });

  //   this.extraInfoDetails = this._fb.group({
  //       image: ['', Validators.required],
  //       departmentId: ['', Validators.required],
  //       specialistsIds: ['',Validators.required],
  //       hospitalsIds: ['',Validators.required],
  //       insuranceIds: ['',Validators.required],
  // });


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

    // const mapped2 = Object.entries(this.areasList).map(([id, areaName]) => ({id, areaName}));
    //  this.areasList = mapped2;
    console.log(areas);
    console.log(this.areasList);
    // console.log(mapped2);

  })
}

getAllSpecialisatByDepId(depId:number){
  this._specService.getAllSpecialistByDepartmentId(1).subscribe(spec=>{
    this.specialistsList = spec;

    // const mapped2 = Object.entries(this.areasList).map(([id, areaName]) => ({id, areaName}));
    //  this.areasList = mapped2;
    console.log(spec);
    console.log(this.specialistsList);
    // console.log(mapped2);

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


changeAreaValue(cityValue:any){
  // this.cityName?.setValue(cityValue.target.value, {
  //   onlySelf: true,
  // });
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

  var reader = new FileReader();

    reader.onload = (event:any) => {
      console.log(event.target.result);
       
    }
    reader.readAsDataURL(event.target.files[0]);

    this.file=event.target.files[0];

}

test(){
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

next(){
    if(this.step==1){
      console.log('lol')
      this.personal_step = true;
      
      if (this.finalRegisterForm.invalid) { return  }
      this.step++
    }
    if(this.step==2){
    this.address_step = true;
    if (this.addressAndCostDetails.invalid) { return }
        this.step++;
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
