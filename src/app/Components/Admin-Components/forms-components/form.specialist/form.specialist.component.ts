import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Specialist } from 'src/app/Models/Specialist';
import { DepartmentServiceService } from 'src/app/Services/department-service.service';
import { SpecialistServiceService } from 'src/app/Services/specialist-service.service';

@Component({
  selector: 'app-form.specialist',
  templateUrl: './form.specialist.component.html',
  styleUrls: ['./form.specialist.component.css']
})
export class FormSpecialistComponent implements OnInit {
  specialistForm!: FormGroup 
  actionName : string ="Add";
  departmentList : any;
  departmentError = false;
  constructor(private _fb : FormBuilder, private _departmentService : DepartmentServiceService,
    private _specialistService :SpecialistServiceService, private _dialog : MatDialogRef<Specialist>,@Inject(MAT_DIALOG_DATA) public editeData:any) {
    
  }
  ngOnInit(): void {
    this.getAllDepartments();
    console.log(this.departmentList)
    this.specialistForm =  this._fb.group({
    SpecialistName:['',Validators.required],
    departmentId:['',Validators.required],
    })
    if(this.editeData){
      console.log(this.editeData);
      this.actionName="Update";
      this.specialistForm.get('SpecialistName')?.setValue(this.editeData.specialistName);
      this.specialistForm.get('departmentId')?.setValue(this.editeData.departmentId);
  }
  }

  getAllDepartments(){
    this._departmentService.getAllDepartments().subscribe(departments=>{
      this.departmentList = departments;

  }

    )
    console.log(this.departmentList);

  }

  addSpecialist(){
    var fData = new FormData();
    fData.append("SpecialistName", this.specialistForm.get('SpecialistName')?.value);
    fData.append("departmentId", this.specialistForm.get('departmentId')?.value);
    if(!this.editeData){
      if(this.specialistForm.value){
        this._specialistService.addSpecialist(fData).subscribe({
          next:(res)=>{
            alert("Specialist Added Successfully.");
            this.specialistForm.reset();
            this._dialog.close('Add');
          },
          error:(err)=>{
            alert('Somthing error while adding, try again!');
            console.log(err);
          }
        })
      }
    }else{
      fData.append("id",this.editeData.id)
      this.updateSpecialist(fData);

    }
  }
  validateDepartment(depValue:any){
    console.log(depValue);
     if(depValue === ""){
        this.departmentError = true;
     }else{
      this.departmentError = false;
     }
  }

  updateSpecialist(fData:FormData){
    this._specialistService.updateSpecialist(fData).subscribe({
      next:(res)=>{
        alert("Specialist updated successfully");
        this.specialistForm.reset();
        this._dialog.close('Update');
      },
      error:(err)=>{
        alert('Somthing error while updating, try again!');
        console.log(err);
      }
    })
  }
}
