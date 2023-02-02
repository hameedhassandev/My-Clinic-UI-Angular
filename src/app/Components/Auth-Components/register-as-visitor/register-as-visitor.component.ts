import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSerciceService } from 'src/app/Services/auth-service';
import { DropDownSelectService } from 'src/app/Services/drop-down-select.service';
import { RegisterAsVisitorVM } from 'src/app/ViewModels/RegisterAsVisitorVM';

@Component({
  selector: 'app-register-as-visitor',
  templateUrl: './register-as-visitor.component.html',
  styleUrls: ['./register-as-visitor.component.css']
})
export class RegisterAsVisitorComponent implements OnInit {
  public RegisteVisitorVM : RegisterAsVisitorVM;
  visitorRegisterForm !:FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  passwordPattern = "^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)).+$"; 

  citiesList :any;
  areasList :any;
  selectValurError = false;
  serverError = false;
  errorMessage:string = "";
  constructor(private _fb: FormBuilder,private _authSrevice: AuthSerciceService,
    private _router: Router,private _ddlService: DropDownSelectService) {
    this.RegisteVisitorVM = new RegisterAsVisitorVM();
  }
  ngOnInit(): void {
    this.getAlCities();

    this.visitorRegisterForm = this._fb.group({
      userName: ['hdhd', Validators.required],
      email: ['dpodip', Validators.required],
      password: ['pdipodipd', Validators.required],
      fullName: ['dpodpo', Validators.required],
      cities: ['', Validators.required],
      areaId: ['', Validators.required],
      address: ['doidoi', Validators.required],
      phoneNo: ['doidoi', Validators.required],
      gender: ['0', Validators.required],
    })
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

  
changeAreaValue(cityValue:any){
  console.log(cityValue.target.value);
  var cityId = cityValue.target.value;
  if(cityId === ''){
    console.log('empty')
  }else{
    this.getAllAreaByCityId(cityId);
  }
}

validateSelectList(value:any){
  console.log(this.selectValurError);
   if(value === ""){
      this.selectValurError = true;
   }else{
    this.selectValurError = false;
   }
}

Register(){
  const data = {
    userName: this.visitorRegisterForm.value['userName'],
    email: this.visitorRegisterForm.value['email'],
    password: this.visitorRegisterForm.value['password'],
    fullName: this.visitorRegisterForm.value['fullName'],
    cities: this.visitorRegisterForm.value['cities'],
    areaId: this.visitorRegisterForm.value['areaId'],
    address: this.visitorRegisterForm.value['address'],
    phoneNo: this.visitorRegisterForm.value['phoneNo'],
    gender: this.visitorRegisterForm.value['gender'],

  }

  console.log(data);
  this.serverError = false;
if(this.visitorRegisterForm.valid)
{
  this._authSrevice.RegisterAsVisitor(data).subscribe({
    next:(res)=>{
       // alert("User Register Successfully");
        this._router.navigate(['/confirm-email']);
        console.log(res);

      },error: err=>{
        console.log(err);
   if(err.error.errors['Email'])
        this.errorMessage += 'Invalid email'
    if(err.error.errors['Password'])
        this.errorMessage += 'Invalid password must contain Capital, small letter and numbers'
        var allErr = err.error.errors;
        console.log(typeof(err.error.errors))

        this.serverError = true;

      //   if(typeof err["error"] == "string")
      //   this.errorMessage = err["error"];
      
      // // else if(err["error"].hasOwnProperty("errors"))
      // //   for(const e of err["error"]["errors"])
      // //     this.errorMessage += e; 
      
      // else if(err["error"].hasOwnProperty("Password"))  
      //   for(const e of err["error"]["Password"])
      //     this.errorMessage += e; 
      
    
      // else
      //   this.errorMessage = err[0];
      }
    })

}
}

}
