import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartmentServiceService } from 'src/app/Services/department-service.service';

@Component({
  selector: 'app-form.department',
  templateUrl: './form.department.component.html',
  styleUrls: ['./form.department.component.css']
})
export class FormDepartmentComponent implements OnInit{

  departmentForm!: FormGroup 
  actionName : string ="Add";

  /**
   *
   */
  constructor(private _fb : FormBuilder, private _departmenService: DepartmentServiceService,
    private _dialog: MatDialogRef<FormDepartmentComponent>, @Inject(MAT_DIALOG_DATA) public editeData:any) {}
  
    ngOnInit(): void {
      this.departmentForm = this._fb.group({
        name:['', Validators.required],
        description:['',Validators.required],
      })
      if(this.editeData){
        console.log(this.editeData);
        this.actionName="Update";
        this.departmentForm.get('name')?.setValue(this.editeData.name);
        this.departmentForm.get('description')?.setValue(this.editeData.description);
    }
  }

  addDepartment(){
    var fData  = new FormData();
    fData.append("name", this.departmentForm.get('name')?.value);
    fData.append("description", this.departmentForm.get('description')?.value);
    if(!this.editeData){
      if(this.departmentForm.value){
        this._departmenService.addDepartment(fData).subscribe({
          next:(res)=>{
            alert("Department added successfully");
            this.departmentForm.reset();
            this._dialog.close('Add');
           
          },
          error:(err)=>{
            alert('Somthing error while adding, try again!')
            console.log(this.departmentForm.value);
            console.log(err);
          }
        })
      }
    }
    else{
      fData.append("id",this.editeData.id)
      this.updateDepartment(fData);
    }

  }
  updateDepartment(fData:FormData){
     this._departmenService.updateDepartment(fData).subscribe({
     next:(res)=>{
      alert("Department updated successfully");
      this.departmentForm.reset();
      this._dialog.close('Update');
    },
    error:(err)=>{
       alert("Somthing error while updating, try again!")
       console.log(err);
      
    }
  })
  }

}