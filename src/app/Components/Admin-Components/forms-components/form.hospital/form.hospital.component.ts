import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HospitalServiceService } from 'src/app/Services/hospital-service.service';

@Component({
  selector: 'app-form.hospital',
  templateUrl: './form.hospital.component.html',
  styleUrls: ['./form.hospital.component.css']
})
export class FormHospitalComponent implements OnInit{

  hospitalForm!: FormGroup 
  actionName : string ="Add";
  constructor(private _fb : FormBuilder, private _hospitalService : HospitalServiceService,
    private _dialog: MatDialogRef<FormHospitalComponent>,  @Inject(MAT_DIALOG_DATA) public editeData:any) {
    
  }


  ngOnInit(): void {
    this.hospitalForm = this._fb.group({
      name:['',Validators.required],
      address:['',Validators.required]
    })
    if(this.editeData){
      console.log(this.editeData);
      this.actionName="Update";
      this.hospitalForm.get('name')?.setValue(this.editeData.name);
      this.hospitalForm.get('address')?.setValue(this.editeData.address);
  }

}

addHospital(){
  const fData = new FormData();
  fData.append('name',this.hospitalForm.get('name')?.value);
  fData.append('address',this.hospitalForm.get('address')?.value);
  if(!this.editeData){
    if(this.hospitalForm.value){
      this._hospitalService.addHospital(fData).subscribe({
        next:(res)=>{
          alert("Hospital added successfully");
          this.hospitalForm.reset();
          this._dialog.close('Add');
         
        },
        error:(err)=>{
          alert('Somthing error while adding, try again!')
          console.log(this.hospitalForm.value);
          console.log(err);
        }
      })
    }
  }
  else{
    this.updateHospital(this.editeData.id, fData);
  }
}

updateHospital(id:number, fData:FormData){
this._hospitalService.updateHospital(id,fData).subscribe({
  next:(res)=>{
    alert("Hospital updated successfully");
    this.hospitalForm.reset();
    this._dialog.close('Update');
  },
  error:(err)=>{
    alert('Somthing error while updating, try again!');
    console.log(err);
  }
})
}


}
