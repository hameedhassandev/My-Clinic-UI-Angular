import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InsuranceService } from 'src/app/Services/insurance.service';

@Component({
  selector: 'app-insurance-form',
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.css']
})
export class InsuranceFormComponent implements OnInit{

  insuranceForm!: FormGroup 
  actionName : string ="Add";
  constructor(private _fb : FormBuilder, private _insuranceSer : InsuranceService,
    private _dialog: MatDialogRef<InsuranceFormComponent>,  @Inject(MAT_DIALOG_DATA) public editeData:any) {
    
  }


  ngOnInit(): void {
    this.insuranceForm = this._fb.group({
      companyName:['',Validators.required],
      discount:['',Validators.required]
    })
    if(this.editeData){
      console.log(this.editeData);
      this.actionName="Update";
      this.insuranceForm.get('companyName')?.setValue(this.editeData.companyName);
      this.insuranceForm.get('discount')?.setValue(this.editeData.discount);
  }

}

addInsurance(){
  const fData = new FormData();
  fData.append('companyName',this.insuranceForm.get('companyName')?.value);
  fData.append('discount',this.insuranceForm.get('discount')?.value);
  if(!this.editeData){
    if(this.insuranceForm.value){
      this._insuranceSer.addInsurance(fData).subscribe({
        next:(res)=>{
          alert("Insurance added successfully");
          this.insuranceForm.reset();
          this._dialog.close('Add');
         
        },
        error:(err)=>{
          alert('Somthing error while adding, try again!')
          console.log(this.insuranceForm.value);
          console.log(err);
        }
      })
    }
  }
  else{
    fData.append("id",this.editeData.id)
    this.updateInsurance(fData);
  }
}

updateInsurance(fData:FormData){
this._insuranceSer.editeInsurance(fData).subscribe({
  next:(res)=>{
    alert("Insurance updated successfully");
    this.insuranceForm.reset();
    this._dialog.close('Update');
  },
  error:(err)=>{
    alert('Somthing error while updating, try again!');
    console.log(err);
  }
})
}


}